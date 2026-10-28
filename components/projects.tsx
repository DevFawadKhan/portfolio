"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects-data";
import { Button } from "@/components/ui/button";
import { ExternalLink, Maximize2, Lock } from "lucide-react";
import Image from "next/image";
import ProjectDetailDialog from "@/components/project-detail-dialog";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-20 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full" />
          </motion.div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-500 h-full flex flex-col shadow-lg hover:shadow-accent/5"
                whileHover={{ y: -12 }}
              >
                <button
                  type="button"
                  aria-label={`View full image for ${project.title}`}
                  onClick={() => setSelectedProjectIndex(index)}
                  className="absolute inset-0 z-10 cursor-zoom-in rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                />

                {/* Project image */}
                <div className="relative w-full h-56 overflow-hidden pointer-events-none">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Fullscreen hover badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
                    <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
                      <Maximize2 className="size-3.5 text-accent" />
                      View Fullscreen
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex-1 flex flex-col pointer-events-none">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 bg-muted/50 text-muted-foreground rounded-md border border-border transition-colors group-hover:border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="relative z-20 mt-auto pt-6 border-t border-border/50 pointer-events-auto">
                    {project.link ? (
                      <Button
                        size="lg"
                        className="w-full gap-2 bg-accent hover:bg-accent/90 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-accent/20"
                        asChild
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {project.linkLabel ?? "Live Demo"}
                        </a>
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        variant="secondary"
                        disabled
                        className="w-full gap-2 opacity-60 cursor-not-allowed"
                      >
                        {project.disabledLabel ? (
                          <>
                            <Lock className="w-4 h-4" />
                            {project.disabledLabel}
                          </>
                        ) : (
                          "Live Demo Coming Soon"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <ProjectDetailDialog
        projects={featuredProjects}
        selectedIndex={selectedProjectIndex}
        onSelect={setSelectedProjectIndex}
        onClose={() => setSelectedProjectIndex(null)}
      />
    </section>
  );
};

export default Projects;
