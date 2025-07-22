"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-light via-white to-periwinkle-light" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239b2e83' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-mint-light text-navy-dark text-sm font-medium">
              🎉 Our next event: THRIVE: Your Career, Your Story
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-navy-dark mb-6">
            CONNECTING{" "}
            <span className="bg-gradient-to-r from-purple-dark to-periwinkle-dark bg-clip-text text-transparent">
              women in technology
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray mb-8 max-w-2xl mx-auto">
            She Sharp is on a mission to bridge the gender gap in STEM, one woman at a time. Through events, networking, and career development opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-purple-dark hover:bg-purple-mid text-white"
            >
              <Link href="/events">Explore Events</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-purple-dark text-purple-dark hover:bg-purple-light"
            >
              <Link href="/join">Join Our Team</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-dark">2200+</div>
              <div className="text-sm text-gray mt-1">She Sharp Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-dark">50+</div>
              <div className="text-sm text-gray mt-1">She Sharp Sponsors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-dark">84+</div>
              <div className="text-sm text-gray mt-1">Events Since 2014</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}