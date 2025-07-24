"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays, Clock, MapPin, Users, Video, Sparkles } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "THRIVE: Your Career, Your Story",
    date: new Date(2025, 2, 15), // March 15, 2025
    time: "6:00 PM - 8:30 PM",
    location: "Auckland CBD",
    type: "Networking",
    typeColor: "bg-purple-dark text-white",
    attendees: 150,
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    description: "An evening of inspiring stories and career insights from women leaders in tech.",
  },
  {
    id: 2,
    title: "Tech Skills Workshop: Cloud Computing",
    date: new Date(2025, 2, 22), // March 22, 2025
    time: "10:00 AM - 2:00 PM",
    location: "Online",
    type: "Workshop",
    typeColor: "bg-periwinkle-dark text-white",
    attendees: 80,
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    description: "Hands-on workshop covering cloud fundamentals and practical applications.",
    isOnline: true,
  },
  {
    id: 3,
    title: "Mentorship Speed Dating",
    date: new Date(2025, 3, 5), // April 5, 2025
    time: "5:30 PM - 7:30 PM",
    location: "Wellington",
    type: "Mentorship",
    typeColor: "bg-mint-dark text-white",
    attendees: 60,
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    description: "Meet potential mentors in a fun, fast-paced environment.",
  },
];

const eventTypes = [
  { name: "All Events", count: 12 },
  { name: "Networking", count: 5 },
  { name: "Workshops", count: 4 },
  { name: "Mentorship", count: 3 },
];

export function EventsSection() {
  return (
    <Section bgColor="white">
      <Container size="xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Events that connect, engage, and inspire
          </h2>
          <p className="text-base sm:text-lg text-gray max-w-3xl mx-auto px-4">
            Keynote speakers, panels, workshops, networking events, hackathons and more! 
            Whether you're in school, university or a young professional, our events are 
            designed to be inclusive, interactive and fun.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Calendar and Stats */}
          <div className="space-y-6 hidden lg:block">
            {/* Calendar Card */}
            <Card className="border-purple-light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-purple-dark" />
                  Event Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={upcomingEvents[0].date}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>

            {/* Event Types */}
            <Card className="border-periwinkle-light">
              <CardHeader>
                <CardTitle className="text-lg">Event Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventTypes.map((type) => (
                    <div key={type.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray">{type.name}</span>
                      <Badge variant="secondary">{type.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Upcoming Events */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-navy-dark flex items-center gap-2">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-purple-dark" />
                Upcoming Events
              </h3>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-purple-dark hover:text-purple-mid"
              >
                <Link href="/events">View All Events →</Link>
              </Button>
            </div>

            {/* Event Cards */}
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="sm:flex">
                    {/* Event Image */}
                    <div className="sm:w-1/3">
                      <AspectRatio ratio={4 / 3}>
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </AspectRatio>
                    </div>

                    {/* Event Details */}
                    <div className="sm:w-2/3 p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge className={event.typeColor}>{event.type}</Badge>
                          {event.isOnline && (
                            <Badge variant="outline" className="ml-2">
                              <Video className="w-3 h-3 mr-1" />
                              Online
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray">
                          {event.date.toLocaleDateString('en-NZ', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-semibold text-navy-dark mb-2">
                        {event.title}
                      </h4>
                      <p className="text-gray text-xs sm:text-sm mb-3">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees} attending
                        </span>
                      </div>

                      <div className="mt-4">
                        <Button
                          asChild
                          size="sm"
                          className="bg-purple-dark hover:bg-purple-mid"
                        >
                          <Link href={`/events/${event.id}`}>Register Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* View All Events CTA */}
            <div className="text-center pt-6">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-purple-dark text-purple-dark hover:bg-purple-light"
              >
                <Link href="/events">Explore All Events</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 sm:mt-16 bg-purple-light/10 rounded-lg p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-dark">84+</div>
              <div className="text-xs sm:text-sm text-gray mt-1">Events Hosted</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-dark">10K+</div>
              <div className="text-xs sm:text-sm text-gray mt-1">Total Attendees</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-dark">50+</div>
              <div className="text-xs sm:text-sm text-gray mt-1">Partner Companies</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-dark">5</div>
              <div className="text-xs sm:text-sm text-gray mt-1">Cities Reached</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}