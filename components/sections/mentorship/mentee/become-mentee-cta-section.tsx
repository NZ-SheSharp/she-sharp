'use client';

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock, Calendar, Users, Zap, ArrowRight, Info } from "lucide-react";
import { useState, useEffect } from "react";

export function BecomeMenteeCTASection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Mock deadline - replace with actual deadline
  const applicationDeadline = new Date('2025-03-31T23:59:59');
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = applicationDeadline.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const quickInfo = [
    { icon: Clock, label: "Duration", value: "6 Months" },
    { icon: Calendar, label: "Time Commitment", value: "2-4 hrs/month" },
    { icon: Users, label: "Cohort Size", value: "50 Mentees" },
    { icon: Zap, label: "Application Fee", value: "Free" }
  ];
  
  return (
    <Section className="py-16 bg-gradient-to-br from-purple-dark via-purple-mid to-periwinkle-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <Container className="relative z-10">
        <div className="text-center text-white">
          <Badge className="bg-mint-dark text-navy-dark mb-6 px-4 py-2 text-sm font-semibold">
            Applications Now Open
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            INTERESTED IN BECOMING A MENTEE?
          </h2>
          
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Take the first step towards transforming your career with personalized mentorship from industry leaders
          </p>
          
          {/* Countdown Timer */}
          <div className="mb-12">
            <p className="text-lg mb-4 opacity-80">Application Deadline</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <Card key={unit} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-white">{value}</div>
                    <div className="text-sm text-white/80 capitalize">{unit}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {quickInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Icon className="w-6 h-6 text-mint-dark mx-auto mb-2" />
                  <p className="text-sm text-white/80">{item.label}</p>
                  <p className="font-semibold text-white">{item.value}</p>
                </div>
              );
            })}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-white text-purple-dark hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
                >
                  <Info className="mr-2 h-5 w-5" />
                  Quick Apply Info
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-purple-dark">Before You Apply</DialogTitle>
                  <DialogDescription className="text-base">
                    Make sure you have the following information ready
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="font-semibold text-navy-dark mb-3">What You'll Need:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-light flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-purple-dark">1</span>
                        </div>
                        <span className="text-gray-700">Your current role and career goals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-light flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-purple-dark">2</span>
                        </div>
                        <span className="text-gray-700">Areas where you're seeking mentorship</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-light flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-purple-dark">3</span>
                        </div>
                        <span className="text-gray-700">Your availability for monthly sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-light flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-purple-dark">4</span>
                        </div>
                        <span className="text-gray-700">LinkedIn profile or resume (optional)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-navy-dark mb-3">Application Process:</h3>
                    <p className="text-gray-700 mb-3">
                      The application form takes approximately 10-15 minutes to complete. 
                      You'll be asked about your background, goals, and what you hope to achieve through the mentorship program.
                    </p>
                    <Badge variant="secondary" className="bg-mint-light text-navy-dark">
                      <Zap className="w-3 h-3 mr-1" />
                      Tip: Be specific about your goals for better mentor matching
                    </Badge>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button 
                      asChild 
                      size="lg" 
                      className="bg-purple-dark hover:bg-purple-mid text-white flex-1"
                    >
                      <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeiNe0btTXNLsJeIsMape05630fK1SLdldO9Ty3x8QbLd6B6w/viewform?usp=sf_link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2"
                      >
                        Apply Now
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              asChild 
              size="lg" 
              className="bg-mint-dark text-navy-dark hover:bg-mint-dark/90 font-semibold px-8 py-6 text-lg"
            >
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSeiNe0btTXNLsJeIsMape05630fK1SLdldO9Ty3x8QbLd6B6w/viewform?usp=sf_link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Apply to Become a Mentee
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-white/70 mt-6">
            Questions? Email us at mentorship@shesharp.org
          </p>
        </div>
      </Container>
    </Section>
  );
}