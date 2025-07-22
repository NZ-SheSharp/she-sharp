import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function BecomeMentorCTASection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-8">
            INTERESTED IN BECOMING A MENTOR?
          </h2>
          <Button 
            asChild 
            size="lg" 
            className="bg-purple-dark hover:bg-purple-mid"
          >
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSd00tgJNa8BQM8wVtLHz7We_AQ1zRT0yVYcFP_hZlpwEVAHlQ/viewform?usp=sf_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Become a mentor
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}