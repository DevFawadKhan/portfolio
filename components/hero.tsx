"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        {/* Main heading */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">
            Muhammad Fawad
          </h1>
          <p className="text-xl md:text-2xl text-accent font-semibold">
            Software Engineer
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-balance"
        >
          Crafting high-performance digital experiences with a focus on
          full-stack development and seamless user interfaces.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 px-8 font-semibold transition-all duration-300"
            asChild
          >
            <a href="#projects">
              View My Work <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 border-accent/20 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
            asChild
          >
            <a href="#contact">Get In Touch</a>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center"
        >
          <a
            href="https://github.com/DevFawadKhan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-card hover:bg-card/80 text-foreground transition-all duration-300 border border-border hover:border-accent/30"
          >
            <Github className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-fawad-khan-b19a50310/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-card hover:bg-card/80 text-foreground transition-all duration-300 border border-border hover:border-accent/30"
          >
            <Linkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="mailto:mfawadkhan05@gmail.com"
            className="p-3 rounded-lg bg-card hover:bg-card/80 text-foreground transition-all duration-300 border border-border hover:border-accent/30"
          >
            <Mail className="w-6 h-6" />
            <span className="sr-only">Email</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <p className="text-sm">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-muted-foreground rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
