import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const volunteerOptions = [
  {
    icon: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/648642dac44436f6a72135db_purple-2.png",
    title: "Help with Events",
    description: [
      "Throughout the year, we host our own events and raise She Sharp's profile and our mission to bridge the gender gap by attending industry conferences like the Tomorrow Expo and MOTAT's STEM Fair.",
      "These volunteers roles are selected on a per-event basis—perfect if you want to get more involved with She Sharp a handful of times a year."
    ]
  },
  {
    icon: "https://cdn.prod.website-files.com/646193fdf4af9a2a791b1555/648642dbd8da4bb3196bd36d_periwinkle-half-circle.png",
    title: "Help with operations behind the scenes",
    description: [
      "Our Ambassadors are involved in running She Sharp as a nonprofit organisation all year round—think shaping our events, engaging with our community, and She Sharp's digital marketing.",
      "We recruit Ambassadors every February. If you're passionate about She Sharp's work and are keen to volunteer on a weekly basis, be sure to apply!"
    ]
  }
];

export function VolunteerOptionsSection() {
  return (
    <Section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          Ways you can volunteer
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {volunteerOptions.map((option) => (
            <Card key={option.title}>
              <CardHeader className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src={option.icon}
                    alt={option.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-xl text-navy">{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {option.description.map((paragraph, index) => (
                    <p key={index} className="text-gray-700">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}