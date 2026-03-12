export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
  status: "upcoming" | "past"
}

export interface Dance {
  id: string
  name: string
  description: string
  origin: string
  image: string
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
