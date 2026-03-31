"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects-data";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Project not found
          </h1>
          <p className="text-muted-foreground mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/#projects">Back to projects</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to projects
          </Link>

          {/* Hero section */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full h-96 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg border border-border flex items-center justify-center mb-8 overflow-hidden"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-2 border-accent border-t-transparent rounded-full opacity-30"
              />
            </motion.div>

            <h1 className="text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {project.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.link && (
                <Button
                  size="lg"
                  className="gap-2"
                  asChild
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.github && (
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  asChild
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Features section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Responsive design across all devices",
                "Optimized performance and fast loading",
                "User-friendly interface with smooth animations",
                "Scalable architecture for future growth",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-card rounded-lg border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-background">
                        ✓
                      </span>
                    </div>
                    <p className="text-foreground">{feature}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech stack section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-accent/10 border border-accent text-accent rounded-full hover:bg-accent/20 transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 bg-card rounded-lg border border-border text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground mb-6">
              Let&apos;s discuss your next project or collaboration.
            </p>
            <Button size="lg" asChild>
              <Link href="/#contact">Get in touch</Link>
            </Button>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
