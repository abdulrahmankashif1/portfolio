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
        "relative group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300",
        "hover:border-white/20 hover:bg-white/10",
        "has-[[data-hover]]:scale-[1.02]"
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
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0d0d]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title} — ${project.description}`}
            fill
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              "group-hover:scale-105",
              isHovered && "scale-105"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 transition-transform duration-700 ease-out",
              "group-hover:scale-105"
            )}
          >
            <ProjectMockup project={project} />
          </div>
        )}

        {/* Gradient overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent"
        />

        {/* View Project button on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0a0a0a] shadow-xl"
          data-hover
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          View Project
        </motion.div>

        {/* Number badge */}
        <div className="absolute top-4 left-4 text-3xl md:text-4xl font-display font-bold text-white/10">
          {project.number}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-white/80 transition-colors">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">{project.description}</p>
          </div>
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all"
            aria-label={`Visit ${project.title} live site`}
          >
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Project tags">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs uppercase tracking-[0.1em] text-zinc-500 border border-white/10 rounded-full transition-colors hover:border-white/20 hover:text-zinc-300"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Work list - expandable on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="mt-4 overflow-hidden"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-zinc-600 mb-2">Work Included</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm text-zinc-400" role="list">
            {project.work.map((item, i) => (
              <li key={i} className="flex items-center gap-2" role="listitem">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Case study link */}
        <Link
          href={project.caseStudyUrl}
          className="mt-6 flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
        >
          Case study
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
}