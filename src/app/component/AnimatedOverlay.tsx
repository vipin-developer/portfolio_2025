import React from "react";

const AnimatedOverlay = React.memo(() => (
  <div className="fixed inset-0 w-full h-full pointer-events-none z-[5]">
    {/* SVG animated grid/circuit effect */}
    <svg width="100%" height="100%" className="absolute inset-0 w-full h-full" style={{opacity:0.38, filter:'drop-shadow(0 0 12px #00fff7)'}}>
      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00fff7" stopOpacity="1" />
          <stop offset="100%" stopColor="#00fff7" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* More vertical lines */}
      {Array.from({length: 40}).map((_,i) => (
        <line key={i} x1={i*36} y1="0" x2={i*36} y2="100%" stroke="url(#glow)" strokeWidth="1.2" />
      ))}
      {/* More horizontal lines */}
      {Array.from({length: 28}).map((_,i) => (
        <line key={100+i} x1="0" y1={i*32} x2="100%" y2={i*32} stroke="url(#glow)" strokeWidth="1.2" />
      ))}
      {/* Animated data pulses - more and brighter */}
      <g>
        {Array.from({length: 8}).map((_,i) => (
          <circle key={i} cx={60 + i*180} cy={30 + (i%2)*400} r={4 + (i%3)} fill="#00fff7" opacity="0.85">
            <animate attributeName="cy" values={`30;900;30`} dur={`${4 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {Array.from({length: 6}).map((_,i) => (
          <circle key={20+i} cx={120 + i*220} cy={600 - (i%2)*300} r={2 + (i%2)} fill="#00fff7" opacity="0.6">
            <animate attributeName="cy" values={`600;0;600`} dur={`${5 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
    </svg>
  </div>
));

export default AnimatedOverlay; 