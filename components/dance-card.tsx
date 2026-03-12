import Image from "next/image"
import type { Dance } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"

interface DanceCardProps {
  dance: Dance
}

export function DanceCard({ dance }: DanceCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dance.image}
          alt={dance.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-xs text-secondary font-medium uppercase tracking-wider">
            {dance.origin}
          </p>
          <h3 className="font-serif text-2xl font-bold text-background">
            {dance.name}
          </h3>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {dance.description}
        </p>
      </CardContent>
    </Card>
  )
}
