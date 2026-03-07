'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, GraduationCap, Award } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { teamMembers } from '@/config/site.config';

export default function TeamSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section id="team" background="gray">
      <Container>
        <SectionHeader
          subtitle="Uzman Kadromuz"
          title="Ekibimiz"
          description="Deneyimli ve uzman kadromuzla kapı seçimi, danışmanlık ve montaj hizmetlerinde yanınızdayız."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="p-6 h-full">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-primary-200 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-primary-700">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>

                <div className="text-center mb-4">
                  <h3 className="font-semibold text-primary-900 text-lg">
                    {member.name}
                  </h3>
                  <p className="text-accent-600 font-medium text-sm">
                    {member.title}
                  </p>
                </div>

                <p className="text-sm text-gray-600 mb-4 text-center">
                  {member.bio}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <GraduationCap className="w-4 h-4 text-primary-500" />
                    <span>{member.education}</span>
                  </div>
                  {member.certifications.map((cert, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2 text-gray-500"
                    >
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
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="p-2 rounded-lg hover:bg-primary-50 text-gray-500 hover:text-primary-600 transition-colors"
                    aria-label={`${member.name} telefon`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
