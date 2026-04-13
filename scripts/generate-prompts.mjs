#!/usr/bin/env node

/**
 * Kapı Fotoğrafı Prompt Üreteci
 * 
 * Kullanım:
 *   node scripts/generate-prompts.mjs
 * 
 * Fotoğraf dosya adı ve kapı özelliklerini girince 3 prompt üretir.
 * Promptları kopyalayıp Gemini'ye yapıştırabilirsin.
 */

import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

// ---- PROMPT ŞABLONLARI ----

function promptDetay(foto, kapi) {
  return `Görsel 1: ${kapi.baslik} - Tam Panel ve Kasa Görünümü
Odak: Kapının ${kapi.renk} yüzeyini, ${kapi.panelTipi} ve ${kapi.kasaDetay} tam boy sunmak.

İstem:
${foto}'deki ${kapi.renk} ${kapi.malzeme} kapının ve ${kapi.kasaDetay} kasasının stüdyo kalitesinde tam dikey fotoğrafı. ${kapi.panelAciklama} Yumuşak ve dağınık doğal gün ışığı, ${kapi.renk.split(' ')[0]} tonunun üzerindeki panel derinliklerini zarif gölgelerle vurguluyor. Kapı, minimalist beyaz bir stüdyo fonu önünde, parlak beyaz mermer zemin üzerinde duruyor. ${kapi.kolTipi} net bir şekilde görülüyor. Kompozisyon dengeli, aydınlatma 'high-key', genel estetik lüks ve kusursuz.`;
}

function promptMakro(foto, kapi) {
  return `Görsel 2: ${kapi.baslik} - Makro Detay
Odak: ${kapi.makroOdak}

İstem:
${foto}'deki ${kapi.renk} kapıdan bir makro, hiper-detay fotoğrafı. Odak, ${kapi.kolTipi}nın fırçalanmış metal dokusu üzerindedir. ${kapi.makroDetay} Kompozisyon, kasanın derinliğini ve kolun metalik parıltısını çapraz bir açıyla yakalıyor. Arka plan tamamen netsiz (bokeh), malzeme kalitesine odaklanan profesyonel bir katalog detayı.`;
}

function promptSahne(foto, kapi) {
  return `Görsel 3: ${kapi.baslik} - ${kapi.sahneBaslik}
Odak: Kapıyı, ${kapi.sahneStil} yansıtan lüks ve aydınlık bir yaşam alanı içinde sergilemek.

İstem:
${foto}'deki ${kapi.renk} kapıyı referans alan, geniş açılı ve lüks bir antre fotoğrafı. Kapı, koridorun sonundaki ana odak noktasıdır; ${kapi.sahneKapiDetay}. Zemin, ${kapi.sahneZemin}. ${kapi.sahneMobilya}. Tüm alan, tavandaki gizli LED aydınlatma ve yanlardan gelen yumuşak, doğal gün ışığı ile aydınlatılmış. Genel estetik, "${kapi.sahneStil}" tarzında, son derece ferah ve huzurlu bir atmosferi yansıtıyor.`;
}

// ---- HAZIR PRESETLER ----

const presets = {
  'beyaz-lake-klasik': {
    renk: 'kar beyazı lake',
    malzeme: 'lake',
    kolTipi: 'saten nikel (gümüş rengi) modern kapı kolu ve kare rozet',
    sahneStil: 'lüks minimalizm, modern-klasik',
    sahneZemin: 'parlak beyaz mermer görünümlü, geniş gri damarlı lüks bir yüzey',
    sahneMobilya: 'Sağ tarafta gümüş metal detaylı minimalist beyaz bir dresuar, üzerinde zarif bir cam vazo ve modern bir sanat eseri yer alıyor',
  },
  'beyaz-lake-modern': {
    renk: 'mat beyaz lake',
    malzeme: 'lake',
    kolTipi: 'mat siyah minimal kare kapı kolu ve gizli rozet',
    sahneStil: 'modern minimalizm',
    sahneZemin: 'parlak beyaz mermer görünümlü, geniş gri damarlı lüks bir yüzey',
    sahneMobilya: 'Sağ tarafta siyah metal ayaklı minimalist ahşap konsol, üzerinde siyah seramik vazo ve modern dekoratif obje yer alıyor',
  },
  'mese-laminat': {
    renk: 'açık meşe laminat',
    malzeme: 'CPL laminat kaplama',
    kolTipi: 'saten nikel (gümüş rengi) modern kapı kolu ve kare rozet',
    sahneStil: 'sıcak modern, doğal estetik',
    sahneZemin: 'parlak beyaz mermer görünümlü, geniş gri damarlı lüks bir yüzey',
    sahneMobilya: 'Sağ tarafta açık ahşap tonlarında minimalist bir konsol, üzerinde seramik bir vazo ve kitaplar yer alıyor',
  },
  'ceviz-laminat': {
    renk: 'koyu ceviz laminat',
    malzeme: 'CPL laminat kaplama',
    kolTipi: 'saten nikel (gümüş rengi) modern kapı kolu ve kare rozet',
    sahneStil: 'sıcak modern, doğal estetik',
    sahneZemin: 'parlak beyaz mermer görünümlü, geniş gri damarlı lüks bir yüzey',
    sahneMobilya: 'Sağ tarafta koyu ahşap tonlarında minimalist bir konsol, üzerinde dekoratif bir vazo ve kitaplar yer alıyor',
  },
};

// ---- ANA İŞLEV ----

async function main() {
  console.log('\n🚪 Kapı Prompt Üreteci');
  console.log('━'.repeat(50));
  
  const fotoDir = '/Users/medisan/Downloads/kapi-fotolari';

  while (true) {
    console.log('\n');
    const foto = await ask('📷 Fotoğraf dosya adı (ör: IMG_6473.DNG, çıkmak için "q"): ');
    if (foto.toLowerCase() === 'q') break;

    console.log('\n📋 Hazır presetler:');
    console.log('  1) beyaz-lake-klasik  - Beyaz lake, klasik taçlı/oymalı');
    console.log('  2) beyaz-lake-modern  - Beyaz lake, modern minimalist');
    console.log('  3) mese-laminat       - Açık meşe, laminat kaplama');
    console.log('  4) ceviz-laminat      - Koyu ceviz, laminat kaplama');
    console.log('  5) özel               - Manuel giriş\n');

    const presetChoice = await ask('Preset seç (1-5): ');
    
    let base = {};
    const presetKeys = Object.keys(presets);
    if (presetChoice >= 1 && presetChoice <= 4) {
      base = { ...presets[presetKeys[presetChoice - 1]] };
    }

    const baslik = await ask('Kapı başlığı (ör: Klasik Taçlı Beyaz Kapı): ');
    
    if (presetChoice === '5') {
      base.renk = await ask('Renk/ton (ör: kar beyazı lake): ');
      base.malzeme = await ask('Malzeme (ör: lake, laminat): ');
      base.kolTipi = await ask('Kol tipi (ör: saten nikel modern kapı kolu ve kare rozet): ');
      base.sahneStil = await ask('Sahne stili (ör: lüks minimalizm, modern-klasik): ');
      base.sahneZemin = await ask('Sahne zemin (ör: parlak beyaz mermer, gri damarlı): ');
      base.sahneMobilya = await ask('Sahne mobilya (ör: Sağ tarafta beyaz dresuar...): ');
    }

    const panelTipi = await ask('Panel tipi (ör: iki büyük göbekli panel, dikey çizgi yok): ');
    const kasaDetay = await ask('Kasa detay (ör: yan dikmeler dairesel oymalı, üst taçlı): ');
    const ozelDetay = await ask('Özel detay/desen (ör: vitray cam, CNC desen, çıta detay): ');

    const kapi = {
      ...base,
      baslik,
      panelTipi,
      kasaDetay,
      panelAciklama: `Kapı paneli, ${panelTipi}. ${ozelDetay ? ozelDetay + '.' : ''}`,
      makroOdak: `Kapı kolunun metalik dokusunu, ${base.renk} yüzeyin detayını ve ${ozelDetay || kasaDetay} işçiliğini vurgulamak.`,
      makroDetay: `Kapının ${base.renk} dokusu ve ${ozelDetay || kasaDetay} detayının temiz işçiliği, yumuşak yan ışıkla belirginleşiyor.`,
      sahneBaslik: `${base.sahneStil?.split(',')[0] || 'Modern'} Antre Konsepti`,
      sahneKapiDetay: `${kasaDetay} mekana zarif bir karakter katıyor${ozelDetay ? '; ' + ozelDetay + ' detayı göz alıcı' : ''}`,
    };

    // Promptları üret
    const p1 = promptDetay(foto, kapi);
    const p2 = promptMakro(foto, kapi);
    const p3 = promptSahne(foto, kapi);

    console.log('\n' + '═'.repeat(60));
    console.log('📋 PROMPT 1 — Tam Panel Görünümü');
    console.log('═'.repeat(60));
    console.log(p1);
    console.log('\n' + '═'.repeat(60));
    console.log('📋 PROMPT 2 — Makro Detay');
    console.log('═'.repeat(60));
    console.log(p2);
    console.log('\n' + '═'.repeat(60));
    console.log('📋 PROMPT 3 — Sahne / Antre');
    console.log('═'.repeat(60));
    console.log(p3);
    console.log('\n' + '═'.repeat(60));

    // Dosyaya da kaydet
    const outFile = `${fotoDir}/${foto.replace('.DNG', '')}_prompts.txt`;
    const content = `${baslik}\nDosya: ${foto}\n${'='.repeat(50)}\n\n--- PROMPT 1: Tam Panel ---\n${p1}\n\n--- PROMPT 2: Makro Detay ---\n${p2}\n\n--- PROMPT 3: Sahne ---\n${p3}\n`;

    fs.writeFileSync(outFile, content, 'utf-8');
    console.log(`\n💾 Promptlar kaydedildi: ${outFile}`);
    console.log('━'.repeat(60));
  }

  rl.close();
  console.log('\n👋 Çıkıldı.\n');
}

main();
