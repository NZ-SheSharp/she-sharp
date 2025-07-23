import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Image from "next/image";

export function MentorsHeroSection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-periwinkle-light via-mint-light to-purple-light">
      <Container>
        <div className="pt-24 pb-16 md:pb-24">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Programs", href: "/events" },
              { label: "Mentorship Program", href: "/mentorship" },
              { label: "Meet our Mentors" }
            ]}
          />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-navy">
                MEET OUR
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-purple-dark mt-2">
                MENTORS
              </h2>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/66e7d5949572369a9275a42c_IMG_9884.jpg"
                alt="She Sharp mentors group photo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}