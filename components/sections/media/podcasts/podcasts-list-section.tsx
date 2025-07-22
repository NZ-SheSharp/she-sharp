"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const podcasts = [
  {
    id: 1,
    title: "Tech Wonderland: A Holiday Celebration with Google's Performance Lead, Hannah Weir",
    date: "December 2023",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65a9cbb3c67fedb1bc802f30_Podcast%20Template%20(1).png",
    spotifyLink: "#"
  },
  {
    id: 2,
    title: "TECHNOLOGICAL CHANGE - WORKPLACE & WORKFORCE IMPACTS",
    date: "November 2023",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/656449f3d01f2e91e441cff0_Podcast%20Template.png",
    spotifyLink: "#"
  },
  {
    id: 3,
    title: "Inspire Her: Te Whakatipuranga Wahine",
    date: "October 2023",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65509ac5a0623d92b00799c5_Group%20480965680%20(1).png",
    spotifyLink: "#"
  },
  {
    id: 4,
    title: "From Burnout to Balance",
    date: "September 2023",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6516caff046b6bee332a81b9_Group%20480965692.png",
    spotifyLink: "#"
  },
  {
    id: 5,
    title: "A Legendairy Career",
    date: "September 2023",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64f48bfd055ab00edf0c9575_Event%20Tile_BGs%20(1).png",
    spotifyLink: "#"
  },
  {
    id: 6,
    title: "Innovation Unleashed with Deloitte",
    date: "July 2023",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64bb8ab537717a195533fc8a_Podcast%20Template%20(3).png",
    spotifyLink: "#"
  },
  {
    id: 7,
    title: "Kickstart Your Career in Tech with MYOB",
    date: "May 2023",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64926803e40138d6dc0e5c02_Podcast%20Tile_Kickstart%20Your%20Career%20in%20Tech%20with%20MYOB.png",
    spotifyLink: "#"
  },
  {
    id: 8,
    title: "A Chat with Fiona Webby @ AcademyEX: The New Youniversity",
    date: "April 2023",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64926899d771e6ed62e9f52b_Podcast%20Tile_A%20Chat%20with%20Fiona%20Webby.png",
    spotifyLink: "#"
  },
  {
    id: 9,
    title: "IWD #EmbraceEquality",
    date: "April 2023",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/649268ebdac5954a754425d5_Podcast%20Tile_IWD%20%23EmbraceEquality.png",
    spotifyLink: "#"
  }
];

export function PodcastsListSection() {
  const [showMore, setShowMore] = useState(false);
  const displayedPodcasts = showMore ? podcasts : podcasts.slice(0, 6);

  return (
    <Section className="py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedPodcasts.map((podcast) => (
            <Card key={podcast.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[16/9]">
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">{podcast.date}</p>
                <h3 className="font-semibold text-lg text-navy mb-4 line-clamp-2">
                  {podcast.title}
                </h3>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full text-purple-dark border-purple-dark hover:bg-purple-light"
                >
                  <a 
                    href={podcast.spotifyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    Listen on Spotify
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {!showMore && podcasts.length > 6 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowMore(true)}
              className="text-purple-dark border-purple-dark hover:bg-purple-light"
            >
              Load More
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}