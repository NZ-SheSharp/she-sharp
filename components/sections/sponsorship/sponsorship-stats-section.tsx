import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const stats = [
  {
    number: "95+",
    label: "Attendees per event"
  },
  {
    number: "8",
    label: "Events per year"
  },
  {
    number: "80+",
    label: "Events held since 2014"
  }
];

export function SponsorshipStatsSection() {
  return (
    <Section className="py-16 bg-purple-light">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-5xl font-bold text-purple-dark mb-2">
                {stat.number}
              </div>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}