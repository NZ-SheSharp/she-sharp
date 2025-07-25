'use client';

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Target, Compass, Rocket, Briefcase, GraduationCap, Network, Sparkles, Users } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Personalised direction and evaluation",
    description: "Get personalised guidance and feedback from your mentor, tailored to your specific needs and goals.",
    color: "bg-purple-dark",
    stats: { value: 95, label: "Satisfaction Rate" }
  },
  {
    icon: Compass,
    title: "Navigate your growth",
    description: "Identify your strengths and areas for improvement, guiding you towards becoming the best version of yourself.",
    color: "bg-periwinkle-dark",
    stats: { value: 87, label: "Career Clarity" }
  },
  {
    icon: Rocket,
    title: "Opportunities for career growth",
    description: "Seize the opportunity to advance in your professional journey and confidently achieve your career goals.",
    color: "bg-mint-dark",
    stats: { value: 92, label: "Career Advancement" }
  },
  {
    icon: Briefcase,
    title: "Industry insights",
    description: "Gain valuable insider knowledge about your industry and learn from real-world experiences.",
    color: "bg-purple-mid",
    stats: { value: 89, label: "Industry Knowledge" }
  },
  {
    icon: GraduationCap,
    title: "Skill development",
    description: "Enhance both technical and soft skills through structured learning and practical application.",
    color: "bg-navy-dark",
    stats: { value: 91, label: "Skill Growth" }
  },
  {
    icon: Network,
    title: "Professional network",
    description: "Expand your professional network through your mentor's connections and She Sharp community.",
    color: "bg-periwinkle-dark",
    stats: { value: 85, label: "Network Growth" }
  }
];

const successStories = [
  { name: "Sarah Chen", role: "Software Engineer", company: "Tech Corp", avatar: "SC" },
  { name: "Maria Rodriguez", role: "Data Scientist", company: "AI Startup", avatar: "MR" },
  { name: "Jessica Kim", role: "Product Manager", company: "Innovation Labs", avatar: "JK" }
];

export function MenteeBenefitsSection() {
  return (
    <Section className="py-16 bg-gradient-to-br from-purple-light/30 via-periwinkle-light/20 to-mint-light/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            BENEFITS OF BECOMING A MENTEE
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join our mentorship program and unlock a world of opportunities for personal and professional growth
          </p>
        </div>
        
        {/* Main Carousel */}
        <div className="max-w-6xl mx-auto mb-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <CarouselItem key={benefit.title} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center mb-4`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-navy-dark mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 mb-6 flex-grow">
                          {benefit.description}
                        </p>
                        
                        {/* Stats visualization */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{benefit.stats.label}</span>
                            <span className="font-semibold text-purple-dark">{benefit.stats.value}%</span>
                          </div>
                          <Progress value={benefit.stats.value} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-x-0 translate-y-0" />
              <CarouselNext className="static translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
        
        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-dark mb-2">200+</div>
            <p className="text-gray-600">Active Mentees</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-periwinkle-dark mb-2">95%</div>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-mint-dark mb-2">6</div>
            <p className="text-gray-600">Month Program</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-navy-dark mb-2">50+</div>
            <p className="text-gray-600">Expert Mentors</p>
          </div>
        </div>
        
        {/* Success Stories Teaser */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-navy-dark mb-2">Success Stories</h3>
              <p className="text-gray-600">Meet some of our successful mentees</p>
            </div>
            <Sparkles className="w-8 h-8 text-purple-dark" />
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex -space-x-4">
              {successStories.map((story, index) => (
                <Avatar key={story.name} className="border-2 border-white">
                  <AvatarFallback className="bg-purple-light text-purple-dark">
                    {story.avatar}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">200+ mentees</span> have transformed their careers through our program
              </p>
            </div>
            <div className="bg-mint-light rounded-full px-4 py-2">
              <p className="text-sm font-semibold text-navy-dark">
                <Users className="w-4 h-4 inline mr-1" />
                Join them today
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}