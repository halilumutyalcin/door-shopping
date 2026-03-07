import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductShowcase from '@/components/sections/ProductShowcase';
import ServicesSection from '@/components/sections/ServicesSection';
import GallerySection from '@/components/sections/GallerySection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';
import TeamSection from '@/components/sections/TeamSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogSection from '@/components/sections/BlogSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import JsonLd from '@/components/seo/JsonLd';
import {
  generateLocalBusinessJsonLd,
  generateFAQPageJsonLd,
  generateWebSiteJsonLd,
} from '@/lib/jsonld';

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
