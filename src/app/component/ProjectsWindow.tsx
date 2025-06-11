import React from "react";

const ProjectsWindow = React.memo(() => {
  const projects = [
    {
      name: "ALLEN Online Platform (Nineleaps)",
      desc: "EdTech platform for JEE/NEET aspirants. Built with React, Next.js, Redux, Tailwind. Collaborated with 14+ team members.",
      status: "ACTIVE",
    },
    {
      name: "Travel Agency Portal (EPAM Systems)",
      desc: "Multi-user React app for travel agency. Used Micro Front-End, Redux, Jira integration.",
      status: "COMPLETED",
    },
    {
      name: "Radiolens & DICOM Viewer (Synapsica)",
      desc: "AI-powered medical imaging viewer for radiologists. Integrated AI for anomaly detection and reporting.",
      status: "COMPLETED",
    },
    {
      name: "Auditing Platform (ICT Group India)",
      desc: "Microservice-based auditing app for Australian client. Angular, Vue.js, Node.js, MongoDB, NGRX.",
      status: "COMPLETED",
    },
    {
      name: "Bluddy App (Adinav Labs)",
      desc: "Cross-platform blood donation app. React Native, Node.js, AWS, Firebase.",
      status: "COMPLETED",
    },
    {
      name: "Saifarmiculture Sales App (Adinav Labs)",
      desc: "Inventory and sales management for fruit distributor. Ionic, Angular, React.js, Node.js, MongoDB.",
      status: "COMPLETED",
    },
  ];

  return (
    <div className="space-y-3 h-64 overflow-y-auto pr-2 custom-scrollbar">
      {projects.map((p) => (
        <div
          key={p.name}
          className="border-l-2 border-cyan-500 pl-3 hover:bg-gray-800/40 transition-colors duration-300"
        >
          <div className="flex justify-between items-baseline">
            <h4 className="font-bold text-green-400">{p.name}</h4>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                p.status === "ACTIVE"
                  ? "bg-green-500/20 text-green-400"
                  : p.status === "COMPLETED"
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {p.status}
            </span>
          </div>
          <p className="text-sm text-gray-400">{p.desc}</p>
        </div>
      ))}
    </div>
  );
});

export default ProjectsWindow; 