'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Share2 } from 'lucide-react'
import Link from 'next/link'

interface ServiceCardActionsProps {
  title: string
  description: string
  websiteUrl: string
  compact?: boolean
  hideShare?: boolean
}

export function ServiceCardActions({ title, description, websiteUrl, compact = false, hideShare = false }: ServiceCardActionsProps) {
  const [isShared, setIsShared] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`السلام عليكم، أحتاج خدمة ${title}`);
    window.open(`https://wa.me/966552119915?text=${message}`, '_blank');
  };

  const handleShareClick = async () => {
    const shareText = `خدمة ${title} من مؤسسة أبو عمر العقارية - ${description} `;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: websiteUrl,
        });
        setIsShared(true);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <>
      <Button onClick={handleWhatsAppClick} className="w-full">
        أحتاج هذه الخدمة
      </Button>
      {!hideShare && (
        <Button variant="outline" onClick={handleShareClick} className="w-full">
          <Share2 className="w-4 h-4 ml-2" />
          {isShared ? 'تم النسخ!' : 'مشاركة'}
        </Button>
      )}
      {compact && (
        <Button asChild className="w-full">
          <Link href="/services">المزيد من التفاصيل</Link>
        </Button>
      )}
    </>
  )
}

