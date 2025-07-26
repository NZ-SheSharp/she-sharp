import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Mail, Users, Heart } from "lucide-react";
import Link from "next/link";

export function JoinTeamCTASection() {
  return (
    <Section className="py-20 bg-mint-light/10">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-dark mb-6">
              Ready to Make Your Impact?
            </h2>
            <p className="text-xl text-gray max-w-3xl mx-auto">
              Join our community of changemakers and help shape the future of women in technology
            </p>
          </div>

          {/* Primary CTA Card */}
          <Card className="mb-12 border-2 border-purple-dark shadow-xl">
            <CardContent className="p-12 text-center">
              <Badge className="mb-6 bg-purple-dark text-white px-4 py-2 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                Applications Open Year-Round
              </Badge>
              
              <h3 className="text-3xl font-bold text-navy-dark mb-4">
                Become a She Sharp Volunteer
              </h3>
              
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Whether you can spare a few hours for events or want to join our ambassador team, 
                we have the perfect opportunity for you to contribute to our mission.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-mint-dark hover:bg-mint-dark/90 text-navy-dark transition-colors duration-150">
                  <Users className="w-5 h-5 mr-2" />
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-mint-dark text-mint-dark hover:bg-mint-light/20 transition-colors duration-150">
                  <Mail className="w-5 h-5 mr-2" />
                  Get Updates
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ambassador Recruitment Notice */}
          <Alert className="mb-12 border-periwinkle-dark bg-periwinkle-light/20">
            <Calendar className="h-5 w-5 text-periwinkle-dark" />
            <AlertDescription className="text-base">
              <strong className="text-navy-dark">Ambassador Applications:</strong> Our next ambassador recruitment 
              opens in February 2025. Register your interest now to be notified when applications open!
            </AlertDescription>
          </Alert>

          {/* Secondary CTAs */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow duration-150">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-light/20 rounded-full mb-6 group-hover:bg-purple-light/30 transition-colors duration-150">
                  <Heart className="w-8 h-8 text-purple-dark" />
                </div>
                <h4 className="text-xl font-semibold text-navy-dark mb-3">
                  Support Our Mission
                </h4>
                <p className="text-gray-600 mb-6">
                  Your donation helps us create more opportunities for women in STEM
                </p>
                <Button asChild variant="link" className="text-purple-dark p-0">
                  <Link href="/donate">
                    Make a Donation
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-150">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-periwinkle-light/20 rounded-full mb-6 group-hover:bg-periwinkle-light/30 transition-colors duration-150">
                  <Calendar className="w-8 h-8 text-periwinkle-dark" />
                </div>
                <h4 className="text-xl font-semibold text-navy-dark mb-3">
                  Attend Our Events
                </h4>
                <p className="text-gray-600 mb-6">
                  Connect with the community at our workshops and networking events
                </p>
                <Button asChild variant="link" className="text-periwinkle-dark p-0">
                  <Link href="/events">
                    Explore Events
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-150">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-mint-light/20 rounded-full mb-6 group-hover:bg-mint-light/30 transition-colors duration-150">
                  <Mail className="w-8 h-8 text-navy-dark" />
                </div>
                <h4 className="text-xl font-semibold text-navy-dark mb-3">
                  Stay Connected
                </h4>
                <p className="text-gray-600 mb-6">
                  Get the latest updates on volunteer opportunities and events
                </p>
                <Button asChild variant="link" className="text-navy-dark p-0">
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}