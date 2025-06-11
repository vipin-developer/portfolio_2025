import React from "react";

const AsciiArt = React.memo(() => (
  <div className="relative w-full h-full flex items-center justify-center">
    <pre className="text-cyan-400 text-[8px] leading-tight font-mono animate-pulse-slow relative z-10 m-0 p-0">
      {`
   .:-===-:.
  .:-=-----=-:.
  :-=..   ..=-:
  -=   ...   =-
 .-. .:.:.:. .-.
 :=  .:::::.  =:
 .-. '-...-' .-.
  -=   ...   =-
  :-=..   ..=-:
  '-=-----=-:'
   ':-===-:'
      `}
    </pre>
    {/* Scanline overlay */}
    <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-20">
      <div className="ascii-scanline w-full h-4 bg-cyan-300/20 blur-[1px]" />
    </div>
  </div>
));

export default AsciiArt; 