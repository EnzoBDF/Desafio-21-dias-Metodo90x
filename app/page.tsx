import { ChallengeCarousel } from "@/components/ChallengeCarousel";
import { FadeInSection } from "@/components/FadeInSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { IncludedFeatures } from "@/components/IncludedFeatures";
import { MessageSection } from "@/components/MessageSection";
import { PricingSection } from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-[#1f1f1f] text-white">
      <FadeInSection>
        <HeroSection />
      </FadeInSection>
      <FadeInSection delay={80}>
        <ChallengeCarousel />
      </FadeInSection>
      <FadeInSection delay={80}>
        <MessageSection />
      </FadeInSection>
      <FadeInSection delay={80}>
        <IncludedFeatures />
      </FadeInSection>
      <FadeInSection delay={80}>
        <HowItWorks />
      </FadeInSection>
      <FadeInSection delay={80}>
        <PricingSection />
      </FadeInSection>
    </main>
  );
}
