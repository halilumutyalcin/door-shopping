'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { testimonials } from '@/config/site.config';

export default function TestimonialsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section id="testimonials" background="dark">
      <Container>
        <SectionHeader
          light
          subtitle="Müşteri Yorumları"
          title="Müşterilerimiz Ne Diyor?"
          description="Binlerce mutlu müşterimizin deneyimlerini paylaştığı yorumlardan bazıları."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-8 h-8 text-accent-500/30" />
                <div className="flex items-center space-x-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-accent-400 fill-accent-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <p className="text-white font-medium">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
