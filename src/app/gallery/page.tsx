import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Proje Galerisi | Montaj Öncesi & Sonrası',
  description:
    'KapıArt montaj projelerimizi inceleyin. Çelik kapı, iç kapı, villa kapısı montaj öncesi ve sonrası görselleri.',
};

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-primary-600">Ana Sayfa</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Proje Galerisi</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
          Proje Galerisi
        </h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          Gerçekleştirdiğimiz kapı montaj projelerinin öncesi ve sonrası görsellerini inceleyin. Her projede müşteri memnuniyetini ön planda tutuyoruz.
        </p>

        <GalleryPageClient />
      </Container>
    </div>
  );
}
