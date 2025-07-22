"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const galleryItems = [
  {
    id: 1,
    title: "Ethnic Advantage Conference",
    date: "June 28, 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/684918c467a93421eafe8f3b_unnamed.jpg",
    href: "#"
  },
  {
    id: 2,
    title: "Tech That Matches Your Vibe: Find Your Perfect Fit",
    date: "May 22, 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67fd6ff293328e7d586a0200_myOB%20tech%20week%20event.png",
    href: "#"
  },
  {
    id: 3,
    title: "#IAmRemarkable",
    date: "April 16, 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67ce885e79f6ad76f91dc4a1_Screen%20Shot%202025-03-10%20at%207.36.11%20PM.png",
    href: "#"
  },
  {
    id: 4,
    title: "She Sharp & academyEX: International Women's Day",
    date: "March 14, 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67db4b3d53a88fa011d49f6e_IWD%20-%20Poster%20(1).png",
    href: "#"
  },
  {
    id: 5,
    title: "Google Educator Conference",
    date: "November 21, 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67c1393875d438f45786d5d9_Google%20Educator%20Conference.jpg",
    href: "#"
  },
  {
    id: 6,
    title: "The Role of Technology in Sustainable Development",
    date: "November 15, 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67c1388d5ccd8b5bd8b7be0c_The%20Role%20of%20Technology%20in%20Sustainable%20Development.png",
    href: "#"
  },
  {
    id: 7,
    title: "She Sharp 10-Year Anniversary",
    date: "October 18, 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67230db0aea4360addb5e13a_10yr.png",
    href: "#"
  },
  {
    id: 8,
    title: "Harness the Power of Data and AI",
    date: "August 29, 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66d5745b61e76397cc18bc7f_Harness%20the%20power%20of%20data%20and%20AI.png",
    href: "#"
  },
  {
    id: 9,
    title: "F&P Hackathon",
    date: "July 26, 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66acb041bbdbd2a1c9e5e353_F%26P%20Hackathon%20with%20She%23-p-500.png",
    href: "#"
  }
];

export function GalleryGridSection() {
  const [showMore, setShowMore] = useState(false);
  const displayedItems = showMore ? galleryItems : galleryItems.slice(0, 6);

  return (
    <Section className="py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <Link href={item.href}>
                <div className="relative aspect-[16/9]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <CalendarDays className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-navy mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-purple-dark hover:text-purple-mid transition-colors">
                    View more →
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        {!showMore && galleryItems.length > 6 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowMore(true)}
              className="text-purple-dark border-purple-dark hover:bg-purple-light"
            >
              Load more
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}