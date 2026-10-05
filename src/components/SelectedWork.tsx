"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function SelectedWork() {
  return (
    <section
      id="work"
      className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 xl:px-10"
      aria-labelledby="work-heading"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-[#6366f1]/5 blur-3xl pointer-events-none"
        style={{ filter: "blur(120px)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Selected Work</span>
          <h2
            id="work-heading"
            className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tight text-white"
          >
            Projects
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="grid gap-8 md:grid-cols-2"
          role="list"
          aria-label="Featured projects"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View All Work CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="mt-16 text-center"
        >
          <a
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            View all projects
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}