import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function PodcastsHeroSection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-purple-dark via-purple-mid to-periwinkle-dark">
      {/* Wave animation background */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 w-full h-64 md:h-96"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255, 255, 255, 0.1)"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,160C672,128,768,96,864,112C960,128,1056,192,1152,202.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              values="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,160C672,128,768,96,864,112C960,128,1056,192,1152,202.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,213.3C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,160C672,128,768,96,864,112C960,128,1056,192,1152,202.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <svg
          className="absolute bottom-0 w-full h-64 md:h-96"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255, 255, 255, 0.05)"
            fillOpacity="1"
            d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,229.3C672,245,768,235,864,213.3C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              values="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,229.3C672,245,768,235,864,213.3C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,234.7C672,245,768,267,864,261.3C960,256,1056,224,1152,202.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,229.3C672,245,768,235,864,213.3C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="py-20 md:py-28">
          <div className="flex flex-col items-center text-center">
            {/* Audio wave visualization */}
            <div className="mb-8 flex items-center gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/60 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 40 + 20}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${Math.random() * 1 + 0.5}s`,
                  }}
                />
              ))}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              She Sharp
            </h1>
            <h2 className="text-6xl md:text-8xl font-bold text-white/90 mb-6">
              Podcasts
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
              Inspiring conversations with women leading innovation in technology
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}