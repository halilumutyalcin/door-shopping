'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { featuredProducts } from '@/config/site.config';

export default function FeaturedProductsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section id="products" background="gradient">
      <Container>
        <SectionHeader
          subtitle="Öne Çıkan Ürünler"
          title="En Çok Tercih Edilen Modellerimiz"
          description="Müşterilerimizin en beğendiği kapı modellerini keşfedin. Her bütçeye ve tarza uygun seçenekler."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * index }}
            >
              <Link href={`/services/${product.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        {product.badge}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-white/80 text-xs font-medium bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-semibold text-primary-900 text-lg mb-3 group-hover:text-primary-700 transition-colors">
                      {product.name}
                    </h3>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-accent-600 font-semibold">
                        Fiyat İçin Arayın
                      </span>
                      <span className="inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                        İncele
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/services">
            <Button variant="primary" size="lg">
              Tüm Ürünleri Görüntüle
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
