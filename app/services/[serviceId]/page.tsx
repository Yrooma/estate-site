import { notFound } from 'next/navigation'

const services = [
  { id: 'property-management', title: 'إدارة الأملاك' },
  { id: 'real-estate-brokerage', title: 'الوساطة العقارية' },
  { id: 'property-valuation', title: 'التقييم العقاري' },
]

export default function ServicePage({ params }: { params: { serviceId: string } }) {
  const service = services.find(s => s.id === params.serviceId)

  if (!service) {
    notFound()
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">{service.title}</h1>
      <div className="prose max-w-none">
        <p>تفاصيل الخدمة ستضاف هنا.</p>
      </div>
    </div>
  )
}

