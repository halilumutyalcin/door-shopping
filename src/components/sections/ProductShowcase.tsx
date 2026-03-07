'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, GitCompare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { products, formatPrice } from '@/config/products.config';
import { useCompare } from '@/hooks/useCompare';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const badgeVariantMap: Record<string, 'new' | 'popular' | 'discount' | 'custom'> = {
  Yeni: 'new',
  'Popüler': 'popular',
  'Çok Satan': 'popular',
  'Kampanyalı': 'discount',
  'Sınırlı Stok': 'custom',
};

export default function ProductShowcase() {
  const featuredProducts = products.filter((p) => p.isFeatured);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const { addToCompare, removeFromCompare, isInCompare, isFull } = useCompare();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="products" className="py-20 bg-gray-50">
      <Container>
        <SectionHeader
          subtitle="Öne Çıkan Ürünler"
          title="En Çok Tercih Edilen Kapı Modelleri"
          description="Müşterilerimizin en beğendiği, kalite ve estetiği bir arada sunan kapı modellerimizi keşfedin."
        />

        <div className="relative mt-12">
          {/* Carousel */}
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex -ml-4">
              {featuredProducts.map((product, index) => {
                const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
                const secondaryImage = product.images[1];
                const inCompare = isInCompare(product.id);

                return (
                  <div
                    key={product.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] pl-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="group block bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
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
                            />
                          )}
                          {secondaryImage && (
                            <Image
                              src={secondaryImage.src}
                              alt={secondaryImage.alt}
                              fill
                              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                          )}

                          {product.badge && (
                            <div className="absolute top-3 left-3 z-10">
                              <Badge variant={badgeVariantMap[product.badge] || 'default'}>
                                {product.badge}
                              </Badge>
                            </div>
                          )}

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (inCompare) {
                                removeFromCompare(product.id);
                              } else if (!isFull) {
                                addToCompare(product);
                              }
                            }}
                            className={cn(
                              'absolute top-3 right-3 z-10 p-2 rounded-full transition-all',
                              inCompare
                                ? 'bg-accent-500 text-white'
                                : 'bg-white/80 text-gray-600 hover:bg-white opacity-0 group-hover:opacity-100'
                            )}
                          >
                            <GitCompare className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <p className="text-xs text-gray-500 font-medium mb-1">{product.brand}</p>
                          <h3 className="font-heading font-semibold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-1 mb-1">
                            {product.name}
                          </h3>
                          <div className="text-primary-700 font-bold">
                            {formatPrice(product.priceRange.min)} - {formatPrice(product.priceRange.max)} TL
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={cn(
              'absolute -left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg border border-gray-200 transition-all z-10',
              canScrollPrev ? 'hover:bg-primary-50 hover:border-primary-200' : 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Önceki"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={cn(
              'absolute -right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg border border-gray-200 transition-all z-10',
              canScrollNext ? 'hover:bg-primary-50 hover:border-primary-200' : 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Sonraki"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Tüm Ürünleri Gör
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
