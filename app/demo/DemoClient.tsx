'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  id: 'initial',
  role: 'assistant',
  content:
    "Hi, I'm Aria — OptiMind's demo assistant. I can tell you everything about our AI customer support services. What would you like to know?",
}

const STARTER_QUESTIONS = [
  "What does OptiMind do?",
  "How does the setup process work?",
  "What's included in the Customer Support Agent?",
]

function AriaAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a3a6e] to-[#0d1f3e] border border-[#2a5298]/30 flex items-center justify-center shrink-0">
      <span className="text-white text-xs font-bold font-heading select-none">A</span>
    </div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 items-end"
    >
      <AriaAvatar />
      <div className="bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-[#1f1f1f] rounded-2xl rounded-bl-sm px-4 py-3.5 flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-full bg-gray-300 dark:bg-[#3a3a3a] animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '1s' }}
        />
        <span
          className="w-2 h-2 rounded-full bg-gray-300 dark:bg-[#3a3a3a] animate-bounce"
          style={{ animationDelay: '160ms', animationDuration: '1s' }}
        />
        <span
          className="w-2 h-2 rounded-full bg-gray-300 dark:bg-[#3a3a3a] animate-bounce"
          style={{ animationDelay: '320ms', animationDuration: '1s' }}
        />
      </div>
    </motion.div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 0.4, 0.22, 1] }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'items-end'}`}
    >
      {!isUser && <AriaAvatar />}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-[#1a3a6e] text-white rounded-br-sm'
            : 'bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-[#1f1f1f] text-gray-700 dark:text-[#cccccc] rounded-bl-sm'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  )
}

export default function DemoClient() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const lastMsg = messages[messages.length - 1]
  const showTyping =
    isLoading &&
    (lastMsg?.role === 'user' ||
      (lastMsg?.role === 'assistant' && lastMsg.content === ''))

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, showTyping])

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || isLoading) return

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
      }
      const updatedMessages = [...messages, userMsg]
      setMessages(updatedMessages)
      setInput('')
      setIsLoading(true)

      try {
        const response = await fetch('/api/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedMessages }),
        })

        if (!response.ok || !response.body) throw new Error('Request failed')

        const assistantId = `assistant-${Date.now()}`
        let accumulated = ''

        // Add empty placeholder — keeps typing indicator visible until first chunk
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: 'assistant', content: '' },
        ])

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: accumulated } : m
            )
          )
        }

        const tail = decoder.decode()
        if (tail) {
          accumulated += tail
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: accumulated } : m
            )
          )
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: "I'm sorry, I encountered an error. Please try again.",
          },
        ])
      } finally {
        setIsLoading(false)
        inputRef.current?.focus()
      }
    },
    [messages, isLoading]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  // Visible messages — hide empty assistant placeholders (shown as typing indicator instead)
  const visibleMessages = messages.filter(
    (m) => !(m.role === 'assistant' && m.content === '')
  )

  return (
    <div className="h-screen bg-gray-50 dark:bg-[#0a0a0a] flex overflow-hidden">

      {/* ── Left panel (desktop only) ──────────────────────────── */}
      <div className="hidden md:flex flex-col w-[40%] pt-16 border-r border-gray-200 dark:border-[#181818] overflow-hidden">
        <div className="flex-1 px-8 lg:px-12 py-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#1a3a6e] text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              Live Demo
            </p>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.08] mb-5">
              Meet Aria.
            </h1>
            <p className="text-gray-500 dark:text-[#555555] text-base leading-relaxed mb-10">
              This is a live demo of the kind of AI support agent OptiMind builds
              for your business. Ask anything about our services.
            </p>

            {/* Starter chips */}
            <div className="flex flex-col gap-2.5">
              {STARTER_QUESTIONS.map((q, i) => (
                <motion.button
                  key={q}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  onClick={() => sendMessage(q)}
                  disabled={isLoading}
                  className="text-left px-4 py-3 rounded-xl border border-gray-200 dark:border-[#1a1a1a] bg-white dark:bg-[#0d0d0d] text-gray-500 dark:text-[#777777] text-sm hover:border-[#1a3a6e]/50 hover:text-gray-700 dark:hover:text-[#aaaaaa] hover:bg-gray-50 dark:hover:bg-[#111111] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group"
                >
                  <span className="text-gray-300 dark:text-[#2a2a2a] group-hover:text-gray-400 dark:group-hover:text-[#444444] mr-2 transition-colors">
                    →
                  </span>
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <div className="px-8 lg:px-12 py-6 border-t border-gray-100 dark:border-[#141414]">
          <p className="text-gray-400 dark:text-[#333333] text-xs leading-relaxed">
            This is a demo assistant. For real inquiries contact{' '}
            <a
              href="mailto:hello@optimind000.com"
              className="text-gray-500 dark:text-[#444444] hover:text-gray-700 dark:hover:text-[#777777] transition-colors underline underline-offset-2"
            >
              hello@optimind000.com
            </a>
          </p>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden pt-16">

        {/* Mobile header */}
        <div className="md:hidden border-b border-gray-200 dark:border-[#181818] bg-gray-50 dark:bg-[#0a0a0a] px-4 py-4 shrink-0">
          <p className="font-heading font-bold text-gray-900 dark:text-white text-base mb-3">
            Meet Aria
          </p>
          <div className="flex gap-2 flex-wrap">
            {STARTER_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#0e0e0e] text-gray-500 dark:text-[#666666] text-xs hover:border-[#1a3a6e]/40 hover:text-gray-700 dark:hover:text-[#999999] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5"
        >
          <AnimatePresence initial={false}>
            {visibleMessages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {showTyping && <TypingIndicator key="typing" />}
          </AnimatePresence>
          {/* Scroll anchor */}
          <div className="h-px" />
        </div>

        {/* Input bar */}
        <div className="shrink-0 border-t border-gray-200 dark:border-[#181818] bg-gray-50 dark:bg-[#0a0a0a] px-4 md:px-8 py-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 max-w-3xl mx-auto"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask anything about OptiMind…"
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-[#1f1f1f] text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-[#333333] focus:outline-none focus:border-[#1a3a6e]/60 transition-colors text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#1a3a6e] hover:bg-[#2a5298] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shrink-0 hover:shadow-[0_0_20px_rgba(74,127,212,0.25)]"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={16} className="text-white" />
              )}
            </button>
          </form>

          {/* Mobile disclaimer */}
          <p className="md:hidden text-center text-gray-300 dark:text-[#252525] text-xs mt-3">
            Demo only · Contact{' '}
            <a
              href="mailto:hello@optimind000.com"
              className="text-gray-400 dark:text-[#333333] hover:text-gray-600 dark:hover:text-[#555555] transition-colors"
            >
              hello@optimind000.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
