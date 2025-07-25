'use client';

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Heart, Calendar, Users, TrendingUp, Gift, Sparkles, ArrowRight, Info } from "lucide-react";
import { useState, useEffect } from "react";

const ctaItems = [
  {
    icon: Heart,
    title: "Donate to She Sharp",
    description: "Help us empower more young women to pursue careers in STEM through events and networking opportunities.",
    buttonText: "Make a donation",
    href: "/donate",
    color: "bg-purple-dark",
    hoverColor: "hover:bg-purple-mid",
    stats: { current: 75000, goal: 100000, label: "2025 Goal" },
    impact: ["Fund 50+ mentorship pairs", "Host 20+ events", "Support 500+ women in STEM"]
  },
  {
    icon: Calendar,
    title: "Come to an event",
    description: "Meet new people, network with companies, engage in workshops and learn more about working in STEM!",
    buttonText: "Explore Events",
    href: "/events",
    color: "bg-periwinkle-dark",
    hoverColor: "hover:bg-periwinkle-dark/90",
    upcoming: 5,
    nextEvent: { name: "THRIVE 2025", date: "March 15" },
    highlights: ["Networking opportunities", "Industry workshops", "Career guidance"]
  }
];

export function MenteeCTASection() {
  const donationItem = ctaItems[0];
  const eventItem = ctaItems[1];
  const donationProgress = donationItem && donationItem.stats 
    ? (donationItem.stats.current / donationItem.stats.goal) * 100 
    : 0;
  
  if (!donationItem || !eventItem) {
    return null;
  }

  return (
    <Section className="py-16 bg-gradient-to-b from-white via-purple-light/10 to-white">
      <Container>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-purple-dark" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-mint-dark rounded-full animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            BRIDGE THE GENDER GAP IN STEM WITH US
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your support helps create more opportunities for women in technology
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Donate Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className={`absolute top-0 left-0 w-full h-2 ${donationItem.color}`} />
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 ${donationItem.color} rounded-2xl flex items-center justify-center text-white`}>
                  <Heart className="w-7 h-7" />
                </div>
                <HoverCard>
                  <HoverCardTrigger>
                    <Info className="w-5 h-5 text-gray-400 cursor-help" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <h4 className="font-semibold mb-2">Your Impact</h4>
                    <ul className="space-y-1 text-sm">
                      {donationItem.impact?.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Gift className="w-4 h-4 text-purple-dark mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-navy-dark mb-3">
                  {donationItem.title}
                </h3>
                <p className="text-gray-600">
                  {donationItem.description}
                </p>
              </div>
              
              {/* Donation Progress */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Fundraising Progress</span>
                  <span className="font-semibold text-purple-dark">
                    ${donationItem.stats?.current.toLocaleString() || 0} / ${donationItem.stats?.goal.toLocaleString() || 0}
                  </span>
                </div>
                <Progress value={donationProgress} className="h-3 mb-2" />
                <p className="text-xs text-gray-500 text-center">{donationItem.stats?.label}</p>
              </div>
              
              <Button 
                asChild 
                size="lg" 
                className={`w-full ${donationItem.color} ${donationItem.hoverColor} text-white font-semibold`}
              >
                <Link href={donationItem.href} className="inline-flex items-center justify-center gap-2">
                  {donationItem.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Events Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow">
            <div className={`absolute top-0 left-0 w-full h-2 ${eventItem.color}`} />
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 ${eventItem.color} rounded-2xl flex items-center justify-center text-white`}>
                  <Calendar className="w-7 h-7" />
                </div>
                <div className="bg-mint-dark text-navy-dark px-3 py-1 rounded-full text-sm font-semibold">
                  {eventItem.upcoming || 0} Upcoming
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-navy-dark mb-3">
                  {eventItem.title}
                </h3>
                <p className="text-gray-600">
                  {eventItem.description}
                </p>
              </div>
              
              {/* Next Event Preview */}
              <div className="bg-periwinkle-light/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">Next Event</span>
                  <TrendingUp className="w-4 h-4 text-periwinkle-dark" />
                </div>
                <h4 className="font-bold text-navy-dark">{eventItem.nextEvent?.name}</h4>
                <p className="text-sm text-gray-600">{eventItem.nextEvent?.date}</p>
              </div>
              
              {/* Event Highlights */}
              <div className="space-y-2">
                {eventItem.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-periwinkle-dark rounded-full" />
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                asChild 
                size="lg" 
                className={`w-full ${eventItem.color} ${eventItem.hoverColor} text-white font-semibold`}
              >
                <Link href={eventItem.href} className="inline-flex items-center justify-center gap-2">
                  {eventItem.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-light/50 to-periwinkle-light/50 rounded-2xl">
          <div className="flex justify-center mb-4">
            <Users className="w-10 h-10 text-purple-dark" />
          </div>
          <h3 className="text-xl font-semibold text-navy-dark mb-2">
            Join Our Community
          </h3>
          <p className="text-gray-700 mb-4">
            Be part of a supportive network of women in STEM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-purple-dark text-purple-dark hover:bg-purple-light">
              Subscribe to Newsletter
            </Button>
            <Button variant="outline" className="border-purple-dark text-purple-dark hover:bg-purple-light">
              Follow Us on Social
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}