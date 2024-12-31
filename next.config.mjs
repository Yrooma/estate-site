/** @type {import('next').NextConfig} */
const nextConfig = {
  // الإعدادات الحالية
  images: {
    domains: ['alamridhafer.com'],
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
      // يمكنك إضافة إعادة توجيه هنا إذا لزم الأمر
    ]
  },
}

export default nextConfig
