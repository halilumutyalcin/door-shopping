import type { Metadata } from 'next';
import Image from 'next/image';
import { Award, Palette, ShieldCheck, Handshake, Eye, Target, MapPin, Star } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import PageTransition from '@/components/ui/PageTransition';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site.config';
import { generateBreadcrumbJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: `${siteConfig.name} hakkında detaylı bilgi. ${siteConfig.description}`,
};

const iconMap = {
  Kalite: Award,
  Estetik: Palette,
  Güvenlik: ShieldCheck,
  Güven: Handshake,
};

export default function AboutPage() {
  return (
    <PageTransition>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: 'Ana Sayfa', url: '/' },
          { name: 'Hakkımızda', url: '/about' },
        ])}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <Container>
          <div className="max-w-3xl">
            <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider">
              Hakkımızda
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-6">
              {siteConfig.about.subtitle}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {siteConfig.about.description[0]}
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                subtitle="Hikayemiz"
                title="2004'ten Bugüne"
                className="text-left mb-8"
              />
              {siteConfig.about.description.map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative rounded-2xl h-80 overflow-hidden shadow-lg">
              <Image
                src={siteConfig.showroom.image}
                alt="KapıArt Showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center space-x-2 text-white">
                  <MapPin className="w-5 h-5 text-accent-400" />
                  <span className="text-sm font-medium">500 m² Showroom Alanı</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section background="gray">
        <Container>
          <SectionHeader
            subtitle="Değerlerimiz"
            title="Bizi Biz Yapan Değerler"
            description="Her kapıda kalite, her hizmette güven."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.about.values.map((value, index) => {
              const Icon = iconMap[value.title as keyof typeof iconMap] || Award;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-primary-900 text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-50 rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-primary-200 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary-900 mb-4">
                Vizyonumuz
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Türkiye&apos;nin en güvenilir ve yenilikçi kapı markası olmak. Müşterilerimize
                en geniş ürün yelpazesini, en kaliteli malzemelerle sunarak sektörde
                öncü konumumuzu sürdürmek.
              </p>
            </div>
            <div className="bg-accent-50 rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-accent-200 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent-700" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary-900 mb-4">
                Misyonumuz
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Her eve güvenli, estetik ve kaliteli kapılar sunmak. Müşteri memnuniyetini
                her zaman ön planda tutarak, profesyonel danışmanlık ve kusursuz montaj
                hizmeti vermek.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Showroom */}
      <Section background="dark">
        <Container>
          <SectionHeader
            light
            subtitle="Showroom"
            title={siteConfig.showroom.title}
            description={siteConfig.showroom.description}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteConfig.showroom.features.map((feature, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <Star className="w-6 h-6 text-accent-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
