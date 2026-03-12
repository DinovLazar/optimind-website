'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const offsets = {
    up:    { y: 28, x: 0 },
    down:  { y: -28, x: 0 },
    left:  { y: 0, x: 28 },
    right: { y: 0, x: -28 },
    none:  { y: 0, x: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.4, 0.22, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
