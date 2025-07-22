import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function AboutHeroSection() {
  return (
    <Section className="bg-gradient-to-r from-purple-light to-periwinkle-light py-20">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl md:text-6xl">
            Bridging the Gender Gap in STEM
          </h1>
          <div className="mt-8 space-y-6 text-lg text-gray-700">
            <p>
              She Sharp is a nonprofit founded in 2014 with the mission to bridge 
              the gender gap in the STEM industry, one woman at a time.
            </p>
            <p>
              As the Director of She Sharp, I am proud to lead an organization 
              dedicated to empowering women in tech. Despite women making up over 
              half of the population, they represent only 20% of roles in STEM fields.
            </p>
            <p>
              At She Sharp, we strive to connect women with female role models, 
              host workshops, and dispel misconceptions about the industry. We aim 
              to create an inclusive environment that empowers women to pursue their 
              passions in tech. We provide a platform for women in STEM to network 
              and develop skills, breaking down barriers and creating a more diverse 
              industry.
            </p>
            <p className="font-semibold">
              Join us in changing the face of tech!
            </p>
            <p className="text-base italic text-gray-600">
              Dr. Mahsa McCauley, Founder and Director at She Sharp.
            </p>
          </div>
          <div className="mt-12">
            <div className="aspect-w-16 aspect-h-9 mx-auto max-w-3xl">
              <iframe
                className="w-full h-full rounded-lg shadow-xl"
                src="https://www.youtube.com/embed/s9oxO8nH8po?start=2"
                title="SheSharp - Our Journey, Our Purpose!"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}