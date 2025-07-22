import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function VolunteerSection() {
  return (
    <Section className="bg-purple-light py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-navy">
            A Nonprofit Run Entirely by Volunteers
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Interested in joining our team as an ambassador or volunteer?
          </p>
          <p className="mt-6 text-gray-600">
            A lot happens behind the scenes at She Sharp, and it&apos;s all thanks to 
            a passionate group of people who want to see more women in STEM. 
            We&apos;re always looking for volunteers to make sure our events are fun, 
            engaging and inspiring!
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-purple-dark hover:bg-purple-mid">
              <Link href="/join-our-team">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}