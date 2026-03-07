import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ComparePageClient from './ComparePageClient';

export const metadata: Metadata = {
  title: 'Ürün Karşılaştırma',
  description: 'Seçtiğiniz kapı modellerini teknik özelliklerine göre yan yana karşılaştırın.',
};

export default function ComparePage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-primary-600">Ana Sayfa</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-primary-600">Ürünler</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Karşılaştırma</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
          Ürün Karşılaştırma
        </h1>
        <p className="text-gray-600 mb-10">
          Seçtiğiniz kapı modellerini teknik özelliklerine göre yan yana karşılaştırın.
        </p>

        <ComparePageClient />
      </Container>
    </div>
  );
}
