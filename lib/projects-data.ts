export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    id: "hsq-website",
    title: "HSQ Towers Website",
    shortDescription: "Luxury Hotel & Resort Website",
    description:
      "Engineered a high-end, conversion-focused digital platform for HSQ Towers, a premier luxury resort. Orchestrated seamless UI transitions and high-performance room-exploration features, resulting in a sophisticated user experience that accurately reflects the brand's luxury identity.",
    image: "/project/hsqwebsite.png",
    tags: ["React", "Tailwind CSS", "Zustand", "Framer Motion", "React Query"],
    link: "https://www.hsqtowers.com/",
    featured: true,
    order: 1,
  },
  {
    id: "hsq-crm",
    title: "HSQ Towers CRM",
    shortDescription: "Property Management & CRM",
    description:
      "Architected and deployed a robust, custom-built Property Management System (PMS) and CRM for HSQ Towers. Streamlined complex booking workflows, guest-data management, and real-time hotel operations, significantly improving administrative efficiency and data accuracy.",
    image: "/project/hsqcrm.png",
    tags: ["React", "Tailwind CSS", "MongoDB", "Express.js", "Shadcn/UI"],
    link: "https://hsqtower.org",
    featured: true,
    order: 2,
  },
  {
    id: "vendorcall",
    title: "Vendor Call",
    shortDescription: "Property Service Marketplace",
    description:
      "Developed an end-to-end B2B service marketplace connecting property managers with specialized maintenance vendors. Integrated a dynamic ecosystem for plumbing, electrical, and caretaking services, supporting flexible hourly and daily booking models for streamlined estate operations.",
    image: "/project/vendorcall.png",
    tags: ["React", "Node.js", "PropertyTech", "B2B SaaS"],
    link: "https://www.vendorcall.com/",
    featured: true,
    order: 3,
  },
  {
    id: "corent-ai",
    title: "Corent AI",
    shortDescription: "AI Cloud Modernization",
    description:
      "Contributed to the development of an AI-driven cloud modernization engine that automates complex application-transformation and migration processes. Focused on enhancing scalability and architectural optimization for enterprise-level cloud deployments.",
    image: "/project/corent.png",
    tags: ["Next.js", "TypeScript", "Shadcn/UI", "PostgreSQL"],
    link: "https://corent.ai/",
    featured: true,
    order: 4,
  },
  {
    id: "corent-io",
    title: "Corent IO",
    shortDescription: "SaaS Transformation Platform",
    description:
      "Engineered core modules for a SaaS-ification platform, enabling legacy software vendors to transition into multi-tenant SaaS models. Optimized tenant-lifecycle management and resource-allocation algorithms to ensure seamless scalability and operational efficiency.",
    image: "/project/corentio.png",
    tags: ["Next.js", "PostgreSQL", "Shadcn/UI"],
    link: "https://corent.io/",
    featured: true,
    order: 5,
  },
  {
    id: "hotel-management",
    title: "Hotel Management SaaS",
    shortDescription: "Multi-Hotel Management System",
    description:
      "Architected a comprehensive Hotel Management SaaS platform for property owners to oversee multiple hotel locations. Integrated modules for staff management, revenue/expense tracking, real-time booking, inventory control, and marketing tools such as automated coupon campaigns and blog management.",
    image: "/project/dabs.png",
    tags: ["React", "JSX", "Bootstrap", "MongoDB"],
    link: "https://dev.d3f5bhemmrxzu7.amplifyapp.com/customer",
    featured: true,
    order: 6,
  },
  {
    id: "publish-cleaning",
    title: "Publish Cleaning",
    shortDescription: "Cleaning Services Platform",
    description:
      "Designed and implemented a sleek, high-performance service-booking platform for professional cleaning operations. Focused on real-time scheduling logic and a frictionless checkout flow, resulting in enhanced user engagement and service-conversion rates.",
    image: "/project/publishcleaning.png",
    tags: ["React", "Service Booking", "UI/UX", "Netlify"],
    link: "https://zippy-paprenjak-bff60c.netlify.app/",
    featured: true,
    order: 7,
  },
  {
    id: "rentcar-app",
    title: "Rentcar Mobile App",
    shortDescription: "Admin Fleet & Tracking Solution",
    description:
      "Engineered an admin-centric car rental platform allowing fleet owners to list and manage vehicles with ease. Developed a flexible rental engine supporting daily, monthly, and hourly billing, alongside a real-time user verification system and live GPS tracking for owners to monitor vehicle location and security in real-time.",
    image: "/project/rentcar.jpg",
    tags: ["React Native", "Expo", "Nativewind", "Node.js", "MongoDB"],
    featured: true,
    order: 8,
  },
  {
    id: "internship-certificate",
    title: "Software Internship",
    shortDescription: "Professional Development",
    description:
      "Successfully concluded an intensive software engineering internship, focusing on full-stack MERN development. Executed rigorous testing-and-optimization procedures and collaborated on high-quality codebase maintenance for enterprise-ready applications.",
    image: "/project/certificate.jpeg",
    tags: ["Professional", "Soft Skills", "Full-Stack Dev", "Impact"],
    featured: true,
    order: 9,
  },
];
