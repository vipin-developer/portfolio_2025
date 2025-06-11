import React, { useRef, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface WindowState {
  x: number;
  y: number;
  z: number;
  active: boolean;
  open: boolean;
  fullscreen?: boolean;
  minimized?: boolean;
  prevX?: number;
  prevY?: number;
}

export type Windows = {
  profile: WindowState;
  projects: WindowState;
  skills: WindowState;
  comms: WindowState;
  terminal: WindowState;
  education: WindowState;
  experience: WindowState;
  tictactoe: WindowState;
};

interface DraggableWindowProps {
  id: keyof Windows;
  title: string;
  icon: React.ReactElement<LucideIcon>;
  children: React.ReactNode;
  windows: Windows;
  setWindows: React.Dispatch<React.SetStateAction<Windows>>;
  bringToFront: (id: keyof Windows) => void;
  osContainerRef?: React.RefObject<HTMLDivElement>;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  id,
  title,
  icon,
  children,
  windows,
  setWindows,
  bringToFront,
  osContainerRef,
}) => {
  const windowState = windows[id];
  const dragRef = useRef({ offsetX: 0, offsetY: 0 });
  const windowDivRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const HEADER_HEIGHT = 64; // px, adjust if your header is a different height

  // Animation states
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  // Play restore animation when minimized becomes false
  useEffect(() => {
    if (!windowState.minimized && windowDivRef.current) {
      setIsRestoring(true);
      const timer = setTimeout(() => setIsRestoring(false), 300);
      return () => clearTimeout(timer);
    }
  }, [windowState.minimized]);

  // Keep window position in sync with state
  useEffect(() => {
    if (windowDivRef.current && !windowState.fullscreen) {
      windowDivRef.current.style.left = `${windowState.x}px`;
      windowDivRef.current.style.top = `${windowState.y}px`;
    }
  }, [windowState.x, windowState.y, windowState.fullscreen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    bringToFront(id);
    if (windowState.fullscreen) return;
    dragging.current = true;
    dragRef.current = {
      offsetX: e.clientX - windowState.x,
      offsetY: e.clientY - windowState.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current || windowState.fullscreen) return;
    const containerRect = osContainerRef?.current?.getBoundingClientRect() || document.documentElement.getBoundingClientRect();
    const windowRect = windowDivRef.current?.getBoundingClientRect();
    if (!windowRect) return;
    let newX = e.clientX - dragRef.current.offsetX;
    let newY = e.clientY - dragRef.current.offsetY;
    newX = Math.max(0, Math.min(newX, containerRect.width - windowRect.width));
    // Constrain Y so window can't go above the header
    newY = Math.max(HEADER_HEIGHT, Math.min(newY, containerRect.height - windowRect.height));
    if (windowDivRef.current) {
      windowDivRef.current.style.left = `${newX}px`;
      windowDivRef.current.style.top = `${newY}px`;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (windowDivRef.current) {
      const left = parseInt(windowDivRef.current.style.left, 10) || 0;
      const top = parseInt(windowDivRef.current.style.top, 10) || 0;
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          x: left,
          y: top,
        },
      }));
    }
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows((prev) => {
      const isFullscreen = prev[id].fullscreen;
      if (!isFullscreen) {
        // Going fullscreen: store current position
        return {
          ...prev,
          [id]: {
            ...prev[id],
            fullscreen: true,
            prevX: prev[id].x,
            prevY: prev[id].y,
          },
        };
      } else {
        // Exiting fullscreen: restore previous position
        return {
          ...prev,
          [id]: {
            ...prev[id],
            fullscreen: false,
            x: prev[id].prevX ?? prev[id].x,
            y: prev[id].prevY ?? prev[id].y,
          },
        };
      }
    });
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!windowState.minimized) {
      setIsMinimizing(true);
      setTimeout(() => {
        setWindows((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            minimized: true,
          },
        }));
        setIsMinimizing(false);
      }, 300); // match animation duration
    } else {
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          minimized: false,
        },
      }));
      // isRestoring will be set by useEffect
    }
  };

  const activeClasses = windowState.active
    ? "border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.5)]"
    : "border-cyan-600/30";

  const getFullscreenStyle = () => {
    if (!windowState.fullscreen) {
      return {
        left: `${windowState.x}px`,
        top: `${windowState.y}px`,
        zIndex: windowState.z,
      };
    }
    let rect = { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
    if (osContainerRef?.current) {
      rect = osContainerRef.current.getBoundingClientRect();
    }
    return {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      maxWidth: `${rect.width}px`,
      maxHeight: `${rect.height}px`,
      zIndex: 9999,
      position: 'fixed' as 'fixed',
    };
  };

  const blurClass = windowState.fullscreen ? "backdrop-blur-lg" : "backdrop-blur-sm";

  // Animation classes
  const animationClass = isMinimizing
    ? "animate-window-minimize"
    : isRestoring
    ? "animate-window-restore glitch-flicker"
    : "";

  const handleTouchStart = (e: React.TouchEvent) => {
    if (windowState.fullscreen) return;
    bringToFront(id);
    dragging.current = true;
    const touch = e.touches[0];
    dragRef.current = {
      offsetX: touch.clientX - windowState.x,
      offsetY: touch.clientY - windowState.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current || windowState.fullscreen) return;
    const touch = e.touches[0];
    const containerRect = osContainerRef?.current?.getBoundingClientRect() || document.documentElement.getBoundingClientRect();
    const windowRect = windowDivRef.current?.getBoundingClientRect();
    if (!windowRect) return;
    let newX = touch.clientX - dragRef.current.offsetX;
    let newY = touch.clientY - dragRef.current.offsetY;
    newX = Math.max(0, Math.min(newX, containerRect.width - windowRect.width));
    newY = Math.max(HEADER_HEIGHT, Math.min(newY, containerRect.height - windowRect.height));
    if (windowDivRef.current) {
      windowDivRef.current.style.left = `${newX}px`;
      windowDivRef.current.style.top = `${newY}px`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (windowDivRef.current) {
      const left = parseInt(windowDivRef.current.style.left, 10) || 0;
      const top = parseInt(windowDivRef.current.style.top, 10) || 0;
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          x: left,
          y: top,
        },
      }));
    }
  };

  return (
    <div
      ref={windowDivRef}
      className={`absolute border bg-black/40 rounded-md shadow-lg ${blurClass} transition-all duration-300 ${activeClasses} ${animationClass} w-full max-w-xs sm:max-w-md md:max-w-lg`}
      style={{
        ...getFullscreenStyle(),
        willChange: 'transform, opacity',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="bg-gray-800/50 border-b border-cyan-600/30 px-3 py-1 flex items-center gap-2 cursor-move select-none justify-between"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {React.cloneElement(icon, { className: "text-cyan-400" } as any)}
          <h2 className="text-cyan-400 font-bold text-sm uppercase tracking-wider select-none">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {!windowState.fullscreen && (
            <button
              onClick={handleMinimize}
              title={windowState.minimized ? "Restore" : "Minimize"}
              className="w-6 h-6 flex items-center justify-center text-cyan-300 hover:text-cyan-100"
              tabIndex={-1}
            >
              <svg width="14" height="14" viewBox="0 0 14 14"><rect x="2" y="7" width="10" height="2" rx="1" fill="currentColor" /></svg>
            </button>
          )}
          <button
            onClick={handleFullscreen}
            title={windowState.fullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="w-6 h-6 flex items-center justify-center text-cyan-300 hover:text-cyan-100"
            tabIndex={-1}
          >
            {windowState.fullscreen ? (
              <svg width="14" height="14" viewBox="0 0 14 14"><rect x="3" y="3" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="1" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            )}
          </button>
        </div>
      </div>
      {/* Only render window content if not minimized */}
      {!windowState.minimized && (
        <div
          className={
            windowState.fullscreen
              ? "p-6 w-full h-[calc(100vh-40px)] max-w-full max-h-full overflow-auto"
              : "p-4 w-[90vw] max-w-[450px] break-words overflow-x-auto overflow-y-auto max-h-[60vh]"
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DraggableWindow;
export type { WindowState }; 