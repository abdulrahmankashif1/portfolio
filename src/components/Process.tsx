"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We clarify goals, audience, and scope. I audit existing assets, research competitors, and define a clear project roadmap with timelines and milestones.",
  },
  {
    number: "02",
    title: "Design",
    description: "Wireframes, UI systems, and high-fidelity mockups. You review and approve designs before any code is written — ensuring alignment and zero surprises.",
  },
  {
    number: "03",
    title: "Build",
    description: "Clean, performant code using Next.js, React, and modern tooling. E-commerce integration, CMS setup, SEO foundations, and responsive testing on every device.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "Deployed to Vercel with preview URLs, custom domain, SSL, and analytics. Post-launch monitoring, training, and ongoing support so you are never stuck.",
  },
];

export function Process() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLElement | null)[]>([]);
  const linesRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Animate each step
      processSteps.forEach((_, index) => {
        const stepEl = stepsRef.current[index];
        const lineEl = linesRef.current[index];

        if (!stepEl) return;

        gsap.fromTo(
          stepEl,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top top+=${index * 20}%`,
              end: `top top+=${(index + 1) * 20}%`,
              scrub: 0.5,
              toggleActions: "play none none reverse",
            },
          }
        );

        // Progress line animation
        if (lineEl && index < processSteps.length - 1) {
          gsap.fromTo(
            lineEl,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top top+=${(index + 0.5) * 20}%`,
                end: `top top+=${(index + 1.5) * 20}%`,
                scrub: 0.5,
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] px-6 lg:px-8 xl:px-10 relative z-10">
        {/* Section Header - Sticky at top during pin */}
        <div className="sticky top-24 md:top-32 lg:top-40 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Process</span>
            <h2
              id="process-heading"
              className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tight text-white"
            >
              How We Work
            </h2>
            <p className="mt-6 max-w-xl text-lg text-zinc-400">
              A clear, collaborative process from first conversation to long-term support.
            </p>
          </motion.div>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical progress line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/10"
            aria-hidden="true"
          >
            {processSteps.map((_, index) => (
              <motion.div
                key={index}
                ref={(el) => { linesRef.current[index] = el; }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                className="absolute left-0 h-[25%] w-[1px] bg-gradient-to-b from-[#6366f1] to-[#a855f7]"
                style={{ top: `${index * 25}%`, transformOrigin: "top center" }}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="space-y-20 pl-20" role="list" aria-label="Process steps">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el; }}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] }}
                className="relative"
                role="listitem"
              >
                {/* Step number + circle */}
                <div className="absolute -left-20 top-0 flex h-16 w-16 items-center justify-center">
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-full border border-white/10"
                      aria-hidden="true"
                    />
                    <span className="relative font-display text-lg font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pr-8">
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-lg text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Extra space for pinned scrolling */}
        <div className="h-[200vh]" aria-hidden="true" />
      </div>
    </section>
  );
}