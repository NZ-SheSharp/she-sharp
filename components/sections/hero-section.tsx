"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <Carousel
          className="w-full h-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full">
                  <AspectRatio ratio={16 / 9} className="h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </AspectRatio>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/40 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 sm:left-4 h-10 w-10 sm:h-12 sm:w-12 bg-white/30 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/50 hover:border-white/60 transition-all duration-200 z-20" />
          <CarouselNext className="right-2 sm:right-4 h-10 w-10 sm:h-12 sm:w-12 bg-white/30 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/50 hover:border-white/60 transition-all duration-200 z-20" />
        </Carousel>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-dark/20 via-transparent to-periwinkle-dark/20" />,

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