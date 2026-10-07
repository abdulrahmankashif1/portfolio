"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/data/site";

/**
 * Counts up to `to` when it scrolls into view.
 *
 * Important: the FINAL value is what renders on the server and on the first
 * client render, so the number is never wrong (or invisible) if JavaScript
 * is slow, blocked, or the observer never fires. Only once we know the
 * element is actually on screen do we rewind to 0 and play the count-up.
 */
function Counter({
  to,
  duration = 1000,
  suffix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const started = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    let frame = 0;
    let safety: ReturnType<typeof setTimeout> | undefined;

    const run = () => {
      if (started.current) return;
      started.current = true;

      setValue(0);
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutQuad — spreads the count across the full second so every
        // number is actually readable while it climbs
        const eased = 1 - (1 - t) * (1 - t);
        setValue(Math.round(eased * to));
        if (t < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);

      // Safety net: rAF is throttled in background tabs, which would
      // otherwise freeze the count part-way.
      safety = setTimeout(() => setValue(to), duration + 250);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      // threshold 0 fires as soon as any part is visible, which is far more
      // reliable than waiting for 40% of a small number to be on screen
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(el);

    // Already on screen at mount (e.g. reload mid-page): the observer may
    // not fire, so start straight away.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      observer.disconnect();
      run();
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      if (safety) clearTimeout(safety);
    };
  }, [to, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 4, label: "Featured Projects", suffix: "" },
  { value: 25, label: "Skills & Services", suffix: "+" },
];

export function About() {
  const photoRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-24 md:py-32 lg:px-8 lg:py-40 xl:px-10"
      aria-labelledby="about-heading"
    >
      <div
        className="pointer-events-none absolute right-1/4 top-0 h-[30rem] w-[30rem] rounded-full bg-indigo-500/[0.07]"
        style={{ filter: "blur(110px)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------- Photo ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div
              ref={photoRef}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]"
            >
              {siteConfig.photo.enabled ? (
                <Image
                  src={siteConfig.photo.src}
                  alt={siteConfig.photo.alt}
                  fill
                  priority={false}
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/25 via-transparent to-fuchsia-500/25"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/5">
                      <span className="font-display text-6xl leading-none text-white/40">
                        AR
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                      Add photo
                    </span>
                  </div>
                </>
              )}

              {/* Bottom fade into the section */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Decorative accents */}
            <div
              className="pointer-events-none absolute -bottom-5 -left-5 h-24 w-24 rounded-full border border-indigo-500/40 bg-indigo-500/10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-lg border border-fuchsia-500/40 bg-fuchsia-500/10 rotate-12"
              aria-hidden="true"
            />
          </motion.div>

          {/* ---------- Copy + counters ---------- */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="eyebrow">About</span>
              <h2
                id="about-heading"
                className="mt-3 font-display text-4xl uppercase leading-none tracking-tight text-white md:text-5xl lg:text-6xl"
              >
                About Me
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="mt-7 space-y-5"
            >
              <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
                I&apos;m Abdul Rahman, an IT &amp; Digital Media Professional
                based in Lahore, Pakistan. I build fast, SEO-ready e-commerce and
                business websites.
              </p>
              <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
                My work spans the full journey — design, development, graphics,
                video and deployment. I build websites in code, craft logos and
                brand kits in Photoshop and Illustrator, and edit video in
                Premiere Pro and After Effects.
              </p>
              <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
                Whether you need a new store, a Shopify build, brand assets,
                edited reels or ongoing site management, I deliver work that
                looks sharp and performs.
              </p>
            </motion.div>

            {/* Stats */}
            <div
              className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8"
              role="list"
              aria-label="Key statistics"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-left" role="listitem">
                  <div className="font-display text-5xl leading-none text-white md:text-6xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2.5 text-xs uppercase tracking-[0.16em] text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex items-center gap-2.5 text-sm text-zinc-500"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                aria-hidden="true"
              />
              {siteConfig.location}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}