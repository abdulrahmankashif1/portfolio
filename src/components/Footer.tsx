"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    navigate: [
      { href: "/work", label: "Work" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
    services: [
      { href: "/services#web-development", label: "Web Development" },
      { href: "/services#ecommerce-management", label: "E-commerce & Store Management" },
      { href: "/services#uiux-design", label: "UI/UX & Graphic Design" },
      { href: "/services#seo-content", label: "SEO & Digital Content" },
      { href: "/services#deployment-support", label: "Deployment & Technical Support" },
    ],
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a]">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-[#6366f1]/5 blur-3xl pointer-events-none"
        style={{ filter: "blur(100px)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] px-6 lg:px-8 xl:px-10 py-16 md:py-24 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-2"
          >
            <Link
              href="/"
              className="font-display text-2xl md:text-3xl uppercase tracking-wide text-white hover:text-white/70 transition-colors inline-block mb-4"
              aria-label="Abdul Rahman - Home"
            >
              Abdul Rahman
            </Link>
            <p className="text-zinc-400 max-w-xs leading-relaxed">
              IT & Digital Media Professional. Building fast, SEO-ready e-commerce and business websites.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex gap-4" role="list" aria-label="Social links">
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all"
                aria-label="GitHub"
                role="listitem"
              >
                <GithubIcon aria-label="GitHub" />
              </Link>
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all"
                aria-label="LinkedIn"
                role="listitem"
              >
                <LinkedinIcon aria-label="LinkedIn" />
              </Link>
            </div>
          </motion.div>

          {/* Navigate */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            aria-label="Navigate"
          >
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">Navigate</h4>
            <ul className="space-y-3" role="list">
              {footerLinks.navigate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Services */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            aria-label="Services"
          >
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">Services</h4>
            <ul className="space-y-3" role="list">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-1"
          >
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">Contact</h4>
            <address className="not-italic space-y-3 text-sm text-zinc-400">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block hover:text-white transition-colors font-mono"
              >
                {siteConfig.email}
              </a>
              <p>{siteConfig.location}</p>
            </address>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}