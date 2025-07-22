import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function MenteeCallToActionSection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-6">
            Learn and be inspired by our empowering mentors in STEM
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Gain valuable advice, inspiration, and empowerment from our amazing 
            mentors in STEM to support your personal and professional development 
            journey.
          </p>
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