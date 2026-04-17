'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { productCategories, products } from '@/config/products.config';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter from '@/components/products/ProductFilter';

const PRODUCTS_PER_PAGE = 12;

export default function ProductCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const validCategoryIds = useMemo(() => new Set(productCategories.map((c) => c.id)), []);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    const normalizedCategory = validCategoryIds.has(categoryFromUrl) ? categoryFromUrl : '';

    if (normalizedCategory !== selectedCategory) {
      setSelectedCategory(normalizedCategory);
    }
  }, [searchParams, validCategoryIds, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(PRODUCTS_PER_PAGE);

    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  };

  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
    setVisibleCount(PRODUCTS_PER_PAGE);
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
          onCategoryChange={handleCategoryChange}
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.slice(0, visibleCount).map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  priority={index < 6}
                />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)}
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg"
                >
                  Daha Fazla Göster ({filteredProducts.length - visibleCount} ürün kaldı)
                </button>
              </div>
            )}
          </>
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
