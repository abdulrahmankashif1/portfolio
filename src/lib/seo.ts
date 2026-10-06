import { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { faqItems } from "@/data/faq";

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
    category: "technology",
    robots: "index, follow",
    alternates: { canonical: "/" },
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
    ...overrides,
  };
}

/**
 * FAQ structured data is derived from src/data/faq.ts so the two can never
 * drift out of sync.
 */
function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/faq#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
          "UI/UX Design",
          "E-commerce Development",
          "Shopify Store Development",
          "Graphic Design",
          "Video Editing",
          "SEO Services",
          "Technical Support",
          "Deployment Services",
        ],
        areaServed: "Worldwide",
        sameAs: [siteConfig.social.github, siteConfig.social.linkedin].filter(
          (url) => url && !url.includes("TODO")
        ),
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
      faqSchema(),
    ],
  };
}