import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import { siteConfig, navigation } from '@/config/site.config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-gray-300">
      <Container>
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Firma Bilgisi */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold text-white">
                Kapı<span className="text-accent-500">Art</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center space-x-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.2 0 1.03.4 2.13.89 2.73a.36.36 0 0 1 .08.34l-.33 1.36c-.05.22-.17.27-.4.16-1.5-.7-2.43-2.89-2.43-4.65 0-3.78 2.75-7.26 7.93-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.6 7.46-6.22 7.46-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.14A12 12 0 1 0 12 0z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.24 8.24 0 0 0 4.76 1.5V6.76a4.79 4.79 0 0 1-1-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.page}
                    className="text-sm text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-accent-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  {siteConfig.contact.address.street},{' '}
                  {siteConfig.contact.address.district},{' '}
                  {siteConfig.contact.address.city}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-500 flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm text-gray-400 hover:text-accent-400 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-500 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-gray-400 hover:text-accent-400 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Çalışma Saatleri */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Çalışma Saatleri
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-0.5 text-accent-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  {siteConfig.hours.weekdays}
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-0.5 text-accent-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  {siteConfig.hours.weekend}
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-0.5 text-accent-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  {siteConfig.hours.sunday}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <Link
              href="/kvkk"
              className="text-gray-500 hover:text-accent-400 transition-colors"
            >
              KVKK
            </Link>
            <span className="text-gray-700">|</span>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-accent-400 transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <span className="text-gray-700">|</span>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-accent-400 transition-colors"
            >
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
