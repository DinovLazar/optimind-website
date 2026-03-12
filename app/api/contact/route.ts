import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? 'MISSING_KEY')
  try {
    const { name, company, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Validate email format server-side
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // ── Notification email to OptiMind ──
    await resend.emails.send({
      from:    'OptiMind Contact <onboarding@resend.dev>', // update once domain verified
      to:      'hello@optimind000.com',
      reply_to: email,
      subject: `New Contact: ${name}${company ? ` — ${company}` : ''}`,
      text: [
        `Name:    ${name}`,
        `Company: ${company || '(not provided)'}`,
        `Email:   ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a0a;color:#ffffff;padding:32px;max-width:600px;margin:0 auto;">
  <div style="margin-bottom:24px;">
    <h2 style="color:#4a7fd4;margin:0 0 4px;">New Contact Form Submission</h2>
    <p style="color:#555555;font-size:13px;margin:0;">From optimind000.com/contact</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    <tr>
      <td style="padding:8px 12px 8px 0;color:#555555;font-size:13px;white-space:nowrap;vertical-align:top;">Name</td>
      <td style="padding:8px 0;font-size:14px;">${escapeHtml(name)}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px 8px 0;color:#555555;font-size:13px;white-space:nowrap;vertical-align:top;">Company</td>
      <td style="padding:8px 0;font-size:14px;">${escapeHtml(company || '(not provided)')}</td>
    </tr>
    <tr>
      <td style="padding:8px 12px 8px 0;color:#555555;font-size:13px;white-space:nowrap;vertical-align:top;">Email</td>
      <td style="padding:8px 0;font-size:14px;">
        <a href="mailto:${escapeHtml(email)}" style="color:#4a7fd4;">${escapeHtml(email)}</a>
      </td>
    </tr>
  </table>
  <div style="background:#111111;border-left:3px solid #1a3a6e;border-radius:4px;padding:16px 20px;">
    <p style="color:#555555;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px;">Message</p>
    <p style="color:#cccccc;font-size:14px;line-height:1.7;white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
  </div>
</body>
</html>`,
    })

    // ── Confirmation email to sender ──
    await resend.emails.send({
      from:    'OptiMind <onboarding@resend.dev>', // update once domain verified
      to:      email,
      subject: "We received your message — OptiMind",
      text: [
        `Hi ${name},`,
        '',
        "Thanks for reaching out to OptiMind! We've received your message and will get back to you within 24 hours.",
        '',
        "In the meantime, feel free to check out our products at https://optimind000.com/products.",
        '',
        '— The OptiMind Team',
        'hello@optimind000.com',
      ].join('\n'),
      html: `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a0a;color:#ffffff;padding:32px;max-width:600px;margin:0 auto;">
  <div style="margin-bottom:28px;">
    <h2 style="color:#4a7fd4;margin:0 0 8px;">We got your message.</h2>
    <p style="color:#666666;font-size:14px;margin:0;">Hi ${escapeHtml(name)},</p>
  </div>
  <p style="color:#777777;font-size:14px;line-height:1.7;margin:0 0 16px;">
    Thanks for reaching out to OptiMind! We&apos;ve received your message and will get back to you
    <strong style="color:#aaaaaa;">within 24 hours</strong>.
  </p>
  <p style="color:#777777;font-size:14px;line-height:1.7;margin:0 0 28px;">
    In the meantime, feel free to learn more about our products at
    <a href="https://optimind000.com/products" style="color:#4a7fd4;">optimind000.com/products</a>.
  </p>
  <div style="border-top:1px solid #1a1a1a;padding-top:20px;">
    <p style="color:#444444;font-size:13px;margin:0;">— The OptiMind Team</p>
    <a href="mailto:hello@optimind000.com" style="color:#333333;font-size:12px;">hello@optimind000.com</a>
  </div>
</body>
</html>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
