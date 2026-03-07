import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield, DoorOpen, Home, LayoutGrid, Maximize, Flame, Wrench, Key, ArrowRight,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import PageTransition from '@/components/ui/PageTransition';
import JsonLd from '@/components/seo/JsonLd';
import { serviceAreas } from '@/config/site.config';
import { generateBreadcrumbJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Ürünlerimiz & Hizmetlerimiz',
  description:
    'Çelik kapı, iç kapı, villa kapısı, amerikan panel kapı, cam kapı, yangın kapısı ve kapı montaj hizmetleri.',
};

const iconMap: Record<string, React.ElementType> = {
  Shield, DoorOpen, Home, LayoutGrid, Maximize, Flame, Wrench, Key,
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: 'Ana Sayfa', url: '/' },
          { name: 'Ürünlerimiz', url: '/services' },
        ])}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <Container>
          <div className="max-w-3xl">
            <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider">
              Ürün & Hizmetler
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-6">
              Kapı Çözümlerimiz
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              İç kapıdan çelik kapıya, villa kapısından yangın kapısına kadar tüm kapı
              ihtiyaçlarınız için profesyonel çözümler.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((service) => {
              const Icon = iconMap[service.icon] || Shield;
              return (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <Card className="h-full group cursor-pointer overflow-hidden">
                    {/* Product Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="font-semibold text-primary-900 mb-2 text-lg group-hover:text-primary-700 transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-sm text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-1.5 mb-4">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="text-xs text-gray-500 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center text-sm font-medium text-accent-600 group-hover:text-accent-700">
                        Ürünleri İncele
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
