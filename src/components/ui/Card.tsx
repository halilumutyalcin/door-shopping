'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.2 }}
        className={cn(
          'rounded-xl shadow-md border border-gray-100 bg-white overflow-hidden',
          className
        )}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl shadow-md border border-gray-100 bg-white overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}
