"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const newsletters = [
  {
    id: 1,
    month: "May 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/685b86a4122d34ad5ed64dae_2025_Newsletters%20may.png",
    href: "#"
  },
  {
    id: 2,
    month: "April 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/685b85f36c4d1ad7379ee334_2025_Newsletters%20april.png",
    href: "#"
  },
  {
    id: 3,
    month: "March 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/685b844d30bd2eb9475f129c_2025_Newsletters%20march.png",
    href: "#"
  },
  {
    id: 4,
    month: "January 2025",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67c3676dc0772575629f95cd_2025_Newsletters%20feb.png",
    href: "#"
  },
  {
    id: 5,
    month: "December 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67c13b51a3357846351d1e3c_2024_Newsletters%20dec.png",
    href: "#"
  },
  {
    id: 6,
    month: "November 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67c13bf0b7ff2cc5c326e3f1_2024_Newsletters%20nov.png",
    href: "#"
  },
  {
    id: 7,
    month: "October 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67230bb566a23c809666d347_2024_Newsletters%20oct.png",
    href: "#"
  },
  {
    id: 8,
    month: "September 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66fa574d673d6538804201b6_2024_Newsletters%20sept.png",
    href: "#"
  },
  {
    id: 9,
    month: "August 2024",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66d7dbadf304d0a9becc2d75_2024_Newsletters%20aug.png",
    href: "#"
  }
];

export function NewslettersGridSection() {
  const [showMore, setShowMore] = useState(false);
  const displayedNewsletters = showMore ? newsletters : newsletters.slice(0, 6);

  return (
    <Section className="py-16">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedNewsletters.map((newsletter) => (
            <Link key={newsletter.id} href={newsletter.href}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={newsletter.image}
                    alt={`${newsletter.month} Newsletter`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy mb-3">
                    {newsletter.month}
                  </h3>
                  <p className="text-sm font-medium text-purple-dark hover:text-purple-mid transition-colors">
                    Read more →
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {!showMore && newsletters.length > 6 && (
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