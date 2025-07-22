import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function MissionSection() {
  return (
    <Section bgColor="white">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-purple-light to-periwinkle-light">
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-purple-dark/20 text-6xl">Image Placeholder</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">
              She Sharp is on a mission to bridge the gender gap in STEM, one woman at a time
            </h2>
            <p className="text-lg text-gray">
              We're challenging misconceptions about the tech industry and empowering the next generation of women to pursue careers in STEM through events, networking, career development opportunities and more.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-purple-dark text-purple-dark hover:bg-purple-light"
            >
              <Link href="/join">Become a member</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}