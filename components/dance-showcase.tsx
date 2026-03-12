import { getDances } from "@/lib/data"
import { DanceCard } from "./dance-card"

export async function DanceShowcase() {
  const dances = await getDances()

  return (
    <section className="py-20 px-6 bg-muted">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
            Our Repertoire
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Traditional Dances of Peru
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Each dance tells a story of Peru&apos;s diverse cultural heritage, from the coastal elegance 
            to the vibrant rhythms of the highlands and Afro-Peruvian traditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dances.map((dance) => (
            <DanceCard key={dance.id} dance={dance} />
          ))}
        </div>
      </div>
    </section>
  )
}
