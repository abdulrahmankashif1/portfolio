"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "./MagneticButton";
import { heroRotatingWords, marqueeSkills } from "@/data/site";
import { Marquee } from "./Marquee";

/* ------------------------------------------------------------------ */
/* 3D floating orb — additive wireframe reads clean on a dark canvas    */
/* ------------------------------------------------------------------ */

function FloatingOrb({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (prefersReducedMotion || !group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
    group.current.rotation.x = Math.sin(t * 0.35) * 0.2;
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.5}>
        {/* Solid core with a soft additive glow */}
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial
            color="#4f46e5"
            transparent
            opacity={0.16}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Wireframe cage */}
        <mesh>
          <icosahedronGeometry args={[1.45, 1]} />
          <meshBasicMaterial
            color="#a5b4fc"
            wireframe
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Inner wireframe, counter-rotating for depth */}
        <mesh>
          <icosahedronGeometry args={[0.85, 0]} />
          <meshBasicMaterial
            color="#f0abfc"
            wireframe
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Float>

      {/* Orbiting rings */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.1, 0.008, 6, 140]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, Math.PI / 3, 0]}>
        <torusGeometry args={[2.6, 0.006, 6, 140]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Hero3DCanvas({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  // Only mount WebGL on larger screens — falls back to the CSS glow on mobile
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setCanRender(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  if (!canRender) return null;

  return (
    // Anchored to the right so it never sits behind the headline
    <div
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[46%] overflow-hidden lg:block"
      aria-hidden="true"
    >
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_72%)]">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
        >
          <FloatingOrb prefersReducedMotion={prefersReducedMotion} />
        </Canvas>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rotating word — width is measured & animated so nothing ever shifts  */
/* ------------------------------------------------------------------ */

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const widths = measureRefs.current.map((el) => el?.offsetWidth ?? 0);
    const first = widths[0];
    if (first) {
      setWidth(first);
      measureRefs.current.forEach((el, i) => {
        if (el) el.style.width = `${widths[i]}px`;
      });
    }
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % heroRotatingWords.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  const current = heroRotatingWords[index];

  return (
    <span className="relative inline-block overflow-hidden align-baseline">
      {/* Hidden measuring pass — sets an explicit width per word */}
      <span className="invisible absolute" aria-hidden="true">
        {heroRotatingWords.map((w, i) => (
          <span
            key={i}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            className="block whitespace-nowrap"
          >
            {w}
          </span>
        ))}
      </span>

      {/* Masked vertical slide swap */}
      <motion.span
        animate={{ width: width ?? "auto" }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="relative block overflow-hidden whitespace-nowrap"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={current}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-105%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              const next = measureRefs.current[index]?.offsetWidth;
              if (next) setWidth(next);
            }}
            className="block bg-gradient-to-r from-[#818cf8] via-[#c084fc] to-[#f472b6] bg-clip-text text-transparent"
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const line = {
  hidden: { y: "110%" },
  show: { y: "0%" },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-32 pt-32 lg:px-8 lg:pt-36 xl:px-10"
      aria-labelledby="hero-heading"
    >
      {/* Ambient gradient glows */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div
          className="absolute left-[8%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-indigo-500/15"
          style={{ filter: "blur(130px)" }}
        />
        <div
          className="absolute bottom-[12%] right-[6%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/12"
          style={{ filter: "blur(120px)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/8"
          style={{ filter: "blur(150px)" }}
        />
      </div>

      <Hero3DCanvas prefersReducedMotion={prefersReducedMotion} />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl lg:max-w-7xl xl:max-w-[80rem]">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
              style={{ animationDuration: "2s" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs uppercase tracking-[0.14em] text-zinc-300 sm:text-[13px]">
            Available for new projects
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="font-display text-[clamp(2.75rem,9vw,7.5rem)] uppercase leading-[0.92] tracking-tight text-white"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              variants={line}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="block"
            >
              I build websites
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              variants={line}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.9, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="block"
            >
              <span className="text-white">that </span>
              <RotatingWord />
              <span className="text-white"> sell.</span>
            </motion.span>
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Abdul Rahman — IT &amp; Digital Media Professional. I design, develop
          and manage fast, SEO-ready e-commerce and business websites.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68, ease: [0.76, 0, 0.24, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <MagneticButton href="#work" className="w-full sm:w-auto">
            View My Work
          </MagneticButton>
          <MagneticButton
            href="mailto:abdulrahmankashif4@gmail.com"
            className="w-full border border-white/20 bg-transparent !text-white hover:bg-white/5 sm:w-auto"
          >
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator — bottom-right, clear of the copy */}
        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="group absolute bottom-28 right-0 hidden flex-col items-center gap-2 text-zinc-500 transition-colors hover:text-white lg:flex"
          aria-label="Scroll to selected work"
        >
          <span className="text-[10px] uppercase tracking-[0.28em] [writing-mode:vertical-rl]">
            Scroll
          </span>
          <motion.span
            animate={prefersReducedMotion ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/40"
          >
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.span>
        </motion.a>
      </div>

      {/* Marquee strip */}
      <div
        className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#0a0a0a]/70 py-5 backdrop-blur-sm"
        aria-label="Skills and technologies"
      >
        <Marquee items={marqueeSkills} speed={38} />
      </div>
    </section>
  );
}