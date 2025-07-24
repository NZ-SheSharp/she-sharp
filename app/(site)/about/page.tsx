"use client";

import { AboutHeroSection } from "@/components/sections/about/about-hero-section";
import { StatsDashboard } from "@/components/sections/about/stats-dashboard";
import { TeamSection } from "@/components/sections/about/team-section";
import { TimelineSection } from "@/components/sections/about/timeline-section";
import { ValuesCollageSection } from "@/components/sections/about/values-collage-section";
import { VolunteerSection } from "@/components/sections/about/volunteer-section";
import { PartnersCloudSection } from "@/components/sections/about/partners-cloud-section";
import { AboutCTASection } from "@/components/sections/about/about-cta-section";
import { AnimatedWrapper } from "@/components/sections/about/animated-wrapper";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";

export default function AboutPage() {
  // 使用自定义 hook 处理 hash 滚动
  useScrollToHash();

  return (
    <>
      <AboutHeroSection />
      
      <AnimatedWrapper animation="fade-up">
        <StatsDashboard />
      </AnimatedWrapper>
      
      <div id="team">
        <AnimatedWrapper animation="fade-up" delay={100}>
          <TeamSection />
        </AnimatedWrapper>
      </div>
      
      <AnimatedWrapper animation="fade-up" delay={150}>
        <TimelineSection />
      </AnimatedWrapper>
      
      <AnimatedWrapper animation="fade-up" delay={200}>
        <ValuesCollageSection />
      </AnimatedWrapper>
      
      <AnimatedWrapper animation="fade-up" delay={250}>
        <VolunteerSection />
      </AnimatedWrapper>
      
      <AnimatedWrapper animation="fade-up" delay={300}>
        <PartnersCloudSection />
      </AnimatedWrapper>
      
      <AboutCTASection />
    </>
  );
}