import { ChallengeCarousel } from "@/components/ChallengeCarousel";
import { FadeInSection } from "@/components/FadeInSection";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { IncludedFeatures } from "@/components/IncludedFeatures";
import { MessageSection } from "@/components/MessageSection";
import { PricingSection } from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="bg-page-texture w-full overflow-hidden text-white">
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
      <FloatingWhatsAppButton />
    </main>
  );
}
