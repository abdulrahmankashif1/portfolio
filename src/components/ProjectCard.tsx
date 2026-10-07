"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Eye, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ProjectMockup } from "./ProjectMockup";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty("--rotate-x", `${-y * 8}deg`);
      card.style.setProperty("--rotate-y", `${x * 8}deg`);
    };

    const handleMouseLeave = () => {
      const card = cardRef.current;
      if (!card) return;
      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
    };

    const card = cardRef.current;
    if (!card) return;

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300",
        "hover:border-white/20 hover:bg-white/10",
        "focus-within:border-white/20 focus-within:bg-white/10"
      )}
      style={{
        transform: prefersReducedMotion
          ? undefined
          : `perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))`,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Stretched link — makes the whole card open the live site.
          Sits under the two real links below (z-20) so they stay clickable. */}
      <Link
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0d0d]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title} — ${project.description}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
            <ProjectMockup project={project} />
          </div>
        )}

        {/* Darken on hover/focus so the CTA reads clearly */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden="true"
        />

        {/* View Project pill — visual only; the stretched link handles clicks */}
        <span
          className="pointer-events-none absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0a0a0a] opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100 sm:bottom-6 sm:right-6"
          aria-hidden="true"
        >
          <Eye className="h-4 w-4" />
          View Project
        </span>

        {/* Number badge */}
        <div
          className="pointer-events-none absolute left-4 top-4 font-display text-3xl font-bold text-white/10 md:text-4xl"
          aria-hidden="true"
        >
          {project.number}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-white/80 md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">{project.description}</p>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"
            aria-label={`Open ${project.title} live site in a new tab`}
          >
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        {/* Tags */}
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label={`${project.title} tags`}
        >
          {project.tags.map((tag, i) => (
            <li
              key={i}
              className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.1em] text-zinc-500 transition-colors group-hover:border-white/20 group-hover:text-zinc-300"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Work list — expands on hover and on keyboard focus */}
        <div
          className={cn(
            "grid overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]",
            "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100",
            "group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100"
          )}
        >
          <div className="min-h-0">
            <div className="mt-4">
              <p className="mb-2 text-xs uppercase tracking-[0.15em] text-zinc-600">
                Work Included
              </p>
              <ul className="grid grid-cols-1 gap-1.5 text-sm text-zinc-400 sm:grid-cols-2">
                {project.work.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-white/30"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Case study link — above the stretched link so it stays clickable */}
        <Link
          href={project.caseStudyUrl}
          className="relative z-20 mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          Read case study
          <span
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}