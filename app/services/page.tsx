import { ServiceCard } from "@/components/service-card"
import { services } from "@/app/data/services"

export default function Services() {
  const websiteUrl = "https://www.alamridhafer.com"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">خدماتنا</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard 
            key={index} 
            {...service} 
            websiteUrl={websiteUrl} 
          />
        ))}
      </div>
    </div>
  )
}

