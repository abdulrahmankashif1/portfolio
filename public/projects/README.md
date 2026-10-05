# Drop real project screenshots here

Add image files and reference them from `src/data/projects.ts`:

```ts
{
  id: "shades-theory",
  image: "/projects/shades-theory.jpg",   // -> public/projects/shades-theory.jpg
  // ...
}
```

While `image` is omitted, the site renders a styled gradient mockup instead.

## Recommended specs

- Format: `.jpg` or `.webp`
- Dimensions: 1600 x 1200 (4:3) or wider, e.g. 1920 x 1080
- Under ~400 KB each (compress before adding)

## Current projects

- `alkahaf-store.png` — wired up (Alkahaf Store, https://store.alkahaf.org/)
- Shades Theory screenshot still missing — save it as `shades-theory.jpg`
  and add `image: "/projects/shades-theory.jpg"` to
  `src/data/projects.ts`