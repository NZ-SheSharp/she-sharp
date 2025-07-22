"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "/about",
      children: [
        { name: "About She Sharp", href: "/about", description: "Learn about our mission and vision" },
        { name: "Our Team", href: "/about#team", description: "Meet our volunteer team" },
      ],
    },
    {
      name: "Events",
      href: "/events",
      children: [
        { name: "Explore Events", href: "/events", description: "View upcoming events" },
        { name: "Google Educator Conference", href: "/events/google-educator", description: "Annual education technology conference" },
      ],
    },
    {
      name: "Mentorship",
      href: "/mentorship",
      children: [
        { name: "Mentorship Program", href: "/mentorship", description: "Learn about our mentorship program" },
        { name: "Meet our Mentors", href: "/mentorship/mentors", description: "View our mentor team" },
        { name: "Become a Mentee", href: "/mentorship/mentee", description: "Apply to join the program" },
      ],
    },
    {
      name: "Media",
      href: "/media",
      children: [
        { name: "Podcasts", href: "/media/podcasts", description: "Listen to women in tech stories" },
        { name: "Newsletters", href: "/media/newsletters", description: "Subscribe to our monthly newsletter" },
        { name: "In the Press", href: "/media/news-and-press", description: "Media coverage and press releases" },
        { name: "Photo Gallery", href: "/media/photo-gallery", description: "Event highlights and moments" },
      ],
    },
  ],
  cta: [
    { name: "Contact Us", href: "/contact", variant: "ghost" as const },
    { name: "Donate", href: "/donate", variant: "default" as const },
  ],
};

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-dark to-periwinkle-dark bg-clip-text text-transparent">
            She Sharp
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigation.main.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {child.name}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {child.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className={navigationMenuTriggerStyle()}>
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA Buttons */}
        <div className="ml-auto hidden md:flex items-center space-x-4">
          {navigation.cta.map((item) => (
            <Button
              key={item.name}
              variant={item.variant}
              asChild
              className={item.variant === "default" ? "bg-purple-dark hover:bg-purple-mid" : ""}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="ml-auto md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-6">
              {navigation.main.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="text-lg font-medium text-navy-dark hover:text-purple-dark"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block text-sm text-gray hover:text-purple-dark"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                {navigation.cta.map((item) => (
                  <Button
                    key={item.name}
                    variant={item.variant}
                    asChild
                    className={cn(
                      "w-full",
                      item.variant === "default" ? "bg-purple-dark hover:bg-purple-mid" : ""
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}