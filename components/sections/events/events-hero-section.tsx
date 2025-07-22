import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function EventsHeroSection() {
  return (
    <Section className="bg-gradient-to-r from-periwinkle-light to-mint-light py-20">
      <Container>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            She Sharp
          </h1>
          <p className="mt-4 text-2xl font-semibold text-purple-dark">
            JOIN OUR NEXT EVENT
          </p>
        </div>
      </Container>
    </Section>
  );
}