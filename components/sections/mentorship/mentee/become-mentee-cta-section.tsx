import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function BecomeMenteeCTASection() {
  return (
    <Section className="py-16 bg-purple-light">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-8">
            INTERESTED IN BECOMING A MENTEE?
          </h2>
          <Button 
            asChild 
            size="lg" 
            className="bg-purple-dark hover:bg-purple-mid"
          >
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeiNe0btTXNLsJeIsMape05630fK1SLdldO9Ty3x8QbLd6B6w/viewform?usp=sf_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Become a Mentee
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}