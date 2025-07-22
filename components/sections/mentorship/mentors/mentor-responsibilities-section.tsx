import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const responsibilities = [
  "Stay dedicated to mentoring and initiate contact with your mentee regularly.",
  "Help mentee in figuring out and setting their goals.",
  "Listen to what your mentee needs, rather than just pushing your own thoughts.",
  "Don't hesitate to give constructive feedback.",
  "Encourage mentee to nurture their independent thinking skills.",
  "Follow through on the plans and actions you've mutually agreed upon with your mentee.",
  "Foster growth and celebrate achievements."
];

export function MentorResponsibilitiesSection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/66e7d6d1507e385502912e7f_IMG_9898.jpg"
              alt="Mentorship meeting"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">
              What it means to be A MENTOR
            </h2>
            <p className="text-gray-700 mb-6">
              As a mentor, you are expected to fulfill the following responsibilities 
              to ensure successful mentoring:
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
                href="https://forms.gle/msvCzw3qevVnPRvv7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Become a mentor
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}