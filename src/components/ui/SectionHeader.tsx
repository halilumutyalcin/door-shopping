'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  light = false,
  className,
}: SectionHeaderProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('text-center max-w-3xl mx-auto mb-12 md:mb-16', className)}
    >
      {subtitle && (
        <span
          className={cn(
            'text-sm font-semibold uppercase tracking-wider',
            light ? 'text-accent-400' : 'text-accent-600'
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4',
          light ? 'text-white' : 'text-primary-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-lg',
            light ? 'text-gray-300' : 'text-gray-600'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
