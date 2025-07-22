"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "AI Hackathon Festival 2025",
    date: "Friday, August 15, 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/685b930195a2e57635c32a0a_-TechWomenNZ-%20Humanitix%20Event%20Banner%2020%20May%202025.webp",
    href: "/events/ai-hackathon-2025"
  },
  {
    id: 2,
    title: "THRIVE: Your Career, Your Story",
    date: "Wednesday, July 30, 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/685d16184e0d23702c5f2066_THRIVE%20Your%20Career%2C%20%20Your%20Story.jpg",
    href: "/events/thrive-your-career-your-story"
  },
  {
    id: 3,
    title: "Ethnic Advantage Conference",
    date: "Saturday, June 28, 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/684918c467a93421eafe8f3b_unnamed.jpg",
    href: "/events/ethnic-advantage-conference"
  },
  {
    id: 4,
    title: "Tech That Matches Your Vibe: Find Your Perfect Fit",
    date: "Thursday, May 22, 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67fd6ff293328e7d586a0200_myOB%20tech%20week%20event.png",
    href: "/events/tech-that-matches-your-vibe"
  },
  {
    id: 5,
    title: "#IAmRemarkable",
    date: "Wednesday, April 16, 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67ce885e79f6ad76f91dc4a1_Screen%20Shot%202025-03-10%20at%207.36.11%20PM.png",
    href: "/events/i-am-remarkable"
  },
  {
    id: 6,
    title: "She Sharp & academyEX: International Women's Day",
    date: "Friday, March 14, 2025",
    attendees: 75,
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67bffefb4cf73d5f15062e96_IWD%20-%20Poster.png",
    href: "/events/international-womens-day"
  }
];

export function EventsListSection() {
  const [showMore, setShowMore] = useState(false);
  const displayedEvents = showMore ? events : events.slice(0, 3);

  return (
    <Section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-navy mb-8">Find an Event</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={event.href}>
                <div className="relative aspect-[16/9]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <CalendarDays className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  {event.attendees && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  )}
                  <h3 className="font-semibold text-lg text-navy line-clamp-2">
                    {event.title}
                  </h3>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        {!showMore && events.length > 3 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowMore(true)}
              className="text-purple-dark border-purple-dark hover:bg-purple-light"
            >
              Load more
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}