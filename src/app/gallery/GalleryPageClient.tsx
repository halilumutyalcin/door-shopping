'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projectGallery } from '@/config/products.config';
import BeforeAfterSlider from '@/components/products/BeforeAfterSlider';

const categories = ['Tümü', ...Array.from(new Set(projectGallery.map((p) => p.category)))];

export default function GalleryPageClient() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const filtered = selectedCategory === 'Tümü'
    ? projectGallery
    : projectGallery.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              selectedCategory === cat
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
          >
            <BeforeAfterSlider
              before={project.before}
              after={project.after}
            />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-primary-900 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
          Projeniz İçin Teklif Alın
        </h2>
        <p className="text-primary-200 mb-6 max-w-xl mx-auto">
          Eviniz veya iş yeriniz için kapı montaj projesi planlıyorsanız, ücretsiz keşif ve teklif için bizimle iletişime geçin.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-600 transition-colors"
        >
          Ücretsiz Keşif Talep Et
        </a>
      </div>
    </>
  );
}
