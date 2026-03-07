'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, Trash2 } from 'lucide-react';
import { useCompare } from '@/hooks/useCompare';
import Button from '@/components/ui/Button';

export default function ProductCompareDrawer() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-primary-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Products */}
            <div className="flex items-center gap-3 overflow-x-auto flex-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary-700 shrink-0">
                <GitCompare className="w-5 h-5" />
                <span className="hidden sm:inline">Karşılaştırma</span>
                <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                  {items.length}/4
                </span>
              </div>

              {items.map((product) => {
                const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 shrink-0"
                  >
                    {primaryImage && (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={primaryImage.src}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate hidden sm:inline">
                      {product.name}
                    </span>
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Kaldır"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={clearCompare}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Temizle"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <Link href="/compare">
                <Button size="sm" variant="primary">
                  Karşılaştır ({items.length})
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
