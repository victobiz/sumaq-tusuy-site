import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
              Our Story
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Preserving Peru&apos;s<br />Cultural Heritage
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Based in the DMV (DC, Maryland, Virginia) area, Sumaq Tusuy—meaning 
                &quot;Beautiful Dance&quot; in Quechua—is dedicated to sharing the rich tapestry 
                of Peruvian dance traditions with communities across the region.
              </p>
              <p>
                Our ensemble brings together trained dancers who have studied both in Peru 
                and the United States, combining authentic technique with theatrical presentation 
                to create captivating performances. We also offer workshops and master classes 
                to share our culture with the community.
              </p>
              <p>
                From the elegant courtship of the Marinera to the powerful rhythms of Festejo 
                and the awe-inspiring Danza de Tijeras, each performance is a journey through 
                Peru&apos;s diverse cultural landscape.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/content2.jpg"
                alt="Sumaq Tusuy DMV full dance group in colorful traditional costumes"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/30 rounded-lg -z-10" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
