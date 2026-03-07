'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import PageTransition from '@/components/ui/PageTransition';
import { blogArticles, blogCategories } from '@/config/blog.config';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = blogArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'Tümü' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <Container>
          <div className="max-w-3xl">
            <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider">
              Blog
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-6">
              Kapı Dünyasından Yazılar
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Kapı seçimi, bakım, güvenlik ve dekorasyon hakkında uzman
              bilgilerimizi paylaşıyoruz.
            </p>
          </div>
        </Container>
      </section>

      <Section background="gray">
        <Container>
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Yazı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <Card className="h-full group cursor-pointer overflow-hidden">
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
                      <h2 className="font-semibold text-primary-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                        {article.title}
                      </h2>
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
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Aramanızla eşleşen yazı bulunamadı.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </PageTransition>
  );
}
