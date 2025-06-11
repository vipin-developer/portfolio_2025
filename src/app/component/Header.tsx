import React, { useState, useEffect } from "react";
import { Cpu, HardDrive, Server } from "lucide-react";

interface HeaderProps {
  font: string;
  setFont: (font: string) => void;
}

const fontOptions = [
  { label: "JetBrains Mono", value: "jetbrains-mono" },
  { label: "Fira Mono", value: "fira-mono" },
  { label: "Source Code Pro", value: "source-code-pro" },
  { label: "Inter", value: "inter" },
  { label: "System", value: "system-ui" },
];

const Header = React.memo(({ font, setFont }: HeaderProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", { hour12: false });
  const formattedDate = time.toISOString().slice(0, 10);

  return (
    <header className="absolute top-0 left-0 right-0 bg-black/30 border-b-2 border-cyan-400/50 p-3 flex justify-between items-center text-sm z-[100]">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-cyan-400 animate-pulse-slow">
          GHOST_OS v4.0
        </h1>
        <div className="hidden sm:flex items-center gap-2">
          <Cpu size={16} className="text-green-400" />
          <span>CPU: {(Math.random() * 20 + 5).toFixed(2)}%</span>
          <HardDrive size={16} className="text-green-400" />
          <span>MEM: {(Math.random() * 40 + 30).toFixed(2)}%</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden md:inline">
          STATUS: <span className="text-green-400">SECURE</span>
        </span>
        <span className="hidden sm:inline">DATE: {formattedDate}</span>
        <span>TIME: {formattedTime}</span>
        <select
          value={font}
          onChange={e => setFont(e.target.value)}
          className="ml-2 bg-black/60 border border-cyan-400 text-cyan-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
          title="Change font"
        >
          {fontOptions.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-black text-cyan-400">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
});

export default Header; 