import { Metadata } from "next";
import { projects } from "@/data/projects";
import { generateMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = generateMetadata({
  title: "Work",
  description: "Selected projects by Abdul Rahman — E-commerce, web development, and digital media work.",
});

export default function WorkPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-[2]">
        <section className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 xl:px-10" aria-labelledby="work-heading">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full bg-[#6366f1]/5 blur-3xl pointer-events-none" style={{ filter: "blur(120px)" }} aria-hidden="true" />
          <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] relative">
            <header className="mb-16 max-w-3xl">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Selected Work</span>
              <h1 id="work-heading" className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-none tracking-tight text-white">
                Projects
              </h1>
              <p className="mt-6 text-lg text-zinc-400">
                A curated selection of e-commerce and business websites I've designed, developed, and launched.
              </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2" role="list" aria-label="All projects">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}