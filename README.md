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

1. Save your screenshots in `public/projects/`
2. Add the `image` field to that project in `src/data/projects.ts`:

```typescript
{
  id: "shades-theory",
  image: "/projects/shades-theory.jpg",  // <- add this line
  // ...rest of the object
}
```

While `image` is omitted, a styled gradient mockup is rendered automatically —
no broken images, no 404s. See `public/projects/README.md` for specs.

### Adding Your Photo

1. Save your photo as `public/images/abdul-rahman.jpg`
2. Flip the flag in `src/data/site.ts`:

```typescript
photo: {
  src: "/images/abdul-rahman.jpg",
  enabled: true,   // <- flip to true
},
```

See `public/images/README.md` for specs.

### Before You Deploy

1. Set your real domain in `src/data/site.ts` → `url`
2. Add your GitHub and LinkedIn URLs in `src/data/site.ts` → `social`
3. Commit and push — Netlify redeploys automatically

## Deployment

Deploy to **Netlify** or **Vercel** — both work with zero config changes.

### Netlify (GitHub-based, recommended)

`netlify.toml` is already committed, so Netlify picks up the right settings.

**Step 1 — Create the GitHub repo**

1. Go to https://github.com/new
2. Repository name: `portfolio` (or whatever you like)
3. Visibility: **Private** or **Public** (your choice)
4. Do **not** tick "Add a README" — this project already has one
5. Click **Create repository**

**Step 2 — Push your code**

```bash
cd portfolio
git remote add origin https://github.com/abdulrahmankashif1/portfolio.git
git branch -M main
git push -u origin main
```

GitHub asks for your username and a **Personal Access Token** instead of a
password. Get a token at https://github.com/settings/tokens (scope: `repo`).

> **Got `remote: Repository not found`?** The machine had credentials saved for
> a *different* GitHub account, so git reused those silently. Force the right
> account:
>
> ```bash
> git remote set-url origin https://abdulrahmankashif1@github.com/abdulrahmankashif1/portfolio.git
> git push -u origin main
> ```

**Step 3 — Connect to Netlify**

1. Go to https://app.netlify.com
2. Sign up / sign in with your **GitHub** account
3. Click **Add new site** → **Import an existing project**
4. Pick your `portfolio` repo
5. Netlify auto-detects Next.js from `netlify.toml` (build `npm run build`,
   publish `.next`)
6. Click **Deploy site**

**Step 4 — Set your real domain**

Netlify → **Domain settings** → **Add a custom domain**.

**Every push from now on auto-deploys.** Just run:

```bash
git add -A
git commit -m "your message"
git push
```

Netlify builds and publishes automatically. You'll get a preview URL for every
pull request too.

### Vercel

1. Push to GitHub (same as Step 2 above)
2. Import at https://vercel.com/new
3. Framework preset: **Next.js** (auto-detected)
4. Deploy

### Environment Variables

The contact form works out of the box (it validates and returns `200`), but it
doesn't actually send email yet. To make it live, add your provider's key in
**Netlify → Site settings → Environment variables**, then uncomment the relevant
block in `src/app/api/contact/route.ts`:

```env
# Resend (recommended)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Formspree
FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# SendGrid
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM_EMAIL=verified@yourdomain.com
```

## Deploying to Netlify — the setup is already done

`netlify.toml` is committed with the right build command, publish directory,
Node version, the `@netlify/plugin-nextjs` plugin, and security headers. You only
need to create the GitHub repo and import it — see **Deployment** above.

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