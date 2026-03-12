import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import type { Event } from "@/lib/types"
import { formatDate } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  event: Event
  featured?: boolean
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const isPast = event.status === "past"
  
  return (
    <Card className={`overflow-hidden border-0 shadow-lg ${featured ? "lg:flex" : ""}`}>
      <div className={`relative ${featured ? "lg:w-1/2" : ""} aspect-video`}>
        <Image
          src={event.image}
          alt={event.title}
          fill
          className={`object-cover ${isPast ? "grayscale-[30%]" : ""}`}
        />
        {isPast && (
          <div className="absolute top-4 left-4 bg-muted-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
            Past Event
          </div>
        )}
        {!isPast && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Upcoming
          </div>
        )}
      </div>
      
      <CardContent className={`p-6 ${featured ? "lg:w-1/2 flex flex-col justify-center" : ""}`}>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {event.description}
        </p>
        
        {!isPast && (
          <Button asChild variant="outline" className="w-fit">
            <Link href="/booking">Book for Your Event</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
