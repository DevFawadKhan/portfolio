"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/skills-data";
import { Layout, Server, Settings, Cloud } from "lucide-react";

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full" />
          </motion.div>

          {/* Skills grid */}
          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {skills.map((skillGroup) => (
              <motion.div
                key={skillGroup.category}
                variants={itemVariants}
                className="group relative p-8 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-md hover:border-accent/40 transition-all duration-500 flex flex-col h-full shadow-xl hover:shadow-2xl hover:shadow-accent/5 overflow-hidden"
                whileHover={{ y: -10 }}
              >
                {/* Top Border Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500 shadow-inner">
                    {skillGroup.category === "Frontend" && <Layout className="w-8 h-8" />}
                    {skillGroup.category === "Backend" && <Server className="w-8 h-8" />}
                    {skillGroup.category === "Tools" && <Settings className="w-8 h-8" />}
                    {skillGroup.category === "AWS Services" && <Cloud className="w-8 h-8" />}
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                    {skillGroup.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5 mt-auto justify-center">
                  {skillGroup.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-xs font-bold bg-background/50 text-muted-foreground rounded-full border border-border/50 transition-all duration-300 hover:border-accent/50 hover:text-accent hover:bg-accent/10 whitespace-nowrap shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
