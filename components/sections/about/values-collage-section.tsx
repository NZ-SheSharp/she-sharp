"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  Lightbulb, 
  Users, 
  Rocket,
  Sparkles,
  Target
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const values = [
  {
    title: "Connection",
    description: "Building meaningful relationships and professional networks",
    icon: Heart,
    color: "from-purple-dark to-purple-mid",
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    quote: "Together we rise, together we thrive",
    size: "large",
    mobileSize: "full"
  },
  {
    title: "Inspiration",
    description: "Showcasing diverse career paths in STEM",
    icon: Lightbulb,
    color: "from-periwinkle to-purple-light",
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    quote: "See it, believe it, achieve it",
    size: "medium",
    mobileSize: "half"
  },
  {
    title: "Empowerment",
    description: "Providing tools and support for career growth",
    icon: Rocket,
    color: "from-mint to-periwinkle",
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    quote: "Your potential is limitless",
    size: "large",
    mobileSize: "half"
  },
  {
    title: "Inclusivity",
    description: "Creating spaces where everyone belongs",
    icon: Users,
    color: "from-purple-mid to-periwinkle",
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    quote: "Diversity drives innovation",
    size: "medium",
    mobileSize: "full"
  },
  {
    title: "Innovation",
    description: "Pushing boundaries and challenging norms",
    icon: Sparkles,
    color: "from-navy to-purple-dark",
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    quote: "Think different, code different",
    size: "small",
    mobileSize: "half"
  },
  {
    title: "Excellence",
    description: "Striving for the highest standards",
    icon: Target,
    color: "from-purple-light to-mint",
    image: "https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg",
    quote: "Excellence is a habit",
    size: "small",
    mobileSize: "half"
  }
];

export function ValuesCollageSection() {
  return (
    <Section className="relative bg-gradient-to-br from-white via-purple-light/5 to-mint/5 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <Container>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Our Core Values</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            The principles that guide everything we do at She Sharp
          </p>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {values.map((value, index) => {
            const Icon = value.icon;
            const isFull = value.mobileSize === 'full';

            return (
              <Card
                key={value.title}
                className={cn(
                  "group relative overflow-hidden cursor-pointer transition-all",
                  isFull && "col-span-2",
                  "h-48"
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-85",
                    value.color
                  )} />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-4 flex flex-col justify-between text-white">
                  <div>
                    <Icon className="h-8 w-8 mb-2" />
                    <h3 className="font-bold text-lg">{value.title}</h3>
                    {isFull && (
                      <p className="mt-1 text-sm opacity-90 line-clamp-2">
                        {value.description}
                      </p>
                    )}
                  </div>
                  
                  {isFull && (
                    <p className="text-xs italic opacity-80">
                      "{value.quote}"
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tablet Grid */}
        <div className="hidden sm:grid md:hidden grid-cols-3 gap-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            const colSpan = value.size === 'large' ? 'col-span-2' : 'col-span-1';

            return (
              <Card
                key={value.title}
                className={cn(
                  "group relative overflow-hidden cursor-pointer transition-all hover:shadow-xl",
                  colSpan,
                  "h-64"
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-90 transition-opacity",
                    value.color
                  )} />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
                  <div>
                    <Icon className="h-10 w-10 mb-3" />
                    <h3 className="font-bold text-xl">{value.title}</h3>
                    {value.size !== 'small' && (
                      <p className="mt-2 text-sm opacity-90">
                        {value.description}
                      </p>
                    )}
                  </div>
                  
                  <p className="text-sm italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    "{value.quote}"
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Desktop Collage Grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
          {values.map((value, index) => {
            const Icon = value.icon;
            const gridSpan = 
              value.size === 'large' ? 'col-span-2 row-span-2' :
              value.size === 'medium' ? 'col-span-2' :
              'col-span-1';

            return (
              <Card
                key={value.title}
                className={cn(
                  "group relative overflow-hidden cursor-pointer transition-all hover:shadow-2xl",
                  gridSpan,
                  index % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1"
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-90 transition-opacity",
                    value.color
                  )} />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
                  <div>
                    <Icon className={cn(
                      "transition-transform duration-300 group-hover:scale-110",
                      value.size === 'large' ? 'h-12 w-12' :
                      value.size === 'medium' ? 'h-10 w-10' :
                      'h-8 w-8'
                    )} />
                    <h3 className={cn(
                      "font-bold mt-4",
                      value.size === 'large' ? 'text-2xl' :
                      value.size === 'medium' ? 'text-xl' :
                      'text-lg'
                    )}>
                      {value.title}
                    </h3>
                    {value.size !== 'small' && (
                      <p className={cn(
                        "mt-2 opacity-90",
                        value.size === 'large' ? 'text-base' : 'text-sm'
                      )}>
                        {value.description}
                      </p>
                    )}
                  </div>
                  
                  {value.size !== 'small' && (
                    <p className="text-sm italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      "{value.quote}"
                    </p>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </Card>
            );
          })}
        </div>

        {/* Additional decorative elements */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4 sm:px-0">
            These values shape our community and drive our mission to create a more 
            inclusive and diverse tech industry. Every program, event, and initiative 
            reflects our commitment to these principles.
          </p>
        </div>
      </Container>
    </Section>
  );
}