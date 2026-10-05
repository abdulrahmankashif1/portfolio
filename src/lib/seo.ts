import { Metadata } from "next";
import { siteConfig } from "@/data/site";

export function generateMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title
    ? `${overrides.title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.title}`;

  const description = overrides.description || siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: "index, follow",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "/",
    },
    ...overrides,
  };
}

export function generateJSONLD() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Person", "ProfessionalService"],
        "@id": `${siteConfig.url}#person`,
        name: siteConfig.name,
        jobTitle: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        email: siteConfig.email,
        knowsAbout: siteConfig.keywords,
        serviceType: [
          "Web Development",
          "E-commerce Development",
          "UI/UX Design",
          "Graphic Design",
          "SEO Services",
          "Technical Support",
          "Deployment Services",
        ],
        areaServed: "Worldwide",
        sameAs: [siteConfig.social.github, siteConfig.social.linkedin].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/faq#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What do you build?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I build fast, SEO-ready e-commerce and business websites using Next.js, React, and modern tooling. This includes custom web applications, online stores, landing pages, and content-driven sites. I also handle the design, deployment, and ongoing management.",
            },
          },
          {
            "@type": "Question",
            name: "Do you handle SEO?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Every project includes SEO fundamentals: semantic HTML structure, meta tags, Open Graph, sitemap.xml, robots.txt, JSON-LD structured data, and performance optimization for Core Web Vitals. I can also advise on ongoing content strategy and technical SEO improvements.",
            },
          },
          {
            "@type": "Question",
            name: "How long does a website take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Timelines vary by scope. A focused landing page or small business site typically takes 2–4 weeks. A full e-commerce store with custom features usually takes 4–8 weeks. I share a detailed timeline after the discovery phase so you know exactly what to expect.",
            },
          },
          {
            "@type": "Question",
            name: "Can you manage or fix my existing website?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely. I offer technical management, troubleshooting, performance audits, bug fixes, content updates, and platform migrations. Whether it's a Next.js site, a WordPress install, or a custom stack, I can help stabilize and improve it.",
            },
          },
          {
            "@type": "Question",
            name: "Do you set up domain, DNS and hosting (Vercel)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. I handle domain registration or transfer, DNS configuration (A, CNAME, TXT, MX records), SSL, and production deployment on Vercel with preview deployments, environment variables, and custom domains. I also set up analytics and monitoring.",
            },
          },
        ],
      },
    ],
  };
}