'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    const whatsappMessage = `الاسم: ${name}%0aالهاتف: ${phone}%0aالرسالة: ${message}`;
    window.open(`https://wa.me/966552119915?text=${whatsappMessage}`, '_blank');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block mb-2">الاسم</label>
        <Input id="name" name="name" placeholder="أدخل اسمك" className="w-full" required />
      </div>
      <div>
        <label htmlFor="phone" className="block mb-2">رقم الهاتف</label>
        <Input 
          id="phone" 
          name="phone"
          type="tel" 
          placeholder="أدخل رقم هاتفك" 
          className="w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-2">الرسالة</label>
        <Textarea 
          id="message" 
          name="message"
          placeholder="أدخل رسالتك" 
          className="w-full"
          required 
        />
      </div>
      <Button type="submit" className="w-full">إرسال</Button>
    </form>
  );
} 