import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const benefits = [
  {
    icon: "🎯",
    title: "Pathway for personal development",
    description: "Whether you join as a mentor or mentee, this is an additional opportunity for personal and professional development."
  },
  {
    icon: "💡",
    title: "Increase knowledge share",
    description: "The mentorship program serves as a platform for promoting collaborative learning and exploring new perspectives together."
  },
  {
    icon: "🤝",
    title: "Supportive community",
    description: "With our pool of supportive mentors, you'll get professional guidance, provided valuable advice and support along the way."
  }
];

export function BenefitsSection() {
  return (
    <Section className="py-16 bg-periwinkle-light">
      <Container>
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          BENEFITS OF JOINING THE MENTORSHIP PROGRAM
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