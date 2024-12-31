import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2 } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  compact?: boolean
  hideShare?: boolean
  websiteUrl?: string
}

export function ServiceCard({ 
  title, 
  description, 
  icon, 
  compact = false,
  hideShare = false,
  websiteUrl 
}: ServiceCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        {icon && <div className="w-12 h-12 text-[#215657]">{icon}</div>}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-gray-600 ${compact ? 'line-clamp-2' : ''}`}>
          {description}
        </p>
        {!hideShare && websiteUrl && (
          <Link 
            href={websiteUrl} 
            className="inline-flex items-center mt-4 text-[#215657] hover:text-[#399597]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            مشاركة
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

