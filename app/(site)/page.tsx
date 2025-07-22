import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { CommitmentsSection } from "@/components/sections/commitments-section";
import { EventsSection } from "@/components/sections/events-section";
import { SponsorsSection } from "@/components/sections/sponsors-section";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <CommitmentsSection />
      <EventsSection />
      <SponsorsSection />
      <CTASection />
    </>
  );
}