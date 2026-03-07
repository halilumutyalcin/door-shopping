import { siteConfig, serviceAreas, teamMembers, faqs } from '@/config/site.config';

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HomeGoodsStore', 'FurnitureStore'],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.district,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.country,
    },
    openingHours: [
      'Mo-Fr 09:00-19:00',
      'Sa 09:00-18:00',
      'Su 10:00-16:00',
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    image: `${siteConfig.url}/images/og-image.jpg`,
  };
}

export function generatePersonJsonLd(member: (typeof teamMembers)[0]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.title,
    description: member.bio,
    email: member.email,
    telephone: member.phone,
    image: `${siteConfig.url}${member.image}`,
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    knowsAbout: member.specialization,
  };
}

export function generateFAQPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };
}

export function generateProductJsonLd(service: (typeof serviceAreas)[0]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: service.title,
    description: service.description,
    category: 'Kapı',
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
