interface LogoProps {
  className?: string
  size?: number
}

export default function Logo({ className = '', size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="OptiMind logo"
    >
      <defs>
        <linearGradient id="brainGrad" x1="5" y1="7" x2="35" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6ba3e8" />
          <stop offset="55%" stopColor="#3b6fd4" />
          <stop offset="100%" stopColor="#1a3a6e" />
        </linearGradient>
        <linearGradient id="brainGrad2" x1="5" y1="7" x2="35" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4a7fd4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1a3a6e" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Left brain lobe */}
      <path
        d="M20 8.5C20 8.5 14 7.5 10.5 11.5C7 15.5 7.5 19.5 7.5 19.5C5.5 20.5 4.5 22.5 4.5 25C4.5 28.5 6.5 30.5 9.5 31.5C9.5 31.5 8.5 33.5 10.5 35C12.5 36.5 15 35.5 15 35.5C15.5 36.5 17 37 20 37"
        stroke="url(#brainGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Right brain lobe */}
      <path
        d="M20 8.5C20 8.5 26 7.5 29.5 11.5C33 15.5 32.5 19.5 32.5 19.5C34.5 20.5 35.5 22.5 35.5 25C35.5 28.5 33.5 30.5 30.5 31.5C30.5 31.5 31.5 33.5 29.5 35C27.5 36.5 25 35.5 25 35.5C24.5 36.5 23 37 20 37"
        stroke="url(#brainGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Center divider (dashed) */}
      <line
        x1="20" y1="8.5" x2="20" y2="37"
        stroke="url(#brainGrad2)"
        strokeWidth="1.4"
        strokeDasharray="2.5 3"
        opacity="0.5"
      />

      {/* Left neural detail */}
      <path
        d="M12 18.5C12 18.5 10 21 11 24"
        stroke="url(#brainGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M14.5 27C14.5 27 16.5 29 19 28.5"
        stroke="url(#brainGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Right neural detail */}
      <path
        d="M28 18.5C28 18.5 30 21 29 24"
        stroke="url(#brainGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M25.5 27C25.5 27 23.5 29 21 28.5"
        stroke="url(#brainGrad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Neural nodes */}
      <circle cx="11.5" cy="22.5" r="2" fill="url(#brainGrad)" opacity="0.75" />
      <circle cx="28.5" cy="22.5" r="2" fill="url(#brainGrad)" opacity="0.75" />
      <circle cx="15" cy="14.5" r="1.3" fill="url(#brainGrad)" opacity="0.55" />
      <circle cx="25" cy="14.5" r="1.3" fill="url(#brainGrad)" opacity="0.55" />
    </svg>
  )
}
