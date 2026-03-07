import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieConsent from '@/components/ui/CookieConsent';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { CompareProvider } from '@/hooks/useCompare';
import ProductCompareDrawer from '@/components/products/ProductCompareDrawer';
import { siteMetadata, siteConfig } from '@/config/site.config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body antialiased">
        <CompareProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ProductCompareDrawer />
          <WhatsAppButton />
          <ScrollToTop />
          <CookieConsent />
        </CompareProvider>
      </body>
    </html>
  );
}
