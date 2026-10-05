"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { Mail, MapPin, Copy, Check } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Replace with actual API call or Formspree/Resend integration
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        toast({ title: "Message sent!", description: "I'll get back to you soon." });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setSubmitStatus("error");
      toast({ title: "Something went wrong", description: "Please try again or email me directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    toast({ title: "Email copied", description: `${siteConfig.email} copied to clipboard` });
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 xl:px-10"
      aria-labelledby="contact-heading"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-[#6366f1]/5 blur-3xl pointer-events-none"
          style={{ filter: "blur(120px)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[30rem] w-[30rem] rounded-full bg-[#ec4899]/5 blur-3xl pointer-events-none"
          style={{ filter: "blur(100px)" }}
        />
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Headline & Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Contact</span>
              <h2
                id="contact-heading"
                className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-[0.95] tracking-tight text-white"
              >
                Let&apos;s build
                <br />
                <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                  something that flows.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="mt-10 space-y-6"
            >
              <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                Have a project in mind? I'd love to hear about it. Fill out the form or reach out directly.
              </p>

              {/* Email with copy */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-zinc-400">
                  <Mail className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Email</p>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white hover:text-[#6366f1] transition-colors font-mono text-sm"
                    >
                      {siteConfig.email}
                    </a>
                    <button
                      onClick={copyEmail}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Copy email address"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-zinc-400">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">Location</p>
                  <p className="mt-1 text-white">{siteConfig.location}</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="mt-10"
            >
              <MagneticButton
                href="mailto:abdulrahmankashif4@gmail.com"
                className="w-full sm:w-auto"
              >
                Start a Project
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Name <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full rounded-lg border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600",
                      "focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent",
                      "transition-colors",
                      errors.name && "border-red-400 focus:ring-red-400",
                      "border-white/10 hover:border-white/20"
                    )}
                    placeholder="Your name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full rounded-lg border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600",
                      "focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent",
                      "transition-colors",
                      errors.email && "border-red-400 focus:ring-red-400",
                      "border-white/10 hover:border-white/20"
                    )}
                    placeholder="your@email.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                    Message <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={cn(
                      "w-full rounded-lg border bg-white/5 px-4 py-3 text-white placeholder:text-zinc-600 resize-none",
                      "focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent",
                      "transition-colors",
                      errors.message && "border-red-400 focus:ring-red-400",
                      "border-white/10 hover:border-white/20"
                    )}
                    placeholder="Tell me about your project..."
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <MagneticButton
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full",
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </MagneticButton>

                {/* Success/Error Message */}
                <AnimatePresence mode="wait">
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-2"
                      role="status"
                    >
                      <Check className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      Message sent successfully! I'll get back to you within 24 hours.
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2"
                      role="alert"
                    >
                      <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Something went wrong. Please try again or email directly.
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-xs text-zinc-600 text-center">
                  By submitting, you agree to receive email communication about your project.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { AnimatePresence } from "framer-motion";