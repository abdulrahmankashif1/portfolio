"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
}

/** Matches the section order on the home page. */
const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "tech-stack", label: "Tools" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export function SideNav() {
  const prefersReducedMotion = useReducedMotion();
  const [items, setItems] = useState<NavItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  /* Only keep sections that actually exist on this page, so the nav can
     never link to a missing anchor. Hidden when there is nothing to show. */
  useEffect(() => {
    const present = NAV_ITEMS.filter((item) =>
      document.getElementById(item.id)
    );
    setItems(present);
    setActiveId(present[0]?.id ?? "");
  }, []);

  /* Scroll spy — a plain listener, not IntersectionObserver, so it keeps
     working in throttled/backgrounded tabs. */
  useEffect(() => {
    if (items.length < 2) return;

    const update = () => {
      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 4;

      if (atBottom) {
        setActiveId(items[items.length - 1].id);
        return;
      }

      // A section is "current" once its top passes this line.
      const line = window.scrollY + window.innerHeight * 0.35;
      let current = items[0].id;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= line) {
          current = item.id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  const goTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const lenis = window.__lenis;

      if (lenis && !prefersReducedMotion) {
        // Route through Lenis so it stays in sync with the smooth scroller.
        lenis.scrollTo(el, { offset: -8, duration: 1.1 });
      } else {
        el.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }

      // Keep the keyboard where the eye went.
      window.history.replaceState(null, "", `#${id}`);
    },
    [prefersReducedMotion]
  );

  // Listen for hash changes so browser back/forward and manual hash links work.
  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace("#", "");
      if (id && document.getElementById(id)) goTo(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [goTo]);

  if (items.length < 2) return null;

  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.id === activeId)
  );

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 pr-5 lg:block xl:pr-7"
    >
      {/* Soft backdrop so labels stay readable over the orb and glow */}
      <div
        className="pointer-events-none absolute -inset-y-10 -inset-x-6 -z-10 bg-gradient-to-l from-[#0a0a0a]/90 via-[#0a0a0a]/55 to-transparent"
        aria-hidden="true"
      />
      <ul className="pointer-events-auto flex flex-col gap-1">
        {items.map((item, index) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex w-full items-center justify-end gap-3 py-1.5 pl-3 pr-1 text-right",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] rounded-sm"
                )}
              >
                {/* Text block */}
                <span className="flex flex-col items-end leading-none">
                  <span
                    className={cn(
                      "font-mono text-[10px] tabular-nums tracking-widest transition-colors duration-300",
                      isActive
                        ? "text-white/70"
                        : "text-zinc-600 group-hover:text-zinc-400"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "mt-1 whitespace-nowrap text-[11px] tracking-wide transition-colors duration-300",
                      isActive
                        ? "text-white"
                        : "text-zinc-600 group-hover:text-zinc-300"
                    )}
                  >
                    {item.label}
                  </span>
                </span>

                {/* Indicator line */}
                <span className="relative flex h-px w-9 items-center justify-end">
                  <span className="absolute inset-0 rounded-full bg-white/10" />
                  {isActive && (
                    <motion.span
                      layoutId="sidenav-active"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  {/* Dot marker on the active row */}
                  {isActive && (
                    <motion.span
                      layoutId="sidenav-dot"
                      className="absolute -right-[3px] h-1.5 w-1.5 rounded-full bg-white"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Thin overall progress rail */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-px bg-white/[0.06] xl:block"
        aria-hidden="true"
      >
        <motion.span
          className="absolute inset-x-0 top-0 block h-4 bg-white/25"
          animate={{ height: `${((activeIndex + 1) / items.length) * 100}%` }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 260, damping: 30 }
          }
        />
      </div>
    </nav>
  );
}