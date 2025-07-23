"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { footerConfig } from "@/lib/footer-config";
import { socialIcons } from "@/components/ui/social-icons";
import "./footer-styles.css";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setNewsletterStatus("success");
      setEmail("");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <footer className="relative bg-gradient-to-b from-navy-dark to-[#1a1939] text-white mt-20 overflow-hidden">
      {/* Wave Decoration */}
      <div className="footer-wave" />
      
      {/* Background Pattern */}
      <div className="footer-pattern" />

      <div className="relative container px-4 py-16 md:px-6">
        {/* Top Section - Stats & Newsletter */}
        <div className="mb-16">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12 text-center">
            {footerConfig.stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-mid to-periwinkle-dark bg-clip-text text-transparent stat-number">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-mint-dark bg-clip-text text-transparent">
              Stay Connected with She Sharp
            </h3>
            <p className="text-white/80 mb-6">
              Get the latest updates on events, mentorship opportunities, and inspiring stories.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-mid newsletter-input"
                />
              </div>
              <Button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="bg-gradient-to-r from-purple-dark to-periwinkle-dark hover:opacity-90 text-white shadow-lg cta-button-pulse"
              >
                {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {newsletterStatus === "success" && (
              <p className="mt-3 text-mint-dark">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        <div className="gradient-separator mb-12" />

        {/* Main Content Grid */}
        <div className="grid gap-12 mb-12">
          {/* Desktop Links */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-8">
            {footerConfig.sections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4 text-mint-dark">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/80 hover:text-purple-mid transition-colors footer-link"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Accordion */}
          <div className="lg:hidden space-y-4">
            {footerConfig.sections.map((section) => (
              <Collapsible
                key={section.title}
                open={openSections.includes(section.title)}
                onOpenChange={() => toggleSection(section.title)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-left">
                  <h4 className="font-semibold text-mint-dark">{section.title}</h4>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openSections.includes(section.title) && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="footer-accordion-content">
                  <div className="pb-4">
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm text-white/80 hover:text-purple-mid transition-colors block py-1"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h4 className="font-semibold mb-6 text-mint-dark">Connect With Us</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {footerConfig.socialLinks.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="gradient-separator mb-8" />

        {/* Bottom Section */}
        <div className="space-y-6">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {footerConfig.legalLinks.map((link, index) => (
              <div key={link.name} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-purple-mid transition-colors legal-link"
                >
                  {link.name}
                </Link>
                {index < footerConfig.legalLinks.length - 1 && (
                  <span className="mx-2 text-white/30">•</span>
                )}
              </div>
            ))}
          </div>

          {/* Copyright & Charity Info */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold bg-gradient-to-r from-purple-mid to-periwinkle-dark bg-clip-text text-transparent">
                {footerConfig.charityInfo.name}
              </span>
              <span className="text-white/40">|</span>
              <Link
                href={footerConfig.charityInfo.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-mid transition-colors flex items-center gap-1"
              >
                Registered NZ Charity #{footerConfig.charityInfo.registrationNumber}
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            <div>
              © {new Date().getFullYear()} She Sharp. All rights reserved.
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-8">
            <p className="text-white/80 mb-4">
              Ready to join our community of women in STEM?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                variant="outline"
                className="border-purple-mid text-purple-mid hover:bg-purple-mid hover:text-white"
              >
                <Link href="/events">Explore Events</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-dark to-periwinkle-dark hover:opacity-90"
              >
                <Link href="/support/donate">Support Our Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}