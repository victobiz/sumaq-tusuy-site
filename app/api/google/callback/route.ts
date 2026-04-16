import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

/*
  After authorizing once, visit this callback response and copy refresh_token
  into Render/local env vars as GOOGLE_REFRESH_TOKEN.

  Required env vars:
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - GOOGLE_REDIRECT_URI
  - GOOGLE_CALENDAR_ID

  Local callback URL:
  - http://localhost:3000/api/google/callback

  Production callback URL:
  - https://sumaqtusuy.org/api/google/callback
*/

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "sumajtusuydmv@gmail.com"

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REDIRECT_URI.",
      },
      { status: 500 },
    )
  }

  const code = request.nextUrl.searchParams.get("code")

  if (!code) {
    const error = request.nextUrl.searchParams.get("error")

    return NextResponse.json(
      {
        error: error || "Missing OAuth code.",
      },
      { status: 400 },
    )
  }

  try {
    const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
    const { tokens } = await auth.getToken(code)

    return NextResponse.json({
      message:
        "Copy tokens.refresh_token into GOOGLE_REFRESH_TOKEN in Render/local env vars. Keep this response private.",
      calendarId,
      tokens,
      nextSteps: [
        "Save tokens.refresh_token as GOOGLE_REFRESH_TOKEN.",
        "Set GOOGLE_CALENDAR_ID to sumajtusuydmv@gmail.com if not already set.",
        "Remove or protect these helper routes after setup if desired.",
      ],
    })
  } catch (error) {
    console.error("Google OAuth callback failed:", error)

    return NextResponse.json(
      {
        error: "Failed to exchange OAuth code for tokens.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
