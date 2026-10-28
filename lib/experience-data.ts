export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  order: number;
}

export const experience: Experience[] = [
  {
    id: "nizron-international",
    title: "Full Stack Engineer",
    company: "Nizron International Technologies",
    duration: "Aug 2026 - Present",
    description:
      "Lead end-to-end project delivery, from gathering client requirements and defining project workflows to coordinating timelines and maintaining software systems.",
    achievements: [
      "Manage the development team and coordinate end-to-end project delivery",
      "Gather requirements from clients and maintain communication through project meetings",
      "Define project flows and establish delivery timelines",
      "Support software maintenance and database backups",
    ],
    order: 1,
  },
  {
    id: "systems-limited",
    title: "PK Cloud App Dev & Maintenance Intern",
    company: "Systems Limited",
    duration: "Jun 22, 2026 - Aug 20, 2026",
    description:
      "Worked on PK Cloud application development and maintenance, gaining experience with software development methodologies, processes, and modern tools.",
    achievements: [
      "Contributed to cloud application development and maintenance",
      "Gained hands-on experience with software development processes and tools",
    ],
    order: 2,
  },
  {
    id: "1decimal",
    title: "Fullstack Developer",
    company: "Decimal solution",
    duration: "Jan 2026 - May 2026",
    description:
      "Integrated front-end and back-end components, orchestrating end-to-end development and ensuring a cohesive user experience across the application. Conducted rigorous testing, debugging, and optimization procedures.",
    achievements: [
      "Orchestrated end-to-end development and ensured a cohesive user experience across applications",
      "Conducted rigorous testing, debugging, and optimization procedures guaranteeing high-quality, bug-free code",
      "Ensured optimal performance across platforms and devices",
      "Deployed the application on cloud infrastructure",
    ],
    order: 3,
  },
  {
    id: "vorniqo",
    title: "Mern stack Developer",
    company: "Vorniqo Solutions",
    duration: "May 2025 – December 2025",
    description:
      "Full-stack MERN developer who built CRM, reservation systems with React, Node.js, and MongoDB. Implemented admin dashboards and role-based access.",
    achievements: [
      "Built professional CRM and reservation systems using React, Node.js, and MongoDB",
      "Implemented advanced admin dashboards and role-based access control systems",
      "Developed business features like promo codes and reservation tracking",
      "Optimized APIs and database performance for scalable business solutions",
    ],
    order: 4,
  },
  {
    id: "structures",
    title: "Mern stack Internship",
    company: "Structures Limited",
    duration: "Sep 2024 – Feb 2025",
    description:
      "Integrated front-end and back-end components, orchestrating end-to-end development and ensuring a cohesive user experience across applications.",
    achievements: [
      "Integrated front-end and back-end components for a cohesive user experience",
      "Orchestrated end-to-end development workflows in a collaborative environment",
      "Conducted rigorous testing, debugging, and optimization procedures",
      "Guaranteed high-quality performance across multiple platforms and devices",
    ],
    order: 5,
  },
];
