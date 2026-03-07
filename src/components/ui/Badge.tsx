import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'new' | 'popular' | 'discount' | 'custom' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: 'bg-green-100 text-green-700 border-green-200',
  popular: 'bg-accent-100 text-accent-700 border-accent-200',
  discount: 'bg-red-100 text-red-700 border-red-200',
  custom: 'bg-primary-100 text-primary-700 border-primary-200',
  default: 'bg-gray-100 text-gray-700 border-gray-200',
};

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
