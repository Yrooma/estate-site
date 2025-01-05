import { PropertyCard } from "@/components/property-card"
import { properties } from "@/app/data/properties"

export default async function PropertiesPage() {
  try {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">العقارات المتاحة</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    throw new Error('فشل في تحميل العقارات');
  }
}

