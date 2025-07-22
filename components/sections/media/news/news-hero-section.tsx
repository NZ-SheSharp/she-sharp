import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import Image from "next/image";

export function NewsHeroSection() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/64bf08cc3a29647e83a879ed_in-the-press%20(1).png"
          alt="A woman holding awards"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-dark/80 to-transparent" />
      </div>
      <Container className="relative z-10">
        <div className="py-24 md:py-32">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            She Sharp
          </h1>
          <h2 className="text-5xl font-bold text-white mt-2 sm:text-6xl md:text-7xl">
            News and Press
          </h2>
        </div>
      </Container>
    </Section>
  );
}