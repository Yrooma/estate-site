import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#122F30] text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 text-center md:text-right mb-6 md:mb-0">

          </div>
          <div className="w-full md:w-1/3 text-center md:text-right mb-6 md:mb-0">
            <h5 className="uppercase mb-4 font-bold">الخدمات</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link href="/services" className="hover:underline">إدارة الأملاك</Link>
              </li>
              <li className="mt-2">
                <Link href="/services" className="hover:underline">الوساطة العقارية</Link>
              </li>
              <li className="mt-2">
                <Link href="/services" className="hover:underline">التقييم العقاري</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h5 className="uppercase mb-4 font-bold">تواصل معنا</h5>
            <ul className="mb-4">
              <li className="mt-2 flex items-center justify-center md:justify-end">
                <Phone className="w-4 h-4 ml-2" />
                <a dir="ltr" href="tel:+96652119915" className="hover:underline">+966 55 211 9915</a>
              </li>
              <li className="mt-2 flex items-center justify-center md:justify-end">
                <Mail className="w-4 h-4 ml-2" />
                <a href="mailto:AL3MRIDAFER@gmail.com" className="hover:underline">AL3MRIDAFER@gmail.com</a>
              </li>
              <li className="mt-2 flex items-center justify-center md:justify-end">
                <MapPin className="w-4 h-4 ml-2" />
                <span>الطائف ومكة المكرمة</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="mt-8 border-t border-[#215657] flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-white font-bold mb-2">
              © {new Date().getFullYear()} ظافر أبو حربة العمري - جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

