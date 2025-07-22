import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const mentors = [
  {
    name: "Aishvarya Saraf",
    role: "Human Resources Manager (Advisory) - Fiserv",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65f0b7c3161799543612526c_Aishvarya%20Photo.jpg",
    description: "Aishvarya, a Human Resources Manager at Fiserv, has a people-centric approach and believes in the correlation between..."
  },
  {
    name: "Alana Hoponoa",
    role: "Cloud Services, Sales and FinOps Consultant - OSS Group Ltd",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66e4f54c5fb03ae45239d90e_Alana%20Photo.jpg",
    description: "Alana is a passionate and driven ICT professional, currently working as a Cloud Services, Sales, and FinOps..."
  },
  {
    name: "Anshu Maharaj",
    role: "Product Manager - MYOB",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65f7d581ab77ff98f436f102_Anshu%20Photo.jpg",
    description: "Anshu is a highly experienced product manager with over 20 years of experience in managing products for Enterprise SaaS..."
  },
  {
    name: "Donna Chamberlain",
    role: "Senior Business Solutions Manager - Fisher & Paykel Healthcare",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65e53d5bb5ef17c52bf98dcf_Donna%20Photo.jpg",
    description: "Donna Chamberlain, as Senior Business Solutions Manager at Fisher & Paykel Healthcare and NZSUG Treasurer, expertly..."
  }
];

export function MentorsPreviewSection() {
  return (
    <Section className="py-16">
      <Container>
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          SOME OF OUR MENTORS
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mentors.map((mentor) => (
            <Card key={mentor.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-2">{mentor.role}</p>
                <h3 className="font-semibold text-navy mb-2">{mentor.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {mentor.description}
                </p>
                <button className="text-sm font-medium text-purple-dark hover:text-purple-mid transition-colors">
                  Learn more
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="text-purple-dark border-purple-dark hover:bg-purple-light">
            <Link href="/mentorship/mentors">View All Mentors</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}