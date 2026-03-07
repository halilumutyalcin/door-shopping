'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Palette, ShieldCheck, Handshake } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { siteConfig } from '@/config/site.config';

const iconMap: Record<string, React.ElementType> = {
  Kalite: Award,
  Estetik: Palette,
  Güvenlik: ShieldCheck,
  Güven: Handshake,
};

export default function AboutSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section id="about" background="gradient">
      <Container>
        <SectionHeader
          subtitle={siteConfig.about.subtitle}
          title={siteConfig.about.title}
          description={siteConfig.about.description[0]}
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {siteConfig.about.description.map((paragraph, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {siteConfig.about.values.map((value, index) => {
              const Icon = iconMap[value.title] || Award;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
