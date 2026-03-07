import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, ChevronRight, ArrowLeft, Share2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import PageTransition from '@/components/ui/PageTransition';
import JsonLd from '@/components/seo/JsonLd';
import { blogArticles } from '@/config/blog.config';
import { siteConfig } from '@/config/site.config';
import { generateBreadcrumbJsonLd } from '@/lib/jsonld';

interface BlogDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const article = blogArticles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const article = blogArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const relatedArticles = blogArticles
    .filter((a) => a.slug !== params.slug && a.category === article.category)
    .slice(0, 3);

  const shareUrl = `${siteConfig.url}/blog/${article.slug}`;

  return (
    <PageTransition>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: 'Ana Sayfa', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: article.title, url: `/blog/${article.slug}` },
        ])}
      />

      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-gray-50 border-b border-gray-100">
        <Container>
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary-600 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary-700 font-medium line-clamp-1">
              {article.title}
            </span>
          </nav>
        </Container>
      </section>

      <Section background="white">
        <Container size="md">
          {/* Article Hero Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <span className="inline-block text-sm font-medium text-accent-600 bg-accent-50 px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-700">
                    {article.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <span className="font-medium text-gray-700">{article.author}</span>
              </div>
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(article.publishDate).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} okuma</span>
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="article-content">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-6 flex items-center space-x-4">
            <Share2 className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Paylaş:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-700 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-600 hover:underline"
            >
              Pinterest
            </a>
          </div>

          {/* Back */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tüm Yazılara Dön</span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section background="gray">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-primary-900 mb-8 text-center">
              İlgili Yazılar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((ra) => (
                <Link key={ra.id} href={`/blog/${ra.slug}`}>
                  <Card className="h-full group cursor-pointer overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={ra.image}
                        alt={ra.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute top-2 left-2 text-xs font-medium text-white bg-primary-600/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {ra.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-primary-900 line-clamp-2 group-hover:text-primary-700 transition-colors">
                        {ra.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2">{ra.readTime}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </PageTransition>
  );
}
