import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  background?: 'white' | 'gray' | 'dark' | 'gradient';
  className?: string;
}

const backgrounds = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  dark: 'bg-primary-950 text-white',
  gradient: 'bg-gradient-to-br from-primary-50 via-white to-accent-50',
};

export default function Section({
  children,
  id,
  background = 'white',
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', backgrounds[background], className)}
    >
      {children}
    </section>
  );
}
