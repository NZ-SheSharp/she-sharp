"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users, Target, Rocket, Heart, Award, Calendar, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const programFeatures = [
  {
    icon: Calendar,
    title: "3-Month Journey",
    description: "Structured program with clear milestones and regular check-ins"
  },
  {
    icon: Users,
    title: "Expert Matching",
    description: "AI-powered pairing based on goals, industry, and compatibility"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with professionals across New Zealand and beyond"
  },
  {
    icon: Award,
    title: "Certification",
    description: "Receive recognition upon successful program completion"
  }
];

const impactMetrics = [
  { value: "500+", label: "Successful Matches" },
  { value: "92%", label: "Satisfaction Rate" },
  { value: "85%", label: "Career Advancement" },
  { value: "150+", label: "Active Mentors" }
];

export function ProgramOverviewSection() {
  return (
    <Section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-purple-dark/10 text-purple-dark border-purple-dark">
                <Heart className="w-3 h-3 mr-1" />
                Empowering Women in Tech
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
                Empowering Women in STEM Through Mentoring
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Our mentorship program facilitates supportive relationships between our 
                mentors and mentees. Through sharing knowledge, advice, and encouragement, 
                we help mentees navigate careers, overcome challenges, and achieve 
                interpersonal goals. Whether you're looking to advance your career or 
                give back to the community, our program provides the structure and 
                support you need.
              </p>
            </div>

            {/* Program Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {programFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <Icon className="w-8 h-8 text-purple-dark mb-3" />
                      <h3 className="font-semibold text-navy dark:text-white text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-purple-dark hover:bg-purple-mid text-white">
                <Link href="/mentorship/mentee">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Join as Mentee
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-dark text-purple-dark hover:bg-purple-light dark:border-purple-mid dark:text-purple-mid">
                <Link href="/mentorship/mentor-application">
                  <Rocket className="mr-2 h-4 w-4" />
                  Become a Mentor
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Tabs */}
          <div>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Program Overview</TabsTrigger>
                <TabsTrigger value="impact">Our Impact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-light to-periwinkle-light dark:from-purple-dark/20 dark:to-periwinkle-dark/20">
                    <CardTitle className="text-navy dark:text-white">What You'll Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-purple-dark mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-navy dark:text-white mb-1">
                            Goal-Oriented Matching
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            We pair you based on your career goals, industry experience, and personal interests
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-periwinkle-dark mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-navy dark:text-white mb-1">
                            Community Support
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Join a vibrant community of women in tech through events, workshops, and online forums
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-mint-dark mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-navy dark:text-white mb-1">
                            Professional Growth
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Develop leadership skills, expand your network, and accelerate your career trajectory
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Image */}
                    <div className="mt-6">
                      <AspectRatio ratio={16/9}>
                        <Image
                          src="https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/64726ecc86b113a812fc9ee2_SHE%23%202023-178.jpg"
                          alt="Mentorship program workshop"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </AspectRatio>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="impact" className="mt-6">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-mint-light to-periwinkle-light dark:from-mint-dark/20 dark:to-periwinkle-dark/20">
                    <CardTitle className="text-navy dark:text-white">Program Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Impact Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {impactMetrics.map((metric) => (
                        <div key={metric.label} className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="text-3xl font-bold text-purple-dark dark:text-purple-mid mb-1">
                            {metric.value}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Success Stories */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-navy dark:text-white">Success Highlights</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-dark mt-1">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            85% of mentees report increased confidence in their career path
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-dark mt-1">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            6x more likely to receive promotions within 2 years
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-dark mt-1">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            90% of participants expand their professional network
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-dark mt-1">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Featured in NZ Tech Women Awards for community impact
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </Section>
  );
}