export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "what-do-you-build",
    question: "What do you build?",
    answer: "I build fast, SEO-ready e-commerce and business websites using Next.js, React, and modern tooling. This includes custom web applications, online stores, landing pages, and content-driven sites. I also handle the design, deployment, and ongoing management.",
  },
  {
    id: "do-you-handle-seo",
    question: "Do you handle SEO?",
    answer: "Yes. Every project includes SEO fundamentals: semantic HTML structure, meta tags, Open Graph, sitemap.xml, robots.txt, JSON-LD structured data, and performance optimization for Core Web Vitals. I can also advise on ongoing content strategy and technical SEO improvements.",
  },
  {
    id: "how-long-does-a-website-take",
    question: "How long does a website take?",
    answer: "Timelines vary by scope. A focused landing page or small business site typically takes 2–4 weeks. A full e-commerce store with custom features usually takes 4–8 weeks. I share a detailed timeline after the discovery phase so you know exactly what to expect.",
  },
  {
    id: "can-you-manage-or-fix-existing-website",
    question: "Can you manage or fix my existing website?",
    answer: "Absolutely. I offer technical management, troubleshooting, performance audits, bug fixes, content updates, and platform migrations. Whether it's a Next.js site, a WordPress install, or a custom stack, I can help stabilize and improve it.",
  },
  {
    id: "do-you-setup-domain-dns-hosting",
    question: "Do you set up domain, DNS and hosting (Vercel)?",
    answer: "Yes. I handle domain registration or transfer, DNS configuration (A, CNAME, TXT, MX records), SSL, and production deployment on Vercel with preview deployments, environment variables, and custom domains. I also set up analytics and monitoring.",
  },
];