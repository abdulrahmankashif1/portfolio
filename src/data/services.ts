export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export const services: Service[] = [
  {
    id: "web-development",
    icon: "Code",
    title: "Web Development",
    description: "Custom Next.js, React, and TypeScript builds — fast, scalable, and SEO-ready from day one.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    href: "/services#web-development",
  },
  {
    id: "ecommerce-management",
    icon: "ShoppingCart",
    title: "E-commerce & Store Management",
    description: "End-to-end store setup, product management, checkout optimization, and ongoing store operations.",
    tags: ["E-commerce Platforms", "Payment Integration", "Inventory", "Orders", "Analytics"],
    href: "/services#ecommerce-management",
  },
  {
    id: "uiux-design",
    icon: "Palette",
    title: "UI/UX & Graphic Design",
    description: "User-centered interfaces, design systems, brand identity, and digital content that converts.",
    tags: ["Figma", "Design Systems", "Branding", "Wireframing", "Prototyping"],
    href: "/services#uiux-design",
  },
  {
    id: "seo-content",
    icon: "Search",
    title: "SEO & Digital Content",
    description: "Technical SEO, content strategy, on-page optimization, and structured data for search visibility.",
    tags: ["Technical SEO", "Content Strategy", "Schema Markup", "Core Web Vitals", "Analytics"],
    href: "/services#seo-content",
  },
  {
    id: "deployment-support",
    icon: "Server",
    title: "Deployment & Technical Support",
    description: "Vercel deployment, Git/GitHub workflows, domain/DNS configuration, and ongoing troubleshooting.",
    tags: ["Vercel", "Git/GitHub", "Domain/DNS", "CI/CD", "Monitoring", "Troubleshooting"],
    href: "/services#deployment-support",
  },
];