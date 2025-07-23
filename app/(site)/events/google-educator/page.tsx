import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, Users, Laptop, Heart } from "lucide-react";

export default function GoogleEducatorConferencePage() {
  const conferences = [
    {
      year: "2024",
      href: "/events/google-educator/2024",
      image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/66fa6abc3f7f8c3999f55fe3_Google%20educator%20poster.png",
      title: "Google Educator Conference 2024",
      description: "The latest conference on education technology and innovation",
    },
    {
      year: "2023",
      href: "/events/google-educator/2023",
      image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20(1).jpg",
      title: "Google Educator Conference 2023",
      description: "Exploring the future of education with technology",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section bgColor="white" className="pt-24 pb-12">
        <Container size="xl">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-dark mb-6">
              Google Educator Conference
            </h1>
            <p className="text-lg sm:text-xl text-gray mb-4">
              Formerly known as CS4HS
            </p>
            <Link 
              href="https://www.cs4hs.nz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-dark hover:text-purple-mid underline"
            >
              Learn more about CS4HS →
            </Link>
          </div>
        </Container>
      </Section>

      {/* Conference Years */}
      <Section bgColor="light">
        <Container size="xl">
          <div className="grid md:grid-cols-2 gap-8">
            {conferences.map((conference) => (
              <Card key={conference.year} className="overflow-hidden hover:shadow-lg transition-shadow">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={conference.image}
                    alt={conference.title}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
                <CardHeader>
                  <CardTitle className="text-2xl text-navy-dark">
                    {conference.year}
                  </CardTitle>
                  <CardDescription className="text-gray">
                    {conference.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-purple-dark hover:bg-purple-mid"
                  >
                    <Link href={conference.href}>
                      View {conference.year} Conference
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Message to Community */}
      <Section bgColor="white">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              Message to the Community
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Our Events */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-light/20 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-purple-dark" />
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                Our Events
              </h3>
              <p className="text-gray">
                Every year, we organise several events and try to cover every aspect of tech.
                We invite speakers to share their experiences, what drives them, and what they 
                are involved with on a day-to-day basis.
              </p>
            </div>

            {/* Our Workshops */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mint-light/20 rounded-full flex items-center justify-center">
                <Laptop className="w-8 h-8 text-mint-dark" />
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                Our Workshops
              </h3>
              <p className="text-gray">
                Then we have hands-on workshops to give participants practical skills or 
                provide a first-hand demonstration of tech-based skills.
              </p>
            </div>

            {/* Our Community */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-periwinkle-light/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-periwinkle-dark" />
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                Our Community
              </h3>
              <p className="text-gray">
                Our events are open to anyone identifying as a woman, where you can get to know 
                the She Sharp community, learn and have fun. Don't worry if you don't know anyone, 
                we're a friendly community! So we hope to see you in our next event!
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bgColor="light">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              BRIDGE THE GENDER GAP IN STEM WITH US
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Donate Card */}
            <Card className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-light/20 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-purple-dark" />
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                Donate to She Sharp
              </h3>
              <p className="text-gray mb-6">
                Help us empower more young women to pursue careers in STEM through events 
                and networking opportunities.
              </p>
              <Button
                asChild
                className="bg-purple-dark hover:bg-purple-mid"
              >
                <Link href="/donate">Make a donation</Link>
              </Button>
            </Card>

            {/* Events Card */}
            <Card className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-mint-light/20 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-mint-dark" />
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                Come to an event
              </h3>
              <p className="text-gray mb-6">
                Meet new people, network with companies, engage in workshops and learn 
                more about working in STEM!
              </p>
              <Button
                asChild
                variant="outline"
                className="border-purple-dark text-purple-dark hover:bg-purple-light"
              >
                <Link href="/events">Explore Events</Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}