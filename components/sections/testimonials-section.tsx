"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Microsoft",
    image: "https://placehold.co/150x150/7B3F99/FFFFFF?text=SC",
    quote: "She Sharp gave me the confidence and network I needed to transition into tech. The mentorship program was life-changing!",
    tags: ["Career Transition", "Mentorship"],
  },
  {
    id: 2,
    name: "Emma Wilson",
    role: "Data Scientist",
    company: "Datacom",
    image: "https://placehold.co/150x150/4D7298/FFFFFF?text=EW",
    quote: "Through She Sharp events, I connected with amazing women who became both friends and professional contacts. This community is incredible!",
    tags: ["Networking", "Community"],
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Product Manager",
    company: "Xero",
    image: "https://placehold.co/150x150/93C5FD/FFFFFF?text=PP",
    quote: "The workshops and skill-building sessions helped me level up my career. I went from junior developer to product manager in two years!",
    tags: ["Skills Development", "Career Growth"],
  },
  {
    id: 4,
    name: "Jessica Kim",
    role: "Cloud Architect",
    company: "AWS",
    image: "https://placehold.co/150x150/5EEAD4/1F2937?text=JK",
    quote: "She Sharp's support during my university years shaped my career path. Now I'm giving back as a mentor to inspire the next generation.",
    tags: ["University", "Giving Back"],
  },
  {
    id: 5,
    name: "Maria Rodriguez",
    role: "UX Designer",
    company: "Trade Me",
    image: "https://placehold.co/150x150/7B3F99/FFFFFF?text=MR",
    quote: "Finding role models who looked like me in tech was powerful. She Sharp showed me that I belong in this industry.",
    tags: ["Role Models", "Belonging"],
  },
  {
    id: 6,
    name: "Aisha Mohammed",
    role: "Security Engineer",
    company: "Spark NZ",
    image: "https://placehold.co/150x150/4D7298/FFFFFF?text=AM",
    quote: "The technical workshops and hackathons pushed me out of my comfort zone. I discovered my passion for cybersecurity at a She Sharp event!",
    tags: ["Technical Skills", "Discovery"],
  },
];

export function TestimonialsSection() {
  return (
    <Section bgColor="white" className="overflow-hidden">
      <Container size="xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Stories from Our Community
          </h2>
          <p className="text-base sm:text-lg text-gray max-w-2xl mx-auto px-4">
            Hear from the amazing women who have found support, growth, and success through She Sharp
          </p>
        </div>

        <div className="relative overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full max-w-full mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border-2 hover:border-purple-light transition-colors">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Quote Icon */}
                      <Quote className="w-8 h-8 text-purple-light mb-4" />
                      
                      {/* Testimonial Text */}
                      <blockquote className="text-gray italic mb-6 flex-grow">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className="bg-purple-light text-purple-dark">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-navy-dark">{testimonial.name}</div>
                          <div className="text-sm text-gray">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {testimonial.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 h-10 w-10 bg-white/80 backdrop-blur-sm hover:bg-white/90" />
            <CarouselNext className="right-4 h-10 w-10 bg-white/80 backdrop-blur-sm hover:bg-white/90" />
          </Carousel>
        </div>

        {/* Statistics */}
        <div className="mt-12 sm:mt-16 bg-purple-light/10 rounded-lg p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-dark">92%</div>
              <div className="text-xs sm:text-sm text-gray mt-1">Found career opportunities</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-dark">87%</div>
              <div className="text-xs sm:text-sm text-gray mt-1">Expanded their network</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-dark">95%</div>
              <div className="text-xs sm:text-sm text-gray mt-1">Recommend She Sharp</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-dark">78%</div>
              <div className="text-xs sm:text-sm text-gray mt-1">Got promoted within 2 years</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}