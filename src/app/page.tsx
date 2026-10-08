import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { Services } from "@/components/Services";
import { TechStack } from "@/components/TechStack";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SideNav } from "@/components/SideNav";

export default function Home() {
  return (
    <>
      <Header />
      <SideNav />

      {/* Right rail reserved for the fixed side nav, so no section's
          content can ever slide underneath it. */}
      <div className="lg:pr-44 xl:pr-48">
        <main id="main-content" className="relative z-[2]">
          <Hero />
          <SelectedWork />
          <Services />
          <TechStack />
          <About />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}