"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote: "From the first meeting with Meeta, she was inspiring, both personally and professionally. Her humble yet professional attitude made me comfortable with a feeling of being heard. Her insights and experience of the job market, industries and people, provided me with with clarity and direction. The encouragement and assurance that I was on the right track, to continue to persevere and and embrace challenges is one that I will continue to keep with me as I journey forward. I would like to take this moment to say a ''Thank you'' ( but one that does not end there), for your grace and positivity. Looking forward to staying in touch, to sharing our experiences and knowledge.",
    mentee: "Fay Fialho",
    mentor: "Meeta Patel"
  },
  {
    quote: "What a successful completion of She Sharp first mentorship cohort of 2024! This initiative has truly been a taonga (treasure) for both mentors and mentees, offering invaluable opportunities for growth, guidance, and connection. 🌟 A shoutout to my incredible She Sharp mentor, Anshu Maharaj, whose support has been instrumental in my journey, enabling me to grow in my Product Owner role. This journey so far has allowed me to grow but has also empowered me to build an efficient toolbox. It has equipped me with the skills and insights needed to navigate challenges with confidence, and I aim to continue applying these tools to make an impact in all aspects moving forward.",
    mentee: "Shweta Sharma",
    mentor: "Anshu Maharaj"
  }
];

export function MenteeTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Section className="py-16">
      <Container>
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          MENTEE TESTIMONIALS
        </h2>
        <div className="mx-auto max-w-4xl">
          <Card className="relative">
            <CardContent className="p-8 md:p-12">
              <div className="text-6xl text-purple-light mb-4">"</div>
              <blockquote className="text-lg text-gray-700 mb-6 italic">
                {testimonials[currentIndex].quote}
              </blockquote>
              <div className="text-6xl text-purple-light text-right -mt-8 mb-4">"</div>
              <p className="font-semibold text-navy">
                Mentee {testimonials[currentIndex].mentee} | Mentor {testimonials[currentIndex].mentor}
              </p>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-purple-dark" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}