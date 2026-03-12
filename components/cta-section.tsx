import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    src: "/images/content4.jpg",
    alt: "Dancer spinning in turquoise traditional dress",
  },
  {
    src: "/images/content6.jpg",
    alt: "Three dancers in coral and pink traditional costumes",
  },
  {
    src: "/images/content7.jpg",
    alt: "Dancers in gold and purple costumes with certificate",
  },
  {
    src: "/images/content5.jpg",
    alt: "Full group with purple butterfly banner",
  },
]

export function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Photo Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square overflow-hidden rounded-lg group"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
        
        {/* CTA Content */}
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Bring Peru to Your Event
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether it&apos;s a wedding, corporate event, festival, or private celebration, 
            Sumaq Tusuy will create an unforgettable cultural experience for you and your guests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/booking">Request a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link href="/events">See Us Perform</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
