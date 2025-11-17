import { useMemo } from 'react'

export function DnaHelix() {
  const helixData = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => {
      const y = i * 14
      const offset = Math.sin(i * 0.4) * 45
      const depth = Math.cos(i * 0.4) * 3
      const scale = 1 + depth * 0.2
      return {
        y,
        leftX: Math.round((100 + offset) * 100) / 100,
        rightX: Math.round((100 - offset) * 100) / 100,
        leftHighlightX: Math.round((100 + offset - 1) * 100) / 100,
        rightHighlightX: Math.round((100 - offset - 1) * 100) / 100,
        radius: Math.round(4.5 * scale * 100) / 100,
        highlightRadius: Math.round(1.8 * scale * 100) / 100,
        leftMarkerX: Math.round((100 + offset * 0.3) * 100) / 100,
        rightMarkerX: Math.round((100 - offset * 0.3) * 100) / 100,
        particleX: Math.round((100 + offset * 0.5) * 100) / 100,
        animationDelay: i * 0.05,
        pulseDelay: i * 0.08,
      }
    })
  }, [])

  return (
    <svg
      className="w-full h-full animate-rotate-dynamic"
      viewBox="0 0 200 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.4))' }}
    >
      <defs>
        <radialGradient id="leftGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(5, 150, 105)" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id="rightGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(13, 148, 136)" stopOpacity="0.7" />
        </radialGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.9" />
          <stop offset="50%" stopColor="rgb(52, 211, 153)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(167, 243, 208)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {helixData.map((data, i) => (
        <g key={i}>
          {/* Connecting line with enhanced glow */}
          <line
            x1={data.leftX}
            y1={data.y}
            x2={data.rightX}
            y2={data.y}
            stroke="url(#lineGradient)"
            strokeWidth="2.8"
            opacity="0.8"
            style={{ filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 0.6))' }}
          />
          
          {/* Left sphere with enhanced pulse */}
          <circle
            cx={data.leftX}
            cy={data.y}
            r={data.radius}
            fill="url(#leftGradient)"
            className="animate-sphere-pulse-dynamic"
            style={{ animationDelay: `${data.pulseDelay}s` }}
          />
          <circle 
            cx={data.leftHighlightX} 
            cy={data.y - 1} 
            r={data.highlightRadius} 
            fill="rgba(255, 255, 255, 0.9)" 
            opacity="0.7" 
          />
          
          {/* Right sphere with enhanced pulse */}
          <circle
            cx={data.rightX}
            cy={data.y}
            r={data.radius}
            fill="url(#rightGradient)"
            className="animate-sphere-pulse-dynamic"
            style={{ animationDelay: `${data.pulseDelay + 0.4}s` }}
          />
          <circle 
            cx={data.rightHighlightX} 
            cy={data.y - 1} 
            r={data.highlightRadius} 
            fill="rgba(255, 255, 255, 0.9)" 
            opacity="0.7" 
          />
          
          {/* Base pair markers */}
          <circle 
            cx={data.leftMarkerX} 
            cy={data.y} 
            r={1.8} 
            fill="rgb(167, 243, 208)" 
            opacity="0.9"
            className="animate-particle-flow"
            style={{ animationDelay: `${data.animationDelay}s` }}
          />
          <circle 
            cx={data.rightMarkerX} 
            cy={data.y} 
            r={1.8} 
            fill="rgb(153, 246, 228)" 
            opacity="0.9"
            className="animate-particle-flow"
            style={{ animationDelay: `${data.animationDelay + 0.3}s` }}
          />
          
          {/* Flowing particle effect */}
          <circle
            cx={data.particleX}
            cy={data.y}
            r={2.5}
            fill="url(#particleGradient)"
            className="animate-particle-glow"
            style={{ animationDelay: `${data.animationDelay * 1.5}s` }}
          />
        </g>
      ))}
    </svg>
  )
}

