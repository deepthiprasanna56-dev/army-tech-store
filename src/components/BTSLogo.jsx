export default function BTSLogo({ size = 28, className = "" }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Glow aura */}
      <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-md" />
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]"
      >
        <defs>
          <linearGradient id="btsNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e8ff" />
            <stop offset="40%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Left Trapezoid Door */}
        <polygon
          points="20,12 45,22 45,78 20,88"
          fill="url(#btsNeonGrad)"
        />

        {/* Right Trapezoid Door */}
        <polygon
          points="55,22 80,12 80,88 55,78"
          fill="url(#btsNeonGrad)"
        />
      </svg>
    </div>
  );
}
