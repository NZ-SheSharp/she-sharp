import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const stats = [
  {
    percentage: "85%",
    description: "Feel more empowered after joining a mentorship program"
  },
  {
    percentage: "90%",
    description: "Experienced improvement of their interpersonal skills"
  },
  {
    percentage: "6x more",
    description: "Mentors are likely to be promoted"
  },
  {
    percentage: "5x more",
    description: "Mentees with mentors are likely to be promoted"
  }
];

export function StatsSection() {
  return (
    <Section className="py-16 bg-purple-light">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy uppercase">
            What You Get Out of a Mentorship Program
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Research shows participating in a mentorship program provides valuable 
            benefits for both mentees and mentors.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.percentage} className="text-center">
              <div className="text-4xl font-bold text-purple-dark mb-3">
                {stat.percentage}
              </div>
              <p className="text-gray-700">{stat.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}