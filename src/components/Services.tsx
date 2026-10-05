"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const icons: Record<string, React.ReactNode> = {
    Code: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    ShoppingCart: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    Palette: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17a4 4 0 118 0h-8z" />
      </svg>
    ),
    Search: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    Server: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300",
        "hover:border-white/20 hover:bg-white/10",
        isOpen && "border-white/20 bg-white/10",
        isHovered && "scale-[1.01] shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-start gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        aria-expanded={isOpen}
        aria-controls={`service-${service.id}-content`}
      >
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300",
            "group-hover:border-white/20 group-hover:bg-white/10",
            isOpen && "border-[#6366f1] bg-[#6366f1]/20"
          )}
        >
          {icons[service.icon]}
        </div>

        <div className="flex-1 min-w-0 pr-10">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{service.description}</p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="flex shrink-0 items-center justify-center text-zinc-500"
          aria-hidden="true"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`service-${service.id}-content`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden border-t border-white/10 px-6 pb-6"
          >
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-sm text-zinc-400 mb-4">Key areas:</p>
              <div className="flex flex-wrap gap-2" role="list" aria-label={`${service.title} tags`}>
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-zinc-300 bg-white/5 border border-white/10 rounded-full"
                    role="listitem"
                  >
                    <Check className="h-3 w-3 text-green-400" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={service.href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#6366f1] hover:text-[#a855f7] transition-colors"
            >
              Learn more
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 xl:px-10"
      aria-labelledby="services-heading"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-1/4 h-[30rem] w-[30rem] rounded-full bg-[#a855f7]/5 blur-3xl pointer-events-none"
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
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Services</span>
          <h2
            id="services-heading"
            className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tight text-white"
          >
            What I Do
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-zinc-400">
            End-to-end web development and digital services — from strategy and design to launch and ongoing support.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Services offered"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}