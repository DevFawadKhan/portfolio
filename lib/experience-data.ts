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
    id: "1decimal",
    title: "Fullstack Developer",
    company: "Decimal solution",
    duration: "Jan 2026 - Present",
    description:
      "Integrated front-end and back-end components, orchestrating end-to-end development and ensuring a cohesive user experience across the application. Conducted rigorous testing, debugging, and optimization procedures.",
    achievements: [
      "Orchestrated end-to-end development and ensured a cohesive user experience across applications",
      "Conducted rigorous testing, debugging, and optimization procedures guaranteeing high-quality, bug-free code",
      "Ensured optimal performance across platforms and devices",
      "Deployed the application on cloud infrastructure",
    ],
    order: 1,
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
    order: 2,
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
    order: 3,
  },
];
