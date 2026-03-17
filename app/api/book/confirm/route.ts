import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Resend } from 'resend'
import { getGoogleAuthClient } from '@/lib/googleAuth'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatInTimezone(isoStr: string, tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(isoStr))
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'MISSING_KEY')

  try {
    const body: unknown = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const { slot, name, email, company, message } = body as Record<string, unknown>

    if (!slot || typeof slot !== 'string') {
      return NextResponse.json({ error: 'Missing required field: slot.' }, { status: 400 })
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Missing required field: name.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Missing required field: email.' }, { status: 400 })
    }

    const slotDate = new Date(slot)
    if (isNaN(slotDate.getTime())) {
      return NextResponse.json({ error: 'Invalid slot value.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const companyStr = company && typeof company === 'string' ? company.trim() : undefined
    const messageStr = message && typeof message === 'string' ? message.trim() : undefined

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
    const auth = getGoogleAuthClient()
    const calendar = google.calendar({ version: 'v3', auth })
    const endTime = new Date(slotDate.getTime() + 15 * 60 * 1000)

    await calendar.events.insert({
      calendarId,
      sendUpdates: 'all',
      requestBody: {
        summary: `OptiMind Discovery Call \u2013 ${name}`,
        start: { dateTime: slot },
        end:   { dateTime: endTime.toISOString() },
        description: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${companyStr ?? 'Not provided'}`,
          `Message: ${messageStr ?? 'None'}`,
        ].join('\n'),
        attendees: [{ email }],
        location: 'Video call \u2014 link will be sent separately',
      },
    })

    const macedoniaTime = formatInTimezone(slot, 'Europe/Skopje')
    const utcTime       = formatInTimezone(slot, 'UTC')

    // Confirmation email to visitor (non-blocking)
    try {
      await resend.emails.send({
        from:    'OptiMind <hello@optimind000.com>',
        to:      email,
        subject: 'Your call with OptiMind is confirmed \u2713',
        html: `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a0a;color:#ffffff;padding:32px;max-width:600px;margin:0 auto;">
  <div style="margin-bottom:28px;">
    <h2 style="color:#4a7fd4;font-size:22px;font-weight:700;margin:0 0 4px;">OptiMind</h2>
    <p style="color:#444444;font-size:12px;margin:0;">optimind000.com</p>
  </div>
  <h1 style="color:#ffffff;font-size:20px;font-weight:700;margin:0 0 12px;">Your call is confirmed.</h1>
  <p style="color:#777777;font-size:14px;line-height:1.7;margin:0 0 20px;">
    Hi ${escapeHtml(name)}, your 15-minute discovery call with OptiMind is booked.
  </p>
  <div style="background:#111111;border:1px solid #1a3a6e;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
    <p style="color:#555555;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Date &amp; Time (UTC)</p>
    <p style="color:#ffffff;font-size:15px;font-weight:600;margin:0 0 8px;">${escapeHtml(utcTime)}</p>
    <p style="color:#555555;font-size:11px;margin:0 0 6px;">Please convert to your local timezone.</p>
    <p style="color:#555555;font-size:11px;margin:0;">Lazar&apos;s timezone: ${escapeHtml(macedoniaTime)}</p>
  </div>
  <p style="color:#777777;font-size:14px;line-height:1.7;margin:0 0 28px;">
    We&apos;ll reach out if anything changes. Questions? Reply to this email or contact
    <a href="mailto:hello@optimind000.com" style="color:#4a7fd4;">hello@optimind000.com</a>.
  </p>
  <div style="border-top:1px solid #1a1a1a;padding-top:20px;">
    <p style="color:#333333;font-size:12px;margin:0;">OptiMind &middot; Strumica, North Macedonia</p>
  </div>
</body>
</html>`,
      })
    } catch (emailErr: unknown) {
      console.error('[api/book/confirm] Visitor confirmation email failed:', emailErr)
    }

    // Notification email to Lazar (non-blocking)
    try {
      await resend.emails.send({
        from:     'OptiMind <hello@optimind000.com>',
        to:       'lazar@optimind000.com',
        reply_to: email,
        subject:  `\uD83D\uDCC5 New booking: ${name} \u2013 ${macedoniaTime}`,
        html: `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a0a;color:#ffffff;padding:32px;max-width:600px;margin:0 auto;">
  <h2 style="color:#4a7fd4;margin:0 0 4px;">New Booking</h2>
  <p style="color:#555555;font-size:13px;margin:0 0 20px;">From optimind000.com/book</p>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    <tr>
      <td style="padding:8px 12px 8px 0;color:#555555;font-size:13px;white-space:nowrap;vertical-align:top;">Name</td>
      <td style="padding:8px 0;font-size:14px;">${escapeHtml(name)}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px 8px 0;color:#555555;font-size:13px;white-space:nowrap;vertical-align:top;">Email</td>
      <td style="padding:8px 0;font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#4a7fd4;">${escapeHtml(email)}</a></td>
    </tr>
    <tr>
      <td style="padding:8px 12px 8px 0;color:#555555;font-size:13px;white-space:nowrap;vertical-align:top;">Company</td>
      <td style="padding:8px 0;font-size:14px;">${escapeHtml(companyStr ?? 'Not provided')}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px 8px 0;color:#555555;font-size:13px;white-space:nowrap;vertical-align:top;">Message</td>
      <td style="padding:8px 0;font-size:14px;white-space:pre-wrap;">${escapeHtml(messageStr ?? 'None')}</td>
    </tr>
  </table>
  <div style="background:#111111;border-left:3px solid #1a3a6e;border-radius:4px;padding:16px 20px;">
    <p style="color:#555555;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Slot (Macedonia Time)</p>
    <p style="color:#ffffff;font-size:15px;font-weight:600;margin:0;">${escapeHtml(macedoniaTime)}</p>
  </div>
</body>
</html>`,
      })
    } catch (notifErr: unknown) {
      console.error('[api/book/confirm] Notification email failed:', notifErr)
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('[api/book/confirm]', err)
    const message = err instanceof Error ? err.message : 'Internal server error.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
