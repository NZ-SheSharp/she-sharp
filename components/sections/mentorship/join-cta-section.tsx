import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function JoinCTASection() {
  return (
    <Section className="py-16 bg-purple-light">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-8">
            Interested in joining?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="bg-white text-purple-dark border-purple-dark hover:bg-purple-mid hover:text-white hover:border-purple-mid">
              <Link href="/mentorship/mentors">
                Learn more about our mentors
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-purple-dark hover:bg-purple-mid">
              <Link href="/mentorship/mentee">
                Learn more about becoming a mentee
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}