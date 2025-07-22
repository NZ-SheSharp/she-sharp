import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const donationOptions = [
  {
    amount: "$10",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6493c750801c0b39bda09398_1.png"
  },
  {
    amount: "$25",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6493c74486f5aee5f1f3129d_2.png"
  },
  {
    amount: "$50",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6493c738ab3e06b4b34247ab_3.png"
  },
  {
    amount: "$100",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6493c71cb056b3b1046976b1_4.png"
  }
];

export function DonationOptionsSection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationOptions.map((option) => (
            <Card key={option.amount} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={option.image}
                    alt={`Donate ${option.amount}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-3xl font-bold text-purple-dark mb-4">
                  {option.amount}
                </h3>
                <Button asChild className="w-full bg-purple-dark hover:bg-purple-mid">
                  <Link href="/checkout">Donate Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}