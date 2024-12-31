import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#122F30] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-between">
          {/* إضافة مساحة أكبر للقسم الأول الفارغ */}
          <div className="w-full md:w-1/4 text-center md:text-right mb-6 md:mb-0">
          </div>

          {/* تعديل عرض الأقسام وإضافة مسافات */}
          <div className="w-full md:w-1/3 lg:w-1/4 text-center md:text-right mb-6 md:mb-0">
            <h5 className="uppercase mb-6 font-bold text-lg">الخدمات</h5>
            <ul className="mb-4 space-y-4">
              <li>
                <Link href="/services" className="hover:underline">إدارة الأملاك</Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline">الوساطة العقارية</Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline">التقييم العقاري</Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 lg:w-1/4 text-center md:text-right">
            <h5 className="uppercase mb-6 font-bold text-lg">تواصل معنا</h5>
            <ul className="mb-4 space-y-4">
              <li className="flex items-center justify-center md:justify-end">
                <Phone className="w-5 h-5 ml-3" />
                <a dir="ltr" href="tel:+96652119915" className="hover:underline">+966 55 211 9915</a>
              </li>
              <li className="flex items-center justify-center md:justify-end">
                <Mail className="w-5 h-5 ml-3" />
                <a href="mailto:AL3MRIDAFER@gmail.com" className="hover:underline">AL3MRIDAFER@gmail.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-end">
                <MapPin className="w-5 h-5 ml-3" />
                <span>الطائف ومكة المكرمة</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* تحسين تنسيق حقوق النشر */}
      <div className="container mx-auto px-6">
        <div className="border-t border-[#215657]">
          <div className="py-8 text-center">
            <p className="text-sm text-white font-bold">
              © {new Date().getFullYear()} ظافر أبو حربة العمري - جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}