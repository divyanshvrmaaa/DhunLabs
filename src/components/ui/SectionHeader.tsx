import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeader({ eyebrow, title, body, align = "left", className = "", id }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Reveal>
        <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span aria-hidden className="h-px w-6 bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 id={id} className="h-section mt-5 text-balance">
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-muted md:text-lg">{body}</p>
        </Reveal>
      )}
    </div>
  );
}
