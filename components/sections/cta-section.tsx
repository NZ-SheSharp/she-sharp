import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heart, Calendar } from "lucide-react";

export function CTASection() {
  return (
    <Section bgColor="accent">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">
            BRIDGE THE GENDER GAP IN STEM WITH US
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Donate Card */}
          <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="inline-flex p-4 rounded-full bg-purple-light mb-4">
                <Heart className="w-8 h-8 text-purple-dark" />
              </div>
              <CardTitle className="text-2xl">Donate to She Sharp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base">
                Help us empower more young women to pursue careers in STEM through events and networking opportunities.
              </CardDescription>
              <Button
                asChild
                size="lg"
                className="w-full bg-purple-dark hover:bg-purple-mid"
              >
                <Link href="/donate">Make a donation</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Events Card */}
          <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="inline-flex p-4 rounded-full bg-mint-light mb-4">
                <Calendar className="w-8 h-8 text-navy-dark" />
              </div>
              <CardTitle className="text-2xl">Come to an event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base">
                Meet new people, network with companies, engage in workshops and learn more about working in STEM!
              </CardDescription>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-purple-dark text-purple-dark hover:bg-purple-light"
              >
                <Link href="/events">Explore Events</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}