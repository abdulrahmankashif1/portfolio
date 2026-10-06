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
    description:
      "Custom Next.js, React and TypeScript builds — fast, scalable and SEO-ready from day one.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    href: "/services#web-development",
  },
  {
    id: "ecommerce-management",
    icon: "ShoppingCart",
    title: "E-commerce & Store Management",
    description:
      "Store setup, product and inventory management, checkout optimisation and day-to-day store operations.",
    tags: ["Shopify", "WooCommerce", "Product Management", "Payments", "Order fulfilment"],
    href: "/services#ecommerce-management",
  },
  {
    id: "shopify-stores",
    icon: "Store",
    title: "Shopify Store Setup & Growth",
    description:
      "Custom Shopify builds — themes, apps, product pages and conversion tweaks that make the store easier to buy from.",
    tags: ["Shopify", "Liquid", "Theme Customisation", "Apps & Integrations", "Store SEO"],
    href: "/services#shopify-stores",
  },
  {
    id: "uiux-design",
    icon: "Palette",
    title: "UI/UX & Web Design",
    description:
      "User-centred interfaces, design systems and layouts that stay clear on every screen size.",
    tags: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Responsive Layouts"],
    href: "/services#uiux-design",
  },
  {
    id: "graphic-design",
    icon: "PenTool",
    title: "Graphic Designing",
    description:
      "Logos, brand kits, social posts, banners and print-ready artwork — designed to look sharp at every size.",
    tags: ["Photoshop", "Illustrator", "Canva", "Logo Design", "Brand Identity", "Social Media Kits"],
    href: "/services#graphic-design",
  },
  {
    id: "video-editing",
    icon: "Video",
    title: "Video Editing",
    description:
      "Clean cuts, colour grading, subtitles and motion graphics for reels, promos and YouTube content.",
    tags: ["Premiere Pro", "After Effects", "CapCut", "Colour Grading", "Subtitles", "Short-form Reels"],
    href: "/services#video-editing",
  },
  {
    id: "seo-content",
    icon: "Search",
    title: "SEO & Digital Content",
    description:
      "Technical SEO, on-page optimisation, content writing and structured data so the work actually gets found.",
    tags: ["Technical SEO", "Keyword Research", "Schema Markup", "Content Writing", "Analytics"],
    href: "/services#seo-content",
  },
  {
    id: "deployment-support",
    icon: "Server",
    title: "Deployment & Technical Support",
    description:
      "Vercel and Shopify deployment, Git/GitHub workflows, domain/DNS setup and ongoing troubleshooting.",
    tags: ["Vercel", "Shopify", "Git/GitHub", "Domain/DNS", "SSL", "Monitoring"],
    href: "/services#deployment-support",
  },
];