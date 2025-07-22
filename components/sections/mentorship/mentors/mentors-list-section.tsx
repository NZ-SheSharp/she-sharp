import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
  },
  {
    name: "Farhan Sattar",
    role: "Technical Trainer - Microsoft",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66011a4d5ec3e645d1508707_Farhan%20Photo.jpg",
    description: "With over 25 years in the IT industry, Farhan is a seasoned Business Program Manager and Learning & Development..."
  },
  {
    name: "Kriv Naicker",
    role: "Managing Director - Synaptec NZ",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66f5f00b3944ec082bf229cb_Kriv%20Photo%20(1).jpg",
    description: "Kriv Naicker is the Founder and Managing Director of Synaptec – an innovation and strategy advisory organisation that..."
  },
  {
    name: "Laura Rutherfurd",
    role: "Risk & Compliance Manager - MYOB",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67dcc2787ef23b701467071a_Laura%20Photo.jpg",
    description: "Laura is dedicated to helping customers thrive by simplifying business processes for internal and external stakeholders. As a..."
  },
  {
    name: "Mahsa McCauley (Mohaghegh)",
    role: "Founder/Director - She Sharp",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65f0a4636161c0e53f5267ee_Mahsa%20Photo%20(3).jpg",
    description: "Dr Mahsa McCauley is a Senior Lecturer and Director of Women in Tech in AUT's School of Computer, Engineering, and..."
  },
  {
    name: "Meena Vallabh",
    role: "General Manager - Services Development at Stroke Foundation of New Zealand",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6826f5bdf7fa544c51e1fb74_Meena%20Photo.jpg",
    description: "Meena joined Stroke Aotearoa New Zealand in 2024. She has over 25 years in health..."
  },
  {
    name: "Meeta Patel",
    role: "Technical Advisor - Freelance",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/6602333b1f0943e4ca77cdae_Meeta%20Photo%20(1).jpg",
    description: "Having worked as a research scientist for most of her career at Scion, and served as NanoLayr's Senior Scientist and..."
  },
  {
    name: "Mehwish Hasan",
    role: "ICT leader - ACG Schools",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66e4f6c822fd5a8e2a0ace27_Mehwish%20Photo.jpg",
    description: "Mehwish Hasan, a devoted educator, and the Computer Science Curriculum Leader at ACG Sunderland in Auckland..."
  },
  {
    name: "Midu Chandra",
    role: "General Manager - Datacom",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66d789e3800fba6d4a4cb025_Midu%20Photo.jpg",
    description: "Midu has been working within the strategy, product, technology, marketing, and digital industries across Australia and..."
  },
  {
    name: "Prasanth Pavithran",
    role: "Senior Business Analyst - Office of the CTO at AUT",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67ee141cce99e214bc54b91f_Prasanth%20Photo.jpg",
    description: "Prasanth is an experienced Information Technology and Management professional with over 23 years of global experience..."
  },
  {
    name: "Shree Jaiswal",
    role: "Enterprise Account Manager - MYOB",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/67e5e25efc94d5320319d873_Shree%20Photo.jpg",
    description: "Shree Jaiswal is a dynamic Enterprise Account Manager at MYOB, with extensive experience in sales, account management..."
  },
  {
    name: "Shweta Sharma",
    role: "Product Owner | Business Consultant - Quanton",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/66e4fba3ec07c3fa3fd4bf96_Shweta%20Photo.jpg",
    description: "Shweta is a Product Owner and Consultant at Quanton, leading AI Product Services with a focus on Business..."
  },
  {
    name: "Steffie López",
    role: "Chief of Staff to the CIO - Fonterra",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65efd0d35637569fe2814aab_Stephanie%20Photo.jpg",
    description: "Steffie is the Chief of Staff for IT at Fonterra. We serve our 10,500 farmer owners with digital solutions..."
  },
  {
    name: "Tracey Connor",
    role: "Digital Test and Release Manager - Fonterra",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65efd23750b6ef0921c40f00_Tracey%20Photo.jpg",
    description: "Tracey has 15+ years' experience as an IT people, thought and technical leader across Test, Release, Development, Build and..."
  },
  {
    name: "Yvonne Weidemann",
    role: "Business Analyst - MYOB",
    image: "https://cdn.prod.website-files.com/646ab5895264c7470e0c89f5/65f93c30c7cfd863ae48258e_Yvonne%20Photo.jpg",
    description: "Yvonne is a versatile Business Analyst specialising in Requirements Gathering, Process Improvement, and..."
  }
];

export function MentorsListSection() {
  return (
    <Section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-navy text-center mb-12">
          SOME OF OUR MENTORS
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{mentor.role}</p>
                <h3 className="font-semibold text-navy mb-2">{mentor.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {mentor.description}
                </p>
                <button className="text-sm font-medium text-purple-dark hover:text-purple-mid transition-colors">
                  Learn more
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}