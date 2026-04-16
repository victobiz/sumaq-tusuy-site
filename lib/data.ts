import "server-only"
import { promises as fs } from "fs"
import path from "path"
import type { Dance } from "./types"
import {
  getPastEvents as getCalendarPastEvents,
  getUpcomingEvents as getCalendarUpcomingEvents,
} from "./google-calendar"

export const getUpcomingEvents = getCalendarUpcomingEvents
export const getPastEvents = getCalendarPastEvents

export async function getDances(): Promise<Dance[]> {
  const filePath = path.join(process.cwd(), "data", "dances.json")
  const data = await fs.readFile(filePath, "utf-8")
  const json = JSON.parse(data)
  return json.dances
}

