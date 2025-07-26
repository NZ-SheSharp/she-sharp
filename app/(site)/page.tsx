import "./hero-animations.css";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { CommitmentsSection } from "@/components/sections/commitments-section";
import { EventsSection } from "@/components/sections/events-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { MediaSection } from "@/components/sections/media-section";
import { SponsorsSection } from "@/components/sections/sponsors-section";
import { SmartCTASection } from "@/components/sections/shared/smart-cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <CommitmentsSection />
      <EventsSection />
      <TestimonialsSection />
      <MediaSection />
      <SponsorsSection />
      <SmartCTASection title="Get Involved" />
    </>
  );
}