import { NewslettersHeroSection } from "@/components/sections/media/newsletters/newsletters-hero-section";
import { NewsletterPreviewSection } from "@/components/sections/media/newsletters/newsletter-preview-section";
import { NewslettersGridSection } from "@/components/sections/media/newsletters/newsletters-grid-section";
import { SmartCTASection } from "@/components/sections/shared/smart-cta-section";

export default function NewslettersPage() {
  return (
    <>
      <NewslettersHeroSection />
      <NewsletterPreviewSection />
      <NewslettersGridSection />
      <SmartCTASection title="Stay Connected" bgColor="accent" />
    </>
  );
}