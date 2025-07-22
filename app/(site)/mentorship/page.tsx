import { MentorshipHeroSection } from "@/components/sections/mentorship/mentorship-hero-section";
import { ProgramOverviewSection } from "@/components/sections/mentorship/program-overview-section";
import { StatsSection } from "@/components/sections/mentorship/stats-section";
import { TestimonialsSection } from "@/components/sections/mentorship/testimonials-section";
import { HowItWorksSection } from "@/components/sections/mentorship/how-it-works-section";
import { MentorsPreviewSection } from "@/components/sections/mentorship/mentors-preview-section";
import { BenefitsSection } from "@/components/sections/mentorship/benefits-section";
import { IndustryLogosSection } from "@/components/sections/mentorship/industry-logos-section";
import { JoinCTASection } from "@/components/sections/mentorship/join-cta-section";
import { MentorshipCTASection } from "@/components/sections/mentorship/mentorship-cta-section";

export default function MentorshipPage() {
  return (
    <>
      <MentorshipHeroSection />
      <ProgramOverviewSection />
      <StatsSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <MentorsPreviewSection />
      <BenefitsSection />
      <IndustryLogosSection />
      <JoinCTASection />
      <MentorshipCTASection />
    </>
  );
}