import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { layoutSystem, getSectionSpacing } from "@/lib/layout-system";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  bgColor?: "white" | "light" | "accent" | "dark";
  noPadding?: boolean;
  spacing?: keyof typeof layoutSystem.spacing;
}

export function Section({
  children,
  className,
  bgColor = "white",
  noPadding = false,
  spacing = "section",
  ...props
}: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    light: "bg-navy-light",
    accent: "bg-purple-light/5",
    dark: "bg-navy-dark text-white",
  };

  return (
    <section
      className={cn(
        bgClasses[bgColor],
        !noPadding && getSectionSpacing(spacing),
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}