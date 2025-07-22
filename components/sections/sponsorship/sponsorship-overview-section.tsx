import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import Image from "next/image";

export function SponsorshipOverviewSection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/66e53bf5807e91c5b0ebff7a_For%20Sponsors%20Photo3.png"
              alt="Two She Sharp ambassadors laughing"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-navy mb-6">
              Partner with us to design events that connect, inspire, and empower
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                As a nonprofit, our work isn&apos;t possible without our sponsors. 
                Some of New Zealand&apos;s leading organisations support She Sharp by 
                showcasing role models in STEM, providing networking opportunities, 
                and supporting women into employment.
              </p>
              <p>
                As a She Sharp Sponsor, we&apos;ll work with you to create an event 
                that engages and inspires the next generation of women in tech.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}