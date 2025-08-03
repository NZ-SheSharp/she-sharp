"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const authNavItems = [
  { title: "About", href: "/about" },
  { title: "Events", href: "/events" },
  { title: "Mentorship", href: "/mentorship" },
  { title: "Contact", href: "/contact" },
];

export function AuthHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur transition-all duration-150",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="mx-auto px-4 md:px-6 max-w-7xl flex h-16 items-center">
        {/* Logo */}
        <Link
          href="/"
          className="mr-8 flex items-center space-x-2 transition-all duration-200 group hover:opacity-80"
        >
          <div className="relative w-32 h-10">
            <Image
              src="/logos/she-sharp-logo.svg"
              alt="She Sharp"
              fill
              sizes="128px"
              className="object-contain transition-all duration-200 group-hover:brightness-0 group-hover:saturate-100 group-active:scale-95"
              style={{
                filter: "brightness(1) saturate(1)",
              }}
              priority
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{
                background: "#9B2E83",
                maskImage: "url(/logos/she-sharp-logo.svg)",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: "url(/logos/she-sharp-logo.svg)",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-auto">
          {authNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-purple-dark transition-colors duration-150"
            >
              {item.title}
            </Link>
          ))}
          <div className="ml-4 pl-4 border-l border-gray-200">
            <Link href="/sign-in">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-dark text-purple-dark hover:bg-purple-light"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="ml-auto md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-purple-light/50 hover:text-purple-dark transition-colors"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-0">
            {/* Mobile Header */}
            <div className="bg-gradient-to-br from-purple-dark to-purple-mid p-6">
              <SheetTitle className="text-white text-xl font-bold">
                Menu
              </SheetTitle>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col p-6">
              {authNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="py-3 text-base font-medium text-navy-dark hover:text-purple-dark transition-colors border-b border-gray-100 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-purple-dark text-purple-dark hover:bg-purple-light"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}