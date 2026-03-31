"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/experience-data";
import { Briefcase } from "lucide-react";

const Experience = () => {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="experience" className="py-20 px-4 bg-card/30">
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
              Experience
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full" />
          </motion.div>

          {/* Experience timeline */}
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-5 h-5 bg-accent rounded-full border-4 border-background" />

                {/* Timeline line */}
                {index !== experience.length - 1 && (
                  <div className="absolute left-2.5 top-12 w-0.5 h-24 bg-gradient-to-b from-accent to-accent/20" />
                )}

                {/* Content */}
                <motion.div
                  className="p-6 bg-card rounded-lg border border-border hover:border-accent transition-all duration-300 group"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(96, 165, 250, 0.1)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-accent font-semibold">{exp.company}</p>
                    </div>
                    <Briefcase className="w-6 h-6 text-accent/50 group-hover:text-accent transition-colors" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {exp.duration}
                  </p>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  {/* Achievements */}
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-accent mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
