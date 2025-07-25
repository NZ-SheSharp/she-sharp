"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Lightbulb, Users, TrendingUp, Brain, Heart, Sparkles } from "lucide-react";
import { useState } from "react";

const benefits = [
  {
    icon: Target,
    title: "Pathway for Personal Development",
    description: "Whether you join as a mentor or mentee, this is an additional opportunity for personal and professional development.",
    highlights: ["Career advancement", "Skill building", "Leadership growth"],
    color: "purple"
  },
  {
    icon: Lightbulb,
    title: "Increase Knowledge Share",
    description: "The mentorship program serves as a platform for promoting collaborative learning and exploring new perspectives together.",
    highlights: ["Industry insights", "Best practices", "Innovation"],
    color: "periwinkle"
  },
  {
    icon: Users,
    title: "Supportive Community",
    description: "With our pool of supportive mentors, you'll get professional guidance, provided valuable advice and support along the way.",
    highlights: ["Networking", "Peer support", "Lasting connections"],
    color: "mint"
  }
];

const additionalBenefits = [
  {
    icon: TrendingUp,
    title: "Career Acceleration",
    stat: "85%",
    description: "of participants see career growth"
  },
  {
    icon: Brain,
    title: "Skill Enhancement",
    stat: "90%",
    description: "improve interpersonal skills"
  },
  {
    icon: Heart,
    title: "Confidence Boost",
    stat: "92%",
    description: "feel more empowered"
  }
];

export function BenefitsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "purple":
        return {
          bg: "bg-purple-light/30 dark:bg-purple-dark/10",
          border: "border-purple-dark/20",
          icon: "text-purple-dark",
          badge: "bg-purple-dark/10 text-purple-dark border-purple-dark/20"
        };
      case "periwinkle":
        return {
          bg: "bg-periwinkle-light/30 dark:bg-periwinkle-dark/10",
          border: "border-periwinkle-dark/20",
          icon: "text-periwinkle-dark",
          badge: "bg-periwinkle-dark/10 text-periwinkle-dark border-periwinkle-dark/20"
        };
      case "mint":
        return {
          bg: "bg-mint-light/50 dark:bg-mint-dark/10",
          border: "border-mint-dark/20",
          icon: "text-navy dark:text-mint-dark",
          badge: "bg-mint-dark/10 text-navy dark:text-mint-dark border-mint-dark/20"
        };
      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-200",
          icon: "text-gray-700",
          badge: "bg-gray-100 text-gray-700 border-gray-200"
        };
    }
  };

  return (
    <Section className="py-16 md:py-24 bg-gradient-to-b from-periwinkle-light/20 via-white to-mint-light/20 dark:from-periwinkle-dark/5 dark:via-gray-950 dark:to-mint-dark/5">
      <Container>
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-periwinkle-dark/10 text-periwinkle-dark border-periwinkle-dark">
            <Sparkles className="w-3 h-3 mr-1" />
            Transform Your Career
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
            Benefits of Joining the Mentorship Program
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock opportunities for growth, learning, and connection in a supportive environment
          </p>
        </div>
        
        {/* Main Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const colors = getColorClasses(benefit.color);
            const isHovered = hoveredCard === index;
            
            return (
              <Card 
                key={benefit.title}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${colors.bg} ${colors.border}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-6">
                  {/* Icon Container */}
                  <div className={`w-16 h-16 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center mb-4 mx-auto transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                    <Icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-navy dark:text-white mb-3 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                    {benefit.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {benefit.highlights.map((highlight) => (
                      <Badge 
                        key={highlight} 
                        variant="secondary" 
                        className={`text-xs transition-opacity duration-300 ${colors.badge} ${isHovered ? 'opacity-100' : 'opacity-70'}`}
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Additional Benefits Stats */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-navy dark:text-white text-center mb-8">
            The Impact in Numbers
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {additionalBenefits.map((benefit) => {
              const Icon = benefit.icon;
              
              return (
                <div key={benefit.title} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-light/50 dark:bg-purple-dark/20 mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-purple-dark" />
                  </div>
                  <div className="text-3xl font-bold text-purple-dark dark:text-purple-mid mb-1">
                    {benefit.stat}
                  </div>
                  <h4 className="font-semibold text-navy dark:text-white mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}