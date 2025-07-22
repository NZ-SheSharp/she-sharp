import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const steps = [
  {
    number: "1",
    title: "EXPRESSION OF INTEREST"
  },
  {
    number: "2",
    title: "INDUCTION SESSION"
  },
  {
    number: "3",
    title: "GET PAIRED WITH YOUR MENTOR OR MENTEE"
  },
  {
    number: "4",
    title: "3 COFFEE CATCHUPS"
  },
  {
    number: "5",
    title: "CELEBRATE END OF MENTORSHIP JOURNEY"
  }
];

export function HowItWorksSection() {
  return (
    <Section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          HOW THE PROGRAM WORKS
        </h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-purple-light -translate-y-1/2 hidden lg:block" />
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {steps.map((step) => (
              <div key={step.number} className="text-center relative">
                <div className="w-16 h-16 bg-purple-dark rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 relative z-10">
                  {step.number}
                </div>
                <p className="text-sm font-semibold text-navy uppercase">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}