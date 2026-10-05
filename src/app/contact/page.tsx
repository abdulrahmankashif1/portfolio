import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = generateMetadata({
  title: "Contact",
  description: "Get in touch with Abdul Rahman for web development, e-commerce, and digital media projects.",
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-[2]">
        <Contact />
      </main>
      <Footer />
    </>
  );
}