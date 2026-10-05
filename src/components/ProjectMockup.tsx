import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectMockupProps {
  project: Project;
  className?: string;
}

/**
 * Pure-CSS placeholder that stands in for a real screenshot.
 * Drop a file at public/projects/<name>.jpg to replace it automatically.
 */
export function ProjectMockup({ project, className }: ProjectMockupProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-gradient-to-br",
        project.gradient,
        className
      )}
      aria-hidden="true"
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Browser chrome mock */}
      <div className="absolute inset-x-6 top-6 rounded-lg border border-white/10 bg-black/30 p-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-3 flex-1 truncate rounded bg-white/10 px-2 py-1 font-mono text-[10px] text-white/50">
            {project.liveUrl.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="absolute inset-x-6 bottom-6 space-y-2.5">
        <div className="h-2 w-1/3 rounded-full bg-white/20" />
        <div className="h-6 w-2/3 rounded bg-white/15" />
        <div className="h-2 w-1/2 rounded-full bg-white/10" />
      </div>

      {/* Project name watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display text-[clamp(2rem,7vw,4.5rem)] uppercase leading-none tracking-tight text-white/25"
          style={{ textShadow: `0 0 60px ${project.accent}55` }}
        >
          {project.title}
        </span>
      </div>

      {/* Corner glow */}
      <div
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
        style={{ background: project.accent }}
      />
    </div>
  );
}