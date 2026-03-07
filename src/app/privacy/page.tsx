import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import PageTransition from '@/components/ui/PageTransition';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: `${siteConfig.name} Gizlilik Politikası – Kişisel bilgilerinizin nasıl toplandığı ve kullanıldığı hakkında.`,
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <Container>
          <h1 className="font-heading text-4xl md:text-5xl font-bold">
            Gizlilik Politikası
          </h1>
          <p className="text-gray-300 mt-3">
            Son güncelleme: 01 Ocak 2024
          </p>
        </Container>
      </section>

      <Section background="white">
        <Container size="md">
          <div className="prose prose-lg max-w-none text-gray-700">
            <h2>1. Genel Bilgi</h2>
            <p>
              Bu gizlilik politikası, <strong>{siteConfig.name}</strong> web sitesini
              ziyaret edenlerin kişisel bilgilerinin nasıl toplandığını, kullanıldığını
              ve korunduğunu açıklamaktadır.
            </p>

            <h2>2. Toplanan Bilgiler</h2>
            <p>Web sitemizi ziyaret ettiğinizde aşağıdaki bilgiler toplanabilir:</p>
            <ul>
              <li>İletişim formu aracılığıyla gönderdiğiniz ad, e-posta, telefon ve mesaj bilgileri</li>
              <li>Tarayıcı türü, IP adresi ve ziyaret edilen sayfalar gibi anonim kullanım verileri</li>
              <li>Çerezler aracılığıyla toplanan tercih ve oturum verileri</li>
            </ul>

            <h2>3. Bilgilerin Kullanımı</h2>
            <p>Toplanan bilgiler aşağıdaki amaçlarla kullanılır:</p>
            <ul>
              <li>Müşteri taleplerine yanıt vermek</li>
              <li>Ürün ve hizmetlerimizi geliştirmek</li>
              <li>Web sitemizin kullanım deneyimini iyileştirmek</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>

            <h2>4. Çerezler (Cookies)</h2>
            <p>
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır.
              Çerezler, tarayıcınız tarafından bilgisayarınıza kaydedilen küçük metin
              dosyalarıdır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz;
              ancak bu durumda bazı site özellikleri düzgün çalışmayabilir.
            </p>

            <h2>5. Üçüncü Taraf Hizmetleri</h2>
            <p>
              Web sitemizde Google Analytics gibi üçüncü taraf analiz araçları
              kullanılabilmektedir. Bu hizmetlerin kendi gizlilik politikaları mevcuttur.
            </p>

            <h2>6. Bilgi Güvenliği</h2>
            <p>
              Kişisel bilgilerinizin güvenliğini sağlamak için uygun teknik ve
              organizasyonel önlemler almaktayız. Ancak internet üzerinden veri
              aktarımının tamamen güvenli olmadığını hatırlatmak isteriz.
            </p>

            <h2>7. Değişiklikler</h2>
            <p>
              Bu gizlilik politikasını zaman zaman güncelleme hakkımız saklıdır.
              Değişiklikler bu sayfada yayınlanacaktır.
            </p>

            <h2>8. İletişim</h2>
            <p>
              Gizlilik politikamız hakkında sorularınız için{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>{' '}
              adresinden bize ulaşabilirsiniz.
            </p>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
