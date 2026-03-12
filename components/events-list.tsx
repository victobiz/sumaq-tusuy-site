"use client"

import { useState } from "react"
import type { Event } from "@/lib/types"
import { EventCard } from "./event-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EventsListProps {
  upcomingEvents: Event[]
  pastEvents: Event[]
}

export function EventsList({ upcomingEvents, pastEvents }: EventsListProps) {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
        <TabsTrigger value="upcoming" className="text-base">
          Upcoming ({upcomingEvents.length})
        </TabsTrigger>
        <TabsTrigger value="past" className="text-base">
          Past Events ({pastEvents.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="upcoming">
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No upcoming events scheduled at the moment.
            </p>
            <p className="text-muted-foreground mt-2">
              Check back soon or contact us to book a performance!
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="past">
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No past events to display yet.
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
