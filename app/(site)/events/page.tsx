import { EventsHeroSection } from "@/components/sections/events/events-hero-section";
import { FeaturedEventSection } from "@/components/sections/events/featured-event-section";
import { EventsListSection } from "@/components/sections/events/events-list-section";
import { EventsInfoSection } from "@/components/sections/events/events-info-section";
import { EventsCTASection } from "@/components/sections/events/events-cta-section";

export default function EventsPage() {
  return (
    <>
      <EventsHeroSection />
      <FeaturedEventSection />
      <EventsListSection />
      <EventsInfoSection />
      <EventsCTASection />
    </>
  );
}