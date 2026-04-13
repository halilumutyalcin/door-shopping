'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, GitCompare, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCompare } from '@/hooks/useCompare';
import { formatPrice } from '@/config/products.config';
import type { Product } from '@/config/products.config';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const badgeVariantMap: Record<string, 'new' | 'popular' | 'discount' | 'custom'> = {
  Yeni: 'new',
  'Popüler': 'popular',
  'Çok Satan': 'popular',
  'Kampanyalı': 'discount',
  'Sınırlı Stok': 'custom',
};

interface ProductDetailClientProps {
  product: Product;
  category?: { id: string; title: string };
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, category, relatedProducts }: ProductDetailClientProps) {
  const { addToCompare, removeFromCompare, isInCompare, isFull } = useCompare();
  const inCompare = isInCompare(product.id);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-primary-600">Ana Sayfa</a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-primary-600">Ürünler</a>
        {category && (
          <>
            <span className="mx-2">/</span>
            <a href={`/products?category=${category.id}`} className="hover:text-primary-600">{category.title}</a>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      {/* Product Info Grid */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 mb-16">
        {/* Left: Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProductImageGallery images={product.images} productName={product.name} />
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 lg:mt-0"
        >
          {/* Brand, SKU & Badge */}
          <div className="flex items-center flex-wrap gap-3 mb-2">
            <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{product.sku}</span>
            {product.badge && (
              <Badge variant={badgeVariantMap[product.badge] || 'default'}>
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mb-6 p-4 bg-primary-50 rounded-xl">
            <div className="text-2xl md:text-3xl font-bold text-primary-700">
              {formatPrice(product.priceRange.min)} - {formatPrice(product.priceRange.max)} TL
            </div>
            {product.priceRange.note && (
              <p className="text-sm text-primary-600 mt-1">{product.priceRange.note}</p>
            )}
          </div>

          {/* Short Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">{product.shortDescription}</p>

          {/* Color Options */}
          {product.specs.color.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Renk Seçenekleri</h3>
              <div className="flex flex-wrap gap-2">
                {product.specs.color.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Link href="/contact" className="flex-1">
              <Button variant="primary" className="w-full" size="lg">
                <Phone className="w-5 h-5 mr-2" />
                Teklif Al
              </Button>
            </Link>
            <a
              href={`https://wa.me/905321234567?text=Merhaba, ${product.name} hakkında bilgi almak istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp&apos;tan Sor
              </Button>
            </a>
          </div>

          {/* Compare Button */}
          <button
            onClick={() => inCompare ? removeFromCompare(product.id) : !isFull && addToCompare(product)}
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all',
              inCompare
                ? 'border-accent-500 bg-accent-50 text-accent-700'
                : 'border-gray-200 text-gray-600 hover:border-primary-200 hover:bg-primary-50'
            )}
          >
            <GitCompare className="w-4 h-4" />
            {inCompare ? 'Karşılaştırmadan Çıkar' : 'Karşılaştırmaya Ekle'}
          </button>
        </motion.div>
      </div>

      {/* Specs Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Teknik Özellikler</h2>
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          <table className="w-full">
            <tbody>
              {[
                { label: 'Ürün Kodu', value: product.sku },
                { label: 'Malzeme', value: product.specs.material },
                { label: 'Genişlik', value: product.specs.width },
                { label: 'Yükseklik', value: product.specs.height },
                { label: 'Kalınlık', value: product.specs.thickness },
                { label: 'Kilit Sistemi', value: product.specs.lockSystem },
                { label: 'Yalıtım', value: product.specs.insulation },
                { label: 'Renk Seçenekleri', value: product.specs.color.join(', ') },
                { label: 'Garanti', value: product.specs.warranty },
                ...(product.specs.fireRating ? [{ label: 'Yangın Dayanımı', value: product.specs.fireRating }] : []),
                ...(product.specs.securityClass ? [{ label: 'Güvenlik Sınıfı', value: product.specs.securityClass }] : []),
              ].map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 w-1/3">{row.label}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Öne Çıkan Özellikler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-800">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Description (Markdown) */}
      {product.description && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Detaylı Açıklama</h2>
          <div className="prose prose-gray max-w-none">
            <ReactMarkdown>{product.description}</ReactMarkdown>
          </div>
        </motion.div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">İlgili Ürünler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rp) => {
              const img = rp.images.find((i) => i.isPrimary) || rp.images[0];
              return (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-primary-50 rounded-xl transition-colors"
                >
                  {img && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors text-sm truncate">
                      {rp.name}
                    </h3>
                    <p className="text-sm text-primary-600 font-medium">
                      {formatPrice(rp.priceRange.min)} - {formatPrice(rp.priceRange.max)} TL
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Full Width CTA */}
      <div className="mt-16 bg-primary-900 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
          Ücretsiz Teklif Alın
        </h2>
        <p className="text-primary-200 mb-6 max-w-xl mx-auto">
          Bu ürün hakkında detaylı bilgi ve özel fiyat teklifi almak için bizimle iletişime geçin.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              İletişime Geç
            </Button>
          </Link>
          <a
            href="tel:+902121234567"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Hemen Ara
          </a>
        </div>
      </div>
    </>
  );
}
