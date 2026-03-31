"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Loader2, Check, Phone, Linkedin, Github } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      toast.success("Message sent! I'll get back to you soon.");

      // Reset form
      e.currentTarget.reset();

      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Let&apos;s Connect
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl">
              Have a project in mind or just want to chat? Feel free to reach out. I&apos;m always interested in hearing about new opportunities.
            </p>
          </motion.div>

          {/* Contact form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-card rounded-lg border border-border p-8 space-y-6"
          >
            {/* Name field */}
            <div>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                required
                className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Email field */}
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Message field */}
            <div>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                required
                className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* Submit button */}
            <motion.div
              whileHover={{ scale: submitted ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isLoading || submitted}
                className="w-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
              >
                {submitted ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Alternative contact methods */}
          <motion.div variants={itemVariants} className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "mfawadkhan05@gmail.com",
                href: "mailto:mfawadkhan05@gmail.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "03498925304",
                href: "tel:03498925304",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "muhammad-fawad-khan",
                href: "https://www.linkedin.com/in/muhammad-fawad-khan-b19a50310/",
              },
              {
                icon: Github,
                label: "GitHub",
                value: "DevFawadKhan",
                href: "https://github.com/DevFawadKhan",
              },
            ]
            .map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.label !== "Email" && method.label !== "Phone" ? "_blank" : undefined}
                rel={method.label !== "Email" && method.label !== "Phone" ? "noopener noreferrer" : undefined}
                className="p-5 rounded-xl border border-border bg-card/50 hover:border-accent hover:bg-card transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <method.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="font-bold text-foreground text-sm mb-1">{method.label}</span>
                <p className="text-muted-foreground text-xs truncate w-full">{method.value}</p>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
