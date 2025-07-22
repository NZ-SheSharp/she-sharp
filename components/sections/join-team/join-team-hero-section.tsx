import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import Image from "next/image";

export function JoinTeamHeroSection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-purple-light to-periwinkle-light">
      <Container>
        <div className="py-16 md:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl mb-12">
            Join the sharpest team on the block
          </h1>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/64863e7324d1d65cc87fe0ff_Join%20Our%20Team_1.png"
              alt="She Sharp team members at an event"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}