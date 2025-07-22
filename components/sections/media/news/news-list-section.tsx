import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "2024 New Zealand Community of the Year Semi-Finalists",
    date: "January 2024",
    description: "She Sharp is proud to announce that our Founder/Director Mahsa McCauley was named as a Semi-Finalist in the New Zealand Community of the year.",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65a49c11fa8bb9093855aebd_nzcommunityAward.png",
    href: "#"
  },
  {
    id: 2,
    title: "Women in Security Award 2023",
    date: "November 2023",
    description: "SheSharp is proud to announce that our Founder/Director Mahsa McCauley was named as a the Unsung Heroes at the 2023 Women in Security Awards!",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65bb25d48049d4f4ebdd3094_IMG_1468.jpg",
    href: "#"
  },
  {
    id: 3,
    title: "Finalists of Diversity Awards NZ",
    date: "August 2023",
    description: "She Sharp is proud to announce that our Founder/Director Mahsa McCauley, PhD was named as a Finalist of Diversity Awards NZ",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65a49c7147224ebbb474faaa_Diversity%20Award.png",
    href: "#"
  },
  {
    id: 4,
    title: "Finalist in the Women Leading Tech Awards in the Mentor category",
    date: "March 2023",
    description: "She Sharp is proud to announce that our Founder/Director Mahsa McCauley, PhD was named as a Finalist in the Women Leading Tech...",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64938f0ed0bd98ba0f7a1c90_finalist-metor.png",
    href: "#"
  },
  {
    id: 5,
    title: "NZ Women in Security Awards",
    date: "November 2022",
    description: "She Sharp won in the \"Best Industry Initiative that Supports Diversity, Inclusion and Equality\" at the NZ Women in Security Awards 2022...",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64938e649e000b0c78a541b4_Image%204_3.png",
    href: "#"
  },
  {
    id: 6,
    title: "Finalist in Community Tech Champions at CIO Awards NZ",
    date: "October 2021",
    description: "She Sharp runs events, workshops, and networking opportunities responding to the enduring gender imbalance across STEM...",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64938ce7a663b5f88ba36ea3_Press%20Tile%201_2021.png",
    href: "#"
  },
  {
    id: 7,
    title: "Diversity Awards NZ 2019: Small Organisation Excellence Award",
    date: "October 2019",
    description: "Just 3% of 15 year old girls attending New Zealand high schools consider technology a possible career option...",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/649cb3689f78cd4c6f728bc6_Diversity%20Awards%20photo-min.jpg",
    href: "#"
  }
];

export function NewsListSection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[16/9]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                <h3 className="font-semibold text-lg text-navy mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-purple-dark hover:text-purple-mid">
                  <Link href={item.href}>Read More →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}