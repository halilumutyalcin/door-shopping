'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 shadow-2xl p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <Cookie className="w-8 h-8 text-primary-500 flex-shrink-0 hidden md:block" />
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                Bu web sitesi, deneyiminizi geliştirmek için çerezler kullanmaktadır.
                Sitemizi kullanarak{' '}
                <Link
                  href="/kvkk"
                  className="text-primary-600 hover:underline font-medium"
                >
                  KVKK Aydınlatma Metni
                </Link>{' '}
                ve{' '}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:underline font-medium"
                >
                  Gizlilik Politikası
                </Link>
                &apos;mızı kabul etmiş olursunuz.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={acceptEssential}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sadece Zorunlu
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Tümünü Kabul Et
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
