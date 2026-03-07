// src/config/products.config.ts

export interface ProductImage {
  src: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  priceRange: {
    min: number;
    max: number;
    currency: 'TL';
    note?: string;
  };
  specs: {
    material: string;
    width: string;
    height: string;
    thickness: string;
    lockSystem: string;
    insulation: string;
    color: string[];
    warranty: string;
    fireRating?: string;
    securityClass?: string;
  };
  features: string[];
  badge?: 'Yeni' | 'Popüler' | 'Çok Satan' | 'Kampanyalı' | 'Sınırlı Stok';
  isNew?: boolean;
  isFeatured?: boolean;
  relatedProducts?: string[];
}

export const productCategories = [
  {
    id: 'celik-kapilar',
    title: 'Çelik Kapılar',
    description: 'Yüksek güvenlikli, ses ve ısı yalıtımlı çelik kapı modelleri.',
    icon: 'Shield',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=600&fit=crop',
    productCount: 24,
  },
  {
    id: 'ic-kapilar',
    title: 'İç Kapılar (Oda Kapıları)',
    description: 'Lake, laminat, membran ve masif iç kapı modelleri.',
    icon: 'DoorOpen',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=600&fit=crop',
    productCount: 48,
  },
  {
    id: 'villa-kapilari',
    title: 'Villa Kapıları',
    description: 'Prestijli ve şık villa giriş kapıları.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop',
    productCount: 16,
  },
  {
    id: 'amerikan-panel-kapilar',
    title: 'Amerikan Panel Kapılar',
    description: 'Ekonomik ve dayanıklı amerikan panel kapı çeşitleri.',
    icon: 'LayoutGrid',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=600&fit=crop',
    productCount: 20,
  },
  {
    id: 'cam-kapilar',
    title: 'Cam Kapılar & Sürgülü Sistemler',
    description: 'Temperli cam kapılar ve sürgülü sistemler.',
    icon: 'Maximize',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=600&fit=crop',
    productCount: 12,
  },
  {
    id: 'yangin-kapilari',
    title: 'Yangın Kapıları',
    description: 'Sertifikalı yangın kapıları. 60-120 dk yangın dayanımı.',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=600&fit=crop',
    productCount: 8,
  },
];

export const compareColumns = [
  { key: 'material', label: 'Malzeme' },
  { key: 'width', label: 'Genişlik' },
  { key: 'height', label: 'Yükseklik' },
  { key: 'thickness', label: 'Kalınlık' },
  { key: 'lockSystem', label: 'Kilit Sistemi' },
  { key: 'insulation', label: 'Yalıtım' },
  { key: 'color', label: 'Renk Seçenekleri' },
  { key: 'warranty', label: 'Garanti' },
  { key: 'fireRating', label: 'Yangın Dayanımı' },
  { key: 'securityClass', label: 'Güvenlik Sınıfı' },
];

export const products: Product[] = [
  // --- ÇELİK KAPILAR ---
  {
    id: 'celik-001',
    slug: 'guardian-elite-celik-kapi',
    name: 'Guardian Elite Çelik Kapı',
    category: 'celik-kapilar',
    brand: 'KaleKilit',
    shortDescription: 'Çok noktalı kilit sistemi, çift çelik levha, yüksek ses ve ısı yalıtımı.',
    description: `Guardian Elite, KaleKilit'in en üst segment çelik kapı serisidir. Çift katmanlı çelik levha yapısı, 7 noktalı kilit sistemi ve taş yünü yalıtım ile evinize maksimum güvenlik ve konfor sağlar.

## Öne Çıkan Özellikler
- EN 1627 RC3 sınıfı güvenlik
- 42 dB ses yalıtımı
- Parmak izi + şifre kilit seçeneği
- 14 farklı dış kaplama seçeneği`,
    images: [
      { src: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=1000&fit=crop', alt: 'Guardian Elite Çelik Kapı - Ön Görünüm', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&h=900&fit=crop', alt: 'Guardian Elite Çelik Kapı - Açık Durum' },
      { src: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=600&h=600&fit=crop&crop=bottom', alt: 'Guardian Elite - Kilit Detayı' },
      { src: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&h=900&fit=crop&crop=top', alt: 'Guardian Elite - İç Yüz Görünüm' },
    ],
    priceRange: { min: 18000, max: 28000, currency: 'TL', note: 'Montaj dahil fiyat' },
    specs: {
      material: 'Çift Katmanlı Çelik (1.2mm + 0.8mm)',
      width: '90 cm / 100 cm',
      height: '200 cm / 210 cm',
      thickness: '90 mm',
      lockSystem: '7 Noktalı Çelik Kilit (KaleKilit)',
      insulation: 'Taş Yünü - 42 dB Ses / 1.8 W/m²K Isı',
      color: ['Ceviz', 'Venge', 'Beyaz', 'Antrasit', 'Meşe', 'Beton'],
      warranty: '10 Yıl',
      securityClass: 'RC3 (EN 1627)',
    },
    features: [
      '7 Noktalı Çelik Kilit Sistemi',
      'Çift Çelik Levha Yapısı',
      'Parmak İzi / Şifre Kilit Seçeneği',
      'Yüksek Ses & Isı Yalıtımı',
      '14 Kaplama Seçeneği',
      'Anti-bumber Silindir',
    ],
    badge: 'Popüler',
    isFeatured: true,
    relatedProducts: ['fortress-pro-celik-kapi', 'smart-guard-celik-kapi'],
  },
  {
    id: 'celik-002',
    slug: 'fortress-pro-celik-kapi',
    name: 'Fortress Pro Çelik Kapı',
    category: 'celik-kapilar',
    brand: 'KaleKilit',
    shortDescription: 'Giriş seviye yüksek güvenlik çelik kapı. 5 noktalı kilit, standart yalıtım.',
    description: 'Fortress Pro, kaliteden ödün vermeden uygun fiyatlı çelik kapı arayanlar için ideal seçimdir. 5 noktalı kilit sistemi ve poliüretan yalıtım ile temel güvenlik ve konfor ihtiyaçlarınızı karşılar.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=1000&fit=crop', alt: 'Fortress Pro Çelik Kapı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=900&fit=crop', alt: 'Fortress Pro - Yan Görünüm' },
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=600&fit=crop&crop=bottom', alt: 'Fortress Pro - Kilit Sistemi' },
    ],
    priceRange: { min: 12000, max: 18000, currency: 'TL', note: 'Montaj dahil fiyat' },
    specs: {
      material: 'Tek Katmanlı Çelik (1.2mm)',
      width: '90 cm',
      height: '200 cm',
      thickness: '70 mm',
      lockSystem: '5 Noktalı Çelik Kilit',
      insulation: 'Poliüretan Köpük - 35 dB Ses',
      color: ['Ceviz', 'Venge', 'Beyaz', 'Antrasit'],
      warranty: '5 Yıl',
      securityClass: 'RC2 (EN 1627)',
    },
    features: ['5 Noktalı Kilit', 'Poliüretan Yalıtım', '8 Kaplama Seçeneği'],
    badge: 'Çok Satan',
    isFeatured: true,
    relatedProducts: ['guardian-elite-celik-kapi'],
  },
  {
    id: 'celik-003',
    slug: 'smart-guard-celik-kapi',
    name: 'Smart Guard Akıllı Çelik Kapı',
    category: 'celik-kapilar',
    brand: 'KaleKilit',
    shortDescription: 'Akıllı kilit sistemli, Wi-Fi bağlantılı, uzaktan kontrol edilebilir çelik kapı.',
    description: 'Smart Guard, teknoloji tutkunları için tasarlanmış akıllı çelik kapı modelidir. Wi-Fi bağlantılı kilit sayesinde telefonunuzdan kapınızı kontrol edebilir, giriş kaydı tutabilirsiniz.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=1000&fit=crop', alt: 'Smart Guard Akıllı Çelik Kapı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=900&fit=crop', alt: 'Smart Guard - Kontrol Paneli' },
    ],
    priceRange: { min: 25000, max: 38000, currency: 'TL', note: 'Montaj + kurulum dahil' },
    specs: {
      material: 'Çift Katmanlı Çelik (1.5mm + 1.0mm)',
      width: '90 cm / 100 cm',
      height: '200 cm / 210 cm',
      thickness: '95 mm',
      lockSystem: 'Akıllı Kilit (Wi-Fi + Parmak İzi + Şifre + Kart)',
      insulation: 'Taş Yünü + Kauçuk Conta - 45 dB Ses',
      color: ['Antrasit', 'Siyah', 'Gümüş', 'Bronz'],
      warranty: '10 Yıl',
      securityClass: 'RC3 (EN 1627)',
    },
    features: [
      'Wi-Fi Bağlantılı Akıllı Kilit',
      'Mobil Uygulama ile Uzaktan Kontrol',
      'Parmak İzi + Şifre + Kart Giriş',
      'Giriş Kaydı Tutma',
      'Acil Durum Mekanik Anahtar',
    ],
    badge: 'Yeni',
    isFeatured: true,
    relatedProducts: ['guardian-elite-celik-kapi', 'fortress-pro-celik-kapi'],
  },

  // --- İÇ KAPILAR ---
  {
    id: 'ic-001',
    slug: 'milano-lake-beyaz-ic-kapi',
    name: 'Milano Lake Beyaz İç Kapı',
    category: 'ic-kapilar',
    brand: 'KapıArt Özel Üretim',
    shortDescription: 'Mat lake beyaz, gizli menteşeli, sessiz kapanma mekanizmalı modern iç kapı.',
    description: 'Milano serisi, minimalist ve modern iç mekanlar için tasarlanmış lake iç kapı modelimizdir. Gizli menteşe ve manyetik kilit sistemiyle sessiz ve estetik kullanım sunar.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=1000&fit=crop&bri=10', alt: 'Milano Lake Beyaz İç Kapı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=900&fit=crop&bri=10', alt: 'Milano Lake - Detay' },
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=600&fit=crop&bri=10&crop=bottom', alt: 'Milano Lake - Menteşe Detay' },
    ],
    priceRange: { min: 5500, max: 8000, currency: 'TL', note: 'Kasa + Kanat + Pervaz' },
    specs: {
      material: 'MDF üzeri Lake Boya',
      width: '80 cm / 90 cm',
      height: '200 cm / 210 cm',
      thickness: '40 mm',
      lockSystem: 'Manyetik Kilit (Sessiz)',
      insulation: 'Standart',
      color: ['Mat Beyaz', 'Parlak Beyaz', 'Krem', 'Gri'],
      warranty: '5 Yıl',
    },
    features: [
      'Mat Lake Boya (3 Kat Astar)',
      'Gizli Menteşe Sistemi',
      'Manyetik Kilit (Sessiz Kapanma)',
      'Özel Ölçü İmkânı',
    ],
    badge: 'Yeni',
    isFeatured: true,
    relatedProducts: ['nordic-laminat-ic-kapi', 'roma-camli-ic-kapi'],
  },
  {
    id: 'ic-002',
    slug: 'nordic-laminat-ic-kapi',
    name: 'Nordic Laminat İç Kapı',
    category: 'ic-kapilar',
    brand: 'KapıArt Özel Üretim',
    shortDescription: 'Doğal ahşap görünümlü laminat kaplama, çizilmeye dayanıklı.',
    description: 'Nordic serisi, doğal ahşap görünümü seven ancak kolay bakım isteyen kullanıcılar için ideal. CPL laminat kaplama ile çizilme ve darbelere karşı üstün dayanıklılık.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=1000&fit=crop', alt: 'Nordic Laminat İç Kapı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=900&fit=crop', alt: 'Nordic Laminat - Doku Detay' },
    ],
    priceRange: { min: 3500, max: 5500, currency: 'TL', note: 'Kasa + Kanat + Pervaz' },
    specs: {
      material: 'MDF üzeri CPL Laminat',
      width: '80 cm / 90 cm',
      height: '200 cm',
      thickness: '40 mm',
      lockSystem: 'Silindir Kilit',
      insulation: 'Standart',
      color: ['Doğal Meşe', 'Koyu Ceviz', 'Açık Akçaağaç', 'Gri Meşe'],
      warranty: '5 Yıl',
    },
    features: ['CPL Laminat (Çizilmez)', '4 Ahşap Desen Seçeneği', 'Hazır Kasa Sistemi'],
    isFeatured: true,
    relatedProducts: ['milano-lake-beyaz-ic-kapi'],
  },
  {
    id: 'ic-003',
    slug: 'roma-camli-ic-kapi',
    name: 'Roma Camlı İç Kapı',
    category: 'ic-kapilar',
    brand: 'KapıArt Özel Üretim',
    shortDescription: 'Buzlu cam panelli, modern tasarımlı iç kapı. Işık geçirgenliği yüksek.',
    description: 'Roma serisi, cam paneli sayesinde odalara doğal ışık geçişi sağlayan estetik bir iç kapı modelidir. Buzlu cam ile mahremiyet korunurken, mekanlar daha aydınlık olur.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop', alt: 'Roma Camlı İç Kapı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=900&fit=crop', alt: 'Roma Camlı - Cam Detayı' },
    ],
    priceRange: { min: 6000, max: 9000, currency: 'TL', note: 'Kasa + Kanat + Pervaz' },
    specs: {
      material: 'MDF + Buzlu Temperli Cam',
      width: '80 cm / 90 cm',
      height: '200 cm / 210 cm',
      thickness: '40 mm',
      lockSystem: 'Manyetik Kilit',
      insulation: 'Standart',
      color: ['Beyaz', 'Antrasit', 'Krem', 'Ceviz'],
      warranty: '5 Yıl',
    },
    features: [
      'Buzlu Temperli Cam Panel',
      'Doğal Işık Geçişi',
      'Gizli Menteşe Sistemi',
      'Manyetik Sessiz Kilit',
    ],
    relatedProducts: ['milano-lake-beyaz-ic-kapi', 'nordic-laminat-ic-kapi'],
  },

  // --- VİLLA KAPILARI ---
  {
    id: 'villa-001',
    slug: 'royal-ceviz-villa-kapisi',
    name: 'Royal Ceviz Villa Kapısı',
    category: 'villa-kapilari',
    brand: 'Özel Üretim',
    shortDescription: 'Masif ceviz ahşap, el işçiliği detaylar, çelik iç konstrüksiyon.',
    description: 'Royal serisi villa kapılarımız, masif ceviz ahşaptan usta el işçiliğiyle üretilir. İç konstrüksiyon çelik, dış kaplama masif ahşap yapısıyla hem güvenlik hem estetik sunar.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop', alt: 'Royal Ceviz Villa Kapısı - Ön Görünüm', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=900&fit=crop', alt: 'Royal Ceviz - Detay' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop&crop=bottom', alt: 'Royal Ceviz - Kol Detayı' },
    ],
    priceRange: { min: 45000, max: 85000, currency: 'TL', note: 'Özel üretim, montaj dahil' },
    specs: {
      material: 'Masif Ceviz + Çelik Konstrüksiyon',
      width: '120 cm / 140 cm / Çift Kanat',
      height: '220 cm / 240 cm',
      thickness: '80 mm',
      lockSystem: 'Çok Noktalı + Parmak İzi',
      insulation: 'Yüksek - 45 dB Ses',
      color: ['Doğal Ceviz', 'Koyu Ceviz', 'İstek Üzerine Boya'],
      warranty: '10 Yıl',
      securityClass: 'RC3',
    },
    features: [
      'Masif Ceviz Ahşap',
      'El İşçiliği Oyma Detaylar',
      'Çelik İç Konstrüksiyon',
      'Özel Ölçü & Tasarım',
      'Pirinc/Krom Aksesuar Seçeneği',
    ],
    badge: 'Sınırlı Stok',
    isFeatured: true,
    relatedProducts: ['modern-aluminyum-villa-kapisi'],
  },
  {
    id: 'villa-002',
    slug: 'modern-aluminyum-villa-kapisi',
    name: 'Modern Alüminyum Villa Kapısı',
    category: 'villa-kapilari',
    brand: 'Özel Üretim',
    shortDescription: 'Alüminyum kompozit, cam detaylı, minimalist tasarım villa kapısı.',
    description: 'Modern Alüminyum Villa Kapısı, çağdaş mimari ile uyum sağlayan minimalist tasarımıyla göz doldurur. Alüminyum kompozit yapısı sayesinde hava koşullarına karşı dayanıklıdır.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop', alt: 'Modern Alüminyum Villa Kapısı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop', alt: 'Modern Alüminyum - Detay' },
    ],
    priceRange: { min: 35000, max: 65000, currency: 'TL', note: 'Özel üretim, montaj dahil' },
    specs: {
      material: 'Alüminyum Kompozit + Cam',
      width: '120 cm / Çift Kanat',
      height: '220 cm / 240 cm',
      thickness: '75 mm',
      lockSystem: 'Çok Noktalı Kilit + Motorlu',
      insulation: 'Yüksek - 40 dB Ses',
      color: ['Antrasit', 'Siyah', 'Gümüş', 'Bronz'],
      warranty: '10 Yıl',
      securityClass: 'RC2',
    },
    features: [
      'Alüminyum Kompozit Yapı',
      'Cam Detaylar',
      'Motorlu Kilit Seçeneği',
      'Hava Koşullarına Dayanıklı',
    ],
    relatedProducts: ['royal-ceviz-villa-kapisi'],
  },

  // --- AMERİKAN PANEL ---
  {
    id: 'panel-001',
    slug: 'klasik-amerikan-panel-kapi',
    name: 'Klasik Amerikan Panel Kapı',
    category: 'amerikan-panel-kapilar',
    brand: 'KapıArt',
    shortDescription: 'Ekonomik, dayanıklı ve kolay montajlı amerikan panel kapı.',
    description: 'Klasik Amerikan Panel Kapı, bütçe dostu fiyatıyla ve kolay montajıyla en popüler iç kapı seçeneklerinden biridir. 8 farklı model ve renk seçeneğiyle her mekana uyum sağlar.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=1000&fit=crop&bri=5', alt: 'Klasik Amerikan Panel Kapı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=900&fit=crop&bri=5', alt: 'Amerikan Panel - Detay' },
    ],
    priceRange: { min: 2000, max: 3500, currency: 'TL', note: 'Kasa + Kanat' },
    specs: {
      material: 'HDF Panel',
      width: '80 cm / 90 cm',
      height: '200 cm',
      thickness: '35 mm',
      lockSystem: 'Standart Silindir Kilit',
      insulation: 'Temel',
      color: ['Beyaz', 'Krem', 'Ceviz', 'Meşe'],
      warranty: '3 Yıl',
    },
    features: ['Ekonomik Fiyat', '8 Model Seçeneği', 'Kolay Montaj', 'HDF Dayanıklılık'],
    badge: 'Çok Satan',
    isFeatured: true,
    relatedProducts: ['nordic-laminat-ic-kapi'],
  },

  // --- CAM KAPILAR ---
  {
    id: 'cam-001',
    slug: 'temperli-surgulu-cam-kapi',
    name: 'Temperli Sürgülü Cam Kapı',
    category: 'cam-kapilar',
    brand: 'KapıArt',
    shortDescription: 'Temperli cam, alüminyum raylı sürgülü kapı sistemi.',
    description: 'Temperli Sürgülü Cam Kapı, modern mekanlar için ideal bir çözüm sunar. Alüminyum ray sistemi ile sessiz ve kolay kullanım, temperli cam ile güvenlik sağlar.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop&bri=-5', alt: 'Temperli Sürgülü Cam Kapı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=900&fit=crop&bri=-5', alt: 'Sürgülü Cam - Ray Sistemi' },
    ],
    priceRange: { min: 8000, max: 15000, currency: 'TL', note: 'Ray sistemi dahil' },
    specs: {
      material: '10mm Temperli Cam + Alüminyum Ray',
      width: '80 cm / 90 cm / 100 cm',
      height: '200 cm / 210 cm',
      thickness: '10 mm cam',
      lockSystem: 'Cam Kapı Kilidi',
      insulation: 'Temel',
      color: ['Şeffaf', 'Buzlu', 'Füme', 'Bronz'],
      warranty: '5 Yıl',
    },
    features: [
      'Temperli Güvenlik Camı',
      'Alüminyum Ray Sistemi',
      'Sessiz Sürgü Mekanizması',
      'Modern Minimalist Tasarım',
    ],
    isFeatured: true,
    relatedProducts: ['roma-camli-ic-kapi'],
  },

  // --- YANGIN KAPILARI ---
  {
    id: 'yangin-001',
    slug: 'yangin-kapisi-60dk',
    name: 'Yangın Kapısı - 60 Dakika',
    category: 'yangin-kapilari',
    brand: 'KapıArt',
    shortDescription: '60 dakika yangın dayanımlı, CE ve TSE belgeli yangın kapısı.',
    description: '60 Dakika Yangın Kapısı, yangın yönetmeliğine tam uyumlu, CE ve TSE belgeli profesyonel yangın kapısıdır. Panik bar donanımı ve otomatik kapanma mekanizması standart olarak dahildir.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=1000&fit=crop', alt: '60 Dakika Yangın Kapısı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=900&fit=crop', alt: 'Yangın Kapısı - Panik Bar' },
    ],
    priceRange: { min: 8000, max: 14000, currency: 'TL', note: 'Panik bar dahil' },
    specs: {
      material: 'Galvaniz Çelik + Yangın Yalıtımı',
      width: '90 cm / 100 cm / 120 cm',
      height: '200 cm / 210 cm',
      thickness: '65 mm',
      lockSystem: 'Panik Bar + Silindir Kilit',
      insulation: 'Yangın Yalıtımı (Taş Yünü)',
      color: ['RAL 7035 Gri', 'RAL 9010 Beyaz'],
      warranty: '5 Yıl',
      fireRating: '60 Dakika',
    },
    features: [
      '60 Dakika Yangın Dayanımı',
      'CE & TSE Belgeli',
      'Panik Bar Donanımlı',
      'Otomatik Kapanma Mekanizması',
      'Duman Sızdırmazlık Contası',
    ],
    relatedProducts: ['yangin-kapisi-90dk'],
  },
  {
    id: 'yangin-002',
    slug: 'yangin-kapisi-90dk',
    name: 'Yangın Kapısı - 90 Dakika',
    category: 'yangin-kapilari',
    brand: 'KapıArt',
    shortDescription: '90 dakika yangın dayanımlı, yüksek güvenlikli profesyonel yangın kapısı.',
    description: '90 Dakika Yangın Kapısı, yüksek riskli alanlar için tasarlanmış profesyonel yangın kapısıdır. Ekstra kalın yapısı ve gelişmiş yalıtım ile 90 dakika yangın dayanımı sağlar.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=1000&fit=crop&sat=-30', alt: '90 Dakika Yangın Kapısı', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&h=900&fit=crop&sat=-30', alt: 'Yangın Kapısı 90dk - Detay' },
    ],
    priceRange: { min: 12000, max: 20000, currency: 'TL', note: 'Panik bar dahil' },
    specs: {
      material: 'Galvaniz Çelik (Çift Katlı) + Yangın Yalıtımı',
      width: '90 cm / 100 cm / 120 cm / Çift Kanat',
      height: '200 cm / 210 cm / 220 cm',
      thickness: '80 mm',
      lockSystem: 'Panik Bar + Anti-panik Kilit',
      insulation: 'Yüksek Yangın Yalıtımı (Seramik Elyaf)',
      color: ['RAL 7035 Gri', 'RAL 9010 Beyaz', 'RAL 7016 Antrasit'],
      warranty: '7 Yıl',
      fireRating: '90 Dakika',
    },
    features: [
      '90 Dakika Yangın Dayanımı',
      'CE & TSE Belgeli',
      'Çift Kanat Seçeneği',
      'Elektromanyetik Tutucu Uyumlu',
      'Yangın Alarm Entegrasyonu',
    ],
    badge: 'Popüler',
    relatedProducts: ['yangin-kapisi-60dk'],
  },
];

// Proje Galerisi (montaj öncesi/sonrası)
export const projectGallery = [
  {
    id: 1,
    title: 'Bahçeşehir Villa - Çelik Kapı Montajı',
    before: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&sat=-80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    category: 'Çelik Kapı',
    description: 'Eski ahşap kapının çelik kapı ile değişimi.',
  },
  {
    id: 2,
    title: 'Ataşehir Rezidans - İç Kapı Yenileme',
    before: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&sat=-80',
    after: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    category: 'İç Kapı',
    description: 'Tüm daire iç kapılarının lake beyaz modellere değişimi.',
  },
  {
    id: 3,
    title: 'Sapanca Villa - Masif Ceviz Giriş Kapısı',
    before: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&sat=-80',
    after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    category: 'Villa Kapısı',
    description: 'Özel tasarım masif ceviz villa giriş kapısı montajı.',
  },
  {
    id: 4,
    title: 'Beylikdüzü AVM - Yangın Kapısı Projesi',
    before: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=600&fit=crop&sat=-80',
    after: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=600&fit=crop',
    category: 'Yangın Kapısı',
    description: '48 adet yangın kapısı montajı ve sertifikalandırma.',
  },
  {
    id: 5,
    title: 'Kadıköy Ofis - Cam Kapı Sistemi',
    before: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&sat=-80',
    after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
    category: 'Cam Kapı',
    description: 'Ofis bölme ve sürgülü cam kapı sistemi kurulumu.',
  },
  {
    id: 6,
    title: 'Pendik Konut - Amerikan Panel Değişimi',
    before: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop&sat=-80',
    after: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    category: 'Amerikan Panel',
    description: '5 adet amerikan panel kapı değişimi ve montajı.',
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR').format(price);
}
