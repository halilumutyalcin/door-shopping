import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Shield, DoorOpen, Home, LayoutGrid, Maximize, Flame, Wrench, Key,
  ChevronRight, CheckCircle, Phone, ArrowLeft, ArrowRight,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import PageTransition from '@/components/ui/PageTransition';
import JsonLd from '@/components/seo/JsonLd';
import { serviceAreas, siteConfig } from '@/config/site.config';
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';

const iconMap: Record<string, React.ElementType> = {
  Shield, DoorOpen, Home, LayoutGrid, Maximize, Flame, Wrench, Key,
};

const steps = [
  { num: '01', title: 'Ölçü', desc: 'Ücretsiz adrese ölçü alma hizmeti' },
  { num: '02', title: 'Seçim', desc: 'Model, renk ve aksesuar seçimi' },
  { num: '03', title: 'Üretim', desc: 'Siparişiniz hazırlanır' },
  { num: '04', title: 'Montaj', desc: 'Profesyonel montaj ve teslim' },
];

interface ServiceDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return serviceAreas.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const service = serviceAreas.find((s) => s.id === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = serviceAreas.find((s) => s.id === params.slug);
  if (!service) notFound();

  const currentIndex = serviceAreas.findIndex((s) => s.id === params.slug);
  const prevService = currentIndex > 0 ? serviceAreas[currentIndex - 1] : null;
  const nextService = currentIndex < serviceAreas.length - 1 ? serviceAreas[currentIndex + 1] : null;
  const relatedServices = serviceAreas.filter((s) => s.id !== params.slug).slice(0, 4);
  const Icon = iconMap[service.icon] || Shield;

  return (
    <PageTransition>
      <JsonLd data={generateProductJsonLd(service)} />
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: 'Ana Sayfa', url: '/' },
          { name: 'Ürünlerimiz', url: '/services' },
          { name: service.title, url: `/services/${service.id}` },
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
            <Link href="/services" className="hover:text-primary-600 transition-colors">
              Ürünlerimiz
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary-700 font-medium">{service.title}</span>
          </nav>
        </Container>
      </section>

      {/* Content */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Product Hero Image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h1 className="font-heading text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                      {service.title}
                    </h1>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Features Grid */}
              <h2 className="font-heading text-2xl font-bold text-primary-900 mb-4">
                Özellikler
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-3 bg-gray-50 rounded-lg p-4"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Process */}
              <h2 className="font-heading text-2xl font-bold text-primary-900 mb-6">
                Sipariş Süreci
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {steps.map((step) => (
                  <div key={step.num} className="text-center p-4 bg-primary-50 rounded-xl">
                    <span className="text-3xl font-heading font-bold text-accent-500">
                      {step.num}
                    </span>
                    <h3 className="font-semibold text-primary-900 mt-2">{step.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-primary-950 text-white rounded-xl p-6">
                <h3 className="font-heading text-xl font-bold mb-3">
                  Ücretsiz Teklif Al
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {service.title} hakkında detaylı bilgi ve fiyat teklifi almak için
                  bize ulaşın.
                </p>
                <Link href="/contact">
                  <Button variant="secondary" className="w-full mb-3">
                    Teklif İste
                  </Button>
                </Link>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center justify-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </div>

              {/* Related Services */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-primary-900 mb-4">
                  Diğer Ürünlerimiz
                </h3>
                <ul className="space-y-2">
                  {relatedServices.map((rs) => {
                    return (
                      <li key={rs.id}>
                        <Link
                          href={`/services/${rs.id}`}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white transition-colors group/rs"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={rs.image}
                              alt={rs.title}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <span className="text-sm text-gray-700 group-hover/rs:text-primary-600">
                            {rs.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Prev/Next Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
            {prevService ? (
              <Link
                href={`/services/${prevService.id}`}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{prevService.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextService ? (
              <Link
                href={`/services/${nextService.id}`}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                <span>{nextService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-950 text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Hayalinizdeki Kapıyı Birlikte Seçelim
            </h2>
            <p className="text-gray-300 mb-8">
              Showroom&apos;umuzu ziyaret edin, 200+ kapı modelini yerinde görün.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Ücretsiz Ölçü Randevusu
                </Button>
              </Link>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  WhatsApp ile Ulaşın
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
