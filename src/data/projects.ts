export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  liveUrl: string;
  caseStudyUrl: string;
  /** Drop a real screenshot at public/projects/<image> to replace the gradient mockup. */
  image?: string;
  /** Tailwind gradient classes used for the placeholder mockup. */
  gradient: string;
  accent: string;
  tags: string[];
  work: string[];
}

export const projects: Project[] = [
  {
    id: "shades-theory",
    number: "01",
    title: "Shades Theory",
    description: "E-commerce / Eyewear Store",
    category: "E-commerce",
    liveUrl: "https://theoryshades.store/",
    caseStudyUrl: "/work/shades-theory",
    image: "/projects/shades-theory.jpg",
    gradient: "from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30",
    accent: "#818cf8",
    tags: ["Next.js", "E-commerce", "UI/UX", "SEO"],
    work: [
      "Web Development",
      "E-commerce",
      "UI/UX",
      "Graphic Design",
      "Digital Content",
      "SEO",
      "Git/GitHub",
      "Vercel",
      "Domain/DNS",
      "Technical Management & Troubleshooting",
    ],
  },
  {
    id: "alkahaf-store",
    number: "02",
    title: "Alkahaf Store",
    description: "E-commerce / Online Store",
    category: "E-commerce",
    liveUrl: "https://store.alkahaf.org/",
    caseStudyUrl: "/work/alkahaf-store",
    image: "/projects/alkahaf-store.png",
    gradient: "from-violet-500/30 via-purple-500/20 to-indigo-500/30",
    accent: "#c084fc",
    tags: ["Next.js", "E-commerce", "Management", "Technical Support"],
    work: [
      "Website Development",
      "E-commerce",
      "Website Management",
      "Digital Content",
      "Technical Management & Troubleshooting",
    ],
  },
];