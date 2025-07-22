import { MenteeHeroSection } from "@/components/sections/mentorship/mentee/mentee-hero-section";
import { MenteeCallToActionSection } from "@/components/sections/mentorship/mentee/mentee-call-to-action-section";
import { MenteeResponsibilitiesSection } from "@/components/sections/mentorship/mentee/mentee-responsibilities-section";
import { MenteeBenefitsSection } from "@/components/sections/mentorship/mentee/mentee-benefits-section";
import { MenteeTestimonialsSection } from "@/components/sections/mentorship/mentee/mentee-testimonials-section";
import { BecomeMenteeCTASection } from "@/components/sections/mentorship/mentee/become-mentee-cta-section";
import { MenteeCTASection } from "@/components/sections/mentorship/mentee/mentee-cta-section";

export default function BecomeMenteePage() {
  return (
    <>
      <MenteeHeroSection />
      <MenteeCallToActionSection />
      <MenteeResponsibilitiesSection />
      <MenteeBenefitsSection />
      <MenteeTestimonialsSection />
      <BecomeMenteeCTASection />
      <MenteeCTASection />
    </>
  );
}