"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Sparkles, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MentorshipHeroSection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-light/20 to-periwinkle-light/30 dark:from-gray-950 dark:via-purple-dark/10 dark:to-periwinkle-dark/10">
      <Container>
        <div className="py-16 md:py-24">
          {/* Title and CTA */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-mint-dark/10 text-navy dark:text-mint-dark border-mint-dark">
              <Sparkles className="w-3 h-3 mr-1" />
              Applications Open for 2025
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy dark:text-white mb-4">
              MENTORSHIP
              <span className="block text-purple-dark dark:text-purple-mid">PROGRAM</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Connect with industry leaders, accelerate your career, and join a community of ambitious women in STEM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purple-dark hover:bg-purple-mid text-white">
                <Link href="/mentorship/mentee">
                  Become a Mentee
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-purple-dark text-purple-dark hover:bg-purple-light dark:border-purple-mid dark:text-purple-mid">
                <Link href="/mentorship/mentors">
                  View Our Mentors
                  <Users className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Main Feature Image */}
            <Card className="md:col-span-2 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <AspectRatio ratio={16/9}>
                <Image
                  src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/66e7d7cc73eab74f369d96ef_IMG_9874.jpg"
                  alt="Mentorship program participants in discussion"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Empowering Connections</h3>
                  <p className="text-white/90">Join 500+ women who've transformed their careers through mentorship</p>
                </div>
              </AspectRatio>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-rows-2 gap-4 md:gap-6">
              <Card className="p-6 bg-periwinkle-light/50 dark:bg-periwinkle-dark/10 border-periwinkle-dark/20">
                <Target className="w-8 h-8 text-periwinkle-dark mb-3" />
                <h3 className="text-3xl font-bold text-navy dark:text-white mb-1">92%</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Career Goal Achievement Rate</p>
              </Card>
              
              <Card className="p-6 bg-mint-light dark:bg-mint-dark/10 border-mint-dark/20">
                <Users className="w-8 h-8 text-navy dark:text-mint-dark mb-3" />
                <h3 className="text-3xl font-bold text-navy dark:text-white mb-1">150+</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expert Mentors Across Industries</p>
              </Card>
            </div>

            {/* Additional Images */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <AspectRatio ratio={1}>
                <Image
                  src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/646ab8dbe8c4bea2dd13ee84_about1.jpg"
                  alt="Mentor and mentee collaboration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <AspectRatio ratio={1}>
                <Image
                  src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/646ab8db33f08b7bb4e87f84_about3.jpg"
                  alt="Mentorship workshop session"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <AspectRatio ratio={1}>
                <Image
                  src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/646ab8dac596bb8dc8667bc6_about2.jpg"
                  alt="Networking event"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}