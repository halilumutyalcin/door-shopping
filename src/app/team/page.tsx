import type { Metadata } from 'next';
import { Mail, Phone, GraduationCap, Award } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import PageTransition from '@/components/ui/PageTransition';
import JsonLd from '@/components/seo/JsonLd';
import { teamMembers } from '@/config/site.config';
import { generatePersonJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Ekibimiz',
  description: 'KapıArt uzman kadrosu. Kapı sektöründe deneyimli danışman, iç mimar ve teknik uzmanlarımız.',
};

export default function TeamPage() {
  return (
    <PageTransition>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: 'Ana Sayfa', url: '/' },
          { name: 'Ekibimiz', url: '/team' },
        ])}
      />
      {teamMembers.map((member) => (
        <JsonLd key={member.id} data={generatePersonJsonLd(member)} />
      ))}

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white">
        <Container>
          <div className="max-w-3xl">
            <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider">
              Uzman Kadromuz
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-6">
              Ekibimiz
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Deneyimli ve uzman kadromuzla kapı seçimi, danışmanlık ve montaj
              hizmetlerinde yanınızdayız.
            </p>
          </div>
        </Container>
      </section>

      {/* Team Grid */}
      <Section background="gray">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="h-full overflow-hidden">
                {/* Member Photo Area */}
                <div className="relative h-56 bg-gradient-to-br from-primary-100 to-primary-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary-600">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="p-6 -mt-4">
                  <div className="text-center mb-4">
                    <h2 className="font-semibold text-primary-900 text-xl">
                      {member.name}
                    </h2>
                    <p className="text-accent-600 font-medium">{member.title}</p>
                  </div>
                  <p className="text-sm text-gray-500 text-center italic mb-4">
                    {member.specialization}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <GraduationCap className="w-4 h-4 text-primary-500" />
                      <span>{member.education}</span>
                    </div>
                    {member.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center space-x-2 text-gray-500">
                        <Award className="w-4 h-4 text-accent-500" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center space-x-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg hover:bg-primary-50 text-gray-500 hover:text-primary-600 transition-colors"
                      aria-label={`${member.name} e-posta`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="p-2 rounded-lg hover:bg-primary-50 text-gray-500 hover:text-primary-600 transition-colors"
                      aria-label={`${member.name} telefon`}
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
