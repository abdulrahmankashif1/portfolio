"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINES = [
  "Initialising interface",
  "Loading animations",
  "Preparing case studies",
  "Ready",
];

const SESSION_KEY = "ar-preloader-shown";

type Phase = "counting" | "lifting" | "gone";

export function Preloader() {
  const osReducedMotion = useReducedMotion();
  const framerReducedMotion = useFramerReducedMotion();
  const reduced = osReducedMotion || framerReducedMotion;

  const [phase, setPhase] = useState<Phase>("counting");
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Skip entirely for reduced-motion users, and only once per session.
    if (reduced) {
      setPhase("gone");
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      setPhase("gone");
      return;
    }

    const DURATION = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // easeOutExpo — quick start, gentle settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -9 * t);
      setProgress(Math.round(eased * 100));
      setLine(Math.min(LINES.length - 1, Math.floor(eased * LINES.length)));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("lifting");
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  // Lifting -> unmount after the curtain clears
  useEffect(() => {
    if (phase !== "lifting") return;

    const id = setTimeout(() => {
      setPhase("gone");
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode — fine, it just replays next time */
      }
    }, 900);

    return () => clearTimeout(id);
  }, [phase]);

  // Lock scroll only while the curtain is on screen
  useEffect(() => {
    if (phase === "gone") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a0a0a] px-6"
      style={{
        transform: phase === "lifting" ? "translate3d(0,-100%,0)" : "translate3d(0,0,0)",
        transition:
          "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
        willChange: "transform",
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/12"
        style={{ filter: "blur(140px)" }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-center text-5xl uppercase leading-none tracking-tight text-white sm:text-7xl"
        >
          Abdul Rahman
        </motion.h2>

        <div className="mt-5 flex items-baseline gap-1.5">
          <span className="font-mono text-6xl tabular-nums leading-none text-white sm:text-8xl">
            {String(progress).padStart(3, "0")}
          </span>
          <span className="font-display text-3xl leading-none text-indigo-400/70 sm:text-5xl">
            %
          </span>
        </div>

        <div
          className="mt-6 h-px w-56 overflow-hidden bg-white/10 sm:w-72"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        <p className="mt-4 h-4 text-center text-[10px] uppercase tracking-[0.32em] text-zinc-500 sm:text-[11px]">
          {LINES[line]}
        </p>
      </div>
    </div>
  );
}