import { ContactHeroSection } from "@/components/sections/contact/contact-hero-section";
import { ContactFormSection } from "@/components/sections/contact/contact-form-section";
import { SocialMediaSection } from "@/components/sections/contact/social-media-section";
import { ContactCTASection } from "@/components/sections/contact/contact-cta-section";

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactFormSection />
      <SocialMediaSection />
      <ContactCTASection />
    </>
  );
}