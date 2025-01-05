import '@/app/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import type { Metadata, Viewport } from 'next'
import { Breadcrumbs } from '@/components/breadcrumbs'


// هذا السطر يقوم باستيراد خط Inter وهو خط لاتيني يستخدم للغة الإنجليزية
// بما أن موقعنا باللغة العربية، نحتاج لاستخدام خط عربي بدلاً منه
// يمكننا استخدام خط Noto Kufi Arabic مثلاً:
import { Noto_Kufi_Arabic } from 'next/font/google'
const arabic = Noto_Kufi_Arabic({ subsets: ['arabic'] })

export const metadata = {
  title: 'أبو عمر للعقار | وسيط عقاري معتمد في مكة والطائف',
  description: 'خبراء في إدارة الأملاك والعقارات في السعودية. خدمات التوثيق العقاري، العقود، إدارة الأملاك، والاستشارات العقارية في مكة والطائف. رخصة وساطة عقارية معتمدة.',
  keywords: 'عقارات مكة, عقارات الطائف, وسيط عقاري, إدارة أملاك, توثيق عقاري, استشارات عقارية, ظافر أبو حربة العمري، مكتب عقار، ذوي حجي، السيل، تعقيب، عقاري، الدريم العقارية، بيت للبيع، شقة إيجار، شقة أجار، منصة إحكام، منصة إيجار، منصه اجار، منصه ايجار، منصه إيجار، منصة ايجار، منصة اجار، عقد اكتروني، عقد الكتروني، عقد إلكتروني، عقد إكتروني، مكتب عقار في مكة، مكتب عقار في السيل الصغير، مكتب عقار في السيل، مكتب عقار في الطائف، مكتب عقار في الطايف، مكتب الاصيفر، شقق الاصيفر، شقق العبيكان، شقق تمليك',
  authors: [{ name: 'أبو عمر للعقار' }],
  openGraph: {
    title: 'أبو عمر للعقار | وسيط عقاري معتمد',
    description: 'خبراء في إدارة الأملاك والعقارات في السعودية. خدمات التوثيق العقاري والاستشارات في مكة والطائف.',
    type: 'website',
    url: 'https://alamridhafer.com',
    locale: 'ar_SA',
    siteName: 'أبو عمر للعقار',
    images: '/og.png',
  },
  icons: {
    icon: '/icon-D.svg',
    apple: '/icon-D.svg',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://alamridhafer.com',
  },
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta 
          name="google-site-verification" 
          content="YOUR-VERIFICATION-CODE"
        />
        
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR-GA-ID');
            `,
          }}
        />
      </head>
      <body className={`${arabic.className} min-h-screen flex flex-col`}>
        <Header />
        <Breadcrumbs />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  )
}

