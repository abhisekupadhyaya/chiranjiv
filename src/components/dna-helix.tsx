import { useMemo } from 'react'

export function DnaHelix() {
  const helixData = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const y = i * 20
      const offset = Math.sin(i * 0.5) * 30
      const depth = Math.cos(i * 0.5) * 2
      const scale = 1 + depth * 0.1
      return {
        y,
        leftX: Math.round((100 + offset) * 100) / 100,
        rightX: Math.round((100 - offset) * 100) / 100,
        leftHighlightX: Math.round((100 + offset - 1) * 100) / 100,
        rightHighlightX: Math.round((100 - offset - 1) * 100) / 100,
        radius: Math.round(4 * scale * 100) / 100,
        highlightRadius: Math.round(1.5 * scale * 100) / 100,
        leftMarkerX: Math.round((100 + offset * 0.3) * 100) / 100,
        rightMarkerX: Math.round((100 - offset * 0.3) * 100) / 100,
        animationDelay: i * 0.1,
      }
    })
  }, [])

  return (
    <svg
      className="w-full h-full animate-rotate-slow"
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))' }}
    >
      <defs>
        <radialGradient id="leftGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(5, 150, 105)" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="rightGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(13, 148, 136)" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="rgb(52, 211, 153)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {helixData.map((data, i) => (
        <g key={i} style={{ animationDelay: `${data.animationDelay}s` }}>
          <circle
            cx={data.leftX}
            cy={data.y}
            r={data.radius}
            fill="url(#leftGradient)"
            className="animate-sphere-pulse"
            style={{ animationDelay: `${data.animationDelay}s` }}
          />
          <circle cx={data.leftHighlightX} cy={data.y - 1} r={data.highlightRadius} fill="rgba(255, 255, 255, 0.8)" opacity="0.6" />
          <circle
            cx={data.rightX}
            cy={data.y}
            r={data.radius}
            fill="url(#rightGradient)"
            className="animate-sphere-pulse"
            style={{ animationDelay: `${data.animationDelay + 0.5}s` }}
          />
          <circle cx={data.rightHighlightX} cy={data.y - 1} r={data.highlightRadius} fill="rgba(255, 255, 255, 0.8)" opacity="0.6" />
          <line
            x1={data.leftX}
            y1={data.y}
            x2={data.rightX}
            y2={data.y}
            stroke="url(#lineGradient)"
            strokeWidth="2.5"
            opacity="0.7"
            style={{ filter: 'drop-shadow(0 0 3px rgba(52, 211, 153, 0.5))' }}
          />
          <circle cx={data.leftMarkerX} cy={data.y} r={1.5} fill="rgb(167, 243, 208)" opacity="0.8" />
          <circle cx={data.rightMarkerX} cy={data.y} r={1.5} fill="rgb(153, 246, 228)" opacity="0.8" />
        </g>
      ))}
    </svg>
  )
}


