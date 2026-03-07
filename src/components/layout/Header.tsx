'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig, navigation } from '@/config/site.config';
import { productCategories, products } from '@/config/products.config';
import { scrollToSection } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const featuredProduct = products.find((p) => p.isFeatured);
  const featuredImage = featuredProduct?.images.find((img) => img.isPrimary) || featuredProduct?.images[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (item: (typeof navigation)[0]) => {
    if (isHomePage && item.section) {
      scrollToSection(item.section);
    }
  };

  const isActive = (item: (typeof navigation)[0]) => {
    if (item.page === '/') return pathname === '/';
    return pathname.startsWith(item.page);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !isHomePage
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div
              className={cn(
                'text-2xl md:text-3xl font-heading font-bold transition-colors',
                isScrolled || !isHomePage ? 'text-primary-800' : 'text-white'
              )}
            >
              Kapı<span className="text-accent-500">Art</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5">
            {navigation.map((item) => {
              const isProductsMenu = item.page === '/products';

              if (isProductsMenu) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                  >
                    <Link
                      href={isHomePage && item.section && item.page === '/' ? `#${item.section}` : item.page}
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        'relative px-3 py-2 text-sm font-medium transition-colors rounded-lg inline-flex items-center gap-1 whitespace-nowrap',
                        isScrolled || !isHomePage
                          ? isActive(item)
                            ? 'text-primary-700'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                          : isActive(item)
                          ? 'text-white'
                          : 'text-gray-200 hover:text-white'
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', isMegaMenuOpen && 'rotate-180')} />
                      {isActive(item) && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-500"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Mega Menu */}
                    <AnimatePresence>
                      {isMegaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50"
                        >
                          <div className="grid grid-cols-3 gap-4">
                            {/* Categories */}
                            <div className="col-span-2">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Kategoriler</p>
                              <div className="grid grid-cols-2 gap-1">
                                {productCategories.map((cat) => (
                                  <Link
                                    key={cat.id}
                                    href={`/products?category=${cat.id}`}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors group"
                                  >
                                    <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                                      <Image src={cat.image} alt={cat.title} fill className="object-cover" sizes="32px" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">{cat.title}</span>
                                      <span className="block text-xs text-gray-400">{cat.productCount} ürün</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <Link
                                  href="/products"
                                  className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                                >
                                  Tüm Ürünleri Gör →
                                </Link>
                              </div>
                            </div>

                            {/* Featured Product */}
                            {featuredProduct && featuredImage && (
                              <div className="col-span-1">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Öne Çıkan</p>
                                <Link
                                  href={`/products/${featuredProduct.slug}`}
                                  className="block rounded-xl overflow-hidden group"
                                >
                                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                                    <Image
                                      src={featuredImage.src}
                                      alt={featuredImage.alt}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                                      sizes="200px"
                                    />
                                  </div>
                                  <p className="text-sm font-semibold text-gray-900 mt-2 group-hover:text-primary-700 transition-colors">
                                    {featuredProduct.name}
                                  </p>
                                </Link>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={isHomePage && item.section && item.page === '/' ? `#${item.section}` : item.page}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors rounded-lg whitespace-nowrap',
                    isScrolled || !isHomePage
                      ? isActive(item)
                        ? 'text-primary-700'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      : isActive(item)
                      ? 'text-white'
                      : 'text-gray-200 hover:text-white'
                  )}
                >
                  {item.name}
                  {isActive(item) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'p-2 rounded-lg transition-colors',
                isScrolled || !isHomePage
                  ? 'text-green-600 hover:bg-green-50'
                  : 'text-green-400 hover:text-green-300'
              )}
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className={cn(
                'flex items-center space-x-2 text-sm font-medium transition-colors',
                isScrolled || !isHomePage
                  ? 'text-primary-700 hover:text-primary-800'
                  : 'text-white hover:text-gray-200'
              )}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{siteConfig.contact.phone}</span>
            </a>
            <Link href="/contact">
              <Button size="sm" variant="secondary">
                Ücretsiz Teklif
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isScrolled || !isHomePage
                ? 'text-primary-800 hover:bg-primary-50'
                : 'text-white hover:bg-white/10'
            )}
            aria-label="Menüyü aç"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.page}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(item)
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-accent-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-primary-700"
                >
                  <Phone className="w-4 h-4" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
                <Link href="/contact" className="block mt-2">
                  <Button className="w-full" variant="secondary" size="md">
                    Ücretsiz Teklif Al
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
