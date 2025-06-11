import React, { useState, useRef, useEffect, useMemo } from "react";

interface TerminalWindowProps {}

const TerminalWindow = React.memo(({}: TerminalWindowProps) => {
  const [history, setHistory] = useState<Array<{ type: string; text: string }>>([
    {
      type: "info",
      text: 'GHOST_OS Terminal. Type "help" for a list of commands.',
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  const commands = useMemo(
    () => {
      const cmds = {
        help: {
          description: "Shows this help message.",
          execute: () => ({
            type: "info",
            text: 'GHOST_OS Terminal. Type "help" for a list of commands.',
          }),
        },
        whoami: {
          description: "Displays agent profile.",
          execute: () => ({
            type: "success",
            text: "Alias: ShadowByte. Status: Active. Mission: Infiltrate and Expose.",
          }),
        },
        ls: {
          description: "Lists files in the current directory.",
          execute: () => ({
            type: "info",
            text: "profile.txt   projects/   contact.dat",
          }),
        },
        cat: {
          description: "Displays file contents. Usage: cat <file>",
          execute: (args: string[]) => {
            if (args[0] === "profile.txt")
              return {
                type: "info",
                text: "Autonomous ghost in the machine... Specializing in network infiltration...",
              };
            if (args[0] === "contact.dat")
              return { type: "info", text: "ProtonMail: shadow.byte@pm.me" };
            return {
              type: "error",
              text: `cat: ${args[0] || "file"}: No such file or directory`,
            };
          },
        },
        contact: {
          description: "Opens a secure mail link.",
          execute: () => {
            window.open("mailto:shadow.byte@pm.me", "_blank");
            return { type: "success", text: "Secure mail client opened." };
          },
        },
        clear: {
          description: "Clears the terminal screen.",
          execute: () => {
            setHistory([]);
            return { type: "system", text: "" };
          },
        },
        hire: {
          description: "Easter egg: Request forwarded to HR.",
          execute: () => ({
            type: "info",
            text: "[Request forwarded to HR. Response ETA: unknown.]",
          }),
        },
        'nuke-all': {
          description: "Easter egg: Access Denied.",
          execute: () => ({
            type: "error",
            text: "🚫 Access Denied. You're not that guy, pal.",
          }),
        },
        'vipin': {
          description: "Easter egg: Try --joke flag.",
          execute: (args: string[]) => {
            if (args[0] === "--joke") {
              return {
                type: "info",
                text: "[Why do JavaScript devs wear glasses? Because they don't C#. 😂]",
              };
            }
            return {
              type: "info",
              text: "Try 'vipin --joke' for a surprise!",
            };
          },
        },
        'ascii-dragon': {
          description: "Easter egg: ASCII dragon.",
          execute: () => ({
            type: "info",
            text: "🐉🔥 ASCII dragon breathes fire...",
          }),
        },
        'ascii-vipin': {
          description: "Easter egg: ASCII Vipin.",
          execute: () => ({
            type: "info",
            text: `
V   V IIIII PPPP  IIIII N   N
V   V   I   P   P   I   NN  N
V   V   I   PPPP    I   N N N
 V V    I   P       I   N  NN
  V   IIIII P     IIIII N   N
`,
          }),
        },
      };
      cmds.help = {
        description: "Shows this help message.",
        execute: () => ({
          type: "info",
          text: `Available commands:\n${Object.keys(cmds).join("\n")}`,
        }),
      };
      return cmds;
    },
    []
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (trimmedInput) {
        const [command, ...args] = trimmedInput.split(" ");
        let output;
        if (command in commands) {
          output = commands[command as keyof typeof commands].execute(args);
        } else {
          output = { type: "error", text: `command not found: ${command}` };
        }
        setHistory((prevHistory) => [...prevHistory, output]);
        setInput("");
      }
    }
  };

  return (
    <div className="h-[180px] sm:h-[300px] text-base sm:text-sm" onClick={() => inputRef.current?.focus()}>
      <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
        {history.map((line, index) => (
          <div key={index}>
            {line.type === "input" && (
              <div className="flex">
                <span className="text-cyan-400">ghost@os:~$</span>
                <p className="flex-1 ml-2">{line.text}</p>
              </div>
            )}
            {line.type === "info" && (
              <p className="text-gray-300 whitespace-pre-wrap">{line.text}</p>
            )}
            {line.type === "success" && (
              <p className="text-green-400 whitespace-pre-wrap">{line.text}</p>
            )}
            {line.type === "error" && (
              <p className="text-red-500 whitespace-pre-wrap">{line.text}</p>
            )}
          </div>
        ))}
        <div ref={endOfHistoryRef} />
      </div>
      <div className="flex mt-2">
        <span className="text-cyan-400">ghost@os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 ml-2 bg-transparent text-gray-200 focus:outline-none px-1 rounded text-lg sm:text-base border border-none"
          autoFocus
        />
      </div>
    </div>
  );
});

export default TerminalWindow;