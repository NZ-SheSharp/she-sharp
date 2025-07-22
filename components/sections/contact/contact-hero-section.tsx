import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function ContactHeroSection() {
  return (
    <Section className="bg-gradient-to-r from-purple-light to-periwinkle-light py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Let&apos;s Connect
          </h1>
          <p className="mt-4 text-2xl text-purple-dark">
            Say hello to get the ball rolling
          </p>
          <p className="mt-6 text-lg text-gray-700">
            From questions about our events and how we make an impact to featuring 
            us in the media, we&apos;d love to hear from you!
          </p>
        </div>
      </Container>
    </Section>
  );
}