import { AboutHeroSection } from "@/components/sections/about/about-hero-section";
import { TeamSection } from "@/components/sections/about/team-section";
import { VolunteerSection } from "@/components/sections/about/volunteer-section";
import { AboutCTASection } from "@/components/sections/about/about-cta-section";

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <TeamSection />
      <VolunteerSection />
      <AboutCTASection />
    </>
  );
}