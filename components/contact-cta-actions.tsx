'use client'

import { Button } from "@/components/ui/button"
//import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'

interface ContactCTAActionsProps {
  compact?: boolean
}

export function ContactCTAActions({ compact = false }: ContactCTAActionsProps) {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+966552119915';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/966552119915', '_blank');
  };

  if (compact) {
    return (
      <Button onClick={handlePhoneClick} className="w-full">
        <Phone className="mr-2 h-4 w-4" /> تواصل معنا
      </Button>
    );
  }

  return (
    <>
      <Button variant="secondary" onClick={handlePhoneClick} className="w-full sm:w-auto">
        <Phone className="mr-2 h-4 w-4" /> اتصل بنا
      </Button>
      <Button variant="secondary" onClick={handleWhatsAppClick} className="w-full sm:w-auto">
        <MessageCircle className="mr-2 h-4 w-4" /> واتساب
      </Button>
    </>
  )
}

