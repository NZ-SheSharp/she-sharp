import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

export function NewslettersHeroSection() {
  return (
    <Section className="relative overflow-hidden bg-navy-dark">
      {/* Typography pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.1) 35px,
            rgba(255, 255, 255, 0.1) 36px
          ), repeating-linear-gradient(
            90deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.1) 35px,
            rgba(255, 255, 255, 0.1) 36px
          )`
        }} />
      </div>

      {/* Floating typography elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl font-bold text-white/5 transform -rotate-12">NEWS</div>
        <div className="absolute top-40 right-20 text-8xl font-bold text-white/5 transform rotate-6">TECH</div>
        <div className="absolute bottom-20 left-1/3 text-7xl font-bold text-white/5 transform -rotate-6">INSPIRE</div>
        <div className="absolute bottom-40 right-10 text-5xl font-bold text-white/5 transform rotate-12">CONNECT</div>
      </div>

      <Container className="relative z-10">
        <div className="py-24 md:py-32">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-periwinkle-dark text-white border-0">
              Monthly Publication
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              She Sharp
              <span className="block text-periwinkle-light">Newsletters</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Your monthly dose of tech insights, career advice, and inspiring stories from women shaping the future of technology.
            </p>

            <div className="flex flex-wrap gap-4 text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-periwinkle-dark rounded-full" />
                <span>Industry Trends</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-mid rounded-full" />
                <span>Career Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-mint-dark rounded-full" />
                <span>Success Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-periwinkle-light rounded-full" />
                <span>Event Highlights</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}