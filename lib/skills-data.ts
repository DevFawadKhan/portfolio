export interface Skill {
  category: string;
  skills: string[];
}

export const skills: Skill[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Tailwind",
      "CSS",
      "Bootstrap",
      "TypeScript",
      "Next.js",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Supabase",
      "RESTful APIs",
    ],
  },
  {
    category: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Vercel",
      "Docker",
      "CI/CD",
      "AWS",
      "Figma",
      "Netlify",
    ],
  },
  {
    category: "AWS Services",
    skills: [
      "EC2",
      "S3",
      "ALB",
      "RDS",
      "Lambda",
      "CloudFront",
      "Route53",
      "Kubernetes",
      "GitHub Actions",
    ],
  },
];
