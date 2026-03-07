/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.kapiart.com.tr',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority settings
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (
      path === '/about' ||
      path === '/services' ||
      path === '/team' ||
      path === '/contact'
    ) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/services/')) {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog/')) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (
      path === '/kvkk' ||
      path === '/privacy' ||
      path === '/terms'
    ) {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
