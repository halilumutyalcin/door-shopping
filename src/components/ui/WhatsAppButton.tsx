'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappNumber = siteConfig.contact.whatsapp.replace(/\D/g, '');
  const message = encodeURIComponent(
    `Merhaba, ${siteConfig.name} web sitesinden ulaşıyorum. Bilgi almak istiyorum.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute bottom-0 right-16 bg-white rounded-xl shadow-xl p-4 w-64 border border-gray-100"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-sm text-gray-800 font-medium mb-2">
              💬 Size nasıl yardımcı olabiliriz?
            </p>
            <p className="text-xs text-gray-500 mb-3">
              WhatsApp üzerinden anında iletişime geçin
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-green-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Sohbete Başla
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="p-4 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        aria-label="WhatsApp ile iletişime geçin"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
