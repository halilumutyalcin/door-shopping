import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ProductCatalog from '@/components/sections/ProductCatalog';

export const metadata: Metadata = {
  title: 'Ürün Kataloğu | Çelik Kapı, İç Kapı, Villa Kapısı Modelleri',
  description:
    'KapıArt ürün kataloğu. Çelik kapı, iç kapı, villa kapısı, amerikan panel, cam kapı ve yangın kapısı modelleri. Fiyat, özellik ve karşılaştırma.',
};

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Page Header */}
        <div className="mb-10">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-primary-600">Ana Sayfa</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Ürünler</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            Ürün Kataloğu
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            200+ kapı modeli arasından ihtiyacınıza en uygun kapıyı bulun. Filtreleme ve karşılaştırma özellikleriyle kolay seçim yapın.
          </p>
        </div>

        <ProductCatalog />
      </Container>
    </div>
  );
}
