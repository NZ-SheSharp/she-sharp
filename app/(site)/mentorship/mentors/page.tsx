import { MentorsHeroSection } from "@/components/sections/mentorship/mentors/mentors-hero-section";
import { MentorsCallToActionSection } from "@/components/sections/mentorship/mentors/mentors-call-to-action-section";
import { MentorsListSection } from "@/components/sections/mentorship/mentors/mentors-list-section";
import { MentorResponsibilitiesSection } from "@/components/sections/mentorship/mentors/mentor-responsibilities-section";
import { MentorBenefitsSection } from "@/components/sections/mentorship/mentors/mentor-benefits-section";
import { BecomeMentorCTASection } from "@/components/sections/mentorship/mentors/become-mentor-cta-section";
import { MentorsCTASection } from "@/components/sections/mentorship/mentors/mentors-cta-section";

export default function MeetOurMentorsPage() {
  return (
    <>
      <MentorsHeroSection />
      <MentorsCallToActionSection />
      <MentorsListSection />
      <MentorResponsibilitiesSection />
      <MentorBenefitsSection />
      <BecomeMentorCTASection />
      <MentorsCTASection />
    </>
  );
}