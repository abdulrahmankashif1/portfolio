import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = generateMetadata({
  title: "FAQ",
  description: "Frequently asked questions about web development, e-commerce, SEO, and technical services by Abdul Rahman.",
});

export default function FAQPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-[2]">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}