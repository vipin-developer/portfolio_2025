import React, { useState, useEffect } from "react";

const ProfileWindow = React.memo(() => {
  const bioText =
    `Mature IT professional offering 6.5+ years of hands-on experience in the industry with a key focus on JavaScript and proven ability to design, modify, and implement technology solutions for clients.\n\nExperience in ReactJS, Angular, Vue.js, Node.js, MongoDB, AWS, GCP.\n\nWell-versed in software documentation, requirements, and design. Team Lead experience (8+ members).\n\nWorked in Healthcare, Construction, Transportation, Logistics. Agile methodology.\n\nContact: vipinrajandcompany@gmail.com | +91 8789192884 | Bangalore, Karnataka`;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 h-[200px]">
      <div className="relative w-32 h-32 flex items-center justify-center overflow-hidden">
        <img src="/profile.jpg" alt="Profile" className="w-32 h-32 object-cover rounded-full border-4 border-cyan-400 shadow-[0_0_24px_4px_rgba(0,255,255,0.5)]" />
        {/* Scanline animation overlay */}
        <span className="absolute left-0 w-full h-6 bg-cyan-300/40 pointer-events-none animate-scanline rounded-full" style={{filter: 'blur(1px)', top: 0}}></span>
        <span className="absolute left-0 w-full h-1 bg-white/30 pointer-events-none animate-scanline rounded-full" style={{filter: 'blur(2px)', top: 0}}></span>
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-red-500">Vipin Kumar</h3>
        <div className="text-xs text-gray-400 mb-1">Senior Software Engineer</div>
        <p className="text-gray-400 mt-2 h-32 whitespace-pre-line">
          {bioText}
          <span className="animate-ping">_</span>
        </p>
      </div>
      <style jsx>{`
        @keyframes scanline {
          0% { top: 0%; }
          50% { top: 80%; }
          100% { top: 0%; }
        }
        .animate-scanline {
          animation: scanline 2.5s cubic-bezier(0.4,0,0.2,1) infinite;
        }
      `}</style>
    </div>
  );
});

export default ProfileWindow; 