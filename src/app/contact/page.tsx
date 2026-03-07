import type { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';
import PageTransition from '@/components/ui/PageTransition';
import JsonLd from '@/components/seo/JsonLd';
import { generateBreadcrumbJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'KapıArt iletişim bilgileri. Ücretsiz ölçü randevusu ve teklif almak için bize ulaşın.',
};

export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: 'Ana Sayfa', url: '/' },
          { name: 'İletişim', url: '/contact' },
        ])}
      />
      <div className="pt-20">
        <ContactSection />
      </div>
    </PageTransition>
  );
}
