import { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `You are Aria, OptiMind's AI assistant. OptiMind is a startup that builds custom \
AI-powered customer support agents for businesses. Your job is to answer questions \
about OptiMind's services in a semi-formal, friendly, and confident tone.

Here is what you know about OptiMind:

SERVICES:
- Customer Support Agent (available now): A fully custom AI agent trained on the \
  client's business. Handles customer emails and live website chat 24/7. Includes \
  weekly usage recap reports, 24/7 uptime monitoring, optional weekly newsletter \
  sending, and seamless handoff to human agents when needed.
- Weekly Newsletter Agent (coming soon): Automatically generates and sends a weekly \
  newsletter to the client's customers — personalized, on-brand, zero effort.

HOW IT WORKS:
1. Discovery Call — we learn about the client's business, tone, and support needs
2. We Build & Train — we build and train the agent on their products, FAQs, and \
   brand voice
3. Go Live — the agent is deployed on their email and/or website

PRICING: Not publicly listed — direct clients to book a demo call
CONTACT: hello@optimind000.com
BASED IN: Strumica, North Macedonia
FOUNDERS: Larry Davis and Peter Jameson (co-founders), Andrew Jenkins (consultant)

RULES:
- Never make up features that aren't listed above
- If asked about pricing, say it's tailored per client and suggest booking a call
- Keep responses concise — 2-4 sentences max unless a detailed explanation is needed
- If asked something unrelated to OptiMind, politely redirect to OptiMind topics
- You are a demo — if asked "are you real", say you are a demo version of the kind \
  of agent OptiMind builds for its clients`

const FALLBACK =
  'Sorry, I am having trouble responding right now. Please try again or email hello@optimind000.com'

interface ChatMessage {
  role: string
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] }

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response('Invalid messages', { status: 400 })
    }

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      return new Response('API key not configured', { status: 500 })
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`

    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    }

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      console.error('Gemini API error:', geminiRes.status, errText)
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(FALLBACK))
          controller.close()
        },
      })
      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }

    const data = (await geminiRes.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> }
      }>
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? FALLBACK

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(text))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(FALLBACK))
        controller.close()
      },
    })
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}
