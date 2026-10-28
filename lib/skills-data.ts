export interface Skill {
  category: string;
  skills: string[];
}

export const skills: Skill[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "React Query",
      "React Native",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "CSS",
      "Bootstrap",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
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
      "GitHub Actions",
      "Docker",
      "DockerHub",
      "CI/CD",
      "Postman",
      "Vercel",
      "Railway",
      "Netlify",
    ],
  },
  {
    category: "AWS Services",
    skills: [
      "EC2",
      "S3",
      "RDS",
      "ALB",
      "ECS",
      "Route 53",
      "Lightsail",
      "CloudWatch",
      "IAM",
    ],
  },
];
