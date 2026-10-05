import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { TechStack } from "@/components/TechStack";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content" className="relative z-[2]">
        <Hero />
        <SelectedWork />
        <Services />
        <Process />
        <TechStack />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}