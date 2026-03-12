import { ImageResponse } from 'next/og'

export const size        = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          borderRadius: 7,
          border: '1px solid #1a3a6e',
        }}
      >
        {/* Simplified brain mark */}
        <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 8.5C20 8.5 14 7.5 10.5 11.5C7 15.5 7.5 19.5 7.5 19.5C5.5 20.5 4.5 22.5 4.5 25C4.5 28.5 6.5 30.5 9.5 31.5C9.5 31.5 8.5 33.5 10.5 35C12.5 36.5 15 35.5 15 35.5C15.5 36.5 17 37 20 37"
            stroke="#4a7fd4"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M20 8.5C20 8.5 26 7.5 29.5 11.5C33 15.5 32.5 19.5 32.5 19.5C34.5 20.5 35.5 22.5 35.5 25C35.5 28.5 33.5 30.5 30.5 31.5C30.5 31.5 31.5 33.5 29.5 35C27.5 36.5 25 35.5 25 35.5C24.5 36.5 23 37 20 37"
            stroke="#1a3a6e"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    size
  )
}
