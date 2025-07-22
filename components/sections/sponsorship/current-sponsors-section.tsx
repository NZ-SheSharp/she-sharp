import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const sponsors = {
  silver: [
    {
      name: "HCLTech",
      logo: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/6470185f85072710b161d610_hcltech-logo.svg"
    },
    {
      name: "Fonterra",
      logo: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/65e50fc6d2f01ad68fb15688_fonterra.png"
    }
  ],
  bronze: [
    {
      name: "MYOB",
      logo: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/64701860f27305f34ecc8b66_myob-logo.svg"
    },
    {
      name: "Fisher & Paykel Healthcare",
      logo: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/65d80a4331c46a8a017e669f_PNG%20-%20for%20web%2C%20video%2C%20%26%20MS%20Office_F%26P_HEALTHCARE-BLACK.png"
    },
    {
      name: "FlexWare",
      logo: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/64701860e14f0a2ee9a10f8a_flexware-logo.svg"
    }
  ]
};

export function CurrentSponsorsSection() {
  return (
    <Section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-xl font-semibold text-navy text-center mb-12">
          OUR SPONSORS
        </h2>
        
        {/* Silver Sponsors */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-600 text-center mb-8">
            SILVER
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {sponsors.silver.map((sponsor) => (
              <div key={sponsor.name} className="relative h-12 w-auto">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  height={48}
                  width={200}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bronze Sponsors */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-600 text-center mb-8">
            BRONZE
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {sponsors.bronze.map((sponsor) => (
              <div key={sponsor.name} className="relative h-12 w-auto">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  height={48}
                  width={200}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-purple-dark hover:bg-purple-mid">
            <Link href="/sponsors/contact">Become a sponsor</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}