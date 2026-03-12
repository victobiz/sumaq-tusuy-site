import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/content1.jpg"
          alt="Sumaq Tusuy dancer performing in traditional red and pink costume"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-4">
          Peruvian Cultural Dance Group
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-background mb-6 text-balance">
          Sumaq Tusuy
        </h1>
        <p className="text-xl md:text-2xl text-background/90 font-serif italic mb-2">
          &quot;Beautiful Dance&quot;
        </p>
        <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-10">
          Celebrating the rich traditions of Peru through authentic dance performances. 
          From elegant Marinera to vibrant Festejo, we bring cultural heritage to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="text-lg px-8">
            <Link href="/booking">Book a Performance</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-background/10 border-background text-background hover:bg-background hover:text-foreground">
            <Link href="/events">View Events</Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
