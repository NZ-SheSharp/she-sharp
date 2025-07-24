"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right";
  delay?: number;
}

export function AnimatedWrapper({ 
  children, 
  className,
  animation = "fade-up",
  delay = 0 
}: AnimatedWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const animationClasses = {
    "fade-up": "translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100",
    "fade-in": "opacity-0 animate-in:opacity-100",
    "scale": "scale-95 opacity-0 animate-in:scale-100 animate-in:opacity-100",
    "slide-left": "translate-x-8 opacity-0 animate-in:translate-x-0 animate-in:opacity-100",
    "slide-right": "-translate-x-8 opacity-0 animate-in:-translate-x-0 animate-in:opacity-100",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        animationClasses[animation],
        className
      )}
    >
      {children}
    </div>
  );
}