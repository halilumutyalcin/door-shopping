'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { blogArticles } from '@/config/blog.config';

export default function BlogSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const latestArticles = blogArticles.slice(0, 3);

  return (
    <Section id="blog" background="gray">
      <Container>
        <SectionHeader
          subtitle="Blog"
          title="Kapı Dünyasından Yazılar"
          description="Kapı seçimi, bakım, güvenlik ve dekorasyon hakkında uzman bilgilerimizi paylaşıyoruz."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {latestArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Link href={`/blog/${article.slug}`}>
                <Card className="h-full group cursor-pointer overflow-hidden">
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-medium text-white bg-primary-600/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(article.publishDate).toLocaleDateString(
                            'tr-TR',
                            { day: 'numeric', month: 'long', year: 'numeric' }
                          )}
                        </span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>
                    <h3 className="font-semibold text-primary-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-accent-600 group-hover:text-accent-700">
                      Devamını Oku
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-primary-600 text-primary-700 rounded-lg hover:bg-primary-50 font-medium transition-colors"
            >
              <span>Tüm Yazıları Gör</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
