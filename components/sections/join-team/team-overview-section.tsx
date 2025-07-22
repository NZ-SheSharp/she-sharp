import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import Image from "next/image";

export function TeamOverviewSection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/66e53b454b537205d48785f7_Join%20Our%20Team%20Photo1.png"
              alt="She Sharp volunteers and ambassadors"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">
              She Sharp is a nonprofit run entirely by Volunteers and Ambassadors
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Everything that happens behind the scenes is all thanks to a 
                passionate group of people who want to see more women in STEM.
              </p>
              <p>
                Our team is made up of students and professionals in the industry 
                who dedicate their time to collaborate with our corporate sponsors, 
                organise and run events, and make sure everything we&apos;re doing at 
                She Sharp is making an impact.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}