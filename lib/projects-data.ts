export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  disabledLabel?: string;
  github?: string;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    id: "pel-mobile-app",
    title: "PEL Mobile App",
    shortDescription: "Field operations and employee attendance",
    description:
      "A mobile app for field teams to record attendance, complete HSE safety checklists, and submit daily progress, vehicle, and plantation reports.",
    image: "/project/PEL-mobile-app.webp",
    tags: ["React Native", "Expo"],
    link: "https://play.google.com/store/apps/details?id=com.synercreatix.pelerp&pcampaignid=web_share",
    featured: true,
    order: 1,
  },
  {
    id: "pel-erp",
    title: "PEL ERP",
    shortDescription: "Enterprise resource planning for PEL",
    description:
      "A business operations platform covering HR and leave management, projects management,fleet management, fleet tracking, finance, messaging, role-based access, and direct reporting.",
    image: "/project/PEL-ERP.webp",
    tags: [
      "React",
      "TanStack Router",
      "TanStack Query",
      "shadcn/ui",
      "NestJS",
      "PostgreSQL",
      "Drizzle ORM",
    ],
    link: "https://pepl.com.pk/",
    featured: true,
    order: 2,
  },
  {
    id: "flash-mobile-app",
    title: "Flash Security Mobile App",
    shortDescription: "Mobile attendance for security teams",
    description:
      "Employees can check in and out with automatically captured date and time, submit photo-supported attendance and leave requests, and review attendance history by date.",
    image: "/project/Flash-mobile-app.webp",
    tags: ["React Native", "Expo"],
    link: "https://play.google.com/store/apps/details?id=com.flashtech.security&pcampaignid=web_share",
    featured: true,
    order: 3,
  },
  {
    id: "flash-erp",
    title: "Flash Security ERP",
    shortDescription: "Security workforce operations platform",
    description:
      "An ERP for reviewing individual and company-wide attendance, monitoring missed check-ins and expiring CNICs, approving leave, managing finance and inventory, and securely storing employee documents.",
    image: "/project/Flash-ERP.webp",
    tags: [
      "Ant Design",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Drizzle ORM",
    ],
    disabledLabel: "Internal System",
    featured: true,
    order: 4,
  },
  {
    id: "swing-x-mobile-app",
    title: "Swing X Mobile App",
    shortDescription: "Golf bay bookings and restaurant orders",
    description:
      "A golf club app for checking bay availability, booking reservations, exploring ball packages and food deals, and ordering from the golf restaurant.",
    image: "/project/Screenshot 2026-10-28 215202.png",
    tags: ["React Native", "Expo", "NativeWind"],
    link: "https://play.google.com/store/apps/details?id=com.pelerpofficial.golfmobile&pcampaignid=web_share",
    linkLabel: "Download Golf X",
    featured: true,
    order: 5,
  },
  {
    id: "swing-x-web-portal",
    title: "Swing X Web Portal",
    shortDescription: "Golf club and business management portal",
    description:
      "A management portal for bays, ball packages, customers, reservations, restaurant inventory, deals, discounts, sessions, invoices, payments, and user roles.",
    image: "/project/swing-x-portal.webp",
    tags: ["React", "Vite", "Tailwind CSS", "NestJS", "PostgreSQL", "Prisma"],
    link: "https://swing-x-client-production.up.railway.app",
    featured: true,
    order: 6,
  },
  {
    id: "valor-erp",
    title: "Valor ERP",
    shortDescription: "ERP for manufacturing and business operations",
    description:
      "An ERP spanning HR, manufacturing, food and finishing, finance, FBR invoicing, and procurement, with sales, claims, delivery, receivables, payables, and website management.",
    image: "/project/Valor-ERP.webp",
    tags: ["React", "Vite", "Ant Design", "Prisma", "PostgreSQL", "NestJS"],
    link: "https://valor.com.pk/",
    featured: true,
    order: 7,
  },
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
    order: 8,
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
    order: 9,
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
    order: 10,
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
    order: 11,
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
    order: 12,
  },
];
