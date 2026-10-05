import { Metadata } from "next";
import { projects } from "@/data/projects";
import { generateMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, ExternalLink, ChevronLeft, Code, ShoppingCart, Server, Globe } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ProjectMockup } from "@/components/ProjectMockup";

const project = projects.find(p => p.id === "alkahaf-store")!;

export const metadata: Metadata = generateMetadata({
  title: `${project.title} — Case Study`,
  description: `${project.description} — ${project.work.join(", ")}. View the full case study.`,
});

const workCategories = [
  { icon: Code, label: "Website Development", color: "#6366f1" },
  { icon: ShoppingCart, label: "E-commerce", color: "#a855f7" },
  { icon: Server, label: "Website Management", color: "#22c55e" },
  { icon: Globe, label: "Technical Management", color: "#f59e0b" },
];

export default function AlkahafStoreCaseStudy() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-[2]">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center px-6 lg:px-8 xl:px-10 pt-20" aria-labelledby="project-hero-heading">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-[#a855f7]/10 blur-3xl" style={{ filter: "blur(120px)" }} />
          </div>
          <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] w-full">
            <Link href="/work" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back to Work
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Case Study</span>
                <h1 id="project-hero-heading" className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-[0.95] tracking-tight text-white">
                  {project.title}
                </h1>
                <p className="mt-6 text-xl text-zinc-400">{project.description}</p>

                <div className="mt-10 flex flex-wrap gap-3" role="list" aria-label="Project categories">
                  {workCategories.map((cat, i) => (
                    <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300" role="listitem">
                      {cat.label}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex items-center gap-6">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#0a0a0a] hover:bg-white/90 transition-colors">
                    Visit Live Site
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href={project.caseStudyUrl} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    View Case Study
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <ProjectMockup project={project} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-24 px-6 lg:px-8 xl:px-10" aria-labelledby="overview-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="overview-heading" className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-white mb-8">
              Overview
            </h2>
            <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed space-y-6">
              <p>
                <strong>{project.title}</strong> is a full-featured online store built for seamless product management, secure checkout, and easy content updates.
              </p>
              <p>
                The project involved complete website development, e-commerce setup, ongoing website management, digital content creation, and technical troubleshooting. The store is deployed on Vercel with custom domain, SSL, and monitoring.
              </p>
              <p>
                Focus areas included reliable uptime, fast page loads, intuitive admin experience for non-technical content updates, and robust error handling for order processing.
              </p>
            </div>
          </div>
        </section>

        {/* My Role */}
        <section className="py-24 px-6 lg:px-8 xl:px-10 bg-white/5 border-y border-white/10" aria-labelledby="role-heading">
          <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem]">
            <h2 id="role-heading" className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-white mb-12 text-center">
              My Role
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.work.map((item, index) => (
                <div key={index} className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all">
                  <p className="font-display text-lg uppercase tracking-tight text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 px-6 lg:px-8 xl:px-10" aria-labelledby="tech-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="tech-heading" className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-white mb-8">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3" role="list" aria-label="Technologies used">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Git/GitHub", "Vercel", "E-commerce Platform", "DNS Management"].map((tech, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300" role="listitem">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Prev Project */}
        <section className="py-24 px-6 lg:px-8 xl:px-10" aria-labelledby="prev-heading">
          <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem]">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="lg:text-right">
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Previous Project</span>
                <h2 id="prev-heading" className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-white">
                  Shades Theory
                </h2>
                <p className="mt-4 text-lg text-zinc-400">E-commerce / Eyewear Store</p>
              </div>
              <Link href="/work/shades-theory" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/5 hover:border-white/30 transition-colors lg:justify-self-end">
                <ArrowUpRight className="h-4 w-4 rotate-180" aria-hidden="true" />
                View Case Study
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}