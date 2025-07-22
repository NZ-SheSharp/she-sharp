import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import Image from "next/image";

export function MentorshipHeroSection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-purple-light via-periwinkle-light to-mint-light">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 items-center py-16 md:py-24">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-navy">
              MENTORSHIP
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-purple-dark mt-2">
              PROGRAM
            </h2>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/66e7d7cc73eab74f369d96ef_IMG_9874.jpg"
              alt="Mentorship program participants"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}