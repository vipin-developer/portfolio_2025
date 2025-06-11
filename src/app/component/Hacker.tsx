import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  Cpu,
  Code,
  Server,
  Database,
  Shield,
  HardDrive,
  Terminal,
  HelpCircle,
  LucideIcon,
  BookOpen,
  Briefcase,
  Gamepad,
} from "lucide-react";
import DraggableWindow, { WindowState, Windows } from "./DraggableWindow";
import Header from "./Header";
import Scanlines from "./Scanlines";
import GlobalStyles from "./GlobalStyles";
import dynamic from "next/dynamic";
import AnimatedOverlay from "./AnimatedOverlay";
import RotatingEarth from "./RotatingEarth";

// Font context for global font switching
const fontOptions = [
  { label: "JetBrains Mono", value: "jetbrains-mono" },
  { label: "Fira Mono", value: "fira-mono" },
  { label: "Source Code Pro", value: "source-code-pro" },
  { label: "Inter", value: "inter" },
  { label: "System", value: "system-ui" },
];

const fontClassMap: Record<string, string> = {
  "jetbrains-mono": "font-jetbrains",
  "fira-mono": "font-fira",
  "source-code-pro": "font-source",
  "inter": "font-inter",
  "system-ui": "font-sans",
};

const FontContext = createContext<{
  font: string;
  setFont: (font: string) => void;
}>({ font: "jetbrains-mono", setFont: () => {} });

// --- Main App Component ---
export default function Hacker() {
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [font, setFont] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("ghostos-font")
      ? localStorage.getItem("ghostos-font")!
      : "jetbrains-mono"
  );
  const [osGlitch, setOsGlitch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ghostos-font", font);
    }
  }, [font]);

  useEffect(() => {
    const bootTimer = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(bootTimer);
          setTimeout(() => setBooting(false), 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(bootTimer);
  }, []);

  useEffect(() => {
    if (!booting) {
      let glitchTimeout: NodeJS.Timeout;
      let scheduleGlitch = () => {
        const next = Math.random() * 20000 + 10000; // 10-30s
        glitchTimeout = setTimeout(() => {
          setOsGlitch(true);
          setTimeout(() => setOsGlitch(false), 400);
          scheduleGlitch();
        }, next);
      };
      scheduleGlitch();
      return () => clearTimeout(glitchTimeout);
    }
  }, [booting]);

  useEffect(() => {
    // Prevent browser scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      <div className={`bg-black fixed inset-0 w-screen h-screen ${fontClassMap[font] || "font-mono"} ${osGlitch ? "os-glitch-flicker" : ""}`} style={{overflow: 'hidden'}}>
        {booting ? (
          <BootScreen progress={bootProgress} />
        ) : (
          <PortfolioOS />
        )}
      </div>
    </FontContext.Provider>
  );
}

// --- UI Components ---

const BootScreen = ({ progress }: { progress: number }) => {
  const messages = [
    "Initializing BIOS...",
    "Checking memory...",
    "Loading kernel modules...",
    "Mounting file systems...",
    "Starting network services...",
    "Establishing quantum-encrypted channel...",
    "Decrypting user interface...",
    "Finalizing boot sequence...",
  ];
  const visibleMessages = messages.slice(
    0,
    Math.floor(progress / (100 / messages.length))
  );

  return (
    <div className="text-green-400 h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-left">
        {visibleMessages.map((msg, i) => (
          <p key={i} className="animate-pulse-fast">
            &gt; {msg}
          </p>
        ))}
      </div>
      <div className="w-full max-w-2xl h-4 bg-gray-800 rounded-sm mt-8 overflow-hidden border border-green-700">
        <div
          className="h-full bg-green-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-4 text-sm">
        LOADING GHOST_OS v4.0... {Math.round(progress)}%
      </p>
    </div>
  );
};

const ProfileWindow = dynamic(() => import("./ProfileWindow"));
const ProjectsWindow = dynamic(() => import("./ProjectsWindow"));
const SkillsWindow = dynamic(() => import("./SkillsWindow"));
const CommsWindow = dynamic(() => import("./CommsWindow"));
const TerminalWindow = dynamic(() => import("./TerminalWindow"));
const EducationWindow = dynamic(() => import("./EducationWindow"));
const WorkExperienceWindow = dynamic(() => import("./WorkExperienceWindow"));
const TicTacToeWindow = dynamic(() => import("./TicTacToeWindow"));

const PortfolioOS = () => {
  const [windows, setWindows] = useState<Windows>({
    profile: { x: 50, y: 90, z: 10, active: true, open: true },
    projects: { x: 50, y: 240, z: 9, active: false, open: true, minimized: true },
    skills: { x: 50, y: 390, z: 8, active: false, open: true, minimized: true },
    comms: { x: 50, y: 540, z: 7, active: false, open: true, minimized: true },
    terminal: { x: 600, y: 90, z: 11, active: false, open: true },
    education: { x: 600, y: 240, z: 6, active: false, open: true, minimized: true },
    experience: { x: 600, y: 390, z: 5, active: false, open: true, minimized: true },
    tictactoe: { x: 400, y: 440, z: 4, active: false, open: true, minimized: true },
  });

  const osContainerRef = useRef<HTMLDivElement>(null);
  const { font, setFont } = useContext(FontContext);

  const bringToFront = useCallback((id: keyof Windows) => {
    setWindows((prev) => {
      const maxZ = Math.max(...Object.values(prev).map((w) => w.z));
      const newWindows = { ...prev };
      (Object.keys(newWindows) as (keyof Windows)[]).forEach((key) => {
        newWindows[key].active = key === id;
      });
      newWindows[id].z = maxZ + 1;
      return newWindows;
    });
  }, []);

  // Get minimized windows for the dock
  const minimizedWindows = useMemo(() => Object.entries(windows).filter(([_, state]) => state.minimized), [windows]);

  return (
    <div ref={osContainerRef} className="relative h-screen w-full p-2 sm:p-4 lg:p-6 selection:bg-cyan-400 selection:text-black">
      <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.3)] pointer-events-none"></div>

      <Header font={font} setFont={setFont} />
      <AnimatedOverlay />
      <RotatingEarth />

      <main className="">
        {windows.profile.open && !windows.profile.minimized && (
          <DraggableWindow
            id="profile"
            title="AGENT_PROFILE"
            icon={<FileText size={14} />}
            windows={windows}
            setWindows={setWindows}
            bringToFront={bringToFront}
            osContainerRef={osContainerRef}
          >
            <ProfileWindow />
          </DraggableWindow>
        )}
        {windows.projects.open && !windows.projects.minimized && (
          <DraggableWindow
            id="projects"
            title="CLASSIFIED_PROJECTS"
            icon={<Code size={14} />}
            windows={windows}
            setWindows={setWindows}
            bringToFront={bringToFront}
            osContainerRef={osContainerRef}
          >
            <ProjectsWindow />
          </DraggableWindow>
        )}
        {windows.skills.open && !windows.skills.minimized && (
          <DraggableWindow
            id="skills"
            title="SKILL_MATRIX"
            icon={<Cpu size={14} />}
            windows={windows}
            setWindows={setWindows}
            bringToFront={bringToFront}
            osContainerRef={osContainerRef}
          >
            <SkillsWindow />
          </DraggableWindow>
        )}
        {windows.comms.open && !windows.comms.minimized && (
          <DraggableWindow
            id="comms"
            title="SECURE_COMMS"
            icon={<Mail size={14} />}
            windows={windows}
            setWindows={setWindows}
            bringToFront={bringToFront}
            osContainerRef={osContainerRef}
          >
            <CommsWindow />
          </DraggableWindow>
        )}
        {windows.terminal.open && !windows.terminal.minimized && (
          <DraggableWindow
            id="terminal"
            title="TERMINAL"
            icon={<Terminal size={14} />}
            windows={windows}
            setWindows={setWindows}
            bringToFront={bringToFront}
            osContainerRef={osContainerRef}
          >
            <TerminalWindow />
          </DraggableWindow>
        )}
        {windows.education.open && !windows.education.minimized && (
          <DraggableWindow
            id="education"
            title="EDUCATION"
            icon={<BookOpen size={14} />}
            windows={windows}
            setWindows={setWindows}
            bringToFront={bringToFront}
            osContainerRef={osContainerRef}
          >
            <EducationWindow />
          </DraggableWindow>
        )}
        {windows.experience.open && !windows.experience.minimized && (
          <DraggableWindow
            id="experience"
            title="WORK_EXPERIENCE"
            icon={<Briefcase size={14} />}
            windows={windows}
            setWindows={setWindows}
            bringToFront={bringToFront}
            osContainerRef={osContainerRef}
          >
            <WorkExperienceWindow />
          </DraggableWindow>
        )}
        {windows.tictactoe.open && !windows.tictactoe.minimized && (
          <DraggableWindow
            id="tictactoe"
            title="TIC_TAC_TOE"
            icon={<Gamepad size={14} />}
            windows={windows}
            setWindows={setWindows}
            bringToFront={bringToFront}
            osContainerRef={osContainerRef}
          >
            <TicTacToeWindow />
          </DraggableWindow>
        )}
      </main>

      {/* Responsive dock: bottom on mobile, right on desktop */}
      {minimizedWindows.length > 0 && (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 flex flex-row gap-2 bg-black/60 backdrop-blur-md  shadow-[0_4px_32px_rgba(0,255,255,0.15)] p-2 z-[10000] sm:top-1/2 sm:right-4 sm:left-auto sm:-translate-x-0 sm:-translate-y-1/2 sm:flex-col sm:gap-3 sm:p-3">
          {minimizedWindows.map(([id, state]) => {
            // Get the appropriate icon for each window
            let Icon;
            switch (id) {
              case 'profile':
                Icon = FileText;
                break;
              case 'projects':
                Icon = Code;
                break;
              case 'skills':
                Icon = Cpu;
                break;
              case 'comms':
                Icon = Mail;
                break;
              case 'terminal':
                Icon = Terminal;
                break;
              case 'education':
                Icon = BookOpen;
                break;
              case 'experience':
                Icon = Briefcase;
                break;
              case 'tictactoe':
                Icon = Gamepad;
                break;
              default:
                Icon = FileText;
            }

            return (
              <button
                key={id}
                onClick={() => {
                  setWindows((prev) => ({
                    ...prev,
                    [id as keyof Windows]: {
                      ...prev[id as keyof Windows],
                      minimized: false,
                    },
                  }));
                  bringToFront(id as keyof Windows);
                }}
                className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center text-cyan-300 hover:text-cyan-50 hover:bg-cyan-400/20 hover:shadow-[0_0_8px_2px_rgba(0,255,255,0.25)] rounded-lg transition-all border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 group"
              >
                <Icon size={28} className="group-hover:scale-110 transition-transform sm:size-24" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <Scanlines />
      <GlobalStyles />
    </div>
  );
};
