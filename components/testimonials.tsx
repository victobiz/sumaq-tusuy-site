import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote: "Sumaj Tusuy made our wedding unforgettable. The Marinera performance had our guests in tears. Absolutely beautiful!",
    author: "Maria & Carlos",
    event: "Wedding Reception",
  },
  {
    quote: "Their energy and professionalism exceeded our expectations. The Festejo had everyone dancing by the end of the night.",
    author: "Jennifer Rodriguez",
    event: "Corporate Gala",
  },
  {
    quote: "An authentic cultural experience that educated and entertained our community. We can't wait to have them back.",
    author: "Sacramento Cultural Center",
    event: "Heritage Festival",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-2">
            What People Say
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Testimonials
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-secondary mb-4" />
                <p className="text-primary-foreground/90 mb-6 italic leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-semibold text-primary-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-primary-foreground/70">
                    {testimonial.event}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
