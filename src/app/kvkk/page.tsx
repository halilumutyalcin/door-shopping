import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import PageTransition from '@/components/ui/PageTransition';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: `${siteConfig.name} KVKK Aydınlatma Metni – Kişisel verilerinizin korunması hakkında bilgilendirme.`,
};

export default function KVKKPage() {
  return (
    <PageTransition>
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <Container>
          <h1 className="font-heading text-4xl md:text-5xl font-bold">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-gray-300 mt-3">
            Son güncelleme: 01 Ocak 2024
          </p>
        </Container>
      </section>

      <Section background="white">
        <Container size="md">
          <div className="prose prose-lg max-w-none text-gray-700">
            <h2>1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca,
              kişisel verileriniz veri sorumlusu olarak <strong>{siteConfig.name}</strong>{' '}
              tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>

            <h2>2. Kişisel Verilerin İşlenme Amacı</h2>
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul>
              <li>Ürün ve hizmetlerimizin sunulması</li>
              <li>İletişim faaliyetlerinin yürütülmesi</li>
              <li>Müşteri ilişkileri yönetimi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Ürün teklifi ve bilgilendirme yapılması</li>
              <li>Kalite kontrol ve müşteri memnuniyeti araştırmaları</li>
            </ul>

            <h2>3. İşlenen Kişisel Veriler</h2>
            <p>
              İletişim formumuz aracılığıyla ad-soyad, e-posta adresi, telefon numarası
              ve mesaj içeriği bilgileriniz toplanmaktadır.
            </p>

            <h2>4. Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz, yasal zorunluluklar ve meşru menfaatlerimiz
              doğrultusunda ilgili iş ortaklarımıza, hizmet sağlayıcılarımıza ve
              yetkili kamu kurum ve kuruluşlarına aktarılabilir.
            </p>

            <h2>5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
            <p>
              Kişisel verileriniz, web sitemiz üzerindeki iletişim formu, telefon, e-posta
              ve yüz yüze görüşmeler aracılığıyla, KVKK&apos;nın 5. ve 6. maddelerinde
              belirtilen hukuki sebeplere dayanılarak toplanmaktadır.
            </p>

            <h2>6. Veri Sahibinin Hakları</h2>
            <p>KVKK&apos;nın 11. maddesi gereği aşağıdaki haklara sahipsiniz:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
            </ul>

            <h2>7. İletişim</h2>
            <p>
              KVKK kapsamındaki taleplerinizi, {siteConfig.contact.address.street}, {siteConfig.contact.address.district}, {siteConfig.contact.address.city} adresine yazılı
              olarak veya <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> adresine
              e-posta göndererek iletebilirsiniz.
            </p>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
