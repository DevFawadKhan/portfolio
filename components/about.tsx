"use client";

import { motion } from "framer-motion";

const About = () => {
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

  return (
    <section id="about" className="py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="relative"
        >
          {/* Decorative Background Element for transition */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-linear-to-b from-accent/50 to-transparent" />

          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-8 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              About Me
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto md:mx-0" />
          </motion.div>

          {/* About content */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-4 text-center md:text-left">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m <span className="text-foreground font-bold italic">Muhammad Fawad</span>, a dedicated Full-Stack Software Engineer driven by the challenge of solving complex problems through technology. With a strong foundation in modern web development, I focus on creating scalable, user-centric applications that deliver real value.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My expertise spans across the entire development lifecycle, from architecting robust backends with Node.js and Express to crafting intuitive, performant frontends with React and Next.js. I thrive in environments that push the boundaries of technical innovation and value clean, maintainable code.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond development, I am deeply interested in cloud infrastructure and DevOps practices, specifically within the AWS ecosystem. I constantly seek to optimize deployment workflows and ensure high availability for the digital experiences I build.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
