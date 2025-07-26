import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ArrowLeft, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { layoutSystem } from '@/lib/layout-system'

export default function GoogleEducator2024Page() {
  const highlights = [
    'Hands-on workshops with Google experts',
    'Networking with 300+ educators nationwide',
    'Latest Google for Education tools and strategies',
    'Certificate of completion for all participants',
  ]

  const images = [
    'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20(1).jpg',
    // Add more images when available
  ]

  return (
    <>
      {/* Back Navigation */}
      <Section bgColor="white" noPadding className="pt-24">
        <Container size="content">
          <Button asChild variant="ghost" className="mb-8 -ml-4">
            <Link href="/events/google-educator">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Conferences
            </Link>
          </Button>
        </Container>
      </Section>

      {/* Header */}
      <Section bgColor="white">
        <Container size="content">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy-dark mb-4">
              2024
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-lg text-gray">
              <span className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                November 2024
              </span>
              <span className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Auckland, New Zealand
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Visual */}
      <Section className="pt-0">
        <Container size="content">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
            <Image
              src={images[0]}
              alt="Google Educator Conference 2024"
              fill
              className="object-cover"
              priority
            />
          </AspectRatio>
        </Container>
      </Section>

      {/* Event Details */}
      <Section>
        <Container size="narrow">
          <div>
            <h2 className="text-3xl font-bold text-navy-dark mb-6">
              Conference Highlights
            </h2>
            <ul className="space-y-3">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-periwinkle-dark mr-3 mt-1">•</span>
                  <span className="text-lg text-gray">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Photo Gallery - Placeholder for future images */}
      {images.length > 1 && (
        <Section className="bg-navy-light/30">
          <Container size="content">
            <h2 className="text-3xl font-bold text-navy-dark mb-8 text-center">
              Event Gallery
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.slice(1).map((image, index) => (
                <AspectRatio key={index} ratio={4 / 3} className="overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`Conference moment ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold text-navy-dark mb-4">
            Inspired by Our 2024 Conference?
          </h2>
          <p className="text-lg text-gray mb-8">
            Join us for the next Google Educator Conference
          </p>
          <Button asChild size="lg" className="bg-purple-dark hover:bg-purple-mid">
            <Link href="/events">
              View Upcoming Events
            </Link>
          </Button>
        </Container>
      </Section>
    </>
  )
}