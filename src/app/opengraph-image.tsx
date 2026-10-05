import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a0a0a",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent glows */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, rgba(99,102,241,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -100,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(168,85,247,0.40) 0%, rgba(168,85,247,0) 70%)",
            display: "flex",
          }}
        />

        {/* Availability pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 9999,
            padding: "12px 26px",
            fontSize: 24,
            color: "#d4d4d8",
            marginBottom: 44,
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#4ade80",
              display: "flex",
            }}
          />
          Available for new projects
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -3,
            lineHeight: 1,
            marginBottom: 24,
            display: "flex",
          }}
        >
          Abdul Rahman
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 42,
            color: "#a1a1aa",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 36,
            display: "flex",
          }}
        >
          IT &amp; Digital Media Professional
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 34,
            color: "#71717a",
            maxWidth: 900,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          I design, develop and manage fast, SEO-ready e-commerce and business websites.
        </div>

        {/* Footer line */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#52525b",
          }}
        >
          <div
            style={{
              width: 48,
              height: 3,
              background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
              display: "flex",
            }}
          />
          Next.js · E-commerce · UI/UX · SEO
        </div>
      </div>
    ),
    size
  );
}