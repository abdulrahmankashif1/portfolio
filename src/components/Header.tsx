"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useScrollDirection } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const scrollDirection = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300",
          scrolled && "bg-[#0a0a0a]/90 backdrop-blur-md",
          !scrolled && "bg-transparent",
          scrollDirection === "down" && scrolled && "-translate-y-full",
          scrollDirection === "up" && "translate-y-0"
        )}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8 xl:max-w-7xl xl:px-10 2xl:max-w-[80rem]">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-lg md:text-xl uppercase tracking-wide text-white hover:text-white/70 transition-colors z-10"
              aria-label="Abdul Rahman - Home"
            >
              Abdul Rahman
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="magnetic-button hidden sm:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] hover:bg-white/90 transition-colors"
              >
                Let's Talk
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center p-2 z-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
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
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-6 text-center">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.08, duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleMobileLinkClick}
                      className="font-display text-3xl md:text-4xl uppercase tracking-tight text-white hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <Link
              href="/contact"
              onClick={handleMobileLinkClick}
              className="magnetic-button inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a] hover:bg-white/90 transition-colors mt-4"
            >
              Let's Talk
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}