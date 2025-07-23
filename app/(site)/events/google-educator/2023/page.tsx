import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react";

export default function GoogleEducator2023Page() {
  return (
    <>
      {/* Back Navigation */}
      <Section bgColor="white" className="pt-24 pb-6">
        <Container size="xl">
          <Button
            asChild
            variant="ghost"
            className="mb-6"
          >
            <Link href="/events/google-educator">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Google Educator Conference
            </Link>
          </Button>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section bgColor="white" className="pt-0">
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-dark mb-6">
                Google Educator Conference 2023
              </h1>
              <p className="text-lg text-gray mb-8">
                The Google Educator Conference 2023 brought together educators, technology 
                enthusiasts, and industry leaders to explore the future of education through 
                technology and innovation.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray">
                  <Calendar className="w-5 h-5 text-purple-dark" />
                  <span>November 18-19, 2023</span>
                </div>
                <div className="flex items-center gap-3 text-gray">
                  <MapPin className="w-5 h-5 text-purple-dark" />
                  <span>Auckland, New Zealand</span>
                </div>
                <div className="flex items-center gap-3 text-gray">
                  <Users className="w-5 h-5 text-purple-dark" />
                  <span>250+ Attendees</span>
                </div>
                <div className="flex items-center gap-3 text-gray">
                  <Clock className="w-5 h-5 text-purple-dark" />
                  <span>2 Days of Learning</span>
                </div>
              </div>
            </div>

            <div>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src="https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20(1).jpg"
                  alt="Google Educator Conference 2023"
                  fill
                  className="object-cover rounded-lg"
                />
              </AspectRatio>
            </div>
          </div>
        </Container>
      </Section>

      {/* Conference Highlights */}
      <Section bgColor="light">
        <Container size="xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              Conference Highlights
            </h2>
            <p className="text-lg text-gray max-w-3xl mx-auto">
              The 2023 conference featured inspiring keynotes, hands-on workshops, and 
              networking opportunities focused on empowering educators with technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-navy-dark">Keynote Speakers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray">
                  Industry leaders shared insights on the future of education technology, 
                  AI in classrooms, and innovative teaching methodologies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-navy-dark">Hands-on Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray">
                  Practical sessions on Google Workspace for Education, coding workshops, 
                  and digital citizenship training for educators.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-navy-dark">Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray">
                  Connect with fellow educators, share best practices, and build lasting 
                  relationships within the education technology community.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Impact Section */}
      <Section bgColor="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              Conference Impact
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-dark mb-2">250+</div>
              <div className="text-gray">Educators Attended</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-dark mb-2">15</div>
              <div className="text-gray">Expert Speakers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-dark mb-2">20</div>
              <div className="text-gray">Workshops Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-dark mb-2">98%</div>
              <div className="text-gray">Satisfaction Rate</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Next Steps */}
      <Section bgColor="light">
        <Container size="lg">
          <Card className="text-center p-8 md:p-12">
            <h3 className="text-2xl font-bold text-navy-dark mb-4">
              Stay Connected
            </h3>
            <p className="text-gray mb-8 max-w-2xl mx-auto">
              Join our community to stay updated on future conferences, workshops, 
              and educational technology initiatives.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="bg-purple-dark hover:bg-purple-mid"
              >
                <Link href="/events">View Upcoming Events</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-purple-dark text-purple-dark hover:bg-purple-light"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}