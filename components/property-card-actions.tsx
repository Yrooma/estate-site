'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Property } from '@/types/property';
import { Phone, MessageCircle } from 'lucide-react';

interface PropertyCardActionsProps {
  property: Property;
  compact?: boolean;
}

export function PropertyCardActions({ property, compact = false }: PropertyCardActionsProps) {
  const { title, agent } = property;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`السلام عليكم، لدي استفسار بخصوص عقار: ${title}`);
    window.open(`https://wa.me/${agent.phone.replace('+', '')}?text=${message}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${agent.phone}`;
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      <Button onClick={handleWhatsAppClick} className="w-full">
        <MessageCircle className="mr-2 h-4 w-4" /> واتساب
      </Button>
      <Button onClick={handlePhoneClick} variant="outline" className="w-full">
        <Phone className="mr-2 h-4 w-4" /> اتصال
      </Button>
      {!compact && (
         <Button asChild variant="outline" className="w-full">
          <Link href={`/properties/${property.slug}`}>عرض التفاصيل</Link>
        </Button>
      )}
    </div>
  );
}
