import "server-only"
import { promises as fs } from "fs"
import path from "path"
import type { Event, Dance } from "./types"

export async function getEvents(): Promise<Event[]> {
  const filePath = path.join(process.cwd(), "data", "events.json")
  const data = await fs.readFile(filePath, "utf-8")
  const json = JSON.parse(data)
  return json.events
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await getEvents()
  return events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export async function getPastEvents(): Promise<Event[]> {
  const events = await getEvents()
  return events
    .filter((e) => e.status === "past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getDances(): Promise<Dance[]> {
  const filePath = path.join(process.cwd(), "data", "dances.json")
  const data = await fs.readFile(filePath, "utf-8")
  const json = JSON.parse(data)
  return json.dances
}


