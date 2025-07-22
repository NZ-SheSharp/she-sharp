import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const photos = [
  {
    src: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/64bb9496356882b94962ea96_20230428180106_IMG_5870%20(1)%201.png",
    alt: "She Sharp event photo 1"
  },
  {
    src: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/64bb9282bdc6d35c9c244e82_Hackathon-Sept2022-91%201.png",
    alt: "She Sharp hackathon photo"
  },
  {
    src: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/64bb97cd4e3f4165f114551d_Hackathon-Sept2022-57%201.png",
    alt: "She Sharp hackathon participants"
  }
];

export function PhotoGallerySection() {
  return (
    <Section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          Photos from She Sharp events
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" className="text-purple-dark border-purple-dark hover:bg-purple-light">
            <Link href="/media/photo-gallery">View Gallery</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}