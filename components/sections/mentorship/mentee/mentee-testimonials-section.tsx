"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Quote, Star, Heart, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const testimonials = [
  {
    quote: "From the first meeting with Meeta, she was inspiring, both personally and professionally. Her humble yet professional attitude made me comfortable with a feeling of being heard. Her insights and experience of the job market, industries and people, provided me with clarity and direction.",
    fullQuote: "From the first meeting with Meeta, she was inspiring, both personally and professionally. Her humble yet professional attitude made me comfortable with a feeling of being heard. Her insights and experience of the job market, industries and people, provided me with with clarity and direction. The encouragement and assurance that I was on the right track, to continue to persevere and and embrace challenges is one that I will continue to keep with me as I journey forward. I would like to take this moment to say a ''Thank you'' ( but one that does not end there), for your grace and positivity. Looking forward to staying in touch, to sharing our experiences and knowledge.",
    mentee: "Fay Fialho",
    mentor: "Meeta Patel",
    role: "Product Designer",
    company: "Tech Solutions",
    rating: 5,
    skills: ["Career Navigation", "Industry Insights", "Personal Growth"],
    cohort: "2024 Cohort 1"
  },
  {
    quote: "This initiative has truly been a taonga (treasure) for both mentors and mentees. My mentor Anshu's support has been instrumental in my journey, enabling me to grow in my Product Owner role.",
    fullQuote: "What a successful completion of She Sharp first mentorship cohort of 2024! This initiative has truly been a taonga (treasure) for both mentors and mentees, offering invaluable opportunities for growth, guidance, and connection. A shoutout to my incredible She Sharp mentor, Anshu Maharaj, whose support has been instrumental in my journey, enabling me to grow in my Product Owner role. This journey so far has allowed me to grow but has also empowered me to build an efficient toolbox. It has equipped me with the skills and insights needed to navigate challenges with confidence, and I aim to continue applying these tools to make an impact in all aspects moving forward.",
    mentee: "Shweta Sharma",
    mentor: "Anshu Maharaj",
    role: "Product Owner",
    company: "Innovation Labs",
    rating: 5,
    skills: ["Product Management", "Leadership", "Strategic Thinking"],
    cohort: "2024 Cohort 1"
  },
  {
    quote: "The mentorship program exceeded all my expectations. My mentor helped me transition from engineering to product management seamlessly.",
    fullQuote: "The mentorship program exceeded all my expectations. My mentor helped me transition from engineering to product management seamlessly. Through regular sessions and practical guidance, I gained the confidence and skills needed to make this career pivot. The She Sharp community has been incredibly supportive throughout this journey.",
    mentee: "Emma Chen",
    mentor: "Rachel Wong",
    role: "Associate Product Manager",
    company: "StartupHub",
    rating: 5,
    skills: ["Career Transition", "Product Strategy", "Communication"],
    cohort: "2024 Cohort 2"
  }
];

export function MenteeTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Section className="py-16 bg-gradient-to-b from-white to-purple-light/10">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            MENTEE TESTIMONIALS
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Hear from our mentees about their transformative journeys
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mx-auto max-w-5xl mb-16">
          <Card className="relative overflow-hidden shadow-xl border-0">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-dark via-periwinkle-dark to-mint-dark" />
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Mentee Info */}
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarFallback className="bg-purple-light text-purple-dark text-lg font-semibold">
                        {getInitials(testimonials[currentIndex].mentee)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg text-navy-dark">
                      {testimonials[currentIndex].mentee}
                    </h3>
                    <p className="text-gray-600 text-sm">{testimonials[currentIndex].role}</p>
                    <p className="text-gray-500 text-sm mb-3">{testimonials[currentIndex].company}</p>
                    <Badge variant="secondary" className="mb-4">
                      {testimonials[currentIndex].cohort}
                    </Badge>
                    
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonials[currentIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {testimonials[currentIndex].skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Quote */}
                <div className="md:col-span-2 relative">
                  <Quote className="absolute -top-4 -left-4 w-12 h-12 text-purple-light/50" />
                  <blockquote className="relative z-10">
                    <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                      {expandedCard === currentIndex ? testimonials[currentIndex].fullQuote : testimonials[currentIndex].quote}
                    </p>
                    {testimonials[currentIndex].quote !== testimonials[currentIndex].fullQuote && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedCard(expandedCard === currentIndex ? null : currentIndex)}
                        className="text-purple-dark hover:text-purple-mid"
                      >
                        {expandedCard === currentIndex ? 'Show less' : 'Read more'}
                      </Button>
                    )}
                  </blockquote>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Mentored by <span className="font-semibold text-purple-dark">{testimonials[currentIndex].mentor}</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-purple-light"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-purple-dark w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-purple-light"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-navy-dark mb-8">More Success Stories</h3>
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex gap-6 pb-4">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="w-[350px] flex-shrink-0 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-mint-light text-navy-dark">
                            {getInitials(testimonial.mentee)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-navy-dark">{testimonial.mentee}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic text-sm line-clamp-3 mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {testimonial.cohort}
                      </Badge>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">
            Join our community of successful mentees
          </p>
          <Button 
            size="lg" 
            className="bg-purple-dark hover:bg-purple-mid text-white"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Share Your Story
          </Button>
        </div>
      </Container>
    </Section>
  );
}