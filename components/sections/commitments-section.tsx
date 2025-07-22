import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Users, Lightbulb, Rocket } from "lucide-react";

const commitments = [
  {
    title: "Connection",
    description: "We've built a network where women can meet and connect with like-minded peers.",
    icon: Users,
    color: "text-purple-dark",
    bgColor: "bg-purple-light/10",
  },
  {
    title: "Inspiration",
    description: "We showcase careers and role models in STEM from different sectors and disciplines.",
    icon: Lightbulb,
    color: "text-periwinkle-dark",
    bgColor: "bg-periwinkle-light",
  },
  {
    title: "Empowerment",
    description: "We make careers in STEM for women possible through mentorship, networking and more.",
    icon: Rocket,
    color: "text-mint-dark",
    bgColor: "bg-mint-light",
  },
];

export function CommitmentsSection() {
  return (
    <Section bgColor="light">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Our commitments
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Through three core commitments, we are dedicated to creating a better future for women in tech
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {commitments.map((commitment) => {
            const Icon = commitment.icon;
            return (
              <Card key={commitment.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <div className={`inline-flex p-4 rounded-full ${commitment.bgColor} mb-4`}>
                    <Icon className={`w-8 h-8 ${commitment.color}`} />
                  </div>
                  <CardTitle className="text-xl">{commitment.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {commitment.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}