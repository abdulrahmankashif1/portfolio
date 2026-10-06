"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 2, label: "Featured Projects", suffix: "" },
  { value: 8, label: "Skills & Services", suffix: "+" },
];

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Photo reveal animation
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: photoRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Counter animations
      countersRef.current.forEach((counter, index) => {
        if (!counter) return;
        const target = stats[index].value;
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              if (counter) {
                counter.textContent = Math.ceil(this.targets()[0].textContent).toString();
              }
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 xl:px-10"
      aria-labelledby="about-heading"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-1/4 h-[30rem] w-[30rem] rounded-full bg-[#6366f1]/5 blur-3xl pointer-events-none"
        style={{ filter: "blur(100px)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="relative"
          >
            <div
              ref={photoRef}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]"
            >
              {/* Placeholder portrait — drop your photo at public/images/abdul-rahman.jpg to replace this */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/25 via-transparent to-fuchsia-500/25"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" aria-hidden="true">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  <span className="font-display text-6xl leading-none text-white/40">AR</span>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Add photo
                </span>
              </div>
              {siteConfig.photo.enabled && (
                <Image
                  src={siteConfig.photo.src}
                  alt="Abdul Rahman — IT &amp; Digital Media Professional"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full border-2 border-[#6366f1]/50 bg-[#6366f1]/10" aria-hidden="true" />
            <div className="absolute top-6 right-6 h-16 w-16 rounded-lg border border-[#a855f7]/50 bg-[#a855f7]/10 rotate-12" aria-hidden="true" />
          </motion.div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">About</span>
              <h2
                id="about-heading"
                className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tight text-white"
              >
                About Me
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="mt-8 prose prose-invert max-w-none"
            >
              <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                I'm Abdul Rahman, an IT & Digital Media Professional specializing in building fast, SEO-ready e-commerce and business websites.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed mb-6">
                My work spans the full journey — design, development, graphics,
                video and deployment. I build websites in code, craft logos and
                brand kits in Photoshop and Illustrator, and edit video in
                Premiere Pro and After Effects.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Whether you need a new e-commerce store, a Shopify build, brand
                assets, edited reels, technical troubleshooting or ongoing site
                management, I deliver work that looks sharp and performs.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="mt-12 grid grid-cols-2 gap-8"
              role="list"
              aria-label="Key statistics"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center" role="listitem">
                  <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    <span
                      ref={(el) => { countersRef.current[index] = el; }}
                      className="font-mono tabular-nums"
                    >
                      0
                    </span>
                    <span className="font-mono text-zinc-400">{stat.suffix}</span>
                  </div>
                  <p className="mt-2 text-sm uppercase tracking-[0.15em] text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}