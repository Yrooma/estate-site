import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TestimonialCardProps {
  id: string
  name: string
  role: string
  content: string
  image: string
}

export function TestimonialCard({ name, role, content, image }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <div className="relative w-12 h-12 mr-4">
            <Image
              src={image}
              alt={`صورة ${name}`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
        <p className="text-gray-600">{content}</p>
      </CardContent>
    </Card>
  )
}

