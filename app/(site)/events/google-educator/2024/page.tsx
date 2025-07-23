import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Sparkles } from "lucide-react";

export default function GoogleEducator2024Page() {
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
                Google Educator Conference 2024
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-dark" />
                <span className="text-purple-dark font-semibold">Latest Conference</span>
              </div>
              <p className="text-lg text-gray mb-8">
                Building on the success of 2023, the Google Educator Conference 2024 
                expanded its reach to empower even more educators with cutting-edge 
                technology tools and teaching strategies for the digital age.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray">
                  <Calendar className="w-5 h-5 text-purple-dark" />
                  <span>October 12-13, 2024</span>
                </div>
                <div className="flex items-center gap-3 text-gray">
                  <MapPin className="w-5 h-5 text-purple-dark" />
                  <span>Wellington, New Zealand</span>
                </div>
                <div className="flex items-center gap-3 text-gray">
                  <Users className="w-5 h-5 text-purple-dark" />
                  <span>300+ Attendees</span>
                </div>
                <div className="flex items-center gap-3 text-gray">
                  <Clock className="w-5 h-5 text-purple-dark" />
                  <span>2 Days of Innovation</span>
                </div>
              </div>
            </div>

            <div>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src="https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/66fa6abc3f7f8c3999f55fe3_Google%20educator%20poster.png"
                  alt="Google Educator Conference 2024"
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
              What's New in 2024
            </h2>
            <p className="text-lg text-gray max-w-3xl mx-auto">
              This year's conference introduced new tracks focused on AI in education, 
              sustainability in tech, and inclusive learning environments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-purple-light">
              <CardHeader>
                <CardTitle className="text-xl text-navy-dark">AI & Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray">
                  Explore how artificial intelligence is transforming education with practical 
                  applications for the classroom and personalized learning experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-mint-light">
              <CardHeader>
                <CardTitle className="text-xl text-navy-dark">Sustainable Tech</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray">
                  Learn about eco-friendly technology practices and how to incorporate 
                  sustainability education into your curriculum.
                </p>
              </CardContent>
            </Card>

            <Card className="border-periwinkle-light">
              <CardHeader>
                <CardTitle className="text-xl text-navy-dark">Inclusive Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray">
                  Discover tools and strategies to create accessible, inclusive learning 
                  environments that support all students.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Featured Sessions */}
      <Section bgColor="white">
        <Container size="xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              Featured Sessions
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Opening Keynote: The Future of Education Technology</CardTitle>
                <CardDescription>
                  Dr. Sarah Chen, Chief Education Officer at Google
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray">
                  An inspiring vision of how technology will shape the next decade of education, 
                  featuring live demonstrations of upcoming Google Education tools.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workshop: Building Interactive Classrooms with Google Workspace</CardTitle>
                <CardDescription>
                  Hands-on session for educators at all levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray">
                  Practical training on leveraging Google Workspace tools to create engaging, 
                  collaborative learning experiences for students.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Panel: Women Leading Tech Education</CardTitle>
                <CardDescription>
                  Featuring prominent women educators and tech leaders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray">
                  An empowering discussion on breaking barriers and creating opportunities 
                  for women in technology education.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Impact Section */}
      <Section bgColor="light">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              2024 Conference Impact
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-dark mb-2">300+</div>
              <div className="text-gray">Educators Empowered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-dark mb-2">25</div>
              <div className="text-gray">Industry Speakers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-dark mb-2">30</div>
              <div className="text-gray">Interactive Workshops</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-dark mb-2">99%</div>
              <div className="text-gray">Would Recommend</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Next Conference CTA */}
      <Section bgColor="white">
        <Container size="lg">
          <Card className="text-center p-8 md:p-12 bg-gradient-to-br from-purple-light/10 to-periwinkle-light/10">
            <h3 className="text-2xl font-bold text-navy-dark mb-4">
              Join Us for the Next Conference
            </h3>
            <p className="text-gray mb-8 max-w-2xl mx-auto">
              Be part of the growing community of educators embracing technology 
              to transform learning experiences. Register your interest for updates 
              on the next Google Educator Conference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="bg-purple-dark hover:bg-purple-mid"
              >
                <Link href="/contact">Register Interest</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-purple-dark text-purple-dark hover:bg-purple-light"
              >
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}