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
import { Badge } from "@/components/ui/badge";

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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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
                  <div className="absolute bottom-8 left-8 z-10">
                    <Badge className="bg-purple-dark text-white">
                      {image.caption}
                    </Badge>
                  </div>
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
          {/* Announcement */}
          <div className="mb-6 sm:mb-8 animate-fade-in-down">
            <Badge className="px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm bg-mint-light/90 backdrop-blur-sm text-navy-dark border-mint-mid">
              🎉 Our next event: THRIVE: Your Career, Your Story
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            CONNECTING{" "}
            <span className="bg-gradient-to-r from-purple-light to-periwinkle-light bg-clip-text text-transparent">
              women in technology
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 px-4">
            She Sharp is on a mission to bridge the gender gap in STEM, one woman at a time. Through events, networking, and career development opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              asChild
              className="bg-purple-dark hover:bg-purple-mid text-white shadow-lg"
            >
              <Link href="/events">Explore Events</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-white bg-white/20 text-white hover:bg-white hover:text-purple-dark backdrop-blur-sm transition-all"
            >
              <Link href="/join">Join Our Team</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">2200+</div>
              <div className="text-xs sm:text-sm text-white/80 mt-1">She Sharp Members</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">50+</div>
              <div className="text-xs sm:text-sm text-white/80 mt-1">She Sharp Sponsors</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">84+</div>
              <div className="text-xs sm:text-sm text-white/80 mt-1">Events Since 2014</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}