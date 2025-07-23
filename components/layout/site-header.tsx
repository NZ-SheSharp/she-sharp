"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { navigationConfig } from "@/lib/navigation-config";
import "./navigation-styles.css";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileMenus, setOpenMobileMenus] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = (title: string) => {
    setOpenMobileMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300",
      scrolled 
        ? "border-purple-light/30 bg-white/95 shadow-sm" 
        : "border-purple-light/20 bg-gradient-to-r from-white via-purple-light/5 to-white supports-[backdrop-filter]:bg-white/95"
    )}>
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="mr-8 flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-dark to-periwinkle-dark bg-clip-text text-transparent logo-shimmer">
            She Sharp
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navigationConfig.items.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-purple-light/30 hover:text-purple-dark data-[state=open]:bg-purple-light/30 data-[state=open]:text-purple-dark transition-all duration-200 nav-item-underline">
                      <span className="flex items-center gap-1">
                        {item.title}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="nav-dropdown-enter nav-dropdown-enter-active">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all hover:bg-purple-light/50 hover:text-purple-dark focus:bg-purple-light/50 focus:text-purple-dark group"
                              >
                                <div className="flex items-center gap-2">
                                  {child.icon && (
                                    <child.icon className="h-4 w-4 text-purple-dark/70 group-hover:text-purple-dark transition-colors" />
                                  )}
                                  <div className="text-sm font-medium leading-none">
                                    {child.title}
                                  </div>
                                </div>
                                {child.description && (
                                  <p className="line-clamp-2 text-sm leading-snug text-gray">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link 
                      href={item.href} 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-purple-light/30 hover:text-purple-dark transition-all duration-200 nav-item-underline"
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA Buttons */}
        <div className="ml-auto hidden lg:flex items-center gap-3">
          {navigationConfig.buttons.map((button) => (
            <Button
              key={button.title}
              variant={button.variant}
              asChild
              className={cn(
                "transition-all duration-200 cta-button-glow",
                button.variant === "default" 
                  ? "bg-gradient-to-r from-purple-dark to-periwinkle-dark hover:opacity-90 text-white shadow-md hover:shadow-lg" 
                  : "border-2 border-purple-dark text-purple-dark hover:bg-purple-light hover:border-purple-mid"
              )}
            >
              <Link href={button.href}>{button.title}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="ml-auto lg:hidden">
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
          <SheetContent 
            side="right" 
            className="w-[300px] sm:w-[400px] p-0 overflow-y-auto"
          >
            {/* Mobile Header */}
            <div className="bg-gradient-to-r from-purple-dark to-periwinkle-dark p-6">
              <SheetTitle className="text-white text-xl">Menu</SheetTitle>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="flex flex-col p-6">
              {navigationConfig.items.map((item, index) => (
                <div 
                  key={item.title} 
                  className="border-b border-purple-light/20 last:border-0 mobile-menu-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.children ? (
                    <Collapsible
                      open={openMobileMenus.includes(item.title)}
                      onOpenChange={() => toggleMobileMenu(item.title)}
                    >
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-navy-dark hover:text-purple-dark transition-colors">
                        <span className="flex items-center gap-2">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          {item.title}
                        </span>
                        <ChevronDown 
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openMobileMenus.includes(item.title) && "rotate-180"
                          )}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pb-4">
                        <div className="ml-6 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className="flex items-center gap-2 py-2 text-sm text-gray hover:text-purple-dark transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.icon && <child.icon className="h-3 w-3" />}
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 py-4 text-base font-medium text-navy-dark hover:text-purple-dark transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="mt-6 space-y-3">
                {navigationConfig.buttons.map((button) => (
                  <Button
                    key={button.title}
                    variant={button.variant}
                    asChild
                    className={cn(
                      "w-full transition-all duration-200",
                      button.variant === "default" 
                        ? "bg-gradient-to-r from-purple-dark to-periwinkle-dark hover:opacity-90 text-white shadow-md" 
                        : "border-2 border-purple-dark text-purple-dark hover:bg-purple-light hover:border-purple-mid"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={button.href}>{button.title}</Link>
                  </Button>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation Underline Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </header>
  );
}