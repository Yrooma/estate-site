import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { services } from "@/app/data/services"
import { ServiceCard } from "@/components/service-card"
//import { testimonials } from "@/app/data/testimonials"
//import { TestimonialCard } from "@/components/testimonial-card" 
import { ContactCTA } from "@/components/contact-cta"
import Image from 'next/image'
{/*  import { properties } from "@/app/data/properties"*/}
{/*  import { PropertyCard } from "@/app/components/property-card"*/}

export const metadata = {
  title: 'الرئيسية | ظافر أبو حربة العمري للعقارات',
  description: 'وسيط عقاري معتمد في مكة والطائف مع خبرة 15 عاماً. نقدم خدمات التوثيق العقاري، إدارة الأملاك، والاستشارات العقارية.',
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 sm:space-y-16">
      <section className="text-center">
        <div className="mb-8">
          <Image
            src="/icon-D-T.svg"
            alt="شعار ظافر أبو حربة العمري"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
        </div>
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            ظافر أبو حربة العمري
          </h1>
        </article>
        <div className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 p-4 rounded-lg max-w-2xl mx-auto mb-6">
          <h2 className="text-xl font-semibold text-amber-800">وسيطك المعتمد ومستشارك المؤتمن!</h2>
        </div>
        <p className="text-xl md:text-2xl mb-4">خبرة أكثر من 15 عامًا في العقار وإدارة الأملاك بمكة والطائف</p>
        <p className="text-lg mb-6">نقدم خدمات التوثيق، العقود، إدارة الأملاك، والخدمات العامة بسرعة وكفاءة مع استشارات عقارية موثوقة.</p>
        {/* إضافة حاوية التوثيق */}
        <div className="mb-8 p-4 bg-[#399597] rounded-lg max-w-md mx-auto">
          <Image
            src="/fal.svg"
            alt="شعار الهيئة العامة للعقار"
            width={200}
            height={30}
            className="mx-auto mb-3"
          />
          <p className="text-sm text-white">رخصة وساطة عقارية رقم 1100020459</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
          <Button asChild className=" text-white w-full sm:w-auto">
            <Link href="/services">خدماتنا</Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/contact">تواصل معنا</Link>
          </Button>
        </div>
      </section>
      
      <div className="my-32">
        <hr className="border-t border-gray-200 w-1/2 mx-auto opacity-30" />
      </div>

      <section className="max-w-5xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">خدماتنا</h2>
        <div className="relative">
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 sm:pb-0 scrollbar-hide">
            {services.map((service, index) => (
              <div key={index} className="w-[280px] sm:w-auto flex-shrink-0">
                <ServiceCard 
                  {...service} 
                  compact 
                  hideShare={true}
                  websiteUrl="https://alamridhafer.com" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="my-32">
        <hr className="border-t border-gray-200 w-1/2 mx-auto opacity-30" />
      </div>

      <section className="bg-[#215657] hover:bg-[#122F30] transition-colors duration-300 p-6 rounded-lg text-white relative">
        <div className="flex justify-center mb-4">
          <Image
            src="/icon-L-T.svg"
            alt="شعار ظافر أبو حربة العمري"
            width={40}
            height={40}
            className="mx-auto"
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">لماذا تختار ظافر أبو حربة العمري؟</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="mr-2 text-[#D4AF37]">✓</span>
            خبرة تزيد عن 15 عامًا في سوق العقار.
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-[#D4AF37]">✓</span>
            سرعة ودقة في تنفيذ الخدمات.
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-[#D4AF37]">✓</span>
            تغطية مميزة لمكة والطائف.
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-[#D4AF37]">✓</span>
            استشارات مبنية على خبرة طويلة.
          </li>
        </ul>
      </section>

 {/*  
      <ClientWrapper>
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">آخر العقارات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} {...property} compact />
            ))}
          </div>
        </section>
      </ClientWrapper>
*/}
{/*
<div className="my-32">
        <hr className="border-t border-gray-200 w-1/2 mx-auto opacity-30" />
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">شهادات العملاء</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </section>*/}

      <div className="my-32">
        <hr className="border-t border-gray-200 w-1/2 mx-auto opacity-30" />
      </div>

      <section className="bg-[#215657] text-white p-6 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">تحتاج خدمة؟ تواصل الآن!</h2>
        <ContactCTA />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "ظافر أبو حربة العمري للعقارات",
            "description": "وسيط عقاري معتمد في مكة والطائف",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "مكة والطائف",
              "addressCountry": "SA"
            },
            "license": "1100020459",
            "areaServed": ["مكة", "الطائف"]
          })
        }}
      />
    </div>
  )
}

