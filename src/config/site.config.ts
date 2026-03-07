export const siteConfig = {
  // Temel Bilgiler
  name: 'KapıArt',
  tagline: 'Evinizin İlk İzlenimi, Kapınızla Başlar',
  description:
    "KapıArt, 20 yılı aşkın tecrübesiyle iç kapı, dış kapı, çelik kapı ve özel tasarım kapılarda Türkiye'nin güvenilir adresidir.",
  url: 'https://kapiart.com.tr',

  // İletişim Bilgileri
  contact: {
    phone: '+90 212 XXX XX XX',
    whatsapp: '+90 532 XXX XX XX',
    email: 'info@kapiart.com.tr',
    address: {
      street: 'Mobilyacılar Sitesi, Kapıcılar Çarşısı No: 28-30',
      city: 'İstanbul',
      district: 'Masko / İkitelli',
      postalCode: '34490',
      country: 'Türkiye',
    },
  },

  // Sosyal Medya
  social: {
    instagram: 'https://instagram.com/kapiart',
    facebook: 'https://facebook.com/kapiart',
    youtube: 'https://youtube.com/@kapiart',
    pinterest: 'https://pinterest.com/kapiart',
    tiktok: 'https://tiktok.com/@kapiart',
  },

  // Çalışma Saatleri
  hours: {
    weekdays: 'Pazartesi - Cuma: 09:00 - 19:00',
    weekend: 'Cumartesi: 09:00 - 18:00',
    sunday: 'Pazar: 10:00 - 16:00',
  },

  // Mağaza Bilgileri
  showroom: {
    title: "Showroom'umuzu Ziyaret Edin",
    description:
      "500 m² showroom alanında 200+ kapı modelini yerinde görebilir, dokunabilir ve karşılaştırabilirsiniz.",
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop',
    features: [
      'Ücretsiz Otopark',
      'Uzman Danışmanlık',
      'Çocuk Oyun Alanı',
      '3D Tasarım Simülasyonu',
    ],
  },

  // Hero Section
  hero: {
    title: 'Hayalinizdeki Kapıyı Bulun',
    subtitle:
      'İç kapı, dış kapı, çelik kapı ve villa kapısı modellerimizle evinize değer katın. 200+ model, ücretsiz ölçü alma ve profesyonel montaj hizmeti.',
    cta: {
      primary: 'Ücretsiz Ölçü Randevusu',
      secondary: 'Ürünlerimizi Keşfedin',
    },
    stats: [
      { value: '20+', label: 'Yıllık Tecrübe' },
      { value: '15000+', label: 'Mutlu Müşteri' },
      { value: '200+', label: 'Kapı Modeli' },
      { value: '%100', label: 'Montaj Garantisi' },
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop',
    ],
  },

  // Hakkımızda
  about: {
    title: 'Hakkımızda',
    subtitle: 'Kalite, Estetik ve Güvenlik',
    description: [
      "KapıArt, 2004 yılından bu yana kapı sektöründe faaliyet gösteren, Türkiye'nin önde gelen kapı mağazalarından biridir. İstanbul Masko'daki 500 m² showroom alanımızda 200'den fazla kapı modelini müşterilerimizle buluşturuyoruz.",
      "Yerli ve ithal markaların yetkili bayisi olarak, çelik kapıdan iç kapıya, villa kapısından cam kapıya kadar geniş bir ürün yelpazesi sunuyoruz. Ücretsiz ölçü alma, profesyonel montaj ve satış sonrası destek ile müşteri memnuniyetini ön planda tutuyoruz.",
    ],
    values: [
      {
        title: 'Kalite',
        description: 'TSE ve CE belgeli, A sınıfı markalarla çalışıyoruz',
      },
      {
        title: 'Estetik',
        description:
          'Modern ve klasik tasarımlarla her tarza uygun çözümler',
      },
      {
        title: 'Güvenlik',
        description:
          'Çelik kapılarda EN 1627 standartlarında güvenlik sınıfı',
      },
      {
        title: 'Güven',
        description: '2 yıl montaj garantisi ve 10 yıl ürün garantisi',
      },
    ],
  },
};

// Ürün ve Hizmet Kategorileri
export const serviceAreas = [
  {
    id: 'celik-kapilar',
    title: 'Çelik Kapılar',
    description:
      'Yüksek güvenlikli, ses ve ısı yalıtımlı çelik kapı modelleri. Kasa, kilit sistemi ve menteşe seçenekleriyle tam koruma.',
    icon: 'Shield',
    image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600&h=400&fit=crop',
    features: [
      'Çok Noktalı Kilit Sistemleri',
      'Ses & Isı Yalıtımı',
      'Parmak İzli / Şifreli Kilit Seçeneği',
      'Farklı Renk ve Desen Kaplama',
    ],
  },
  {
    id: 'ic-kapilar',
    title: 'İç Kapılar (Oda Kapıları)',
    description:
      'Lake, laminat, membran ve masif iç kapı modelleri. Her odaya uygun renk, desen ve boyut seçenekleri.',
    icon: 'DoorOpen',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop',
    features: [
      'Lake Kapılar (Parlak/Mat)',
      'Laminat Kaplama Kapılar',
      'PVC Membran Kapılar',
      'Camlı / Panjurlu Modeller',
    ],
  },
  {
    id: 'villa-kapilari',
    title: 'Villa Kapıları',
    description:
      'Prestijli ve şık villa giriş kapıları. Ahşap, alüminyum ve kompozit malzemelerle özel üretim.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    features: [
      'Masif Ahşap Villa Kapıları',
      'Alüminyum Kompozit Kapılar',
      'Özel Tasarım & Ölçü',
      'Yüksek Güvenlik Kilit Sistemi',
    ],
  },
  {
    id: 'amerikan-panel-kapilar',
    title: 'Amerikan Panel Kapılar',
    description:
      'Ekonomik ve dayanıklı amerikan panel kapı çeşitleri. Kolay montaj ve uzun ömürlü kullanım.',
    icon: 'LayoutGrid',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop',
    features: [
      'HDF / MDF Panel Kapılar',
      'Boyalı & Kaplamalı Seçenekler',
      'Standart ve Özel Ölçüler',
      'Hızlı Montaj İmkânı',
    ],
  },
  {
    id: 'cam-kapilar',
    title: 'Cam Kapılar & Sürgülü Sistemler',
    description:
      'Temperli cam kapılar, sürgülü cam kapı sistemleri ve cam bölme duvar çözümleri.',
    icon: 'Maximize',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop',
    features: [
      'Temperli Cam Kapılar',
      'Sürgülü Cam Kapı Sistemleri',
      'Duşakabin Kapıları',
      'Ofis Cam Bölme Sistemleri',
    ],
  },
  {
    id: 'yangin-kapilari',
    title: 'Yangın Kapıları',
    description:
      'Yangın yönetmeliğine uygun, sertifikalı yangın kapıları. 60-120 dakika yangın dayanımı.',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&h=400&fit=crop',
    features: [
      '60 / 90 / 120 Dakika Yangın Dayanımı',
      'CE & TSE Belgeli',
      'Panik Bar Donanımlı',
      'Otomatik Kapanma Mekanizması',
    ],
  },
  {
    id: 'kapi-montaj-hizmeti',
    title: 'Kapı Montaj Hizmeti',
    description:
      'Uzman ekibimizle profesyonel kapı montajı. Ücretsiz ölçü alma, söküm ve montaj hizmeti.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
    features: [
      'Ücretsiz Adrese Ölçü Alma',
      'Eski Kapı Sökümü',
      'Profesyonel Montaj',
      '2 Yıl Montaj Garantisi',
    ],
  },
  {
    id: 'kapi-aksesuarlari',
    title: 'Kapı Aksesuarları & Kilitler',
    description:
      'Kapı kolu, kilit sistemi, menteşe, eşik, pervaz ve dekoratif aksesuar çeşitleri.',
    icon: 'Key',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop',
    features: [
      'Akıllı Kilit Sistemleri',
      'Dekoratif Kapı Kolları',
      'Gizli Menteşe Sistemleri',
      'Pervaz & Eşik Profilleri',
    ],
  },
];

// Ekip Üyeleri
export const teamMembers = [
  {
    id: 1,
    name: 'Hakan ARSLAN',
    title: 'Kurucu & Genel Müdür',
    specialization: 'Kapı Sektörü, İş Geliştirme',
    bio: "20 yılı aşkın kapı sektörü deneyimiyle KapıArt'ı sektörün öncü markalarından biri haline getirmiştir.",
    education: 'İstanbul Üniversitesi İşletme',
    certifications: [
      'Mobilya Sektörü Yönetici Belgesi',
      'TSE Kalite Yönetimi',
    ],
    email: 'hakan.arslan@kapiart.com.tr',
    phone: '+90 212 XXX XX 01',
    image: '/images/team/hakan-arslan.jpg',
  },
  {
    id: 2,
    name: 'Zeynep YILDIZ',
    title: 'İç Mimar & Tasarım Danışmanı',
    specialization: 'İç Mekan Tasarımı, Kapı Seçimi Danışmanlığı',
    bio: 'Müşterilerimize evin dekorasyonuna uygun kapı seçiminde profesyonel danışmanlık sunuyor, 3D görselleştirme ile sonucu önceden gösteriyoruz.',
    education: 'Mimar Sinan Güzel Sanatlar Üniversitesi İç Mimarlık',
    certifications: [
      'İç Mimarlık Lisansı',
      'AutoCAD & 3ds Max Sertifikası',
    ],
    email: 'zeynep.yildiz@kapiart.com.tr',
    phone: '+90 212 XXX XX 02',
    image: '/images/team/zeynep-yildiz.jpg',
  },
  {
    id: 3,
    name: 'Ali KURT',
    title: 'Teknik Müdür & Montaj Şefi',
    specialization: 'Kapı Montajı, Teknik Uygulama',
    bio: "15 yıllık teknik deneyimle 10.000'den fazla kapı montajı gerçekleştirmiş, montaj ekibimizin başında yer almaktadır.",
    education: 'Sakarya Üniversitesi Makine Mühendisliği',
    certifications: [
      'İSG Belgesi',
      'Ahşap Teknolojisi Uzmanlık Sertifikası',
    ],
    email: 'ali.kurt@kapiart.com.tr',
    phone: '+90 212 XXX XX 03',
    image: '/images/team/ali-kurt.jpg',
  },
];

// Müşteri Yorumları
export const testimonials = [
  {
    id: 1,
    name: 'Fatma Y.',
    role: 'Ev Sahibi - Bahçeşehir',
    content:
      "Evimizdeki tüm kapıları KapıArt'tan aldık. Showroom'da modelleri görmek çok kolaylaştırdı seçimi. Montaj ekibi son derece titiz çalıştı, tek bir çizik bile yok. Kesinlikle tavsiye ediyorum.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Burak S.',
    role: 'Müteahhit - BS İnşaat',
    content:
      'Toplu konut projelerimizde 3 yıldır KapıArt ile çalışıyoruz. Fiyat/kalite dengesi mükemmel. Zamanında teslimat ve sorunsuz montaj ile projelerimizi aksatmıyor.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Selin K.',
    role: 'İç Mimar',
    content:
      "Müşterilerime hep KapıArt'ı öneriyorum. Model çeşitliliği çok geniş, özel ölçü ve renk talepleri hızlıca karşılanıyor. Zeynep Hanım'ın tasarım danışmanlığı da ayrı bir artı.",
    rating: 5,
  },
  {
    id: 4,
    name: 'Mehmet A.',
    role: 'Villa Sahibi - Sapanca',
    content:
      'Villa giriş kapımızı özel tasarım olarak yaptırdık. Masif ceviz kapı hayal ettiğimizden bile güzel oldu. Misafirlerimiz kapıyı görünce hayran kalıyor.',
    rating: 5,
  },
];

// Sıkça Sorulan Sorular
export const faqs = [
  {
    question: 'Kapı ölçümü için ücret alıyor musunuz?',
    answer:
      "Hayır, İstanbul Avrupa ve Anadolu yakasında ücretsiz adrese ölçü alma hizmetimiz bulunmaktadır. Uzman ekibimiz evinize gelerek hassas ölçüm yapar ve size en uygun kapı modellerini önerir. Randevu için bizi arayabilir veya WhatsApp'tan ulaşabilirsiniz.",
  },
  {
    question: 'Kapı montajı ne kadar sürer?',
    answer:
      'Tek bir kapı montajı ortalama 1-2 saat sürer. Tüm ev kapı değişimi (4-6 kapı) genellikle bir günde tamamlanır. Çelik kapı montajı biraz daha uzun sürebilir. Montaj öncesinde tam süreyi belirleyip size bilgi veririz.',
  },
  {
    question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    answer:
      'Nakit, kredi kartı (tek çekim ve taksitli), havale/EFT kabul ediyoruz. 12 aya kadar taksit seçeneklerimiz mevcuttur. Ayrıca toplu alımlarda özel iskonto uyguluyoruz.',
  },
  {
    question: 'Kapılarda garanti süresi ne kadar?',
    answer:
      'Tüm kapılarımızda 2 yıl montaj garantisi ve markaya göre 5-10 yıl ürün garantisi sunuyoruz. Garanti kapsamında oluşan arıza ve sorunlar ücretsiz giderilir. Çelik kapılarda kilit sistemi ayrıca garanti altındadır.',
  },
  {
    question: 'Eski kapılarımızı söküp yeni kapı takabilir misiniz?',
    answer:
      'Evet, eski kapı sökümü hizmetimiz montaj fiyatına dahildir. Eski kapılarınızı söküp, gerekli kasa düzenlemelerini yapıp yeni kapınızı monte ediyoruz. Sökülen kapıların bertarafı da tarafımızca yapılır.',
  },
  {
    question: 'Showroom\'a gitmeden online sipariş verebilir miyim?',
    answer:
      'Web sitemizden ve WhatsApp hattımızdan model seçimi yapabilirsiniz. Ancak renk ve dokuyu yerinde görmeniz için showroom ziyaretini öneriyoruz. Şehir dışı müşterilerimize video görüşme ve detaylı fotoğraf/video gönderimi ile destek sağlıyoruz.',
  },
  {
    question: 'Özel ölçülerde kapı yapabiliyor musunuz?',
    answer:
      'Evet, standart dışı (özel) ölçülerde kapı üretimi yapabiliyoruz. Yüksek tavanlar, geniş açıklıklar veya özel mimari detaylar için ölçüye göre üretim gerçekleştiriyoruz. Özel ölçü siparişleri genellikle 10-15 iş gününde teslim edilir.',
  },
];

// Öne Çıkan Ürünler
export const featuredProducts = [
  {
    id: 1,
    name: 'Premium Çelik Kapı Serisi',
    category: 'Çelik Kapılar',
    image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=500&h=600&fit=crop',
    badge: 'En Çok Satan',
    features: ['Çift Kilitli', '4mm Sac', 'Ses Yalıtımlı'],
    slug: 'celik-kapilar',
  },
  {
    id: 2,
    name: 'Lake İç Kapı Koleksiyonu',
    category: 'İç Kapılar',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&h=600&fit=crop',
    badge: 'Yeni',
    features: ['Mat/Parlak', 'Gizli Menteşe', '12 Renk'],
    slug: 'ic-kapilar',
  },
  {
    id: 3,
    name: 'Masif Villa Kapısı',
    category: 'Villa Kapıları',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=600&fit=crop',
    badge: 'Premium',
    features: ['Doğal Ahşap', 'Özel Tasarım', 'Yüksek Güvenlik'],
    slug: 'villa-kapilari',
  },
  {
    id: 4,
    name: 'Sürgülü Cam Kapı Sistemi',
    category: 'Cam Kapılar',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&h=600&fit=crop',
    badge: 'Modern',
    features: ['Temperli Cam', 'Raylı Sistem', 'Minimalist'],
    slug: 'cam-kapilar',
  },
  {
    id: 5,
    name: 'Amerikan Panel Klasik',
    category: 'Amerikan Panel',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=600&fit=crop',
    badge: 'Ekonomik',
    features: ['MDF Panel', 'Kolay Montaj', '8 Model'],
    slug: 'amerikan-panel-kapilar',
  },
  {
    id: 6,
    name: 'Akıllı Kilit Seti',
    category: 'Aksesuarlar',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=600&fit=crop',
    badge: 'Teknoloji',
    features: ['Parmak İzi', 'Şifre', 'Uzaktan Kontrol'],
    slug: 'kapi-aksesuarlari',
  },
];

// SEO Metadata
export const siteMetadata = {
  title:
    "KapıArt | Çelik Kapı, İç Kapı, Villa Kapısı - İstanbul Kapı Mağazası",
  description:
    "İstanbul'un en geniş kapı showroom'u. Çelik kapı, iç kapı, villa kapısı, amerikan panel kapı modelleri. Ücretsiz ölçü alma ve profesyonel montaj. 200+ model.",
  keywords:
    'kapı mağazası, çelik kapı, iç kapı, oda kapısı, villa kapısı, amerikan panel kapı, kapı montajı, istanbul kapı, kapı modelleri, kapı fiyatları, lake kapı, laminat kapı',
  author: 'KapıArt',
  ogImage: '/images/og-image.jpg',
};

// Navigation
export const navigation = [
  { name: 'Ana Sayfa', section: 'hero', page: '/' },
  { name: 'Hakkımızda', section: 'about', page: '/about' },
  { name: 'Ürünlerimiz', section: 'products', page: '/products' },
  { name: 'Hizmetlerimiz', section: 'services', page: '/services' },
  { name: 'Galeri', section: 'gallery', page: '/gallery' },
  { name: 'Ekibimiz', section: 'team', page: '/team' },
  { name: 'Blog', section: 'blog', page: '/blog' },
  { name: 'İletişim', section: 'contact', page: '/contact' },
];
