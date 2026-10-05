import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Services } from "@/components/Services";

export const metadata: Metadata = generateMetadata({
  title: "Services",
  description: "Web development, e-commerce, UI/UX design, SEO, and technical support services by Abdul Rahman.",
});

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-[2]">
        <section className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 xl:px-10" aria-labelledby="services-page-heading">
          <div className="absolute top-0 right-1/4 h-[30rem] w-[30rem] rounded-full bg-[#a855f7]/5 blur-3xl pointer-events-none" style={{ filter: "blur(100px)" }} aria-hidden="true" />
          <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] relative">
            <header className="mb-16 max-w-3xl">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Services</span>
              <h1 id="services-page-heading" className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-none tracking-tight text-white">
                What I Do
              </h1>
              <p className="mt-6 text-lg text-zinc-400">
                End-to-end web development and digital services — from strategy and design to launch and ongoing support.
              </p>
            </header>
            <Services />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}