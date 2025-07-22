import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const sponsors = {
  silver: [
    { name: "HCLTech", logo: "HCLTech" },
    { name: "Fonterra", logo: "Fonterra" },
  ],
  bronze: [
    { name: "MYOB", logo: "MYOB" },
    { name: "Fiserv", logo: "Fiserv" },
    { name: "FlexWare", logo: "FlexWare" },
  ],
};

export function SponsorsSection() {
  return (
    <Section bgColor="light">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Our sponsors
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Thank you to the following companies for their support in empowering women in tech
          </p>
        </div>

        {/* Silver Sponsors */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <Badge variant="secondary" className="text-base px-4 py-1">
              SILVER
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {sponsors.silver.map((sponsor) => (
              <div
                key={sponsor.name}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32"
              >
                <span className="text-2xl font-semibold text-gray">
                  {sponsor.logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bronze Sponsors */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <Badge variant="outline" className="text-base px-4 py-1">
              BRONZE
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sponsors.bronze.map((sponsor) => (
              <div
                key={sponsor.name}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-24"
              >
                <span className="text-xl font-semibold text-gray">
                  {sponsor.logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-purple-dark text-purple-dark hover:bg-purple-light"
          >
            <Link href="/sponsors/corporate">Become a sponsor</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}