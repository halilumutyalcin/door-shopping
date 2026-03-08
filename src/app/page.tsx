import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductShowcase from '@/components/sections/ProductShowcase';
import ServicesSection from '@/components/sections/ServicesSection';
import JsonLd from '@/components/seo/JsonLd';
import {
  generateLocalBusinessJsonLd,
  generateFAQPageJsonLd,
  generateWebSiteJsonLd,
} from '@/lib/jsonld';

// Lazy load below-the-fold sections
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'), {
  ssr: true,
});
const FeaturedProductsSection = dynamic(() => import('@/components/sections/FeaturedProductsSection'), {
  ssr: true,
});
const TeamSection = dynamic(() => import('@/components/sections/TeamSection'), {
  ssr: true,
});
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  ssr: true,
});
const BlogSection = dynamic(() => import('@/components/sections/BlogSection'), {
  ssr: true,
});
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  ssr: true,
});
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateLocalBusinessJsonLd()} />
      <JsonLd data={generateWebSiteJsonLd()} />
      <JsonLd data={generateFAQPageJsonLd()} />

      <HeroSection />
      <AboutSection />
      <ProductShowcase />
      <ServicesSection />
      <GallerySection />
      <FeaturedProductsSection />
      <TeamSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
