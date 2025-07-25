import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Users, Calendar, Newspaper } from "lucide-react";

const stats = [
  { icon: Trophy, value: "15+", label: "Awards Won" },
  { icon: Users, value: "50+", label: "Media Features" },
  { icon: Calendar, value: "10", label: "Years of Impact" },
  { icon: Newspaper, value: "100+", label: "Press Mentions" }
];

export function NewsHeroSection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-light/20 to-periwinkle-light/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-light rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-periwinkle-light rounded-full opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint-light rounded-full opacity-10 animate-pulse animation-delay-4000" />
      </div>

      <Container className="relative z-10">
        <div className="py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-purple-dark text-white border-0">
              Making Headlines
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-navy-dark mb-6">
              News & Press
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Celebrating milestones, sharing stories, and amplifying the voices of women in technology
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow mb-4">
                  <stat.icon className="h-8 w-8 text-purple-dark" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-navy-dark mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <Separator className="mt-16 max-w-2xl mx-auto" />
        </div>
      </Container>
    </Section>
  );
}