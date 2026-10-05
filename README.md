# Abdul Rahman — Portfolio Website

A production-ready personal portfolio website built with Next.js 16, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis. Inspired by the design language and animations of [resflow.in](https://resflow.in/).

## Features

- **Dark cinematic design** with electric blue/violet gradient accents
- **Smooth scrolling** with Lenis
- **Scroll-triggered animations** with GSAP ScrollTrigger
- **Component animations** with Framer Motion
- **Custom cursor** with magnetic buttons (desktop only)
- **3D/WebGL hero element** with React Three Fiber (graceful fallback)
- **Fully responsive** (mobile-first)
- **Accessible** (WCAG AA compliant)
- **SEO optimized** with Metadata API, JSON-LD, sitemap, robots.txt
- **AI crawler friendly** with llms.txt and llms-full.txt

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion, GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **3D**: React Three Fiber, @react-three/drei
- **Icons**: Lucide React
- **Fonts**: Bebas Neue (display), Inter (sans), Geist Mono (mono)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
portfolio/
├── public/
│   ├── images/          # Static images (profile photo, etc.)
│   ├── projects/        # Project screenshots
│   ├── llms.txt         # AI crawler summary
│   └── llms-full.txt    # Full content for AI crawlers
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── api/         # API routes
│   │   ├── work/        # Work pages
│   │   ├── services/    # Services page
│   │   ├── about/       # About page
│   │   ├── faq/         # FAQ page
│   │   ├── contact/     # Contact page
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Home page
│   │   ├── globals.css  # Global styles
│   │   ├── sitemap.ts   # Sitemap generation
│   │   └── robots.ts    # Robots.txt generation
│   ├── components/      # React components
│   │   ├── Hero.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SelectedWork.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── TechStack.tsx
│   │   ├── About.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   ├── Marquee.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── Cursor.tsx
│   │   ├── Preloader.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── SmoothScrollProvider.tsx
│   ├── data/            # Content data (easy to edit)
│   │   ├── projects.ts
│   │   ├── services.ts
│   │   ├── faq.ts
│   │   └── site.ts
│   ├── hooks/           # Custom React hooks
│   │   ├── useLenis.ts
│   │   ├── useReducedMotion.ts
│   │   └── useToast.ts
│   └── lib/             # Utility functions
│       ├── utils.ts
│       └── seo.ts
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Customizing Content

All content is centralized in `src/data/` for easy editing:

### Projects (`src/data/projects.ts`)

```typescript
export const projects: Project[] = [
  {
    id: "your-project",
    number: "01",
    title: "Project Name",
    description: "Category / Type",
    category: "Category",
    liveUrl: "https://example.com",
    caseStudyUrl: "/work/your-project",
    image: "/projects/your-image.jpg",
    tags: ["Next.js", "React", "..."],
    work: ["Work item 1", "Work item 2", ...],
  },
];
```

### Services (`src/data/services.ts`)

```typescript
export const services: Service[] = [
  {
    id: "service-id",
    icon: "IconName", // Code, ShoppingCart, Palette, Search, Server
    title: "Service Title",
    description: "One-line description",
    tags: ["Tag1", "Tag2", ...],
    href: "/services#service-id",
  },
];
```

### FAQ (`src/data/faq.ts`)

```typescript
export const faqItems: FAQItem[] = [
  {
    id: "unique-id",
    question: "Question text?",
    answer: "Answer text...",
  },
];
```

### Site Config (`src/data/site.ts`)

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title",
  description: "Meta description",
  url: "https://yourdomain.com",
  email: "your@email.com",
  location: "Your Location",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
};
```

### Adding Project Screenshots

1. Add your screenshot images to `public/projects/`
2. Update the `image` field in `projects.ts` to match the filename
3. Recommended: 1200x900px, WebP format

### Adding Profile Photo

1. Add your photo to `public/images/abdul-rahman.jpg`
2. Recommended: 800x1000px, WebP format

## Deployment (Vercel)

### Automatic Deployment

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in [Vercel](https://vercel.com/new)
3. Vercel will auto-detect Next.js and configure build settings
4. Add environment variables if needed (for email services)
5. Deploy!

### Environment Variables

For the contact form, add these in Vercel dashboard:

```env
# For Resend
RESEND_API_KEY=your_resend_api_key

# For Formspree
FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id

# For SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=verified@yourdomain.com
SENDGRID_TO_EMAIL=your@email.com
```

Then update `src/app/api/contact/route.ts` to use your preferred service.

## Performance

- **Lighthouse Score**: 90+ target
- **Core Web Vitals**: Optimized
- **Images**: Next.js Image optimization with blur placeholders
- **Fonts**: Self-hosted with `next/font`
- **Scripts**: Deferred and optimized

## Accessibility

- Semantic HTML5
- ARIA labels and roles
- Focus visible states
- Keyboard navigation
- Reduced motion support
- Color contrast compliance
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT License — feel free to use this as a template for your own portfolio.

## Credits

- Design inspiration: [resflow.in](https://resflow.in/)
- Fonts: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Nue), [Inter](https://fonts.google.com/specimen/Inter)
- Icons: [Lucide](https://lucide.dev/)
- Animations: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- Smooth scroll: [Lenis](https://lenis.studiofreight.com/)
- 3D: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)