import type { Metadata } from "next"
import Link from "next/link"
import { getUpcomingEvents, getPastEvents } from "@/lib/data"
import { EventsList } from "@/components/events-list"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Events | Sumaj Tusuy",
  description: "Discover upcoming performances and explore past events by Sumaj Tusuy, a Peruvian cultural dance group.",
}

export default async function EventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ])

  return (
    <div className="py-12 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
            Performances & Celebrations
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Our Events
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join us at an upcoming performance or browse our past events to see 
            the magic of Peruvian dance in action.
          </p>
        </div>
        
        {/* Events List with Tabs */}
        <EventsList upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
        
        {/* CTA Section */}
        <div className="mt-16 text-center bg-muted rounded-xl p-8 md:p-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            Want Sumaj Tusuy at Your Event?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We perform at weddings, corporate events, festivals, and private celebrations. 
            Let us bring the spirit of Peru to your special occasion.
          </p>
          <Button size="lg" asChild>
            <Link href="/booking">Book a Performance</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
