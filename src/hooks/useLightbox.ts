'use client';

import { useState, useCallback } from 'react';

interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  images: { src: string; alt: string }[];
}

export function useLightbox() {
  const [state, setState] = useState<LightboxState>({
    isOpen: false,
    currentIndex: 0,
    images: [],
  });

  const openLightbox = useCallback((images: { src: string; alt: string }[], index = 0) => {
    setState({ isOpen: true, currentIndex: index, images });
  }, []);

  const closeLightbox = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const nextImage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  }, []);

  const prevImage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  }, []);

  const goToImage = useCallback((index: number) => {
    setState((prev) => ({ ...prev, currentIndex: index }));
  }, []);

  return {
    isOpen: state.isOpen,
    currentIndex: state.currentIndex,
    images: state.images,
    currentImage: state.images[state.currentIndex],
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
    goToImage,
  };
}
