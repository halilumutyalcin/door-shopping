'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Shield,
  DoorOpen,
  Home,
  LayoutGrid,
  Maximize,
  Flame,
  Wrench,
  Key,
  ArrowRight,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { serviceAreas } from '@/config/site.config';

const iconMap: Record<string, React.ElementType> = {
  Shield,
  DoorOpen,
  Home,
  LayoutGrid,
  Maximize,
  Flame,
  Wrench,
  Key,
};

export default function ServicesSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section id="services" background="white">
      <Container>
        <SectionHeader
          subtitle="Ürün & Hizmetler"
          title="Kapı Çözümlerimiz"
          description="İç kapıdan çelik kapıya, villa kapısından yangın kapısına kadar tüm kapı ihtiyaçlarınız için profesyonel çözümler sunuyoruz."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {serviceAreas.map((service, index) => {
            const Icon = iconMap[service.icon] || Shield;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Link href={`/services/${service.id}`}>
                  <Card className="h-full group cursor-pointer overflow-hidden">
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                          {service.features.length} Özellik
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-primary-900 mb-2 text-lg group-hover:text-primary-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-accent-600 group-hover:text-accent-700">
                        Ürünleri İncele
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
