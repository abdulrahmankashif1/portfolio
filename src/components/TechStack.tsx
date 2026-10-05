"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/site";
import { Marquee } from "./Marquee";
import { cn } from "@/lib/utils";

export function TechStack() {
  return (
    <section
      id="tech-stack"
      className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 xl:px-10"
      aria-labelledby="tech-heading"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-[#ec4899]/5 blur-3xl pointer-events-none"
        style={{ filter: "blur(100px)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Tech Stack</span>
          <h2
            id="tech-heading"
            className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tight text-white"
          >
            Tools & Technologies
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-400">
            Modern, battle-tested tools for building fast, scalable, and maintainable web experiences.
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16"
        >
          <Marquee items={techStack} speed={35} direction="left" />
        </motion.div>

        {/* Grid badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          role="list"
          aria-label="Technology stack"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className={cn(
                "relative group p-4 md:p-6 rounded-xl border border-white/10 bg-white/5",
                "hover:border-white/20 hover:bg-white/10 transition-all duration-300",
                "focus-within:ring-2 focus-within:ring-white/20 focus-within:ring-offset-2 focus-within:ring-offset-[#0a0a0a]"
              )}
              role="listitem"
              tabIndex={0}
            >
              <span className="font-mono text-sm md:text-base font-medium text-white">
                {tech}
              </span>
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#a855f7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}