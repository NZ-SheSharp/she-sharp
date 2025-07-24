"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronDown, Calendar, Users, Trophy, Rocket } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "2014",
    title: "The Beginning",
    description: "She Sharp was founded with a mission to bridge the gender gap in STEM fields.",
    details: "Dr. Mahsa McCauley established She Sharp after recognizing the significant underrepresentation of women in technology fields. Starting with a small group of passionate advocates, the organization set out to create a supportive community for women in STEM.",
    icon: Rocket,
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    color: "from-purple-dark to-purple-mid"
  },
  {
    year: "2016",
    title: "First Major Conference",
    description: "Hosted our inaugural annual conference with over 200 attendees.",
    details: "The first She Sharp conference brought together women from across New Zealand's tech industry. Featuring keynote speakers from leading tech companies, workshops on career development, and networking sessions that sparked lasting professional relationships.",
    icon: Users,
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    color: "from-periwinkle to-purple-light"
  },
  {
    year: "2018",
    title: "Mentorship Program Launch",
    description: "Launched our flagship mentorship program connecting 50+ pairs in the first year.",
    details: "Recognizing the importance of guidance and support, She Sharp introduced a structured mentorship program. This initiative paired experienced professionals with emerging talent, creating pathways for career growth and knowledge transfer.",
    icon: Trophy,
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    color: "from-mint to-periwinkle"
  },
  {
    year: "2020",
    title: "Going Virtual",
    description: "Adapted to remote engagement, reaching a global audience of 1000+ members.",
    details: "The global pandemic challenged us to reimagine our approach. We successfully transitioned to virtual events, expanding our reach beyond New Zealand and creating an international community of women in tech.",
    icon: Calendar,
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    color: "from-navy to-purple-dark"
  },
  {
    year: "2022",
    title: "2000+ Members",
    description: "Celebrated reaching 2000 active members across multiple countries.",
    details: "This milestone marked a significant achievement in our growth journey. Our community now includes students, professionals, and industry leaders from diverse backgrounds, all united in advancing women's participation in STEM.",
    icon: Users,
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    color: "from-purple-mid to-periwinkle"
  },
  {
    year: "2024",
    title: "10 Year Anniversary",
    description: "A decade of impact with 84+ events and 50+ corporate sponsors.",
    details: "Celebrating 10 years of empowering women in tech, She Sharp has become a recognized force for change in the industry. Our programs have touched thousands of lives, created countless connections, and contributed to shifting the landscape of tech in New Zealand and beyond.",
    icon: Trophy,
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    color: "from-purple-dark to-mint"
  }
];

export function TimelineSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <Section className="relative bg-gradient-to-br from-purple-light/5 via-white to-mint/5 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-light rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-mint rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Our Journey</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            From a small group of passionate advocates to a thriving community of 2200+ members
          </p>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            {/* Vertical Line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-dark via-periwinkle to-mint" />

            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;

              return (
                <div key={milestone.year} className="relative mb-8">
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute left-0 w-6 h-6 rounded-full border-4 border-white bg-gradient-to-br flex items-center justify-center",
                    milestone.color
                  )}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Content */}
                  <Collapsible
                    open={expandedIndex === index}
                    onOpenChange={(open) => setExpandedIndex(open ? index : null)}
                  >
                    <Card className="ml-8 overflow-hidden hover:shadow-lg transition-all">
                      <CollapsibleTrigger className="w-full">
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <div className={cn(
                                  "p-1.5 rounded-full bg-gradient-to-br text-white",
                                  milestone.color
                                )}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <p className="text-sm font-medium text-purple-dark">{milestone.year}</p>
                              </div>
                              <h3 className="text-lg font-bold text-navy">{milestone.title}</h3>
                              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{milestone.description}</p>
                            </div>
                            <ChevronDown className={cn(
                              "h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ml-2",
                              expandedIndex === index && "rotate-180"
                            )} />
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t border-gray-100 p-4 sm:p-5 pt-0">
                          <p className="mt-4 text-sm text-gray-700">{milestone.details}</p>
                          <AspectRatio ratio={16 / 9} className="mt-4 overflow-hidden rounded-lg">
                            <Image
                              src={milestone.image}
                              alt={milestone.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 400px"
                              className="object-cover"
                            />
                          </AspectRatio>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Snake Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-dark via-periwinkle to-mint" />

          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const Icon = milestone.icon;

            return (
              <div
                key={milestone.year}
                className={cn(
                  "relative mb-12 lg:mb-16",
                  "lg:grid lg:grid-cols-2 lg:gap-8",
                  isLeft ? "lg:text-right" : "lg:text-left"
                )}
              >
                {/* Content */}
                <div className={cn(
                  "lg:col-span-1",
                  isLeft ? "lg:order-1" : "lg:order-2"
                )}>
                  <Collapsible
                    open={expandedIndex === index}
                    onOpenChange={(open) => setExpandedIndex(open ? index : null)}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all">
                      <CollapsibleTrigger className="w-full">
                        <div className="p-6">
                          <div className={cn(
                            "flex items-center gap-4",
                            isLeft ? "lg:flex-row-reverse" : ""
                          )}>
                            <div className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white",
                              milestone.color
                            )}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className={cn(
                              "flex-1",
                              isLeft ? "lg:text-right" : "lg:text-left"
                            )}>
                              <p className="text-sm font-medium text-purple-dark">{milestone.year}</p>
                              <h3 className="text-xl font-bold text-navy">{milestone.title}</h3>
                              <p className="mt-2 text-gray-600">{milestone.description}</p>
                            </div>
                            <ChevronDown className={cn(
                              "h-5 w-5 text-gray-400 transition-transform",
                              expandedIndex === index && "rotate-180"
                            )} />
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t border-gray-100 p-6 pt-0">
                          <p className="mt-4 text-gray-700">{milestone.details}</p>
                          <AspectRatio ratio={16 / 9} className="mt-4 overflow-hidden rounded-lg">
                            <Image
                              src={milestone.image}
                              alt={milestone.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 400px"
                              className="object-cover"
                            />
                          </AspectRatio>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:flex lg:col-span-2 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-10">
                  <div className={cn(
                    "h-4 w-4 rounded-full border-4 border-white bg-gradient-to-br",
                    milestone.color
                  )} />
                </div>

                {/* Empty space for alternating layout */}
                <div className={cn(
                  "hidden lg:block lg:col-span-1",
                  isLeft ? "lg:order-2" : "lg:order-1"
                )} />
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}