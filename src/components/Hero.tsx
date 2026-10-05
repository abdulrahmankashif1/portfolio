"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Float,
  useGLTF,
  PerspectiveCamera,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";
import { heroRotatingWords, marqueeSkills } from "@/data/site";
import { Marquee } from "./Marquee";

// 3D Floating Orb Component
function FloatingOrb({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion || !groupRef.current) return;

    const animate = () => {
      timeRef.current += 0.005;
      if (groupRef.current) {
        groupRef.current.rotation.y = timeRef.current * 0.3;
        groupRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.2;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, [prefersReducedMotion]);

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshPhysicalMaterial
            color="#6366f1"
            metalness={0}
            roughness={0.2}
            transmission={0.8}
            thickness={0.5}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>
      {/* Outer glow ring */}
      <mesh>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Hero3DCanvas({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        className="w-full h-full"
      >
        <fog attach="fog" args={["#0a0a0a", 5, 25]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
        <FloatingOrb prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Rotate words every 2.5 seconds
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroRotatingWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 xl:px-10 pt-20 pb-16 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background gradient glows */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[#6366f1]/10 blur-3xl"
          style={{ filter: "blur(120px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-[30rem] w-[30rem] rounded-full bg-[#a855f7]/10 blur-3xl"
          style={{ filter: "blur(100px)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50rem] w-[50rem] rounded-full bg-[#ec4899]/5 blur-3xl"
          style={{ filter: "blur(150px)" }}
        />
      </div>

      {/* 3D Canvas */}
      <Hero3DCanvas prefersReducedMotion={prefersReducedMotion} />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl w-full">
        {/* Main Headline */}
        <h1
          id="hero-heading"
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[clamp(5rem,12vw,8rem)] uppercase leading-[0.95] tracking-tight text-white"
        >
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="block"
          >
            I build websites
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="block"
          >
            that{" "}
            <span className="relative h-1.2em">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroRotatingWords[currentWordIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute left-0 top-0 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
                >
                  {heroRotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            sell.
          </motion.span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed"
        >
          Abdul Rahman — IT & Digital Media Professional. I design, develop and manage fast, SEO-ready e-commerce and business websites.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#work" className="w-full sm:w-auto">
            View My Work
          </MagneticButton>
          <MagneticButton
            href="mailto:abdulrahmankashif4@gmail.com"
            className="w-full sm:w-auto rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/5 transition-colors"
          >
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Available pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="relative flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span
                className="absolute inset-0 h-full w-full rounded-full bg-green-400 animate-ping"
                style={{ animationDuration: "2s" }}
              />
              <span className="relative h-full w-full rounded-full bg-green-400" />
            </span>
            <span className="text-sm uppercase tracking-[0.1em] text-zinc-300">
              Available for new projects
            </span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
          aria-hidden="true"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-gradient-to-t from-[#0a0a0a] to-transparent py-6"
        aria-label="Skills and technologies"
      >
        <Marquee items={marqueeSkills} speed={40} />
      </motion.div>
    </section>
  );
}

import { AnimatePresence } from "framer-motion";
import * as THREE from "three";