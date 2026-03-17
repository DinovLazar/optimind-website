import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { getGoogleAuthClient } from '@/lib/googleAuth'

/** Returns the last Sunday of a given month (month is 0-indexed). */
function getLastSunday(year: number, month: number): Date {
  const lastDay = new Date(year, month + 1, 0)
  const dow = lastDay.getDay() // 0 = Sunday
  return new Date(year, month, lastDay.getDate() - (dow === 0 ? 0 : dow))
}

/**
 * Returns true if the given date (YYYY-MM-DD) falls within CEST (UTC+2).
 * Macedonia follows EU DST rules: UTC+2 from last Sunday of March through
 * (but not including) last Sunday of October.
 *
 * DST trace:
 *   2025-07-15 → lastSundayMarch=2025-03-30, lastSundayOct=2025-10-26
 *               July 15 >= Mar 30 AND < Oct 26 → summer (UTC+2)
 *               14:00 local - 2h = 12:00 UTC  ✓
 *   2025-01-15 → Jan 15 < Mar 30 → winter (UTC+1)
 *               14:00 local - 1h = 13:00 UTC  ✓
 */
function isSummerTime(dateStr: string): boolean {
  const [year, month, day] = dateStr.split('-').map(Number)
  const lastSundayMarch = getLastSunday(year, 2) // March (0-indexed)
  const lastSundayOct   = getLastSunday(year, 9) // October (0-indexed)
  const dateMs  = Date.UTC(year, month - 1, day)
  const marchMs = Date.UTC(
    lastSundayMarch.getFullYear(),
    lastSundayMarch.getMonth(),
    lastSundayMarch.getDate()
  )
  const octMs = Date.UTC(
    lastSundayOct.getFullYear(),
    lastSundayOct.getMonth(),
    lastSundayOct.getDate()
  )
  return dateMs >= marchMs && dateMs < octMs
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Invalid or missing date parameter (expected YYYY-MM-DD).' },
      { status: 400 }
    )
  }

  if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_REFRESH_TOKEN
  ) {
    return NextResponse.json(
      {
        error:
          'Google Calendar not configured. Add missing env vars: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN',
      },
      { status: 500 }
    )
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? 'primary'

  try {
    const auth = getGoogleAuthClient()
    const calendar = google.calendar({ version: 'v3', auth })

    const summer = isSummerTime(date)
    const utcOffset = summer ? 2 : 1 // hours ahead of UTC

    const [year, month, day] = date.split('-').map(Number)

    // Available window: 14:00–24:00 Macedonia local, converted to UTC
    const windowStartUTC = new Date(Date.UTC(year, month - 1, day, 14 - utcOffset, 0, 0))
    const windowEndUTC   = new Date(Date.UTC(year, month - 1, day, 24 - utcOffset, 0, 0))

    // Full day range for freebusy query
    const dayStartUTC = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
    const dayEndUTC   = new Date(Date.UTC(year, month - 1, day, 23, 59, 59))

    // Generate hourly slots within the available window
    const allSlots: Date[] = []
    let cursor = new Date(windowStartUTC)
    while (cursor < windowEndUTC) {
      allSlots.push(new Date(cursor))
      cursor = new Date(cursor.getTime() + 60 * 60 * 1000)
    }

    // Fetch busy periods from Google Calendar
    const freebusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStartUTC.toISOString(),
        timeMax: dayEndUTC.toISOString(),
        items: [{ id: calendarId }],
      },
    })

    const busyPeriods = freebusyRes.data.calendars?.[calendarId]?.busy ?? []
    const nowUTC = new Date()

    // Filter: remove past slots and slots overlapping with busy periods
    const freeSlots = allSlots.filter((slotStart) => {
      if (slotStart <= nowUTC) return false
      const slotEnd = new Date(slotStart.getTime() + 15 * 60 * 1000)
      for (const busy of busyPeriods) {
        if (!busy.start || !busy.end) continue
        const busyStart = new Date(busy.start)
        const busyEnd   = new Date(busy.end)
        if (slotStart < busyEnd && slotEnd > busyStart) return false
      }
      return true
    })

    return NextResponse.json({ slots: freeSlots.map((d) => d.toISOString()) })
  } catch (err: unknown) {
    console.error('[api/book/slots]', err)
    const message = err instanceof Error ? err.message : 'Failed to fetch availability.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
