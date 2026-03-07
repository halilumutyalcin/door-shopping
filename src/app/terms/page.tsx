import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import PageTransition from '@/components/ui/PageTransition';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: 'Kullanım Şartları',
  description: `${siteConfig.name} web sitesi kullanım şartları ve koşulları.`,
};

export default function TermsPage() {
  return (
    <PageTransition>
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <Container>
          <h1 className="font-heading text-4xl md:text-5xl font-bold">
            Kullanım Şartları
          </h1>
          <p className="text-gray-300 mt-3">
            Son güncelleme: 01 Ocak 2024
          </p>
        </Container>
      </section>

      <Section background="white">
        <Container size="md">
          <div className="prose prose-lg max-w-none text-gray-700">
            <h2>1. Kabul</h2>
            <p>
              <strong>{siteConfig.name}</strong> web sitesini kullanarak bu kullanım
              şartlarını kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız,
              lütfen sitemizi kullanmayınız.
            </p>

            <h2>2. Hizmet Tanımı</h2>
            <p>
              Bu web sitesi, {siteConfig.name} tarafından sunulan kapı ürünleri ve
              hizmetleri hakkında bilgi vermek amacıyla hazırlanmıştır. Sitedeki
              bilgiler genel bilgilendirme niteliğindedir.
            </p>

            <h2>3. Fikri Mülkiyet Hakları</h2>
            <p>
              Bu web sitesindeki tüm içerik, tasarım, logo, grafik ve yazılım
              {siteConfig.name}&apos;a aittir veya lisans altında kullanılmaktadır.
              İçeriklerin izinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır.
            </p>

            <h2>4. Kullanıcı Yükümlülükleri</h2>
            <ul>
              <li>Web sitesini yalnızca yasal amaçlarla kullanmayı kabul edersiniz</li>
              <li>Sitenin işleyişini bozacak veya zarar verecek eylemlerde bulunmamayı taahhüt edersiniz</li>
              <li>İletişim formlarında doğru ve güncel bilgi sağlamayı kabul edersiniz</li>
            </ul>

            <h2>5. Sorumluluk Sınırlaması</h2>
            <p>
              Web sitemizdeki bilgilerin doğruluğu ve güncelliği konusunda azami özen
              gösterilmekle birlikte, bilgilerin eksiksiz ve hatasız olduğu garanti
              edilmez. Sitede yer alan bilgilerin kullanımından doğacak zararlardan
              sorumluluk kabul edilmez.
            </p>

            <h2>6. Ürün Bilgileri ve Fiyatlar</h2>
            <p>
              Web sitesinde gösterilen ürün bilgileri, görseller ve fiyatlar bilgilendirme
              amaçlıdır. Gerçek ürünler gösellerden farklılık gösterebilir. Güncel fiyat
              ve stok bilgisi için lütfen bizimle iletişime geçiniz.
            </p>

            <h2>7. Dış Bağlantılar</h2>
            <p>
              Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin
              içerik ve gizlilik politikalarından sorumlu değiliz.
            </p>

            <h2>8. Değişiklikler</h2>
            <p>
              Bu kullanım şartlarını önceden bildirimde bulunmaksızın değiştirme hakkını
              saklı tutarız. Güncellenmiş şartlar bu sayfada yayınlanacaktır.
            </p>

            <h2>9. Uygulanacak Hukuk</h2>
            <p>
              Bu kullanım şartları Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda
              İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>

            <h2>10. İletişim</h2>
            <p>
              Kullanım şartlarıyla ilgili sorularınız için{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>{' '}
              adresinden bize ulaşabilirsiniz.
            </p>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
