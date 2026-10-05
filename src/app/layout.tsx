import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ToastProvider } from "@/hooks/useToast";
import { generateMetadata, generateJSONLD } from "@/lib/seo";
import { siteConfig } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = generateMetadata();
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJSONLD()) }}
        />
        <link rel="canonical" href={siteConfig.url} />
        <meta name="ai-content-index" content={`${siteConfig.url}/llms.txt`} />
      </head>
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        <ToastProvider>
          <SmoothScrollProvider>
            {children}
            <Cursor />
            <ScrollProgress />
          </SmoothScrollProvider>
        </ToastProvider>
      </body>
    </html>
  );
}