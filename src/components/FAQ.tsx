"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 xl:px-10"
      aria-labelledby="faq-heading"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-[#a855f7]/5 blur-3xl pointer-events-none"
        style={{ filter: "blur(100px)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-3xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">FAQ</span>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tight text-white"
          >
            Common Questions
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            Quick answers to the questions I hear most often. Can't find what you're looking for? <a href="/contact" className="text-[#6366f1] hover:text-[#a855f7] underline underline-offset-2">Get in touch</a>.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div
          className="space-y-4"
          role="region"
          aria-label="Frequently asked questions"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              <details
                className={cn(
                  "group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300",
                  "open:border-white/20 open:bg-white/10",
                  "focus-within:ring-2 focus-within:ring-white/20 focus-within:ring-offset-2 focus-within:ring-offset-[#0a0a0a]"
                )}
                open={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              >
                <summary
                  className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none focus:outline-none"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white pr-10">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-colors group-hover:border-white/30 group-hover:text-white"
                    aria-hidden="true"
                  >
                    <Plus className="h-5 w-5" />
                    <Minus className="h-5 w-5" />
                  </motion.div>
                </summary>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden px-6 pb-6"
                    >
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-zinc-400 leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}