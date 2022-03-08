/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja'
  },
  images: {
    domains: [
      'i.creativecommons.org',
      'thumbnail.image.rakuten.co.jp',
    ],
    minimumCacheTTL: 86400,
  }
}
