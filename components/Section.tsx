import clsx from "clsx";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

/** Consistent section heading: orange kicker + display title + lead text. */
export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={clsx(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {kicker ? (
        <span className={clsx("kicker", align === "center" && "justify-center")}>
          {kicker}
        </span>
      ) : null}
      <h2
        className={clsx(
          "mt-3 text-3xl font-bold leading-tight sm:text-4xl",
          light ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-navy-100" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** background variant */
  tone?: "white" | "muted" | "navy";
};

export default function Section({
  children,
  id,
  className,
  tone = "white",
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "py-16 sm:py-20 lg:py-24 transition-colors",
        tone === "white" && "bg-white/85 backdrop-blur-xs",
        tone === "muted" && "bg-surface-muted/80 backdrop-blur-xs",
        tone === "navy" && "bg-navy-950/85 text-white backdrop-blur-xs",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
