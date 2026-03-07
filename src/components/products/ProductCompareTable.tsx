'use client';

import React from 'react';
import Image from 'next/image';
import { X, Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCompare } from '@/hooks/useCompare';
import { compareColumns, formatPrice } from '@/config/products.config';
import type { Product } from '@/config/products.config';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const badgeVariantMap: Record<string, 'new' | 'popular' | 'discount' | 'custom'> = {
  Yeni: 'new',
  'Popüler': 'popular',
  'Çok Satan': 'popular',
  'Kampanyalı': 'discount',
  'Sınırlı Stok': 'custom',
};

export default function ProductCompareTable() {
  const { items, removeFromCompare } = useCompare();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-4">Karşılaştırmak için ürün seçin</p>
        <a href="/products">
          <Button variant="primary">Ürünleri Keşfet</Button>
        </a>
      </div>
    );
  }

  const getSpecValue = (product: Product, key: string): string => {
    const specs = product.specs as Record<string, unknown>;
    const val = specs[key];
    if (Array.isArray(val)) return val.join(', ');
    if (val === undefined || val === null) return '-';
    return String(val);
  };

  const areValuesDifferent = (key: string): boolean => {
    if (items.length < 2) return false;
    const values = items.map((p) => getSpecValue(p, key));
    return new Set(values).size > 1;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="w-40 p-4 text-left text-sm font-medium text-gray-500 bg-gray-50 rounded-tl-xl" />
            {items.map((product) => {
              const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
              return (
                <th key={product.id} className="p-4 bg-gray-50 last:rounded-tr-xl min-w-[200px]">
                  <div className="space-y-3">
                    {/* Remove */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Image */}
                    {primaryImage && (
                      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mx-auto max-w-[180px]">
                        <Image
                          src={primaryImage.src}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="180px"
                        />
                      </div>
                    )}
                    {/* Name */}
                    <div>
                      {product.badge && (
                        <Badge variant={badgeVariantMap[product.badge] || 'default'} className="mb-1">
                          {product.badge}
                        </Badge>
                      )}
                      <h3 className="font-heading font-semibold text-gray-900 text-sm">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* Price Row */}
          <tr className="border-b border-gray-100">
            <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50/50">Fiyat</td>
            {items.map((product) => (
              <td key={product.id} className="p-4 text-center">
                <div className="text-lg font-bold text-primary-700">
                  {formatPrice(product.priceRange.min)} - {formatPrice(product.priceRange.max)} TL
                </div>
                {product.priceRange.note && (
                  <p className="text-xs text-gray-500 mt-0.5">{product.priceRange.note}</p>
                )}
              </td>
            ))}
          </tr>

          {/* Spec Rows */}
          {compareColumns.map((col) => {
            const isDiff = areValuesDifferent(col.key);
            return (
              <tr key={col.key} className="border-b border-gray-100">
                <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50/50">
                  {col.label}
                </td>
                {items.map((product) => {
                  const value = getSpecValue(product, col.key);
                  return (
                    <td
                      key={product.id}
                      className={cn(
                        'p-4 text-center text-sm',
                        value === '-' ? 'text-gray-300' : isDiff ? 'font-semibold text-primary-700' : 'text-gray-700'
                      )}
                    >
                      {value === '-' ? <Minus className="w-4 h-4 mx-auto text-gray-300" /> : value}
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {/* Features Row */}
          <tr className="border-b border-gray-100">
            <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50/50">Özellikler</td>
            {items.map((product) => (
              <td key={product.id} className="p-4">
                <ul className="space-y-1.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* CTA Row */}
          <tr>
            <td className="p-4 bg-gray-50/50 rounded-bl-xl" />
            {items.map((product, i) => (
              <td key={product.id} className={cn('p-4 text-center', i === items.length - 1 && 'rounded-br-xl')}>
                <div className="space-y-2">
                  <a href={`/products/${product.slug}`}>
                    <Button variant="primary" size="sm" className="w-full">
                      Teklif Al
                    </Button>
                  </a>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    × Kaldır
                  </button>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
