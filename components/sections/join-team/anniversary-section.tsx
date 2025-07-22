import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AnniversarySection() {
  return (
    <Section className="py-16 bg-purple-light">
      <Container>
        <Card className="mx-auto max-w-3xl">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-navy mb-4">
              Were you an ambassador with She Sharp? We want to hear from you!
            </h3>
            <p className="text-gray-700 mb-8">
              Sign up to participate in our 10th-anniversary celebrations and 
              reconnect with fellow She Sharp ambassadors.
            </p>
            <Button asChild size="lg" className="bg-purple-dark hover:bg-purple-mid">
              <Link href="/contact">
                Celebrate with us : Register your interest
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}