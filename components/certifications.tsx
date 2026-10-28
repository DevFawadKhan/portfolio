"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const certifications = [
  {
    title: "PK Cloud App Dev & Maintenance Internship",
    organization: "Systems Limited",
    description:
      "Completed an internship focused on cloud application development and maintenance.",
    image: "/project/internshipletter-systems.png",
    alt: "Systems Limited internship certificate",
  },
  {
    title: "MERN Stack Developer Internship",
    organization: "Structures Limited",
    description:
      "Completed six months as a MERN Stack Developer.",
    image: "/project/certificate.jpeg",
    alt: "Structures Limited MERN Stack Developer certificate",
  },
];

const Certifications = () => (
  <section id="certifications" className="bg-background px-4 py-20">
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mb-12">
          <h2 className="mb-2 text-4xl font-bold text-foreground md:text-5xl">
            Certifications
          </h2>
          <div className="h-1 w-20 rounded-full bg-accent" />
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Certificates recognizing my professional experience and development.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {certifications.map((certificate, index) => (
            <motion.article
              key={certificate.organization}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
            >
              <a
                href={certificate.image}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${certificate.organization} certificate`}
                className="group relative block aspect-[4/3] bg-white p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
              >
                <Image
                  src={certificate.image}
                  alt={certificate.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </a>
              <div className="p-6">
                <p className="mb-2 text-sm font-semibold text-accent">
                  {certificate.organization}
                </p>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {certificate.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {certificate.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Certifications;
