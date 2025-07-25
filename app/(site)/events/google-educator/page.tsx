'use client'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Lightbulb, 
  Code,
  GraduationCap,
  Calendar,
  MapPin,
  Quote,
  Heart
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function GoogleEducatorPage() {
  const yearData = {
    '2024': {
      image: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20(1).jpg',
      date: 'November 2024',
      location: 'Auckland, New Zealand',
      theme: 'AI in Education',
      status: 'upcoming',
      highlights: [
        'Hands-on AI workshops',
        'Google Cloud certification',
        'EdTech innovation showcase',
      ]
    },
    '2023': {
      image: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20(1).jpg',
      date: 'October 2023',
      location: 'Auckland, New Zealand',
      theme: 'Digital Transformation',
      status: 'completed',
      highlights: [
        'Chromebook deployment strategies',
        'Google Workspace for Education',
        'Coding in the classroom',
      ]
    },
  }

  const features = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Innovation',
      description: 'Cutting-edge educational technology and teaching methods',
      color: 'bg-periwinkle-light text-periwinkle-dark',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Networking',
      description: 'Connect with educators from across New Zealand',
      color: 'bg-mint-light text-mint-dark',
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Hands-on Learning',
      description: 'Practical workshops and real-world applications',
      color: 'bg-purple-light text-purple-dark',
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Certification',
      description: 'Google for Education certifications and credentials',
      color: 'bg-navy-light text-navy-dark',
    },
  ]

  const partners = [
    'Google for Education',
    'Ministry of Education',
    'Auckland University',
    'Tech Futures Lab',
  ]

  return (
    <>
      {/* Hero Section - More Compact with Visual Interest */}
      <Section className="relative bg-gradient-to-br from-periwinkle-light via-white to-mint-light/30 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-periwinkle-light/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-mint-light/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <Container size="lg" className="relative py-16 md:py-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-periwinkle-dark/10 text-periwinkle-dark border-periwinkle-dark/20">
              <Sparkles className="h-3 w-3 mr-1" />
              Annual Conference
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-dark mb-4">
              Google Educator Conference
            </h1>
            <p className="text-lg md:text-xl text-gray max-w-2xl mx-auto mb-4">
              Empowering New Zealand educators with cutting-edge technology and innovative teaching strategies
            </p>
            <Link 
              href="https://www.cs4hs.nz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-periwinkle-dark hover:text-periwinkle-dark/80 font-medium"
            >
              Formerly known as CS4HS
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Conference Years - Tabbed Display */}
      <Section className="py-12">
        <Container size="xl">
          <Tabs defaultValue="2024" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="2024" className="text-lg">2024</TabsTrigger>
              <TabsTrigger value="2023" className="text-lg">2023</TabsTrigger>
            </TabsList>

            {Object.entries(yearData).map(([year, data]) => (
              <TabsContent key={year} value={year} className="mt-0">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Image Section */}
                  <div className="order-2 lg:order-1">
                    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl shadow-xl">
                      <Image
                        src={data.image}
                        alt={`Google Educator Conference ${year}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </AspectRatio>
                  </div>

                  {/* Content Section */}
                  <div className="order-1 lg:order-2 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">
                          {year} Conference
                        </h2>
                        <Badge 
                          variant={data.status === 'upcoming' ? 'default' : 'secondary'}
                          className={data.status === 'upcoming' ? 'bg-mint-dark text-white' : ''}
                        >
                          {data.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                        </Badge>
                      </div>
                      <p className="text-xl text-purple-dark font-semibold mb-4">
                        Theme: {data.theme}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 text-gray">
                        <span className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-periwinkle-dark" />
                          {data.date}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-periwinkle-dark" />
                          {data.location}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-navy-dark mb-3">Conference Highlights</h3>
                      <ul className="space-y-2">
                        {data.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-periwinkle-dark mr-3 mt-1">•</span>
                            <span className="text-gray">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild size="lg" className="bg-periwinkle-dark hover:bg-periwinkle-dark/90">
                      <Link href={`/events/google-educator/${year}`}>
                        View Full Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </Section>

      {/* Message to the Community */}
      <Section className="py-16">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">
              Message to the Community
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
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

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mint-light/20 rounded-full flex items-center justify-center">
                <Code className="w-8 h-8 text-mint-dark" />
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-3">
                Our Workshops
              </h3>
              <p className="text-gray">
                Then we have hands-on workshops to give participants practical skills or 
                provide a first-hand demonstration of tech-based skills.
              </p>
            </div>

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

      {/* Features Section */}
      <Section className="bg-gradient-to-b from-navy-light/20 to-white py-16">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              Why Attend?
            </h2>
            <p className="text-lg text-gray max-w-2xl mx-auto">
              Join hundreds of educators transforming education through technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-3`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonial Section */}
      <Section className="py-16">
        <Container size="md" className="text-center">
          <Quote className="h-12 w-12 text-periwinkle-light mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl text-navy-dark font-medium mb-6">
            "The Google Educator Conference transformed how I integrate technology in my classroom. 
            The hands-on workshops and networking opportunities were invaluable."
          </blockquote>
          <cite className="text-gray not-italic">
            Sarah Johnson, High School Teacher
          </cite>
        </Container>
      </Section>

      {/* Partners Section */}
      <Section className="bg-gradient-to-t from-periwinkle-light/20 to-white py-16">
        <Container size="lg">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-2">
              In Partnership With
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <div key={index} className="text-gray font-medium text-lg">
                {partner}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* BRIDGE THE GENDER GAP IN STEM WITH US */}
      <Section className="py-16">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">
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
  )
}