import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, productCategories } from '@/config/products.config';
import Container from '@/components/ui/Container';
import ProductDetailClient from './ProductDetailClient';

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  return {
    title: `${product.name} | ${product.brand}`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: primaryImage ? [{ url: primaryImage.src, width: 800, height: 1000, alt: primaryImage.alt }] : [],
    },
  };
}

export default function ProductDetailPage({ params }: Params) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const category = productCategories.find((c) => c.id === product.category);
  const relatedProducts = product.relatedProducts
    ? products.filter((p) => product.relatedProducts!.includes(p.slug))
    : [];

  return (
    <div className="pt-24 pb-16">
      <Container>
        <ProductDetailClient
          product={product}
          category={category}
          relatedProducts={relatedProducts}
        />
      </Container>
    </div>
  );
}
