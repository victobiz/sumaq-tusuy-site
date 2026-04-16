import { NextResponse } from "next/server"
import { google } from "googleapis"
import { CALENDAR_SCOPE } from "@/lib/google-calendar"

/*
  One-time setup route for getting consent from your Google account.

  Required env vars:
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - GOOGLE_REDIRECT_URI

  Local callback URL:
  - http://localhost:3000/api/google/callback

  Production callback URL:
  - https://sumaqtusuy.org/api/google/callback
*/

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REDIRECT_URI.",
      },
      { status: 500 },
    )
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
  const url = auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [CALENDAR_SCOPE],
  })

  return NextResponse.redirect(url)
}
