"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We clarify goals, audience and scope. I audit existing assets, research competitors, and define a clear roadmap with realistic timelines.",
    deliverables: ["Project brief", "Competitor audit", "Scope & timeline"],
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes, UI systems and high-fidelity mockups. You review and approve the design before any code is written — no surprises later.",
    deliverables: ["Wireframes", "UI design", "Design system"],
  },
  {
    number: "03",
    title: "Build",
    description:
      "Clean, performant code with Next.js and React. E-commerce integration, SEO foundations, and responsive testing across every screen size.",
    deliverables: ["Next.js build", "E-commerce setup", "SEO foundations"],
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "Deployed to Vercel with preview URLs, custom domain, SSL and analytics. Post-launch monitoring, handover training and ongoing support.",
    deliverables: ["Vercel deploy", "Domain & DNS", "Ongoing support"],
  },
];

function StepContent({ step }: { step: ProcessStep }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-baseline gap-4 sm:gap-6">
        <span
          className="font-mono text-sm tabular-nums text-transparent sm:text-base"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.35)",
          }}
          aria-hidden="true"
        >
          {step.number}
        </span>
        <h3 className="font-display text-[clamp(2rem,6vw,4rem)] uppercase leading-none tracking-tight text-white">
          {step.title}
        </h3>
      </div>

      <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
        {step.description}
      </p>

      <ul className="mt-7 flex flex-wrap gap-2" role="list">
        {step.deliverables.map((d) => (
          <li
            key={d}
            className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs uppercase tracking-[0.1em] text-zinc-400"
          >
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Process() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion / mobile: plain stacked list, no pinning
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const panels = stepsRef.current.filter(Boolean) as HTMLDivElement[];
      const progress = progressRef.current;

      // Scroll distance scales with viewport height so each step gets
      // an equal amount of scroll time on any screen size.
      const scrollDistance = () =>
        window.innerHeight * (processSteps.length - 1);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress bar fills across the whole pinned scroll
      if (progress) {
        tl.fromTo(
          progress,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: processSteps.length - 1 },
          0
        );
      }

      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0 });
        } else {
          gsap.set(panel, { autoAlpha: 0, y: 40 });
        }

        if (i === 0) return;

        // fade + slide in
        tl.to(
          panels[i - 1],
          { autoAlpha: 0, y: -40, duration: 0.5, ease: "power2.inOut" },
          i - 0.5
        );
        tl.to(
          panel,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          i - 0.25
        );
      });
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-[#0a0a0a]"
      aria-labelledby="process-heading"
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet-500/[0.07]"
        style={{ filter: "blur(130px)" }}
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-6xl flex-col px-6 lg:max-w-7xl lg:px-8 xl:max-w-[80rem] xl:px-10">
        {prefersReducedMotion ? (
          /* ---------- Static, stacked (reduced motion) ---------- */
          <div className="py-24 md:py-32">
            <header className="mb-14">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Process
              </span>
              <h2
                id="process-heading"
                className="mt-3 font-display text-4xl uppercase leading-none tracking-tight text-white md:text-5xl"
              >
                How We Work
              </h2>
            </header>
            <div className="space-y-10 border-l border-white/10 pl-8">
              {processSteps.map((step) => (
                <div key={step.number}>
                  <StepContent step={step} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ---------- Pinned, crossfading panels ---------- */
          <div className="flex h-[100svh] flex-col justify-center py-28">
            <header className="shrink-0">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Process
              </span>
              <h2
                id="process-heading"
                className="mt-3 font-display text-4xl uppercase leading-none tracking-tight text-white md:text-5xl"
              >
                How We Work
              </h2>
              <p className="mt-4 max-w-lg text-sm text-zinc-500 sm:text-base">
                A clear, collaborative process — from first conversation to
                long-term support.
              </p>
            </header>

            {/* Step panels — absolutely stacked so nothing can overlap */}
            <div className="relative mt-10 flex-1">
              {processSteps.map((step, i) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepsRef.current[i] = el;
                  }}
                  className="absolute inset-0"
                  role="listitem"
                  aria-label={`Step ${step.number}: ${step.title}`}
                >
                  <StepContent step={step} />
                </div>
              ))}
            </div>

            {/* Progress rail */}
            <div className="mt-8 shrink-0">
              <div className="h-px w-full bg-white/10">
                <span
                  ref={progressRef}
                  className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
                />
              </div>
              <ol className="mt-3 flex justify-between" role="list">
                {processSteps.map((step) => (
                  <li
                    key={step.number}
                    className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-zinc-600 sm:text-xs"
                  >
                    {step.number}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}