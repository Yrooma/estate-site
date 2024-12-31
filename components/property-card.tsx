import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { PropertyCardActions } from './property-card-actions'

interface PropertyCardProps {
  id: number
  title: string
  price: string
  city: string
  district?: string
  description?: string
  imageUrl: string
  compact?: boolean
}

export function PropertyCard({ id, title, price, city, district, description, imageUrl, compact = false }: PropertyCardProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="relative pb-0">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={200}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="font-semibold">{price}</p>
        <p className="text-sm text-muted-foreground">{city}{district && ` - ${district}`}</p>
        {!compact && description && <p className="mt-2 text-sm">{description}</p>}
      </CardContent>
      <CardFooter>
        <PropertyCardActions compact={compact} />
      </CardFooter>
    </Card>
  )
}

