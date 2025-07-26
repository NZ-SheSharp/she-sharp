import { MenteeHeroSection } from "@/components/sections/mentorship/mentee/mentee-hero-section";
import { MenteeCallToActionSection } from "@/components/sections/mentorship/mentee/mentee-call-to-action-section";
import { MenteeGrowthPathSection } from "@/components/sections/mentorship/mentee/mentee-growth-path-section";
import { MenteeSuccessMetricsSection } from "@/components/sections/mentorship/mentee/mentee-success-metrics-section";
import { MenteeBenefitsSection } from "@/components/sections/mentorship/mentee/mentee-benefits-section";
import { PageTestimonialsSection } from "@/components/sections/shared/page-testimonials-section";
import { SmartCTASection } from "@/components/sections/shared/smart-cta-section";

export default function BecomeMenteePage() {
  return (
    <>
      <MenteeHeroSection />
      <MenteeCallToActionSection />
      <MenteeGrowthPathSection />
      <MenteeSuccessMetricsSection />
      <MenteeBenefitsSection />
      <PageTestimonialsSection 
        title="Success Stories from Our Mentees"
        subtitle="Real stories of transformation and growth through mentorship"
        pageKey="mentorship"
      />
      <SmartCTASection title="Take the Next Step" />
    </>
  );
}