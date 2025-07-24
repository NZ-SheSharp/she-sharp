import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  bgColor?: "white" | "light" | "accent" | "dark";
  noPadding?: boolean;
}

export function Section({
  children,
  className,
  bgColor = "white",
  noPadding = false,
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
        !noPadding && "py-16 md:py-24",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}