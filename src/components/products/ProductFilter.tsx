'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { productCategories } from '@/config/products.config';

interface ProductFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedMaterials: string[];
  onMaterialToggle: (material: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalProducts: number;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

const materials = [
  'Çelik',
  'Ahşap',
  'MDF',
  'Laminat',
  'Lake',
  'Cam',
  'Alüminyum',
];

const sortOptions = [
  { value: 'recommended', label: 'Önerilen' },
  { value: 'price-asc', label: 'Fiyat (Düşük → Yüksek)' },
  { value: 'price-desc', label: 'Fiyat (Yüksek → Düşük)' },
  { value: 'newest', label: 'En Yeni' },
  { value: 'popular', label: 'Popüler' },
];

export default function ProductFilter({
  selectedCategory,
  onCategoryChange,
  selectedMaterials,
  onMaterialToggle,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  totalProducts,
  isMobileOpen,
  onMobileToggle,
}: ProductFilterProps) {
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Kategori</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('')}
            className={cn(
              'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
              !selectedCategory
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            Tümü
          </button>
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                selectedCategory === cat.id
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {cat.title}
              <span className="text-xs text-gray-400 ml-1">({cat.productCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Fiyat Aralığı</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500">Min (TL)</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
                min={0}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500">Max (TL)</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                min={0}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="100000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Material Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Malzeme</h3>
        <div className="space-y-2">
          {materials.map((material) => (
            <label
              key={material}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material)}
                onChange={() => onMaterialToggle(material)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                {material}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">{totalProducts}</span> ürün bulundu
        </p>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            onClick={onMobileToggle}
            className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtrele
          </button>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/40" onClick={onMobileToggle} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10">
              <h2 className="font-heading font-semibold text-lg">Filtrele</h2>
              <button
                onClick={onMobileToggle}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-lg">Filtrele</h2>
            <p className="text-sm text-gray-500">{totalProducts} ürün</p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">Sıralama:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <FilterContent />
        </div>
      </div>
    </>
  );
}
