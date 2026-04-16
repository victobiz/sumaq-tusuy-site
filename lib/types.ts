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
  const displayTimeZone = "America/New_York"
  const dateOnlyMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  const date = dateOnlyMatch
    ? new Date(
        Number(dateOnlyMatch[1]),
        Number(dateOnlyMatch[2]) - 1,
        Number(dateOnlyMatch[3]),
      )
    : new Date(dateString)

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: dateOnlyMatch ? undefined : displayTimeZone,
  })
}
