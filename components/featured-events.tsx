import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getUpcomingEvents } from "@/lib/data"
import { EventCard } from "./event-card"
import { Button } from "@/components/ui/button"

export async function FeaturedEvents() {
  const events = await getUpcomingEvents()
  const featuredEvents = events.slice(0, 3)

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
              Mark Your Calendar
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Upcoming Events
            </h2>
          </div>
          <Button variant="ghost" asChild className="mt-4 md:mt-0 w-fit">
            <Link href="/events" className="group">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        {featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                featured={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No upcoming events at the moment.</p>
            <Button asChild className="mt-4">
              <Link href="/booking">Book us for your event</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
