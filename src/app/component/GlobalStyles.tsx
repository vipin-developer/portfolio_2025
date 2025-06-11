import React from "react";

const GlobalStyles = React.memo(() => (
  <style jsx global>{`
    body {
      cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewport="0 0 100 100" style="fill:black;font-size:16px;"><text y="50%">+</text></svg>')
          10 10,
        auto;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #1a202c;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #0891b2;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #06b6d4;
    }

    @keyframes pulse-slow {
      50% {
        opacity: 0.7;
        text-shadow: 0 0 5px #06b6d4;
      }
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse-fast {
      50% {
        opacity: 0.6;
      }
    }
    .animate-pulse-fast {
      animation: pulse-fast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes flicker {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.95;
      }
      100% {
        opacity: 1;
      }
    }
  `}</style>
));

export default GlobalStyles; 