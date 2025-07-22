import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function SponsorshipPackagesSection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-8">
            Interested in becoming a sponsor?
          </h2>
          <Button 
            asChild 
            size="lg" 
            className="bg-purple-dark hover:bg-purple-mid"
          >
            <a 
              href="https://www.canva.com/design/DAGWHRmz_Ic/Pf0d0otpCH5YqLXscgiJwA/view?utm_content=DAGWHRmz_Ic&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h17df57e36c" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Check out our sponsorship packages
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}