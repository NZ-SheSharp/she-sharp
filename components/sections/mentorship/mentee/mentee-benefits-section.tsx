import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const benefits = [
  {
    icon: "🎯",
    title: "Personalised direction and evaluation",
    description: "Get personalised guidance and feedback from your mentor, tailored to your specific needs and goals."
  },
  {
    icon: "🧭",
    title: "Navigate your growth",
    description: "Identify your strengths and areas for improvement, guiding you towards becoming the best version of yourself."
  },
  {
    icon: "🚀",
    title: "Opportunities for career growth",
    description: "Seize the opportunity to advance in your professional journey and confidently achieve your career goals."
  }
];

export function MenteeBenefitsSection() {
  return (
    <Section className="py-16 bg-periwinkle-light">
      <Container>
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          BENEFITS OF BECOMING A MENTEE
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-navy mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}