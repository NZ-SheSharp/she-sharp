import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const benefits = [
  {
    icon: "💝",
    title: "Personal Fulfillment",
    description: "Find satisfaction in witnessing the growth and success of your mentee. Knowing you've played a part in their journey is genuinely rewarding."
  },
  {
    icon: "🌟",
    title: "Leave a positive mark",
    description: "Leave behind a positive impact that lasts long after your interactions. It's about making a difference, one mentee at a time!"
  },
  {
    icon: "📈",
    title: "Grow as you guide",
    description: "Develop strong leadership and communication abilities as you support your mentee. It's a win-win: they flourish, and you thrive right alongside them."
  }
];

export function MentorBenefitsSection() {
  return (
    <Section className="py-16 bg-purple-light">
      <Container>
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          BENEFITS OF BECOMING A MENTOR
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