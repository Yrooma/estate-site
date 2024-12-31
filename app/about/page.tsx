import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <Image
          src="/icon-D.svg"
          alt="شعار ظافر أبو حربة العمري"
          width={120}
          height={120}
          className="mx-auto mb-6"
          priority
        />
        <h1 className="text-4xl font-bold mb-4">ظافر أبو حربة العمري</h1>
        <div className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 p-4 rounded-lg max-w-2xl mx-auto mb-6">
          <h2 className="text-xl font-semibold text-amber-800">وسيط عقاري معتمد من الهيئة العامة للعقار</h2>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        <div className="md:w-1/2 bg-[#215657] text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">خبرة عريقة في سوق العقار</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-[#D4AF37] ml-2">•</span>
              <p>أكثر من 15 عاماً من الخبرة في السوق العقاري بمنطقتي مكة المكرمة والطائف</p>
            </li>
            <li className="flex items-start">
              <span className="text-[#D4AF37] ml-2">•</span>
              <p>حاصل على رخصة الوساطة العقارية رقم 1100020459</p>
            </li>
            <li className="flex items-start">
              <span className="text-[#D4AF37] ml-2">•</span>
              <p>متخصص في إدارة الأملاك والوساطة العقارية والاستشارات</p>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 space-y-6">
          <div className="bg-[#399597] p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4">رؤيتنا</h3>
            <p>نسعى لتقديم خدمات عقارية احترافية تلبي تطلعات عملائنا وتحقق أهدافهم الاستثمارية والسكنية بأعلى معايير الجودة والمصداقية.</p>
          </div>
          <div className="bg-[#122F30] p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4">قيمنا</h3>
            <p>نؤمن بأن الثقة والشفافية والمهنية هي أساس نجاح أي تعامل عقاري، ونلتزم بتقديم خدماتنا وفق هذه المبادئ.</p>
          </div>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">مجالات خبرتنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'إدارة الأملاك',
              description: 'إدارة شاملة للعقارات السكنية والتجارية مع متابعة دورية وتقارير منتظمة'
            },
            {
              title: 'الوساطة العقارية',
              description: 'خدمات بيع وشراء وتأجير العقارات مع ضمان حقوق جميع الأطراف'
            },
            {
              title: 'الاستشارات العقارية',
              description: 'تقديم المشورة المهنية المبنية على دراسة السوق وخبرة طويلة'
            }
          ].map((service, index) => (
            <div key={index} className="border border-[#215657] p-6 rounded-lg hover:bg-[#215657] hover:text-white transition-colors">
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">تواصل معنا</h2>
        <p className="mb-8">نحن هنا لمساعدتك في جميع احتياجاتك العقارية</p>
        <Button asChild className="bg-[#215657] hover:bg-[#122F30]">
          <Link href="/contact">احجز استشارة مجانية</Link>
        </Button>
      </section>
    </div>
  )
}

