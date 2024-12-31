import '@/app/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ScrollToTopButton from '@/components/scroll-to-top-button'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ظافر أبو حربة العمري للعقارات | وسيط عقاري معتمد في مكة والطائف',
  description: 'خبراء في إدارة الأملاك والعقارات في السعودية. خدمات التوثيق العقاري، العقود، إدارة الأملاك، والاستشارات العقارية في مكة والطائف. رخصة وساطة عقارية معتمدة.',
  keywords: 'عقارات مكة, عقارات الطائف, وسيط عقاري, إدارة أملاك, توثيق عقاري, استشارات عقارية, ظافر أبو حربة العمري، مكتب عقار، ذوي حجي، السيل، تعقيب، عقاري، الدريم العقارية، بيت للبيع، شقة إيجار، شقة أجار، منصة إحكام، منصة إيجار، منصه اجار، منصه ايجار، منصه إيجار، منصة غيجار، منصة اجار، عقد اكتروني، عقد الكتروني، عقد إلكتروني، عقد إكتروني، مكتب عقار في مكة، مكتب عقار في السيل الصغيرن مكتب عقار في السيل، مكتب عقار في الطائف، مكتب عقار في الطايف، مكتب الاصيفر، شقق الاصيفر، شقق العبيكان، تشقق تمليك',
  authors: [{ name: 'ظافر أبو حربة العمري' }],
  openGraph: {
    title: 'ظافر أبو حربة العمري للعقارات | وسيط عقاري معتمد',
    description: 'خبراء في إدارة الأملاك والعقارات في السعودية. خدمات التوثيق العقاري والاستشارات في مكة والطائف.',
    type: 'website',
    url: 'https://alamridhafer.com',
    locale: 'ar_SA',
    siteName: 'ظافر أبو حربة العمري للعقارات',
    images: [
      {
        url: '/og.png',
        width: 960,
        height: 504,
        alt: 'ظافر أبو حربة العمري للعقارات',
      },
    ],
  },
  icons: {
    icon: '/icon-D.svg',
    apple: '/icon-D.svg',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://alamridhafer.com',
  },
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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  )
}

