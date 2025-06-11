import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const CommsWindow = React.memo(() => {
  return (
    <div className="space-y-3 h-[180px]">
      <a
        href="https://github.com/vipin-developer"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:text-cyan-400 transition-colors duration-300 group"
      >
        <Github size={18} />
        <div>
          <span className="font-bold">GitHub</span>
          <p className="text-xs text-gray-500 group-hover:text-cyan-600">
            vipin-developer
          </p>
        </div>
      </a>
      <a
        href="https://www.linkedin.com/in/vipin-kumar-00216a149/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:text-cyan-400 transition-colors duration-300 group"
      >
        <Linkedin size={18} />
        <div>
          <span className="font-bold">LinkedIn</span>
          <p className="text-xs text-gray-500 group-hover:text-cyan-600">
            vipin-kumar-00216a149
          </p>
        </div>
      </a>
      <a
        href="mailto:vipinrajandcompany@gmail.com"
        className="flex items-center gap-3 hover:text-cyan-400 transition-colors duration-300 group"
      >
        <Mail size={18} />
        <div>
          <span className="font-bold">Email</span>
          <p className="text-xs text-gray-500 group-hover:text-cyan-600">
            vipinrajandcompany@gmail.com
          </p>
        </div>
      </a>
    </div>
  );
});

export default CommsWindow; 