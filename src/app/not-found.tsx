import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home, Wrench, FolderOpen } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-[2] min-h-[70vh] flex items-center justify-center px-6 lg:px-8 xl:px-10 pt-20">
        <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[80rem] w-full text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-600 mb-3">404</p>
          <h1 className="font-display text-[clamp(4rem,12vw,8rem)] uppercase leading-none text-white mb-5">
            Page not found
          </h1>
          <p className="mt-5 max-w-md mx-auto text-zinc-500 text-lg">
            That URL doesn't exist on this site. Try the homepage, browse work, or get in touch.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] hover:bg-white/90 transition-colors">
              <Home className="h-4 w-4" aria-hidden="true" />
              Home
            </Link>
            <Link href="/work" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/5 hover:border-white/30 transition-colors">
              <FolderOpen className="h-4 w-4" aria-hidden="true" />
              Work
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/5 hover:border-white/30 transition-colors">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              Contact
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}