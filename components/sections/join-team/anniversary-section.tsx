import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users } from "lucide-react";
import Link from "next/link";

export function AnniversarySection() {
  return (
    <Section className="py-20 bg-mint-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-navy-dark/10" />

      <Container className="relative z-10">
        <Card className="mx-auto max-w-4xl border-0 shadow-2xl bg-white/95 backdrop-blur">
          <CardContent className="p-12 text-center">
            <Badge className="mb-6 bg-white/20 text-purple-dark border border-purple-dark px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              10 Years of Impact
            </Badge>
            
            <h3 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">
              Calling All She Sharp Alumni!
            </h3>
            
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Were you an ambassador with She Sharp? Join us in celebrating a decade of 
              empowering women in STEM. Reconnect with fellow ambassadors and share your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-navy-dark hover:bg-navy-dark/90 text-white shadow-md transition-colors duration-150"
              >
                <Link href="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Register Your Interest
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              Help us celebrate our impact and inspire the next generation
            </p>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}