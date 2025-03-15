/** @type {import('next').NextConfig} */
const nextConfig = {
  // الإعدادات الحالية
  images: {
    domains: ['alamridhafer.com'],
    unoptimized: false, // يمكنك تعيين هذا إلى true إذا كنت لا تريد تحسين الصور
  },
  
  // إضافة إعدادات SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ]
  },

  // تكوين إعادة التوجيه
  async redirects() {
    return [
      // إعادة توجيه من www إلى non-www (الإصدار القياسي)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.alamridhafer.com',
          },
        ],
        destination: 'https://alamridhafer.com/:path*',
        permanent: true,
      },
      // إعادة توجيه من HTTP إلى HTTPS
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://alamridhafer.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
