import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

export function SponsorshipHeroSection() {
  return (
    <Section className="pt-8 pb-16 md:pt-12 md:pb-24">
      <Container>
        <div className="space-y-8">

          {/* Limited Time Alert */}
          <Alert className="bg-periwinkle-light border-periwinkle-dark/20 max-w-2xl">
            <Sparkles className="h-4 w-4 text-periwinkle-dark" />
            <AlertDescription className="text-navy-dark">
              <strong>Limited Opportunity:</strong> Only 3 Platinum sponsorship spots remaining for our 2025 Annual Gala!
              <Link href="#packages" className="ml-2 underline font-medium text-purple-dark hover:text-purple-mid">
                View packages
              </Link>
            </AlertDescription>
          </Alert>

          {/* Main Content */}
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy-dark">
              Partner with Purpose
            </h1>
            <p className="text-xl md:text-2xl text-gray leading-relaxed">
              Join leading organizations in empowering women in STEM through strategic corporate partnerships that drive real change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-purple-dark hover:bg-purple-mid text-white" asChild>
                <Link href="#packages">
                  Explore Partnership Options
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-purple-dark text-purple-dark hover:bg-purple-light" asChild>
                <a href="/docs/sponsorship-guide-2025.pdf" download>
                  <Calendar className="mr-2 h-4 w-4" />
                  Download 2025 Guide
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}