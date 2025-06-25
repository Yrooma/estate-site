import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { properties } from '@/app/data/properties';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, AreaChart, MapPin, Calendar, Tag } from 'lucide-react';
import { ContactCTAActions } from '@/components/contact-cta-actions';
import type { Property } from '@/types/property';
import { Breadcrumbs } from '@/components/breadcrumbs';

// Find property by slug
function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    return {
      title: 'العقار غير موجود',
    };
  }

  const canonicalUrl = `https://alamridhafer.com/properties/${property.slug}`;

  return {
    title: `${property.title} | أبو عمر للعقار`,
    description: property.description.substring(0, 160),
    keywords: property.keywords,
    openGraph: {
      title: property.title,
      description: property.description.substring(0, 160),
      type: 'article',
      url: canonicalUrl,
      images: [
        {
          url: `https://alamridhafer.com${property.mainImage}`,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Generate static paths for all properties
export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default function PropertyDetailsPage({ params }: { params: { slug: string } }) {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  const { title, description, price, status, type, location, area, bedrooms, bathrooms, images, features, yearBuilt, agent } = property;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: title,
    description: description,
    image: images.map(img => `https://alamridhafer.com${img}`),
    url: `https://alamridhafer.com/properties/${property.slug}`,
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'SAR',
      availability: status === 'للبيع' ? 'https://schema.org/InStock' : 'https://schema.org/InStoreOnly',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.district,
      addressLocality: location.city,
      addressCountry: 'SA',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: area,
      unitCode: 'MTK',
    },
    numberOfBedrooms: bedrooms,
    numberOfBathroomsTotal: bathrooms,
    ...(yearBuilt && { datePosted: new Date(yearBuilt, 0, 1).toISOString() }),
    realEstateAgent: {
      '@type': 'RealEstateAgent',
      name: agent.name,
      telephone: agent.phone,
    },
  };

  return (
    <>
      <Breadcrumbs lastSegmentName={property.title} />
      <div className="container mx-auto px-4 py-8">
        <article>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-8">
            {/* Main Content (Left side on large screens) */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="mb-8">
                <div className="relative h-96 md:h-[500px] w-full mb-4">
                  <Image
                    src={property.mainImage}
                    alt={title}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                  />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {images.slice(1, 5).map((img, index) => (
                    <div key={index} className="relative h-24">
                      <Image
                        src={img}
                        alt={`${title} - صورة ${index + 2}`}
                        fill
                        className="object-cover rounded-md shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                        sizes="150px"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h2 className="text-2xl font-bold border-b pb-3 mb-4">تفاصيل العقار</h2>
                <p className="text-lg leading-relaxed whitespace-pre-line">{description}</p>

                {features && features.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">المميزات الإضافية</h3>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-center bg-muted p-3 rounded-lg">
                          <Tag className="h-5 w-5 ml-2 text-primary" />
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar (Right side on large screens) */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md border">
                <header className="mb-6">
                  <h1 className="text-3xl font-bold mb-1">{title}</h1>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 ml-1" />
                    {`${location.city} - ${location.district}`}
                  </div>
                </header>

                <div className="text-center mb-6">
                  <span className="text-4xl font-extrabold text-primary">{price}</span>
                </div>
                
                <div className="flex justify-center gap-2 mb-6">
                  <Badge variant="secondary" className="text-sm px-3 py-1">{status}</Badge>
                  <Badge className="text-sm px-3 py-1">{type}</Badge>
                </div>

                <ul className="space-y-4 text-md mb-6 border-t border-b py-4">
                  <li className="flex justify-between items-center">
                    <span className="font-semibold flex items-center"><AreaChart className="h-5 w-5 ml-2 text-gray-500" /> المساحة</span>
                    <span className="font-mono">{area} م²</span>
                  </li>
                  {bedrooms && (
                    <li className="flex justify-between items-center">
                      <span className="font-semibold flex items-center"><Bed className="h-5 w-5 ml-2 text-gray-500" /> غرف النوم</span>
                      <span className="font-mono">{bedrooms}</span>
                    </li>
                  )}
                  {bathrooms && (
                    <li className="flex justify-between items-center">
                      <span className="font-semibold flex items-center"><Bath className="h-5 w-5 ml-2 text-gray-500" /> الحمامات</span>
                      <span className="font-mono">{bathrooms}</span>
                    </li>
                  )}
                  {yearBuilt && (
                     <li className="flex justify-between items-center">
                      <span className="font-semibold flex items-center"><Calendar className="h-5 w-5 ml-2 text-gray-500" /> سنة البناء</span>
                      <span className="font-mono">{yearBuilt}</span>
                    </li>
                  )}
                </ul>

                <h3 className="text-lg font-bold mb-3 text-center">للتواصل والاستفسار</h3>
                <div className="flex flex-col space-y-2">
                   <ContactCTAActions />
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
