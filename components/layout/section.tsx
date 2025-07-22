import { cn } from "@/lib/utils";

interface SectionProps {
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
    >
      {children}
    </section>
  );
}