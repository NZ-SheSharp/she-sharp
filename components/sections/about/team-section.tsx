import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const teamMembers = [
  {
    name: "Mahsa McCauley (Mohaghegh)",
    roles: ["Trustee", "Ambassador", "Founder and Chair"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64811ab760ae807f1dc87e65_Team_1_Masha.png",
    description: "Dr Mahsa McCauley is a Senior Lecturer and Director of Women in Tech in AUT's School of Computer, Engineering, and..."
  },
  {
    name: "Mike McCauley",
    roles: ["Trustee", "Ambassador", "Assets Manager"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/64811c5d42437e3bb5b152b3_Team_2_Mike.png",
    description: "Mike is a Digital Delivery Manager on the ICT Leadership team at Metlifecare, where he oversees the strategy and delivery of..."
  },
  {
    name: "Raquel Anne Maderazo",
    roles: ["Ambassador", "Event Manager"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66d6b441043c6ce5cc64bcdb_Raquel.png",
    description: "Raquel is a certified Project Management Professional (PMP®) with a master's degree in IT Project Management from AUT..."
  },
  {
    name: "Sabrina Teoh",
    roles: ["Ambassador", "Event Manager"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66d7e895dccee90db8608d3e_Sabrina.png",
    description: "Sabrina is a product development engineer at FPH, known for her passion for learning and self-improvement. She thrives on diverse..."
  },
  {
    name: "Isha Sangrolkar",
    roles: ["Ambassador", "Website Lead"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/670e25e2f9fe2264ba4018d8_image%20(1).png",
    description: "Isha is pursuing her Master of Computer and Information Sciences degree at AUT, focusing on expanding her expertise in the field. With a..."
  },
  {
    name: "Iuliia Shmykova",
    roles: ["Ambassador", "Data Insight Manager"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6522343c421d58adf9529c1f_IIulia.png",
    description: "Iuliia is currently pursuing her Master's degree in IT Project Management at AUT, having shifted from Financial Analytics to the Product..."
  },
  {
    name: "Alyssa Pausanos",
    roles: ["Ambassador", "Website Maintenance"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67229f74af4304fe122b5273_Alyssa.png",
    description: "Alyssa is a first class BE (Hons) software engineering graduate from Auckland University of Technology, passionate about empowering more..."
  },
  {
    name: "Meeta Patel",
    roles: ["Ambassador", "Industry"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66d67ca7e3a1ff33201a2c10_Meeta.png",
    description: "Dr. Meeta Patel is an experienced scientist with over 20 years of research expertise. As a Senior Scientist and Sustainability Lead at..."
  },
  {
    name: "Neda Stefanovic",
    roles: ["Ambassador", "Content Creator"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/666951eddd9fcebde4e63dfc_Neda.png",
    description: "Neda is currently in the final year of studies at AUT, working towards completing a Bachelor of Science degree in Molecular..."
  },
  {
    name: "Gowri Lokesh",
    roles: ["Ambassador", "Digital Designer"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67229d32b8ee169914b78ecc_Gowri%20(1).png",
    description: "Meet Gowri! After spending two dedicated years as a quality analyst in network security, Gowri realized that her true passion wasn't just..."
  },
  {
    name: "Sara Ghafoor",
    roles: ["Ambassador", "Secretary"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/652774fc247ee7d771e65d2c_Sara.png",
    description: "Sara is an electrical engineering graduate currently pursuing a master's in computer information sciences, effectively bridging insights..."
  },
  {
    name: "Ania Migdałek-Jabłońska",
    roles: ["Ambassador"],
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6796cd0279f5325b87cc5966_Ania.png",
    description: "Ania brings years of experience to the digital marketing space, with a proven ability to launch and drive growth. Her approach..."
  }
];

export function TeamSection() {
  return (
    <Section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy">Meet Our People</h2>
          <p className="mt-4 text-lg text-gray-600">
            The passionate team behind She Sharp
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-1 mb-3">
                  {member.roles.map((role) => (
                    <Badge key={role} variant="secondary" className="mr-2 mb-1">
                      {role}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-semibold text-lg text-navy">{member.name}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {member.description}
                </p>
                <button className="mt-4 text-sm font-medium text-purple-dark hover:text-purple-mid transition-colors">
                  Learn more →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}