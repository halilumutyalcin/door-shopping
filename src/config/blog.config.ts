export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  featured: boolean;
  image: string;
}

export const blogCategories = [
  'Tümü',
  'Çelik Kapılar',
  'İç Kapılar',
  'Villa Kapıları',
  'Montaj & Bakım',
  'Dekorasyon',
  'Güvenlik',
];

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: 'Çelik Kapı Seçerken Dikkat Edilmesi Gereken 7 Kriter',
    slug: 'celik-kapi-secerken-dikkat-edilmesi-gereken-7-kriter',
    excerpt:
      'Çelik kapı alırken güvenlik sınıfından kilit sistemine, ses yalıtımından kaplama kalitesine kadar dikkat etmeniz gereken kritik noktalar.',
    content: `
## Çelik Kapı Seçiminde Önemli Kriterler

Evinizin güvenliği söz konusu olduğunda çelik kapı seçimi büyük önem taşır. Doğru çelik kapıyı seçmek için aşağıdaki kriterleri mutlaka değerlendirin.

### 1. Güvenlik Sınıfı

Çelik kapılarda EN 1627 standardına göre **RC1'den RC6'ya** kadar güvenlik sınıfları bulunur. Konut kullanımı için en az **RC2** sınıfı önerilir. Bu sınıf, basit el aletleriyle 3 dakika boyunca zorlamaya dayanıklılık anlamına gelir.

### 2. Kilit Sistemi

Çok noktalı kilit sistemleri, tek noktalı kilitlere göre çok daha güvenlidir. En az **3 noktalı** kilit sistemi tercih edin. Parmak izi, şifre veya kartlı giriş gibi **akıllı kilit** seçenekleri de güvenliği artırır.

### 3. Sac Kalınlığı

Çelik kapının sac kalınlığı dayanıklılığı doğrudan etkiler. **1.2mm - 1.5mm** arası sac kalınlığı konut kullanımı için idealdir. Bazı premium modellerde 2mm'ye kadar çıkabilir.

### 4. Ses Yalıtımı

Apartman dairelerinde ses yalıtımı büyük önem taşır. İyi bir çelik kapı **42-45 dB** ses yalıtımı sağlamalıdır. İç dolguda taş yünü veya poliüretan kullanımı ses yalıtımını artırır.

### 5. Isı Yalıtımı

Özellikle dış kapılarda ısı yalıtımı enerji tasarrufu sağlar. Termal köprü kesicili modeller, kapı çevresinden ısı kaybını önler.

### 6. Kaplama ve Tasarım

Çelik kapılar artık sadece güvenlik değil, estetik de sunuyor. **Ahşap kaplama, lake, membran** ve **çelik panel** seçenekleri mevcuttur. Evinizin genel dekorasyonuyla uyumlu bir tasarım seçin.

### 7. Garanti ve Servis

Güvenilir markalar **5-10 yıl** ürün garantisi sunar. Satış sonrası servis ağının geniş olması, olası sorunlarda hızlı çözüm sağlar.

> **İpucu:** Çelik kapı alırken mutlaka TSE ve CE belgelerini kontrol edin. Showroom'da kapıyı yerinde görüp, kilit mekanizmasını test etmenizi öneririz.
    `,
    author: 'Hakan Arslan',
    authorImage: '/images/team/hakan-arslan.jpg',
    category: 'Çelik Kapılar',
    tags: ['çelik kapı', 'güvenlik', 'kilit sistemi', 'kapı seçimi'],
    publishDate: '2025-12-15',
    readTime: '6 dk',
    featured: true,
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'İç Kapı Modelleri: Lake mı, Laminat mı, Membran mı?',
    slug: 'ic-kapi-modelleri-lake-laminat-membran',
    excerpt:
      'İç kapı seçiminde en çok karşılaşılan soru: Hangi kaplama türü sizin için en uygun? Lake, laminat ve membran kapıların avantaj ve dezavantajları.',
    content: `
## İç Kapılarda Kaplama Türleri

İç kapı seçimi yaparken kaplama türü hem estetiği hem de dayanıklılığı belirler. En popüler üç kaplama türünü karşılaştıralım.

### Lake Kapılar

Lake kapılar, **parlak veya mat** yüzey seçenekleriyle modern ve şık bir görünüm sunar.

**Avantajları:**
- Geniş renk yelpazesi
- Şık ve modern görünüm
- Kolay temizlik

**Dezavantajları:**
- Çizilmeye karşı hassas
- Diğer seçeneklere göre daha pahalı
- Nem ve sıcaklık değişimlerinden etkilenebilir

### Laminat Kapılar

Laminat kapılar, **dayanıklılık ve fiyat** dengesiyle en çok tercih edilen modellerdir.

**Avantajları:**
- Yüksek dayanıklılık (çizilme, darbe)
- Uygun fiyat
- Ahşap görünüm seçenekleri
- Neme dayanıklı

**Dezavantajları:**
- Renk seçenekleri lake kadar geniş değil
- Onarımı zor

### Membran (PVC) Kapılar

Membran kapılar, MDF üzerine **PVC film** ile kaplanarak üretilir.

**Avantajları:**
- Kabartma desen seçenekleri
- Orta segment fiyat
- Boyama gerektirmez

**Dezavantajları:**
- Yüksek sıcaklıkta PVC film kabartma yapabilir
- Lake kadar şık görünmeyebilir

### Hangisini Seçmeliyim?

| Özellik | Lake | Laminat | Membran |
|---------|------|---------|---------|
| Dayanıklılık | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Estetik | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Fiyat | $$$ | $ | $$ |
| Bakım | Hassas | Kolay | Orta |

> **Tavsiyemiz:** Yaşam alanları için lake, çocuk odaları ve yoğun kullanım alanları için laminat, bütçe dostu estetik çözüm için membran tercih edin.
    `,
    author: 'Zeynep Yıldız',
    authorImage: '/images/team/zeynep-yildiz.jpg',
    category: 'İç Kapılar',
    tags: ['iç kapı', 'lake kapı', 'laminat kapı', 'membran kapı'],
    publishDate: '2025-11-28',
    readTime: '5 dk',
    featured: true,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    title: 'Villa Kapısı Seçiminde Malzeme ve Tasarım Rehberi',
    slug: 'villa-kapisi-seciminde-malzeme-ve-tasarim-rehberi',
    excerpt:
      'Villa giriş kapınız evinizin vitrinidir. Masif ahşap, alüminyum veya kompozit? Doğru malzeme ve tasarım seçimi için kapsamlı rehber.',
    content: `
## Villa Kapısı: Evinizin Vitrini

Villa kapısı, evinizin ilk izlenimini oluşturur. Doğru malzeme ve tasarım seçimi hem estetik hem de güvenlik açısından kritik öneme sahiptir.

### Malzeme Seçenekleri

#### Masif Ahşap Villa Kapıları

Masif ahşap kapılar, doğal sıcaklığı ve prestijli görünümüyle en çok tercih edilen villa kapısı türüdür.

- **Meşe:** Dayanıklı, gözenekli yapısıyla klasik bir görünüm
- **Ceviz:** Koyu tonlarıyla şık ve zarif
- **İroko:** Dış koşullara karşı en dayanıklı ahşap türlerinden

#### Alüminyum Villa Kapıları

Modern ve minimal tasarım sevenler için ideal. Alüminyum kapılar hafif, dayanıklı ve bakım gerektirmez.

#### Kompozit Villa Kapıları

Ahşap görünümünü alüminyumun dayanıklılığıyla birleştiren kompozit kapılar, son yılların trendi.

### Tasarım Trendleri 2026

1. **Pivot Kapılar:** Büyük ve etkileyici giriş kapıları
2. **Cam Detaylı Kapılar:** Doğal ışık alan cam panelli modeller
3. **Minimal Çizgiler:** Sade ve modern tasarımlar
4. **Gizli Menteşe:** Temiz bir görünüm için gizli menteşe sistemleri

### Güvenlik Özellikleri

Villa kapılarında güvenlik asla ihmal edilmemelidir:
- Çok noktalı kilit sistemi
- Zırhlı çelik iç yapı
- Akıllı kilit entegrasyonu
- Güvenlik kamerası uyumlu kapı göbeği

> **Profesyonel İpucu:** Villa kapısı seçerken kapının yönüne (güneş, rüzgar) ve iklim koşullarına dikkat edin. Güney cepheli kapılarda UV dayanımlı kaplama tercih edin.
    `,
    author: 'Hakan Arslan',
    authorImage: '/images/team/hakan-arslan.jpg',
    category: 'Villa Kapıları',
    tags: ['villa kapısı', 'masif ahşap', 'alüminyum kapı', 'tasarım'],
    publishDate: '2025-11-10',
    readTime: '7 dk',
    featured: false,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
  },
  {
    id: 4,
    title: 'Kapıda Ses Yalıtımı: Neden Önemli ve Nasıl Sağlanır?',
    slug: 'kapida-ses-yalitimi-neden-onemli-nasil-saglanir',
    excerpt:
      'Ev konforunuzun sessiz kahramanı: Kapı ses yalıtımı. Gürültüyü azaltmanın yolları ve doğru kapı seçimi.',
    content: `
## Sessizliğin Değeri: Kapı Ses Yalıtımı

Günümüzde şehir gürültüsü ve komşu sesleri ev konforunu ciddi şekilde etkiliyor. İyi bir kapı ses yalıtımı, yaşam kalitenizi önemli ölçüde artırır.

### Ses Yalıtımı Neden Önemli?

- **Uyku kalitesi:** Gece gürültüsünü engelleyerek daha iyi uyku
- **Çalışma ortamı:** Evden çalışanlar için sessiz ortam
- **Mahremiyet:** Oda arası ses geçişini önleme
- **Enerji tasarrufu:** Ses yalıtımlı kapılar genellikle ısı yalıtımı da sağlar

### Ses Yalıtım Değerleri (dB)

| Kapı Türü | Ses Yalıtımı |
|-----------|-------------|
| Standart iç kapı | 20-25 dB |
| Kaliteli iç kapı | 28-32 dB |
| Çelik kapı (standart) | 35-38 dB |
| Çelik kapı (yalıtımlı) | 42-48 dB |
| Akustik kapı | 45-55 dB |

### Ses Yalıtımını Artırma Yöntemleri

1. **Conta sistemi:** Kapı kasası etrafında sürekli conta, ses sızıntısını önler
2. **Eşik contası:** Kapı altından ses geçişini engelleyen otomatik eşik contası
3. **İç dolgu:** Taş yünü veya poliüretan dolgular ses emilimini artırır
4. **Çift cidarlı yapı:** İki kat sac arası dolgu ile maksimum yalıtım
5. **Kapı kalınlığı:** 48mm ve üzeri kapılar daha iyi yalıtım sağlar

### Doğru Kapı Seçimi

Ses yalıtımı önceliğinizse:
- **Yatak odası:** En az 30 dB yalıtım
- **Çalışma odası:** En az 35 dB yalıtım
- **Giriş kapısı:** En az 40 dB yalıtım

> **Biliyor musunuz?** İyi bir ses yalıtımı için sadece kapı değil, kapı kasası ve montaj kalitesi de kritik öneme sahiptir. Profesyonel montaj, ses yalıtımını %40'a kadar artırabilir.
    `,
    author: 'Ali Kurt',
    authorImage: '/images/team/ali-kurt.jpg',
    category: 'Montaj & Bakım',
    tags: ['ses yalıtımı', 'akustik', 'kapı yalıtımı', 'konfor'],
    publishDate: '2025-10-22',
    readTime: '5 dk',
    featured: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
  },
  {
    id: 5,
    title:
      'Akıllı Kilit Sistemleri: Parmak İzi, Şifre ve Kartlı Giriş Karşılaştırması',
    slug: 'akilli-kilit-sistemleri-karsilastirmasi',
    excerpt:
      'Geleneksel anahtarlardan akıllı kilitlere geçiş. Parmak izi, şifre, kart ve uzaktan kontrollü kilit sistemlerinin detaylı karşılaştırması.',
    content: `
## Akıllı Kilit Sistemleri Rehberi

Teknolojinin gelişmesiyle birlikte kapı kilit sistemleri de evrim geçirdi. Artık anahtarsız giriş seçenekleri güvenli ve pratik çözümler sunuyor.

### Akıllı Kilit Türleri

#### 1. Parmak İzi Okuyuculu Kilitler

En popüler akıllı kilit türü olan parmak izi okuyucular, biyometrik güvenlik sağlar.

**Artıları:**
- Kopyalanamaz güvenlik
- Hızlı erişim (1 saniyeden kısa)
- Birden fazla parmak izi kaydı
- Anahtar taşıma derdi yok

**Eksileri:**
- Islak veya kirli parmakta zaman zaman sorun
- Elektrik kesintisinde yedek anahtar gerekli

#### 2. Şifreli Kilitler

Tuş takımlı şifreli kilitler, pratik ve ekonomik bir çözüm sunar.

**Artıları:**
- Kolay kullanım
- Şifre değiştirme kolaylığı
- Misafir şifresi tanımlama
- Uygun fiyat

**Eksileri:**
- Şifre unutma riski
- Tuş aşınmasından şifre tahmini riski

#### 3. Kartlı / NFC Kilitler

Otel tipi kart sistemi veya NFC teknolojisi kullanan kilitler.

**Artıları:**
- Hızlı giriş
- Telefon ile NFC giriş imkanı
- Giriş kaydı tutma

**Eksileri:**
- Kart kaybetme riski
- Ek kart maliyeti

#### 4. Wi-Fi / Bluetooth Uzaktan Kontrol

Akıllı telefon uygulaması ile kontrol edilen kilitler.

**Artıları:**
- Dünyanın her yerinden kontrol
- Misafir erişimi tanımlama
- Giriş-çıkış bildirimleri
- Diğer akıllı ev sistemleriyle entegrasyon

**Eksileri:**
- İnternet bağlantısına bağımlılık
- Siber güvenlik riskleri

### Karşılaştırma Tablosu

| Özellik | Parmak İzi | Şifre | Kart | Wi-Fi |
|---------|-----------|-------|------|-------|
| Güvenlik | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Pratiklik | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Fiyat | $$$ | $ | $$ | $$$$ |
| Bakım | Düşük | Düşük | Düşük | Orta |

> **Uzman Tavsiyesi:** En güvenli çözüm, birden fazla giriş yöntemini birleştiren **çoklu doğrulama** (multi-factor) kilit sistemleridir. Parmak izi + şifre kombinasyonu ideal bir seçenektir.
    `,
    author: 'Hakan Arslan',
    authorImage: '/images/team/hakan-arslan.jpg',
    category: 'Güvenlik',
    tags: ['akıllı kilit', 'parmak izi', 'güvenlik', 'teknoloji'],
    publishDate: '2025-10-05',
    readTime: '8 dk',
    featured: true,
    image: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=500&fit=crop',
  },
  {
    id: 6,
    title: 'Apartman Çelik Kapı Değişimi: Bilmeniz Gereken Her Şey',
    slug: 'apartman-celik-kapi-degisimi',
    excerpt:
      'Apartman dairenizde çelik kapı değiştirmek istiyorsunuz ama nereden başlayacağınızı bilmiyor musunuz? İşte adım adım rehber.',
    content: `
## Apartman Çelik Kapı Değişimi Rehberi

Apartmanda çelik kapı değişimi, bazı özel dikkat gerektiren bir süreçtir. Bu rehberde sürecin her aşamasını ele alıyoruz.

### Değişim Öncesi Kontrol Listesi

1. **Apartman yönetimi izni:** Bazı sitelerde dış görünüm değişikliği için yönetim onayı gerekebilir
2. **Kapı ölçüleri:** Mevcut kasa ölçülerinin doğru alınması
3. **Açılma yönü:** Kapının açılma yönünün korunması (yangın yönetmeliği)
4. **Bina yapısı:** Duvar kalınlığı ve malzemesinin belirlenmesi

### Süreç Nasıl İşler?

**Adım 1 - Ücretsiz Keşif**
Uzman ekibimiz adresinize gelerek mevcut kapının ölçülerini alır, duvar yapısını inceler.

**Adım 2 - Model Seçimi**
Showroom'da veya katalogdan kapı modelinizi seçersiniz. Renk, kaplama ve kilit sistemi belirlenir.

**Adım 3 - Üretim/Temin**
Seçtiğiniz model stokta varsa hemen, özel üretimse 7-10 iş gününde hazırlanır.

**Adım 4 - Montaj**
- Eski kapının sökülmesi (30 dk)
- Kasa ayarları ve montaj (1-2 saat)
- Kilit sistemi kurulumu
- Temizlik ve teslim

### Sık Yapılan Hatalar

- ❌ Ölçü almadan kapı sipariş etmek
- ❌ En ucuz seçeneği tercih etmek
- ❌ Montajı deneyimsiz kişilere yaptırmak
- ❌ Yangın yönetmeliğini göz ardı etmek

### Maliyet Faktörleri

Çelik kapı değişim maliyetini etkileyen faktörler:
- Kapı markası ve modeli
- Kilit sistemi türü
- Kaplama malzemesi
- Ek özellikler (parmak izi, kamera)
- Eski kapı sökümü

> **Bilgi:** Apartmanlarda kapı açılma yönü, yangın yönetmeliğine göre **kaçış yönünde** olmalıdır. Bu genellikle dışa açılma anlamına gelir. Değişim sırasında bu kurala uyulmalıdır.
    `,
    author: 'Ali Kurt',
    authorImage: '/images/team/ali-kurt.jpg',
    category: 'Çelik Kapılar',
    tags: ['apartman', 'çelik kapı değişimi', 'montaj', 'rehber'],
    publishDate: '2025-09-18',
    readTime: '6 dk',
    featured: false,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop',
  },
  {
    id: 7,
    title:
      'Kapı Bakımı ve Temizliği: Ahşap, Lake ve Çelik Kapılar İçin İpuçları',
    slug: 'kapi-bakimi-ve-temizligi-ipuclari',
    excerpt:
      'Kapılarınızın ömrünü uzatmak ve yeni görünümünü korumak için doğru bakım ve temizlik yöntemleri.',
    content: `
## Kapı Bakım ve Temizlik Rehberi

Doğru bakım, kapılarınızın ömrünü yıllar boyunca uzatır. Her kapı türü farklı bakım gerektirir.

### Ahşap Kapı Bakımı

Ahşap kapılar, doğal güzellikleriyle ön plana çıkar ancak düzenli bakım gerektirir.

**Günlük Bakım:**
- Yumuşak, nemli bezle silme
- Kimyasal temizleyicilerden kaçınma
- Mikro fiber bez kullanımı

**Periyodik Bakım (6 ayda bir):**
- Ahşap bakım yağı uygulama
- Menteşe yağlama
- Çizik kontrolü ve rötuş
- Su sızdırmazlık kontrolü (dış kapılar)

### Lake Kapı Bakımı

Lake kapılar parlak ve şık görünümlerini korumak için özel ilgi ister.

**Temizlik:**
- Sadece yumuşak bez kullanın
- Mikro fiber bez + ılık su
- Asla aşındırıcı temizleyici kullanmayın
- Cam temizleyicilerden kaçının

**Koruma:**
- Doğrudan güneş ışığından koruyun
- Sert cisim darbesinden kaçının
- Kapı kolu kullanımına dikkat edin

### Çelik Kapı Bakımı

Çelik kapılar dayanıklıdır ancak bakımsız kalmamalıdır.

**Temizlik:**
- Nemli bez ile düzenli silme
- Kuru bezle kurutma (su lekesi önleme)
- Kilit mekanizmasına yılda 2 kez yağ

**Bakım:**
- Conta kontrolü (ses yalıtımı)
- Menteşe yağlama (6 ayda bir)
- Boya çiziklerinde hızlı rötuş
- Kilit silindir bakımı

### Mevsimsel Bakım Takvimi

| Mevsim | Yapılacaklar |
|--------|-------------|
| İlkbahar | Genel temizlik, conta kontrolü |
| Yaz | UV koruma (ahşap), havalandırma |
| Sonbahar | Yalıtım kontrolü, menteşe yağlama |
| Kış | Nem kontrolü, kilit bakımı |

> **Pratik İpucu:** Kapı menteşelerinde gıcırdama olduğunda vazelinli bir bezle silin. Kilit mekanizmasına ise sadece **grafit tozlu** yağlayıcı kullanın; sıvı yağ toz toplayarak kilidi zamanla bozabilir.
    `,
    author: 'Ali Kurt',
    authorImage: '/images/team/ali-kurt.jpg',
    category: 'Montaj & Bakım',
    tags: ['kapı bakımı', 'temizlik', 'ahşap bakım', 'lake bakım'],
    publishDate: '2025-09-01',
    readTime: '5 dk',
    featured: false,
    image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&h=500&fit=crop',
  },
];
