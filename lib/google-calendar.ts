import "server-only"

import { unstable_cache } from "next/cache"
import { google } from "googleapis"
import type { Event } from "./types"

/*
  Google Calendar server-side setup for Sumaj Tusuy.

  Required env vars for Render/local:
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - GOOGLE_REDIRECT_URI
  - GOOGLE_REFRESH_TOKEN
  - GOOGLE_CALENDAR_ID

  Local callback URL:
  - http://localhost:3000/api/google/callback

  Production callback URL:
  - https://sumaqtusuy.org/api/google/callback

  Revalidation is set to 5 minutes below. Change CALENDAR_REVALIDATE_SECONDS
  if you want the site to refresh calendar content more or less often.
*/

const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.readonly"
const DEFAULT_CALENDAR_ID = "sumajtusuydmv@gmail.com"
const DEFAULT_EVENT_TIME_ZONE = "America/New_York"
const FALLBACK_EVENT_IMAGE = "/placeholder-event.jpg"
const CALENDAR_REVALIDATE_SECONDS = 300
const UPCOMING_LOOKAHEAD_DAYS = 365
const PAST_LOOKBACK_DAYS = 180
const IMAGE_LINE_REGEX = /^\s*image\s*:\s*(https?:\/\/\S+)\s*$/gim

type GoogleCalendarAttachment = {
  fileUrl?: string | null
  iconLink?: string | null
  mimeType?: string | null
  title?: string | null
}

type GoogleCalendarEvent = {
  id?: string | null
  summary?: string | null
  description?: string | null
  location?: string | null
  start?: {
    date?: string | null
    dateTime?: string | null
    timeZone?: string | null
  } | null
  end?: {
    date?: string | null
    dateTime?: string | null
    timeZone?: string | null
  } | null
  attachments?: GoogleCalendarAttachment[] | null
}

type NormalizedEvent = Event & {
  sortTimestamp: number
}

function getCalendarEnv() {
  return {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    calendarId: process.env.GOOGLE_CALENDAR_ID || DEFAULT_CALENDAR_ID,
  }
}

function hasCalendarCredentials() {
  const env = getCalendarEnv()

  return Boolean(
    env.clientId &&
      env.clientSecret &&
      env.redirectUri &&
      env.refreshToken &&
      env.calendarId,
  )
}

function createCalendarClient() {
  const env = getCalendarEnv()

  if (!hasCalendarCredentials()) {
    throw new Error(
      "Missing Google Calendar env vars. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN, and GOOGLE_CALENDAR_ID.",
    )
  }

  const auth = new google.auth.OAuth2(
    env.clientId,
    env.clientSecret,
    env.redirectUri,
  )

  auth.setCredentials({
    refresh_token: env.refreshToken,
  })

  return {
    auth,
    calendarId: env.calendarId,
    calendar: google.calendar({ version: "v3", auth }),
  }
}

function parseImageDirective(description: string) {
  const match = description.match(IMAGE_LINE_REGEX)

  if (!match?.length) {
    return {
      image: null,
      cleanedDescription: description.trim(),
    }
  }

  const image = match[0].replace(/^\s*image\s*:\s*/i, "").trim()
  const cleanedDescription = description.replace(IMAGE_LINE_REGEX, "").trim()

  return {
    image,
    cleanedDescription,
  }
}

function isRenderableImageUrl(url: string) {
  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname.toLowerCase()

    return /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/.test(pathname)
  } catch {
    return false
  }
}

function getImageFromAttachments(attachments: GoogleCalendarAttachment[] | null | undefined) {
  if (!attachments?.length) {
    return null
  }

  for (const attachment of attachments) {
    const candidateUrl = attachment.fileUrl || attachment.iconLink || ""
    const mimeType = attachment.mimeType || ""

    /*
      Google Calendar attachments are usually backed by Google Drive and often
      require an authenticated Google session. Even when a fileUrl exists, it
      may not be directly renderable for public visitors, so we only use URLs
      that already look like direct image assets. Otherwise we safely fall back
      to a local image.
    */
    if (
      candidateUrl &&
      (mimeType.startsWith("image/") || isRenderableImageUrl(candidateUrl))
    ) {
      return candidateUrl
    }
  }

  return null
}

function getEventStart(event: GoogleCalendarEvent) {
  return event.start?.dateTime || event.start?.date || null
}

function getEventEnd(event: GoogleCalendarEvent) {
  return event.end?.dateTime || event.end?.date || getEventStart(event)
}

function toTimestamp(value: string | null) {
  if (!value) {
    return Number.NaN
  }

  return new Date(value).getTime()
}

function formatTime(event: GoogleCalendarEvent) {
  if (event.start?.date && !event.start?.dateTime) {
    return "All day"
  }

  const startValue = event.start?.dateTime
  const endValue = event.end?.dateTime

  if (!startValue) {
    return "Time TBD"
  }

  const startDate = new Date(startValue)
  const endDate = endValue ? new Date(endValue) : null
  const timeZone =
    event.start?.timeZone || event.end?.timeZone || DEFAULT_EVENT_TIME_ZONE
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  })

  if (!endDate || Number.isNaN(endDate.getTime())) {
    return formatter.format(startDate)
  }

  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`
}

function normalizeEvent(event: GoogleCalendarEvent, now: number) {
  const start = getEventStart(event)
  const end = getEventEnd(event)
  const startTimestamp = toTimestamp(start)
  const endTimestamp = toTimestamp(end)

  if (!start || Number.isNaN(startTimestamp)) {
    return null
  }

  const rawDescription = event.description || ""
  const imageDirective = parseImageDirective(rawDescription)
  const image =
    imageDirective.image ||
    getImageFromAttachments(event.attachments) ||
    FALLBACK_EVENT_IMAGE

  return {
    id: event.id || `${startTimestamp}`,
    title: event.summary?.trim() || "Untitled Event",
    image,
    date: start,
    time: formatTime(event),
    location: event.location?.trim() || "Location TBD",
    description: imageDirective.cleanedDescription,
    status:
      (Number.isNaN(endTimestamp) ? startTimestamp : endTimestamp) < now
        ? "past"
        : "upcoming",
    sortTimestamp: startTimestamp,
  } satisfies NormalizedEvent
}

const getCachedCalendarEvents = unstable_cache(
  async () => {
    const now = new Date()
    const nowMs = now.getTime()

    try {
      const { calendar, calendarId } = createCalendarClient()
      const timeMin = new Date(
        nowMs - PAST_LOOKBACK_DAYS * 24 * 60 * 60 * 1000,
      ).toISOString()
      const timeMax = new Date(
        nowMs + UPCOMING_LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000,
      ).toISOString()

      const response = await calendar.events.list({
        calendarId,
        singleEvents: true,
        orderBy: "startTime",
        timeMin,
        timeMax,
        maxResults: 250,
      })

      return (response.data.items || [])
        .map((item) => normalizeEvent(item as GoogleCalendarEvent, nowMs))
        .filter((item): item is NormalizedEvent => Boolean(item))
    } catch (error) {
      console.error("Failed to load Google Calendar events:", error)
      return []
    }
  },
  ["google-calendar-events"],
  { revalidate: CALENDAR_REVALIDATE_SECONDS },
)

export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await getCachedCalendarEvents()

  return events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => a.sortTimestamp - b.sortTimestamp)
    .map(({ sortTimestamp, ...event }) => event)
}

export async function getPastEvents(): Promise<Event[]> {
  const events = await getCachedCalendarEvents()

  return events
    .filter((event) => event.status === "past")
    .sort((a, b) => b.sortTimestamp - a.sortTimestamp)
    .map(({ sortTimestamp, ...event }) => event)
}

export { CALENDAR_SCOPE, DEFAULT_CALENDAR_ID, CALENDAR_REVALIDATE_SECONDS }
