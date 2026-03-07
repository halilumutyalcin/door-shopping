'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLightbox } from '@/hooks/useLightbox';
import ImageLightbox from '@/components/ui/ImageLightbox';
import type { ProductImage } from '@/config/products.config';

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName?: string;
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const lightbox = useLightbox();

  const lightboxImages = images.map((img) => ({ src: img.src, alt: img.alt }));
  const currentImage = images[selectedIndex];

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {currentImage && (
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={selectedIndex === 0}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Zoom Button */}
          <button
            onClick={() => lightbox.openLightbox(lightboxImages, selectedIndex)}
            className="absolute bottom-4 right-4 p-3 bg-white/90 hover:bg-white rounded-xl shadow-lg text-gray-700 hover:text-primary-700 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Büyüt"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={cn(
                  'relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden transition-all',
                  i === selectedIndex
                    ? 'ring-2 ring-primary-500 ring-offset-2 opacity-100'
                    : 'opacity-60 hover:opacity-90'
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        onClose={lightbox.closeLightbox}
        onNext={lightbox.nextImage}
        onPrev={lightbox.prevImage}
        onGoTo={lightbox.goToImage}
      />
    </>
  );
}
