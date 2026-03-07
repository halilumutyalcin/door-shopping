'use client';

import React, { useState, useMemo } from 'react';
import { products } from '@/config/products.config';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter from '@/components/products/ProductFilter';

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(
      (p) => p.priceRange.min >= priceRange[0] && p.priceRange.max <= priceRange[1]
    );

    // Material filter
    if (selectedMaterials.length > 0) {
      result = result.filter((p) =>
        selectedMaterials.some((m) =>
          p.specs.material.toLowerCase().includes(m.toLowerCase())
        )
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.priceRange.min - b.priceRange.min);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceRange.max - a.priceRange.max);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popular':
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, selectedMaterials, priceRange, sortBy]);

  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <ProductFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedMaterials={selectedMaterials}
          onMaterialToggle={handleMaterialToggle}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalProducts={filteredProducts.length}
          isMobileOpen={isMobileFilterOpen}
          onMobileToggle={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        />
      </div>

      {/* Product Grid */}
      <div className="lg:col-span-3">
        {/* Desktop count + sort */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span> ürün bulundu
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-2">Bu kriterlere uygun ürün bulunamadı</p>
            <p className="text-gray-400 text-sm">Filtre kriterlerinizi değiştirmeyi deneyin</p>
          </div>
        )}
      </div>
    </div>
  );
}
