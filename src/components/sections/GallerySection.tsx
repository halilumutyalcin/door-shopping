'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projectGallery } from '@/config/products.config';
import BeforeAfterSlider from '@/components/products/BeforeAfterSlider';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

export default function GallerySection() {
  const featured = projectGallery.slice(0, 3);

  return (
    <section id="gallery" className="py-20 bg-white">
      <Container>
        <SectionHeader
          subtitle="Projelerimiz"
          title="Montaj Öncesi / Sonrası"
          description="Gerçekleştirdiğimiz montaj projelerinden öncesi ve sonrası karşılaştırmalarını inceleyin."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <BeforeAfterSlider
                  before={project.before}
                  after={project.after}
                />
                <div className="p-4">
                  <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-semibold text-gray-900 mt-2 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Tüm Projeleri Gör
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
