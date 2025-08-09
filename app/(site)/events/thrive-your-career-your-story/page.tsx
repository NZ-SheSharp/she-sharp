import { ThriveHeroSection } from '@/components/sections/thrive/thrive-hero-section'
import { ThriveOverviewSection } from '@/components/sections/thrive/thrive-overview-section'
import { ThriveDetailsSection } from '@/components/sections/thrive/thrive-details-section'
import { ThriveFeaturesSection } from '@/components/sections/thrive/thrive-features-section'
import { ThriveTestimonialsSection } from '@/components/sections/thrive/thrive-testimonials-section'
import { ThriveGallerySection } from '@/components/sections/thrive/thrive-gallery-section'
import { ThrivePartnersSection } from '@/components/sections/thrive/thrive-partners-section'
import { SmartCTASection } from '@/components/sections/shared/smart-cta-section'

export default function ThriveEventPage() {
  return (
    <>
      <ThriveHeroSection />
      <ThriveOverviewSection />
      <ThriveDetailsSection />
      <ThriveFeaturesSection />
      <ThriveGallerySection />
      <ThriveTestimonialsSection />
      <ThrivePartnersSection />
      <SmartCTASection 
        title="Missed THRIVE?"
      />
    </>
  )
}