import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function ProgramOverviewSection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-6">
            Empowering Women in STEM through mentoring
          </h2>
          <p className="text-lg text-gray-700">
            Our mentorship program facilitates supportive relationships between our 
            mentors and mentees. Through sharing knowledge, advice, and encouragement, 
            we help mentees navigate careers, overcome challenges, and achieve 
            interpersonal goals.
          </p>
        </div>
      </Container>
    </Section>
  );
}