"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Single listener keeps scroll position + direction in sync.
  // Deliberately does NOT use requestAnimationFrame — rAF is throttled in
  // background tabs, which would leave the header stuck mid-transition.
  useEffect(() => {
    let lastY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Threshold avoids flicker from sub-pixel scroll jitter
      if (y > lastY + 4) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleMobileLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
        style={{
          transform: hidden && scrolled ? "translate3d(0,-130%,0)" : "translate3d(0,0,0)",
          opacity: hidden && scrolled ? 0 : 1,
          pointerEvents: hidden && scrolled ? "none" : "auto",
        }}
      >
        {/* Rounded floating bar — white at 23% opacity */}
        <div
          className={cn(
            "mx-3 mt-3 rounded-full border border-white/10 sm:mx-5 sm:mt-4 lg:mx-auto lg:max-w-[80rem]",
            "transition-all duration-500 ease-out",
            scrolled
              ? "bg-white/[0.23] shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
              : "bg-white/[0.06] backdrop-blur-md"
          )}
        >
          <div className="flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3 lg:px-7">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "font-display shrink-0 uppercase leading-none tracking-wide transition-colors duration-500",
                "text-lg sm:text-xl",
                scrolled ? "text-[#0a0a0a]" : "text-white"
              )}
              aria-label="Abdul Rahman — Home"
            >
              Abdul Rahman
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Main navigation"
            >
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative block rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300",
                        "after:absolute after:bottom-1.5 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-300 hover:after:w-[calc(100%-1.75rem)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                        scrolled
                          ? "text-[#0a0a0a]/70 hover:text-[#0a0a0a]"
                          : "text-zinc-300 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/contact"
                className={cn(
                  "magnetic-button ml-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-500",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  scrolled
                    ? "bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/85 focus-visible:ring-[#0a0a0a]/40"
                    : "bg-white text-[#0a0a0a] hover:bg-white/90 focus-visible:ring-white/40"
                )}
              >
                Let&apos;s Talk
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "-mr-1 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                scrolled ? "text-[#0a0a0a] hover:bg-[#0a0a0a]/10" : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0a0a0a]/95 px-6 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-5 text-center">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.45,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleMobileLinkClick}
                      className="block font-display text-4xl uppercase leading-none tracking-tight text-white transition-colors hover:text-white/60 sm:text-5xl"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ delay: 0.32, duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              <Link
                href="/contact"
                onClick={handleMobileLinkClick}
                className="magnetic-button inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a] transition-colors hover:bg-white/90"
              >
                Let&apos;s Talk
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}