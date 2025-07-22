import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import Image from "next/image";

export function SponsorshipHeroSection() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/6493c3be364df2c49f2786f1_Donate_2.webp"
          alt="She Sharp event attendees"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-purple-dark/60" />
      </div>
      <Container className="relative z-10">
        <div className="py-24 md:py-32">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Support the future of women in STEM
          </h1>
        </div>
      </Container>
    </Section>
  );
}