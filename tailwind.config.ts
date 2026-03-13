import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        'surface-2': '#161616',
        border: '#1f1f1f',
        'border-2': '#2a2a2a',
        navy: {
          DEFAULT: '#1a3a6e',
          light: '#2a5298',
          lighter: '#3b6fd4',
          glow: '#4a7fd4',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-syne)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'demo-glow': 'demo-glow 2.4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'demo-glow': {
          '0%, 100%': { boxShadow: '0 0 0px rgba(74,127,212,0)' },
          '50%': { boxShadow: '0 0 14px rgba(74,127,212,0.45)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
