import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import Image from "next/image";

export function MenteeHeroSection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-mint-light via-purple-light to-periwinkle-light">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 items-center py-16 md:py-24">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-navy">
              BECOME A
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-purple-dark mt-2">
              MENTEE
            </h2>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/66e7d4c72be67f161bddd38d_IMG_9887.jpg"
              alt="She Sharp mentee group photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}