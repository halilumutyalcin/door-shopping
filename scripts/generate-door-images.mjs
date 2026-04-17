#!/usr/bin/env node

/**
 * Kapı Görsel Üretim Otomasyonu (Gemini API)
 *
 * İş akışı:
 *   1. Fotoğrafı Gemini'ye gönder → 3 detaylı prompt üret
 *   2. Her prompt + fotoğrafı Gemini'ye gönder → görsel üret
 *   3. Görselleri ve promptları kaydet
 *
 * Kullanım:
 *   GEMINI_API_KEY=xxx node scripts/generate-door-images.mjs IMG_6473.DNG
 *   GEMINI_API_KEY=xxx node scripts/generate-door-images.mjs IMG_6473.DNG IMG_6474.DNG
 *   GEMINI_API_KEY=xxx node scripts/generate-door-images.mjs --all
 *
 * Çıktı:  ~/Downloads/kapi-fotolari/output/IMG_6473/
 *           ├── prompts.txt
 *           ├── gorsel-1-studyo.png
 *           ├── gorsel-2-makro.png
 *           └── gorsel-3-sahne.png
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// ─── .env.local okuma ────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

// ─── Ayarlar ─────────────────────────────────────────────
const DEFAULT_FOTO_DIR = '/Users/medisan/Downloads/kapi-fotolari';
const PROJECT_DIR = path.join(__dirname, '..', 'public', 'kapi');
const PROMPT_MODEL = 'gemini-2.5-flash';         // prompt üretimi
const IMAGE_MODEL = 'gemini-2.5-flash-image';   // görsel üretimi (Nano Banana)

// WebP dönüşüm fonksiyonu (cwebp ile)
function convertToWebp(pngPath, webpPath) {
  // Yeniden boyutlandırma yapmadan yüksek kaliteyle dönüştür: detay kaybını azaltır.
  execSync(`/opt/homebrew/bin/cwebp -q 96 -m 6 "${pngPath}" -o "${webpPath}" 2>/dev/null`);
}

// Try premium prompt first, fall back to standard
let MASTER_PROMPT;
try {
  MASTER_PROMPT = fs.readFileSync(
    new URL('./gemini-master-prompt-premium.txt', import.meta.url),
    'utf-8'
  );
  console.log('📋 Premium master prompt loaded');
} catch (e) {
  MASTER_PROMPT = fs.readFileSync(
    new URL('./gemini-master-prompt.txt', import.meta.url),
    'utf-8'
  );
  console.log('📋 Standard master prompt loaded');
}

// ─── API ─────────────────────────────────────────────────
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY bulunamadı.');
  console.error('   .env.local dosyasına GEMINI_API_KEY=xxx ekleyin');
  console.error('   veya: GEMINI_API_KEY=xxx node scripts/generate-door-images.mjs IMG_6473.DNG');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// ─── Yardımcılar ─────────────────────────────────────────

/** DNG → JPEG dönüşümü (macOS sips). Gemini DNG kabul etmez. Boyutu da küçültür. */
function convertToJpeg(dngPath) {
  const jpegPath = dngPath.replace(/\.DNG$/i, '_temp.jpg');
  if (fs.existsSync(jpegPath)) return jpegPath;
  console.log(`   📷 DNG → JPEG dönüştürülüyor (boyut küçültme dahil)...`);
  // Önce JPEG'e çevir, sonra 2048px'e küçült (API hızı için)
  execSync(`sips -s format jpeg -s formatOptions 80 "${dngPath}" --out "${jpegPath}" 2>/dev/null`);
  execSync(`sips --resampleWidth 2048 "${jpegPath}" 2>/dev/null`);
  return jpegPath;
}

/** Dosyayı base64 olarak oku */
function fileToBase64(filePath) {
  return fs.readFileSync(filePath).toString('base64');
}

/** Dosya uzantısından MIME tipi */
function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
  return map[ext] || 'image/jpeg';
}

/** Gemini yanıtından prompt metinlerini ayıkla */
function parsePrompts(text) {
  // Yöntem 1: PROMPT 1 / PROMPT 1 - ... / PROMPT 1: ...
  const sections = [];
  const regex = /PROMPT\s*(\d)\s*[:—–-]?\s*\n?([\s\S]*?)(?=\n\s*PROMPT\s*\d\s*[:—–-]?\s*\n?|$)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const num = parseInt(match[1], 10);
    const body = (match[2] || '').trim();
    sections.push({ num, full: `PROMPT ${num}\n${body}`.trim() });
  }
  if (sections.length >= 3) return sections;

  // Yöntem 2: ### veya ** başlıklarıyla 3 bölüm (--- ayracı ile)
  const blocks = text.split(/\n---\n/).filter(b => b.trim().length > 100);
  if (blocks.length >= 3) {
    return blocks.slice(0, 3).map((b, i) => ({ num: i + 1, full: b.trim() }));
  }

  // Yöntem 3: ### veya ** ile başlayan bölümler
  const headerBlocks = [];
  let current = null;
  for (const line of text.split('\n')) {
    if (/^(\*\*|###?\s)/.test(line.trim()) && (line.includes('Panel') || line.includes('Makro') || line.includes('Koridor') || line.includes('Sahne') || line.includes('Stüdyo') || line.includes('Detay'))) {
      if (current && current.full.length > 100) headerBlocks.push(current);
      current = { num: headerBlocks.length + 1, full: line + '\n' };
    } else if (current) {
      current.full += line + '\n';
    }
  }
  if (current && current.full.length > 100) headerBlocks.push(current);
  if (headerBlocks.length >= 3) return headerBlocks.slice(0, 3);

  return null;
}

/** prompt → "Prompt:" sonrası paragrafı çıkar */
function extractPromptText(section) {
  // "Prompt:" veya "İstem:" sonrasını al
  const promptMatch = section.match(/(?:Prompt|İstem)\s*:\s*([\s\S]+?)(?=\n\n|$)/i);
  if (promptMatch) return promptMatch[1].trim();
  // Yoksa tüm metin bloğunu kullan
  const lines = section.split('\n').filter(l => l.trim() && !/^(Başlık|Odak|PROMPT)/i.test(l.trim()));
  return lines.join(' ').trim();
}

// ─── Adım 1: Prompt Üretimi ──────────────────────────────

async function generatePrompts(imagePath, attempt = 1) {
  console.log(`\n📝 Adım 1: Promptlar üretiliyor...${attempt > 1 ? ` (deneme ${attempt})` : ''}`);

  const imageBase64 = fileToBase64(imagePath);
  const mime = getMime(imagePath);

  try {
    const response = await ai.models.generateContent({
      model: PROMPT_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: mime, data: imageBase64 } },
            { text: MASTER_PROMPT }
          ]
        }
      ]
    });

    const text = response.text;
    console.log(`   ✅ Promptlar üretildi (${text.length} karakter)`);
    return text;
  } catch (err) {
    if (attempt < 4) {
      const wait = attempt * 10000;
      console.log(`   ⏳ ${err.message?.slice(0, 80)}... ${wait / 1000}s sonra tekrar deneniyor`);
      await new Promise(r => setTimeout(r, wait));
      return generatePrompts(imagePath, attempt + 1);
    }
    throw err;
  }
}

// ─── Adım 2: Görsel Üretimi ──────────────────────────────

async function generateImage(promptText, refImagePath, label, attempt = 1) {
  console.log(`   🎨 ${label} üretiliyor... (deneme ${attempt})`);

  const imageBase64 = fileToBase64(refImagePath);
  const mime = getMime(refImagePath);

  const labelLower = label.toLowerCase();
  let shotDirectives = `
[PROFESSIONAL CATALOG STANDARD]
Rendering: 50MP+ e-commerce/luxury catalog photography quality, hiper-realistic.
Renk: D65 (6500K) neutral white balance, no color cast.
Dinamic Range: Shadows detailed, highlights preserved, no clipping.
Keskinlik: Tack-sharp, optical perfection, no blur/softness.
Negatifler: Amatör, Instagram filter, oversaturated, blurry, grain, harsh shadows, CGI obvious, plastik.
`;

  if (labelLower.includes('makro')) {
    shotDirectives = `
[LUXURY MACRO DETAIL STANDARD]
Çekim: Hardware (kol/kilit/rozet) makro + panel/kasa micro-texture detail.
Kadraj: Hardware 65-75% of frame, bokeh background, diagonal angle for 3D form.
Optic: 85mm f/1.4-2.8 macro equivalent, raking light 85°, specular+diffuse balanced.
Metal: Satin-nickel fırçalanmış doku real, specularity controlled, no cheap chrome shine.
Panel: Surface texture authentic (not flat CGI), micro-variation visible.
Rendering: 100MP+ luxury macro catalog standard, Leica/Zeiss/Octane quality.
Negatifler: Soft-focus, web-resolution, oversharpen, flat render, plastic, CGI obvious.
`;
  } else if (labelLower.includes('studyo')) {
    shotDirectives = `
[PREMIUM PRODUCT STUDIO STANDARD]
Çekim: Full product (kapı + kasa), merkez, studio-neutral background.
Geometri: Perspektif doğru, proportions perfect, no distortion.
Işık: Ring-light/softbox 45°, diffuse + soft, shadows controlled detail-rich.
Keskinlik: F/4-8 equivalent, optik perfection, tack-sharp panel detayı.
Renk: D65 neutral, material authenticity, no bias cast.
Rendering: 50MP+ e-commerce catalog standard, professional studio kalitesi.
Negatifler: Amatör, instagram filter, oversaturated, harsh lighting, cheap hissi.
`;
  } else if (labelLower.includes('sahne')) {
    shotDirectives = `
[LUXURY INTERIOR ARCHITECTURAL STANDARD]
Çekim: Showroom/luxury interior scene, kapı ana odak, ultra-professional context.
Mekan: Minimal, clean, high-end design, no clutter.
Geometri: 24-35mm wide lens, no fisheye distortion, human-eye+ perspective.
Işık: Mixed D65 neutral + 2700K warm LED, soft shadows, holistic glow.
Rendering: Architectural Digest / Elle Decor tier, 100MP+ interior photography standard.
Negatifler: Amatör styling, Instagram random, harsh lighting, plastic furniture, cluttered.
`;
  }

  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: mime, data: imageBase64 } },
            { text: `${promptText}\n\n[GEMINI OUTPUT DIRECTIVE]\nBu referans fotoğraftaki kapıyı temel alarak yukarıdaki prompttaki görseli üret. Dikey (portrait, 3:4) format.\n${shotDirectives}\n[END DIRECTIVE]` }
          ]
        }
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        imageConfig: {
          aspectRatio: '3:4',
        },
      }
    });

    // Yanıttan görseli çıkar
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          console.log(`   ✅ ${label} başarılı`);
          return Buffer.from(part.inlineData.data, 'base64');
        }
      }
    }

    // Görsel bulunamadı — retry
    if (attempt < 3) {
      const wait = attempt * 5000;
      console.log(`   ⚠️  ${label}: Görsel dönmedi, ${wait / 1000}s sonra tekrar...`);
      await new Promise(r => setTimeout(r, wait));
      return generateImage(promptText, refImagePath, label, attempt + 1);
    }
    console.log(`   ❌ ${label}: Görsel üretilemedi`);
    return null;
  } catch (err) {
    if (attempt < 3) {
      const wait = attempt * 5000;
      console.log(`   ⏳ Hata, ${wait / 1000}s sonra tekrar deneniyor: ${err.message?.slice(0, 100)}`);
      await new Promise(r => setTimeout(r, wait));
      return generateImage(promptText, refImagePath, label, attempt + 1);
    }
    console.error(`   ❌ ${label} başarısız: ${err.message}`);
    return null;
  }
}

// ─── Ana Akış ─────────────────────────────────────────────

async function processDoor(filename, options = {}) {
  const sourceDir = options.sourceDir || DEFAULT_FOTO_DIR;
  const outputBase = options.outputBase || path.join(sourceDir, 'output');
  const force = Boolean(options.force);

  const actualFile = typeof filename === 'object' ? filename.file : filename;
  const baseName = actualFile.replace(/\.[^.]+$/, '');
  const dngPath = path.join(sourceDir, actualFile);

  if (!fs.existsSync(dngPath)) {
    console.error(`❌ Dosya bulunamadı: ${dngPath}`);
    return;
  }

  const outDir = path.join(outputBase, baseName);
  fs.mkdirSync(outDir, { recursive: true });

  if (force) {
    for (const fileName of ['prompts.txt', 'gorsel-1-studyo.png', 'gorsel-2-makro.png', 'gorsel-3-sahne.png']) {
      const filePath = path.join(outDir, fileName);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  }

  // Promptlar zaten varsa atla
  const promptsFile = path.join(outDir, 'prompts.txt');
  let promptsText;
  if (fs.existsSync(promptsFile)) {
    console.log(`\n📂 ${baseName}: Promptlar zaten mevcut, görsellere geçiliyor...`);
    promptsText = fs.readFileSync(promptsFile, 'utf-8');
  } else {
    // DNG → JPEG
    let imagePath = dngPath;
    if (/\.dng$/i.test(actualFile)) {
      imagePath = convertToJpeg(dngPath);
    }

    // Prompt üret
    promptsText = await generatePrompts(imagePath);
    fs.writeFileSync(promptsFile, promptsText, 'utf-8');
    console.log(`   💾 Promptlar kaydedildi: ${promptsFile}`);
  }

  // Promptları parse et
  const sections = parsePrompts(promptsText);
  if (!sections || sections.length < 3) {
    console.error(`   ❌ Promptlar ayrıştırılamadı. Manuel kontrol gerekebilir:`);
    console.error(`      ${promptsFile}`);
    return;
  }

  // JPEG referans resmi hazırla
  let refImage = dngPath;
  if (/\.dng$/i.test(actualFile)) {
    refImage = convertToJpeg(dngPath);
  }

  // Her prompt için görsel üret
  const pngNames = ['gorsel-1-studyo.png', 'gorsel-2-makro.png', 'gorsel-3-sahne.png'];
  const webpNames = ['kapi-detay.webp', 'kapi-yakin.webp', 'kapi-sahne.webp'];
  for (let i = 0; i < 3; i++) {
    const outPath = path.join(outDir, pngNames[i]);
    if (fs.existsSync(outPath)) {
      console.log(`   ⏭️  ${pngNames[i]} zaten mevcut, atlanıyor...`);
      continue;
    }

    const promptBody = extractPromptText(sections[i].full);
    const imgBuffer = await generateImage(promptBody, refImage, pngNames[i]);
    if (imgBuffer) {
      fs.writeFileSync(outPath, imgBuffer);
      console.log(`   💾 Kaydedildi: ${outPath}`);
    }

    // Rate limit — istekler arası 3s bekle
    if (i < 2) await new Promise(r => setTimeout(r, 3000));
  }

  // Projeye WebP olarak kopyala (eğer projectFolder verilmişse)
  const projFolder = typeof filename === 'object' ? filename.projectFolder : null;
  if (projFolder) {
    const projDir = path.join(PROJECT_DIR, projFolder);
    fs.mkdirSync(projDir, { recursive: true });
    if (force) {
      for (const webpName of webpNames) {
        const staleWebp = path.join(projDir, webpName);
        if (fs.existsSync(staleWebp)) fs.unlinkSync(staleWebp);
      }
    }
    for (let i = 0; i < 3; i++) {
      const pngPath = path.join(outDir, pngNames[i]);
      const webpPath = path.join(projDir, webpNames[i]);
      if (fs.existsSync(pngPath) && !fs.existsSync(webpPath)) {
        convertToWebp(pngPath, webpPath);
        const size = (fs.statSync(webpPath).size / 1024).toFixed(0);
        console.log(`   📦 WebP: ${webpPath} (${size}KB)`);
      }
    }
  }

  // Temp JPEG'i temizle
  const tempJpeg = dngPath.replace(/\.DNG$/i, '_temp.jpg');
  if (fs.existsSync(tempJpeg)) fs.unlinkSync(tempJpeg);

  console.log(`\n✅ ${baseName} tamamlandı: ${outDir}`);
}

// ─── CLI ──────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  const sourceArg = args.find(a => a.startsWith('--source-dir='));
  const sourceDir = sourceArg ? sourceArg.replace('--source-dir=', '') : DEFAULT_FOTO_DIR;
  const outputBase = path.join(sourceDir, 'output');
  const forceRegenerate = args.includes('--force-regenerate');

  if (args.length === 0) {
    console.log(`
🚪 Kapı Görsel Üretim Otomasyonu

Kullanım:
  GEMINI_API_KEY=xxx node scripts/generate-door-images.mjs IMG_6473.DNG
  GEMINI_API_KEY=xxx node scripts/generate-door-images.mjs IMG_6473.DNG IMG_6474.DNG
  GEMINI_API_KEY=xxx node scripts/generate-door-images.mjs --all

Seçenekler:
  --all          Klasördeki tüm DNG dosyalarını işle
  --prompts-only Sadece prompt üret, görsel üretme
  --skip-done    Çıktısı olan dosyaları atla (varsayılan)
`);
    process.exit(0);
  }

  const promptsOnly = args.includes('--prompts-only');
  const processAll = args.includes('--all');
  const projectMode = args.includes('--project');
  const icRefreshMode = args.includes('--ic-refresh');

  // --project modu: IMG_6474-6482 → ic-kapi-11 - ic-kapi-19
  if (projectMode) {
    const mapping = [
      { file: 'IMG_6474.DNG', projectFolder: 'ic-kapi-11' },
      { file: 'IMG_6475.DNG', projectFolder: 'ic-kapi-12' },
      { file: 'IMG_6476.DNG', projectFolder: 'ic-kapi-13' },
      { file: 'IMG_6477.DNG', projectFolder: 'ic-kapi-14' },
      { file: 'IMG_6478.DNG', projectFolder: 'ic-kapi-15' },
      { file: 'IMG_6479.DNG', projectFolder: 'ic-kapi-16' },
      { file: 'IMG_6480.DNG', projectFolder: 'ic-kapi-17' },
      { file: 'IMG_6481.DNG', projectFolder: 'ic-kapi-18' },
      { file: 'IMG_6482.DNG', projectFolder: 'ic-kapi-19' },
    ];

    console.log(`\n🚪 Kapı Görsel Üretim → Proje Kayıt Modu`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📁 Kaynak: ${sourceDir}`);
    console.log(`📁 Proje:  ${PROJECT_DIR}`);
    console.log(`📄 Dosya:  ${mapping.length} adet`);
    if (forceRegenerate) console.log(`⚙️  Mod: Zorla yeniden üretim`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    for (let i = 0; i < mapping.length; i++) {
      console.log(`\n[${i + 1}/${mapping.length}] 📸 ${mapping[i].file} → ${mapping[i].projectFolder}`);
      await processDoor(mapping[i], { sourceDir, outputBase, force: forceRegenerate });
      if (i < mapping.length - 1) {
        console.log(`   ⏳ Sonraki dosya için 5s bekleniyor...`);
        await new Promise(r => setTimeout(r, 5000));
      }
    }

    console.log(`\n${'━'.repeat(40)}`);
    console.log(`🎉 Tamamlandı! Görseller: ${PROJECT_DIR}`);
    return;
  }

  if (icRefreshMode) {
    const dngFiles = fs.readdirSync(sourceDir)
      .filter(f => /\.dng$/i.test(f) && !/_temp\.jpg$/i.test(f))
      .sort();

    const mapping = dngFiles.map((file, i) => ({
      file,
      projectFolder: `ic-kapi-${String(i + 1).padStart(2, '0')}`,
    }));

    console.log(`\n🚪 İç Kapı Tam Yenileme Modu`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📁 Kaynak: ${sourceDir}`);
    console.log(`📁 Proje:  ${PROJECT_DIR}`);
    console.log(`📄 Dosya:  ${mapping.length} adet`);
    console.log(`⚙️  Mod: Zorla yeniden üretim`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    for (let i = 0; i < mapping.length; i++) {
      console.log(`\n[${i + 1}/${mapping.length}] 📸 ${mapping[i].file} → ${mapping[i].projectFolder}`);
      await processDoor(mapping[i], { sourceDir, outputBase, force: true });
      if (i < mapping.length - 1) {
        console.log(`   ⏳ Sonraki dosya için 5s bekleniyor...`);
        await new Promise(r => setTimeout(r, 5000));
      }
    }

    console.log(`\n${'━'.repeat(40)}`);
    console.log(`🎉 Tamamlandı! İç kapılar yenilendi: ${PROJECT_DIR}`);
    return;
  }

  const files = processAll
    ? fs.readdirSync(sourceDir).filter(f => /\.dng$/i.test(f)).sort()
    : args.filter(a => !a.startsWith('--'));

  console.log(`\n🚪 Kapı Görsel Üretim Otomasyonu`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📁 Kaynak: ${sourceDir}`);
  console.log(`📁 Çıktı:  ${outputBase}`);
  console.log(`📄 Dosya:  ${files.length} adet`);
  if (promptsOnly) console.log(`⚙️  Mod: Sadece prompt üretimi`);
  if (forceRegenerate) console.log(`⚙️  Mod: Zorla yeniden üretim`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  for (let i = 0; i < files.length; i++) {
    console.log(`\n[${i + 1}/${files.length}] 📸 ${files[i]}`);

    if (promptsOnly) {
      // Sadece prompt üret
      const baseName = files[i].replace(/\.[^.]+$/, '');
      const outDir = path.join(outputBase, baseName);
      fs.mkdirSync(outDir, { recursive: true });

      let imagePath = path.join(sourceDir, files[i]);
      if (/\.dng$/i.test(files[i])) imagePath = convertToJpeg(imagePath);

      const promptsText = await generatePrompts(imagePath);
      const promptsFile = path.join(outDir, 'prompts.txt');
      fs.writeFileSync(promptsFile, promptsText, 'utf-8');
      console.log(`   💾 ${promptsFile}`);

      // Temp temizle
      const tempJpeg = path.join(sourceDir, files[i]).replace(/\.DNG$/i, '_temp.jpg');
      if (fs.existsSync(tempJpeg)) fs.unlinkSync(tempJpeg);
    } else {
      await processDoor(files[i], { sourceDir, outputBase, force: forceRegenerate });
    }

    // Dosyalar arası rate limit
    if (i < files.length - 1) {
      console.log(`   ⏳ Sonraki dosya için 5s bekleniyor...`);
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log(`\n${'━'.repeat(40)}`);
  console.log(`🎉 Tamamlandı! Çıktılar: ${outputBase}`);
}

main().catch(err => {
  console.error(`\n❌ Hata: ${err.message}`);
  process.exit(1);
});
