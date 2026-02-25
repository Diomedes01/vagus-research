/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://vagusresearch.com',
  generateRobotsTxt: false,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    // Custom priorities
    let priority = 0.7
    if (path === '/') priority = 1.0
    else if (path.startsWith('/library/') && path !== '/library') priority = 0.8
    else if (path === '/library' || path === '/evidence') priority = 0.9

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
