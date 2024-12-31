import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  content: string
  author: string
}

export function TestimonialCard({ content, author }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <blockquote className="italic mb-4">"{content}"</blockquote>
        <p className="text-right font-semibold">- {author}</p>
      </CardContent>
    </Card>
  )
}

