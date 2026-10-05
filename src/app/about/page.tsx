import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";

export const metadata: Metadata = generateMetadata({
  title: "About",
  description: "About Abdul Rahman — IT & Digital Media Professional specializing in e-commerce and business websites.",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-[2]">
        <About />
      </main>
      <Footer />
    </>
  );
}