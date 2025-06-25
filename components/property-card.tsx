import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PropertyCardActions } from './property-card-actions';
import type { Property } from '@/types/property';
import { Bed, Bath, AreaChart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const { slug, mainImage, title, price, status, type, location, area, bedrooms, bathrooms, description } = property;

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/properties/${slug}`} className="block">
        <CardHeader className="p-0 relative">
          <div className="relative h-56">
            <Image
              src={mainImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={!compact}
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge variant="secondary" className="bg-black/60 text-white">
              {status}
            </Badge>
            <Badge className="bg-primary/80 text-white">{type}</Badge>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/properties/${slug}`} className="block">
          <CardTitle className="text-xl mb-2 hover:text-primary transition-colors">{title}</CardTitle>
        </Link>
        <p className="text-lg font-bold text-primary mb-2">{price}</p>
        <p className="text-sm text-muted-foreground mb-4">{`${location.city} - ${location.district}`}</p>
        
        <div className="flex justify-around text-sm text-muted-foreground border-t border-b py-2 mb-4">
          {bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms} غرف</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms} حمامات</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <AreaChart className="h-4 w-4" />
            <span>{area} م²</span>
          </div>
        </div>

        {!compact && description && (
          <p className="text-sm line-clamp-3">{description}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <PropertyCardActions property={property} compact={compact} />
      </CardFooter>
    </Card>
  );
}
