'use client'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  MessageSquare,
  Trophy,
  Sparkles,
  Clock,
  Building,
  Quote,
  Star,
  CheckCircle,
  Target,
  Heart,
  Handshake
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { layoutSystem, layoutClasses } from '@/lib/layout-system'
import { ThriveGallery } from '@/components/events/thrive/ThriveGallery'

export default function ThriveEventPage() {
  const eventDetails = {
    title: 'THRIVE: Your Career, Your Story',
    subtitle: 'Piki Ake: Rise up Auckland',
    date: 'Wednesday, July 30, 2025',
    time: '5:00 PM - 7:30 PM',
    venue: 'HPE',
    address: 'Level 19 PWC Tower, Commercial Bay, 15 Customs Street West, Auckland Central',
    capacity: 90,
    status: 'completed',
    theme: 'Industry Resilience',
    organizers: ['She Sharp', 'TechBabesNZ'],
    leadOrganizer: 'Irene Naidu (TechBabesNZ)'
  }

  const eventHighlights = [
    'Keynote presentation by industry leader',
    'Panel discussion with diverse professionals',
    'Speed mentoring sessions',
    'CV review and feedback',
    'Interview preparation tips',
    'Networking opportunities'
  ]

  const agenda = [
    { time: '5:00 PM', activity: 'Registration & Welcome' },
    { time: '5:15 PM', activity: 'Karakia & Opening Remarks' },
    { time: '5:25 PM', activity: 'Keynote: Kathryn Sandford (M2M Recruitment)' },
    { time: '5:45 PM', activity: 'Panel Discussion: Industry Insights' },
    { time: '6:15 PM', activity: 'Speed Mentoring Round 1' },
    { time: '6:35 PM', activity: 'Speed Mentoring Round 2' },
    { time: '6:55 PM', activity: 'Speed Mentoring Round 3' },
    { time: '7:15 PM', activity: 'Closing Remarks & Networking' },
    { time: '7:30 PM', activity: 'Event Concludes' }
  ]

  const keynoteSpeaker = {
    name: 'Kathryn Sandford',
    role: 'M2M Recruitment',
    bio: 'Industry leader in talent acquisition and career development, bringing years of experience in helping professionals navigate their career journeys.',
    topic: 'Building Your Professional Brand'
  }

  const panelists = [
    { name: 'Irene Naidu', role: 'Facilitator', company: 'TechBabesNZ' },
    { name: 'Mahsa McCauley', role: 'Executive', company: 'She Sharp' },
    { name: 'Maria Clamor', role: 'Tech Professional', company: 'Industry Expert' },
    { name: 'Natasha Fernandez', role: 'Professional', company: 'Industry Expert' },
    { name: 'Shireen Chetty', role: 'Professional', company: 'Industry Expert' }
  ]

  const mentors = [
    { name: 'Dalia Raphael', expertise: 'Career Strategy' },
    { name: 'Kathryn Sandford', expertise: 'Recruitment & Talent' },
    { name: 'Irene Naidu', expertise: 'Tech Leadership' },
    { name: 'Mahsa McCauley', expertise: 'Executive Leadership' },
    { name: 'Maria Clamor', expertise: 'Technology' },
    { name: 'Natasha Fernandez', expertise: 'Professional Development' },
    { name: 'Matthew Hall-White', expertise: 'Industry Insights' },
    { name: 'Justine Hinton', expertise: 'Career Growth' },
    { name: 'Shireen Chetty', expertise: 'Professional Skills' },
    { name: 'Vivien Tu', expertise: 'Career Planning' },
    { name: 'Kai Ping (KP) Lew', expertise: 'Tech Industry' },
    { name: 'Libby Lavrova', expertise: 'Professional Development' },
    { name: 'Jamini Patel', expertise: 'Career Guidance' },
    { name: 'Isuru Fernando', expertise: 'Technical Skills' },
    { name: 'Prasanth Pavithran', expertise: 'Technology' },
    { name: 'Tuhi Cooper', expertise: 'Professional Growth' },
    { name: 'Caro Gao', expertise: 'Customer Success' },
    { name: 'Bahareh Jalili-Moghaddam', expertise: 'Management' }
  ]

  const eventFeatures = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'CV Reviews',
      description: 'Get personalized feedback on your CV from industry professionals',
      color: 'bg-purple-light text-purple-dark'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Mock Interviews',
      description: 'Practice interview skills with experienced mentors',
      color: 'bg-mint-light text-mint-dark'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Speed Mentoring',
      description: 'Connect with multiple mentors in quick, focused sessions',
      color: 'bg-periwinkle-light text-periwinkle-dark'
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: 'Career Insights',
      description: 'Learn from successful professionals across various industries',
      color: 'bg-navy-light text-navy-dark'
    }
  ]

  const testimonials = [
    {
      quote: "The speed mentoring sessions were incredibly valuable. I got insights from multiple industry professionals in one evening!",
      author: "Event Attendee",
      role: "Graduate Student"
    },
    {
      quote: "THRIVE provided practical advice and real connections. The CV feedback alone was worth attending.",
      author: "Career Changer",
      role: "Professional"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <Section bgColor="accent" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-light/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-mint-light/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <Container size="wide" className="relative">
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              className="mb-4"
            >
              <Link href="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Event Completed
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-dark mb-4">
              {eventDetails.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-dark font-semibold mb-6">
              {eventDetails.subtitle}
            </p>
            
            <p className="text-lg text-gray max-w-2xl mx-auto mb-8">
              A collaborative event between She Sharp and TechBabesNZ focused on career development, 
              mentorship, and building professional resilience in the tech industry.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-gray">
              <span className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-purple-dark" />
                {eventDetails.date}
              </span>
              <span className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-purple-dark" />
                {eventDetails.time}
              </span>
              <span className="flex items-center">
                <Building className="mr-2 h-5 w-5 text-purple-dark" />
                {eventDetails.venue}
              </span>
              <span className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-purple-dark" />
                {eventDetails.capacity} Attendees
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Event Overview */}
      <Section bgColor="white">
        <Container size="wide">
          <div className={layoutClasses(
            "grid items-center",
            layoutSystem.patterns.splitLayout.gap,
            "lg:grid-cols-2"
          )}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">
                About THRIVE
              </h2>
              <p className="text-gray mb-4">
                THRIVE: Your Career, Your Story was a transformative evening designed to empower 
                professionals at all stages of their careers. Whether attendees were graduating soon, 
                changing careers, or seeking clarity in their next steps, this event provided practical 
                advice, real conversations, and personalized guidance.
              </p>
              <p className="text-gray mb-6">
                This collaborative event between She Sharp and TechBabesNZ brought together industry 
                leaders, experienced mentors, and aspiring professionals for an evening of learning, 
                networking, and growth.
              </p>
              
              <div className="space-y-3 mb-8">
                {eventHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-dark mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Badge className="px-4 py-2 bg-purple-light text-purple-dark">
                  <Handshake className="h-4 w-4 mr-2" />
                  Partnership Event
                </Badge>
                <Badge className="px-4 py-2 bg-mint-light text-mint-dark">
                  <Target className="h-4 w-4 mr-2" />
                  Industry Resilience
                </Badge>
              </div>
            </div>

            <div>
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl shadow-xl bg-gradient-to-br from-purple-light to-periwinkle-light">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <Sparkles className="h-16 w-16 text-purple-dark mx-auto mb-4" />
                    <p className="text-2xl font-bold text-navy-dark mb-2">Sold Out Event</p>
                    <p className="text-gray">90 professionals attended this transformative evening</p>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </Container>
      </Section>

      {/* Event Details Tabs */}
      <Section bgColor="accent">
        <Container size="wide">
          <Tabs defaultValue="keynote" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="keynote">Keynote</TabsTrigger>
              <TabsTrigger value="panel">Panel</TabsTrigger>
              <TabsTrigger value="mentors">Mentors</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>

            {/* Keynote Tab */}
            <TabsContent value="keynote">
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">Keynote Speaker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-navy-dark mb-2">
                        {keynoteSpeaker.name}
                      </h3>
                      <p className="text-purple-dark font-medium mb-4">{keynoteSpeaker.role}</p>
                      <p className="text-gray mb-4">{keynoteSpeaker.bio}</p>
                      <div className="bg-purple-light/20 rounded-lg p-4">
                        <p className="font-medium text-navy-dark mb-2">Keynote Topic:</p>
                        <p className="text-purple-dark font-semibold">{keynoteSpeaker.topic}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Panel Tab */}
            <TabsContent value="panel">
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">Panel Discussion</CardTitle>
                  <p className="text-gray">Industry leaders sharing insights on career resilience</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {panelists.map((panelist, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-navy-dark">{panelist.name}</h4>
                        <p className="text-sm text-purple-dark">{panelist.role}</p>
                        <p className="text-sm text-gray">{panelist.company}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Mentors Tab */}
            <TabsContent value="mentors">
              <Card className="max-w-5xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">Speed Mentoring Sessions</CardTitle>
                  <p className="text-gray">Connect with industry professionals for personalized guidance</p>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {mentors.map((mentor, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                        <p className="font-medium text-navy-dark text-sm">{mentor.name}</p>
                        <p className="text-xs text-purple-dark">{mentor.expertise}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-mint-light/20 rounded-lg">
                    <p className="text-sm text-gray">
                      <strong className="text-navy-dark">Mentoring Format:</strong> Three 20-minute rounds 
                      where attendees rotated between mentors for focused discussions on career development, 
                      CV reviews, and interview preparation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Agenda Tab */}
            <TabsContent value="agenda">
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">Event Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agenda.map((item, index) => (
                      <div key={index} className="flex gap-4 pb-3 border-b last:border-0">
                        <span className="text-purple-dark font-medium min-w-[100px]">{item.time}</span>
                        <span className="text-gray">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </Section>

      {/* Features Section */}
      <Section bgColor="white">
        <Container size="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              What Attendees Experienced
            </h2>
            <p className="text-lg text-gray max-w-2xl mx-auto">
              THRIVE offered unique opportunities for professional growth and networking
            </p>
          </div>

          <div className={layoutClasses(
            "grid sm:grid-cols-2 lg:grid-cols-4",
            layoutSystem.grids.content.gap
          )}>
            {eventFeatures.map((feature, index) => (
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

      {/* Testimonials */}
      <Section bgColor="accent">
        <Container size="content">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              What Attendees Said
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-8">
                  <Quote className="h-8 w-8 text-purple-light absolute top-4 left-4" />
                  <blockquote className="text-gray mb-4 pt-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="ml-2">
                      <cite className="text-navy-dark font-medium not-italic">
                        {testimonial.author}
                      </cite>
                      <p className="text-sm text-gray">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Photo Gallery Section */}
      <Section bgColor="white">
        <Container size="wide">
          <ThriveGallery googlePhotosUrl="https://photos.app.goo.gl/uFDurrb7TtarkGS67" />
        </Container>
      </Section>

      {/* Event Partners */}
      <Section bgColor="accent">
        <Container size="content">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
              Event Partners
            </h2>
            <p className="text-lg text-gray">
              This event was made possible through collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Card className="text-center p-6">
              <CardHeader>
                <CardTitle>She Sharp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray">
                  Empowering women in STEM through mentorship and community
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <CardTitle>TechBabesNZ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray">
                  Building a supportive network for women in technology
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardHeader>
                <CardTitle>HPE</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray">
                  Venue sponsor providing world-class facilities
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section bgColor="white">
        <Container size="narrow" className="text-center">
          <Heart className="h-12 w-12 text-purple-dark mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4">
            Missed THRIVE?
          </h2>
          <p className="text-lg text-gray mb-8">
            Don't worry! We regularly host career development events and networking opportunities. 
            Join our community to stay updated on upcoming events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-purple-dark hover:bg-purple-mid"
            >
              <Link href="/events">Browse Upcoming Events</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-purple-dark text-purple-dark hover:bg-purple-light"
            >
              <Link href="/contact">Join Our Mailing List</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}