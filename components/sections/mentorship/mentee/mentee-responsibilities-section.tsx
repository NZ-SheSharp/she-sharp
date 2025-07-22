import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const responsibilities = [
  "Actively engaging in the mentorship and learning to communicate regularly.",
  "Teaming up with your mentor to pinpoint personal and professional goals, then proactively setting and pursuing them.",
  "Clearly communicating your goals, challenges, and needs to your mentor.",
  "Listening carefully to any advice given to you by your mentor.",
  "Accepting constructive criticism.",
  "Embracing opportunities to think critically.",
  "Striving for growth."
];

export function MenteeResponsibilitiesSection() {
  return (
    <Section className="py-16 bg-gray-50">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">
              What it means to be A MENTEE
            </h2>
            <p className="text-gray-700 mb-6">
              As a mentee, you are expected to fulfill the following responsibilities 
              to ensure a successful mentoring:
            </p>
            <ul className="space-y-3 mb-8">
              {responsibilities.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-dark mt-1 mr-3">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
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
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/66e7d7462e0faf4e732c4cf1_IMG_9889.jpg"
              alt="Mentorship session"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}