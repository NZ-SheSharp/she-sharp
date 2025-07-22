import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function EventsSection() {
  return (
    <Section bgColor="white">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">
              Events that connect, engage, and inspire
            </h2>
            <p className="text-lg text-gray">
              Keynote speakers, panels, workshops, networking events, hackathons and more! 
              Whether you're in school, university or a young professional, our events are 
              designed to be inclusive, interactive and fun—come along and see for yourself.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-purple-dark hover:bg-purple-mid"
            >
              <Link href="/events">Explore She Sharp events</Link>
            </Button>
          </div>

          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-periwinkle-light to-mint-light order-1 md:order-2">
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-periwinkle-dark/20 text-6xl">Event Image</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}