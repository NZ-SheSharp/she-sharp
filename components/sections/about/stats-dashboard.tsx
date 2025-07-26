"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TrendingUp, Users, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { globalStats, pageStats } from "@/lib/data/stats";

export function StatsDashboard() {
  const [memberCount, setMemberCount] = useState(globalStats.members.current - 50);
  const targetMemberCount = globalStats.members.current;

  // Animate member count
  useEffect(() => {
    const interval = setInterval(() => {
      setMemberCount((prev) => {
        if (prev >= targetMemberCount) {
          clearInterval(interval);
          return targetMemberCount;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section className="bg-gradient-to-br from-purple-light/5 to-periwinkle-light/5 py-12 sm:py-16 lg:py-20">
      <Container>
        {/* Mobile: Stack vertically, Desktop: Grid */}
        <div className="space-y-6 md:space-y-0 md:grid md:gap-6 md:grid-cols-3">
          {/* Large Card - Member Growth */}
          <Card className="group relative overflow-hidden border-purple-light/20 bg-white/80 backdrop-blur-sm transition-all hover:shadow-xl md:col-span-2 md:row-span-2">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-navy">Growing Community</h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Active members and counting</p>
                </div>
                <div className="rounded-full bg-gradient-to-br from-purple-light to-periwinkle p-3 sm:p-4 self-start sm:self-auto">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-dark to-periwinkle">
                  {memberCount.toLocaleString()}+
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-dark to-periwinkle transition-all duration-1000 ease-out"
                    style={{ width: `${(memberCount / 3000) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  On track to reach 3,000 members by 2025
                </p>
              </div>

              {/* Growth Chart Visualization - Simplified for mobile */}
              <div className="mt-6 sm:mt-8 flex items-end justify-between gap-1">
                {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-purple-dark/20 to-periwinkle/20 transition-all duration-500 hover:from-purple-dark/30 hover:to-periwinkle/30"
                    style={{ 
                      height: `${height * 0.5}px`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                <span>23% growth this year</span>
              </div>
            </CardContent>
          </Card>

          {/* Small Cards Stack */}
          <div className="space-y-6">
            {/* Sponsors Card */}
            <Card className="group relative overflow-hidden border-navy/10 bg-white/80 backdrop-blur-sm transition-all hover:shadow-lg">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Corporate Sponsors</p>
                    <p className="mt-1 text-2xl sm:text-3xl font-bold text-navy">50+</p>
                  </div>
                  <div className="rounded-full bg-gradient-to-br from-navy to-purple-dark p-2.5 sm:p-3">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                  Supporting women in tech since 2014
                </p>
              </CardContent>
            </Card>

            {/* Events Card */}
            <Card className="group relative overflow-hidden border-mint/20 bg-white/80 backdrop-blur-sm transition-all hover:shadow-lg">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Events Hosted</p>
                    <p className="mt-1 text-2xl sm:text-3xl font-bold text-navy">84+</p>
                  </div>
                  <div className="rounded-full bg-gradient-to-br from-mint to-periwinkle p-2.5 sm:p-3">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-navy" />
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                  Workshops, conferences & meetups
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}