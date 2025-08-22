"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import GridDistortion from "@/components/effects/grid-distortion";

const heroImages = [
  {
    src: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    alt: "She Sharp networking event with women in tech",
    caption: "THRIVE: Your Career, Your Story",
  },
  {
    src: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    alt: "Women participating in tech workshop",
    caption: "Hands-on Technical Workshops",
  },
  {
    src: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    alt: "Mentorship session at She Sharp",
    caption: "1-on-1 Mentorship Programs",
  },
  {
    src: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    alt: "She Sharp community gathering",
    caption: "Building a Supportive Community",
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Grid Distortion */}
      <div className="absolute inset-0">
        <GridDistortion
          imageSrc={heroImages[0].src}
          grid={12}
          mouse={0.12}
          strength={0.18}
          relaxation={0.85}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/40 to-transparent pointer-events-none" />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-dark/20 via-transparent to-periwinkle-dark/20 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-12 animate-fade-in-up leading-tight">
            CONNECTING{" "}
            <span className="bg-gradient-to-r from-purple-light to-periwinkle-light bg-clip-text text-transparent">
              women in technology
            </span>
          </h1>

          {/* CTA Button */}
          <div className="animate-fade-in-up animation-delay-200">
            <Button
              size="lg"
              asChild
              className="bg-purple-dark hover:bg-purple-mid text-white shadow-lg px-8 py-6 text-lg"
            >
              <Link href="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}