import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { TypeIcon as type, LucideIcon, Share2 } from 'lucide-react'
import Link from 'next/link'
import { ServiceCardActions } from './service-card-actions'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  content: string
  imageUrl: string
  compact?: boolean
  websiteUrl: string
  hideShare?: boolean

}

export function ServiceCard({ icon: Icon, title, description, content, imageUrl, compact = false, websiteUrl, hideShare = false }: ServiceCardProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="relative pb-0">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={200}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <div className="flex items-center space-x-2 space-x-reverse mt-4">
          <Icon className="w-6 h-6" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
        {!compact && <p className="mt-2">{content}</p>}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <ServiceCardActions title={title} description={description} websiteUrl={websiteUrl} compact={compact} hideShare={hideShare} />
      </CardFooter>
    </Card>
  )
}

