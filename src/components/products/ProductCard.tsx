'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GitCompare, ArrowRight, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCompare } from '@/hooks/useCompare';
import Badge from '@/components/ui/Badge';
import type { Product } from '@/config/products.config';
import { formatPrice } from '@/config/products.config';

interface ProductCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}

const badgeVariantMap: Record<string, 'new' | 'popular' | 'discount' | 'custom'> = {
  Yeni: 'new',
  'Popüler': 'popular',
  'Çok Satan': 'popular',
  'Kampanyalı': 'discount',
  'Sınırlı Stok': 'custom',
};

export default function ProductCard({ product, index = 0, priority = false }: ProductCardProps) {
  const { addToCompare, removeFromCompare, isInCompare, isFull } = useCompare();
  const inCompare = isInCompare(product.id);
  const [isHovered, setIsHovered] = useState(false);
  const [secondaryLoaded, setSecondaryLoaded] = useState(false);

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const secondaryImage = product.images[1];

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product.id);
    } else if (!isFull) {
      addToCompare(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: Math.min(index, 5) * 0.05, duration: 0.4 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          {primaryImage && (
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              className={cn(
                'object-cover transition-all duration-500',
                secondaryImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
            />
          )}
          {secondaryImage && (isHovered || secondaryLoaded) && (
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
              onLoad={() => setSecondaryLoaded(true)}
            />
          )}

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant={badgeVariantMap[product.badge] || 'default'}>
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Compare Checkbox */}
          <button
            onClick={handleCompareToggle}
            className={cn(
              'absolute top-3 right-3 z-10 p-2 rounded-full transition-all',
              inCompare
                ? 'bg-accent-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-primary-700 opacity-0 group-hover:opacity-100'
            )}
            title={inCompare ? 'Karşılaştırmadan Çıkar' : 'Karşılaştır'}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-500 font-medium">{product.brand}</p>
            <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{product.sku}</span>
          </div>
          <h3 className="font-heading font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.shortDescription}</p>

          {/* Price */}
          <div className="mb-3">
            <div className="text-lg font-bold text-primary-700">
              {formatPrice(product.priceRange.min)} - {formatPrice(product.priceRange.max)} TL
            </div>
            {product.priceRange.note && (
              <p className="text-xs text-gray-500">{product.priceRange.note}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <span className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-medium group-hover:bg-primary-700 transition-colors">
              Detay <ArrowRight className="w-4 h-4" />
            </span>
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(`https://wa.me/905321234567?text=Merhaba, ${product.name} hakkında bilgi almak istiyorum.`, '_blank');
              }}
              className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl border border-green-500 text-green-600 hover:bg-green-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
