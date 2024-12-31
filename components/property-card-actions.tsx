'use client'

import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface PropertyCardActionsProps {
  compact?: boolean
}

export function PropertyCardActions({ compact = false }: PropertyCardActionsProps) {
  const handleContactClick = () => {
    // Implement contact logic here
    console.log('Contact button clicked');
  };

  return (
    <div className="w-full">
      <Button onClick={handleContactClick} className="w-full mb-2">
        تواصل معنا
      </Button>
      {compact && (
        <Button asChild variant="outline" className="w-full">
          <Link href="/properties">عرض التفاصيل</Link>
        </Button>
      )}
    </div>
  )
}

