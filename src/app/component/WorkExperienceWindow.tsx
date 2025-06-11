import React from "react";

const WorkExperienceWindow = React.memo(() => (
  <div className="space-y-4 h-[350px] overflow-y-auto pr-2 custom-scrollbar">
    <h3 className="text-lg font-bold text-cyan-400 mb-2">Work Experience</h3>
    <div>
      <div className="font-semibold">SDE-2, Nineleaps</div>
      <div className="text-xs text-gray-400">Jan 2024 – Present | Bangalore</div>
      <div className="text-xs">Project: ALLEN online (JEE/NEET platform)</div>
      <ul className="list-disc ml-5 text-sm">
        <li>Worked with TS, Next.js, React.js, Redux, Tailwind, HTML/CSS/SCSS, JS</li>
        <li>Collaborated with teams to develop features</li>
        <li>Team size: 14-15</li>
      </ul>
    </div>
    <div>
      <div className="font-semibold">Senior Software Engineer, EPAM Systems</div>
      <div className="text-xs text-gray-400">Aug 2023 – Dec 2024</div>
      <div className="text-xs">Project: Travel agency React project</div>
      <ul className="list-disc ml-5 text-sm">
        <li>Used Micro Front-End, React.js, Redux, HTML/CSS/SCSS, JS</li>
        <li>Collaborated with teams, learned Jira/ticket management</li>
        <li>Team size: 6</li>
      </ul>
    </div>
    <div>
      <div className="font-semibold">Software Engineer, Synapsica Healthcare Pvt Ltd</div>
      <div className="text-xs text-gray-400">Dec 2021 – Aug 2023</div>
      <div className="text-xs">Project: Radiolens & DICOM viewer (AI for medical imaging)</div>
      <ul className="list-disc ml-5 text-sm">
        <li>Tech stack discussion, business logic, Micro Front-End</li>
        <li>React.js, Redux, ElementUi, React Bootstrap, Gitlab</li>
        <li>Team size: 7</li>
      </ul>
    </div>
    <div>
      <div className="font-semibold">Tech Lead, ICT Group India Pvt Ltd</div>
      <div className="text-xs text-gray-400">Feb 2020 – Nov 2021</div>
      <div className="text-xs">Project: Auditing platform (Australia)</div>
      <ul className="list-disc ml-5 text-sm">
        <li>Designed microservice architecture with API gateway</li>
        <li>Angular, Vue.js, NGRX, Node.js, MongoDb, Agile, Jira</li>
        <li>Team size: 9</li>
      </ul>
    </div>
    <div>
      <div className="font-semibold">Tech Lead/Software Developer, Adinav Labs Pvt Ltd</div>
      <div className="text-xs text-gray-400">Jan 2019 – Jan 2020</div>
      <div className="text-xs">Project: Bluddy App (blood donation app)</div>
      <ul className="list-disc ml-5 text-sm">
        <li>Developed mobile app for iOS/Android, AWS, Firebase</li>
        <li>React-Native, React.js, Node.js, MongoDB</li>
        <li>Team size: 10</li>
      </ul>
    </div>
    <div>
      <div className="font-semibold">Tech Lead/Software Developer, Adinav Labs Pvt Ltd</div>
      <div className="text-xs text-gray-400">Aug 2018 – Jan 2019</div>
      <div className="text-xs">Project: Saifarmiculture India (fruit distributor app)</div>
      <ul className="list-disc ml-5 text-sm">
        <li>Developed Android/web app, AWS LightSail, Ionic, Angular, React.js, Node.js, MongoDB</li>
        <li>Team size: 10</li>
      </ul>
    </div>
  </div>
));

export default WorkExperienceWindow; 