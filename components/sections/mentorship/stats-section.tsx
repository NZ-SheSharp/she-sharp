"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { TrendingUp, Users, Award, Sparkles, Info } from "lucide-react";
import { useState, useEffect } from "react";

const stats = [
  {
    percentage: "85%",
    value: 85,
    description: "Feel more empowered after joining a mentorship program",
    detail: "Based on survey of 500+ program participants across 3 years",
    icon: Sparkles,
    color: "purple"
  },
  {
    percentage: "90%",
    value: 90,
    description: "Experienced improvement of their interpersonal skills",
    detail: "Including communication, leadership, and networking abilities",
    icon: Users,
    color: "periwinkle"
  },
  {
    percentage: "6x more",
    value: 100,
    description: "Mentors are likely to be promoted",
    detail: "Compared to colleagues who don't participate in mentorship",
    icon: TrendingUp,
    color: "mint"
  },
  {
    percentage: "5x more",
    value: 100,
    description: "Mentees with mentors are likely to be promoted",
    detail: "Within 2 years of completing the mentorship program",
    icon: Award,
    color: "navy"
  }
];

export function StatsSection() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "purple":
        return {
          bg: "bg-purple-light dark:bg-purple-dark/10",
          border: "border-purple-dark/20",
          text: "text-purple-dark",
          progress: "bg-purple-dark"
        };
      case "periwinkle":
        return {
          bg: "bg-periwinkle-light dark:bg-periwinkle-dark/10",
          border: "border-periwinkle-dark/20",
          text: "text-periwinkle-dark",
          progress: "bg-periwinkle-dark"
        };
      case "mint":
        return {
          bg: "bg-mint-light dark:bg-mint-dark/10",
          border: "border-mint-dark/20",
          text: "text-navy dark:text-mint-dark",
          progress: "bg-mint-dark"
        };
      case "navy":
        return {
          bg: "bg-navy-light dark:bg-navy-dark/10",
          border: "border-navy-dark/20",
          text: "text-navy-dark dark:text-navy-light",
          progress: "bg-navy-dark dark:bg-navy-light"
        };
      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-200",
          text: "text-gray-700",
          progress: "bg-gray-700"
        };
    }
  };

  return (
    <Section className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-light/30 dark:from-gray-950 dark:to-purple-dark/5">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
            What You Get Out of a Mentorship Program
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Research shows participating in a mentorship program provides valuable 
            benefits for both mentees and mentors. Here's what our data reveals:
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            const Icon = stat.icon;
            
            return (
              <HoverCard key={stat.percentage}>
                <HoverCardTrigger asChild>
                  <Card className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${colors.bg} ${colors.border}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className={`text-4xl font-bold mb-3 ${colors.text}`}>
                        {stat.percentage}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {stat.description}
                      </p>
                      <Progress 
                        value={animated ? stat.value : 0} 
                        className="h-2"
                        style={{
                          ['--progress-background' as any]: colors.progress
                        }}
                      />
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{stat.percentage} - More Details</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.detail}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}