import React from 'react';

export const Logo = ({ width = "200", className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 280 60" 
      width={width} 
      className={className}
      style={{ display: 'block' }}
    >
      <defs>
        {/* Brand Gradient matching your CSS */}
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#F7931E" />
        </linearGradient>
        
        {/* Darker gradient for depth */}
        <linearGradient id="logoGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E65100" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
      </defs>

      {/* --- ICON: Paper Plane (Symbolizing Journey, Kids, and Adventure) --- */}
      <g transform="translate(10, 10)">
        {/* Dotted path (The 'Yatra' trail) */}
        <path 
          d="M -5 35 Q 5 45 15 30" 
          fill="none" 
          stroke="#4CAF50" 
          strokeWidth="3" 
          strokeDasharray="4 4" 
          strokeLinecap="round" 
        />
        
        {/* Top Wing */}
        <path d="M 5 25 L 45 5 L 23 30 Z" fill="url(#logoGrad)" />
        
        {/* Bottom Wing */}
        <path d="M 45 5 L 30 45 L 23 30 Z" fill="url(#logoGradDark)" />
        
        {/* Underbelly / Fold Shadow */}
        <path d="M 23 30 L 30 45 L 20 38 Z" fill="#D84315" opacity="0.8" />
      </g>

      {/* --- TYPOGRAPHY: "Kid Yatra" --- */}
      <text 
        x="65" 
        y="42" 
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
        fontWeight="900" 
        fontSize="32" 
        letterSpacing="-0.5"
      >
        <tspan fill="#333333">Kid </tspan>
        <tspan fill="url(#logoGrad)">Yatra</tspan>
      </text>
      
      {/* Optional: Tiny Tagline dot or accent */}
      <circle cx="215" cy="40" r="4" fill="#4CAF50" />
    </svg>
  );
};