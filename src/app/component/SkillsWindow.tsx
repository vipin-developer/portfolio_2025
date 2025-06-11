import React from "react";
import { Server, Cpu, Shield, Database, Code, Cloud, GitBranch, Users, BookOpen, Settings, Globe, Layers, Terminal, Monitor, BarChart2 } from "lucide-react";

const SkillsWindow = React.memo(() => {
  return (
    <div className="space-y-3 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
      <div>
        <div className="font-bold text-cyan-400 mb-1">Academic Disciplines</div>
        <ul className="list-disc ml-5 text-sm">
          <li><BookOpen size={14} className="inline mr-1" />Design patterns, Software Development</li>
        </ul>
      </div>
      <div>
        <div className="font-bold text-cyan-400 mb-1">Consulting Practice</div>
        <ul className="list-disc ml-5 text-sm">
          <li><BarChart2 size={14} className="inline mr-1" />Deployment, SCM Transportation and Logistics Planning</li>
        </ul>
      </div>
      <div>
        <div className="font-bold text-cyan-400 mb-1">Engineering Practices</div>
        <ul className="list-disc ml-5 text-sm">
          <li><Monitor size={14} className="inline mr-1" />Web Performance Analysis and Optimization</li>
          <li><Cloud size={14} className="inline mr-1" />Security, Cloud, CI/CD & Maintenance</li>
          <li><Users size={14} className="inline mr-1" />Management</li>
          <li><Settings size={14} className="inline mr-1" />Engineering Excellence, Debugging, Cloud Fundamentals, Software Design, Version Control</li>
        </ul>
      </div>
      <div>
        <div className="font-bold text-cyan-400 mb-1">Leadership & Soft Skills</div>
        <ul className="list-disc ml-5 text-sm">
          <li><Users size={14} className="inline mr-1" />Leadership, Conflict management, Negotiations, Ownership</li>
        </ul>
      </div>
      <div>
        <div className="font-bold text-cyan-400 mb-1">Managerial</div>
        <ul className="list-disc ml-5 text-sm">
          <li><Users size={14} className="inline mr-1" />Project Management, Delegation, Scrum, Waterfall, Agile, Motivation, Career Advising</li>
        </ul>
      </div>
      <div>
        <div className="font-bold text-cyan-400 mb-1">Technologies</div>
        <ul className="list-disc ml-5 text-sm">
          <li><Terminal size={14} className="inline mr-1" />GraphQL, Git, PostgreSQL, MongoDB, ReactJS, RxJS, VueJS, React Native, Angular, Express, Jest, Bootstrap CSS, Redux, React-Bootstrap, JavaScript Top Frameworks, Ionic, REST API, Node.js, AWS S3, API Gateway, JavaScript Development Tools, Browser APIs, Node.js Core, JavaScript Desktop Platform, React Router</li>
        </ul>
      </div>
      <div>
        <div className="font-bold text-cyan-400 mb-1">Platforms & OS</div>
        <ul className="list-disc ml-5 text-sm">
          <li><Globe size={14} className="inline mr-1" />Amazon Web Services, Ubuntu, Android, Google Cloud Platform, Microsoft Windows, Linux, macOS</li>
        </ul>
      </div>
    </div>
  );
});

export default SkillsWindow; 