import { ContactForm } from "@/components/contact-form"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">تواصل معنا</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4">معلومات الاتصال</h2>
          <ul className="space-y-2">
            <li><strong>العنوان:</strong> مكة المكرمة</li>
            <li>
              <strong>الهاتف:</strong>{" "}
              <a href="tel:+966502769950" className="hover:underline">0502769950</a>
              {" / "}
              <a href="tel:+966552119915" className="hover:underline">0552119915</a>
            </li>
            <li>
              <strong>البريد الإلكتروني:</strong>{" "}
              <a href="mailto:Al3mriDafer@gmail.com" className="hover:underline">Al3mriDafer@gmail.com</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4">نموذج الاتصال</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}