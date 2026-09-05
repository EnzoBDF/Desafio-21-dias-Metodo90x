import { ChallengeCarousel } from "@/components/ChallengeCarousel";
import { CommunityPhotosSection } from "@/components/CommunityPhotosSection";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { IncludedFeatures } from "@/components/IncludedFeatures";
import { MessageSection } from "@/components/MessageSection";
import { PricingSection } from "@/components/PricingSection";
import { SectionRevealController } from "@/components/SectionRevealController";
import { SocialProofSlider } from "@/components/SocialProofSlider";

export default function Home() {
  return (
    <main
      className="bg-page-texture w-full text-white"
      data-section-reveal
    >
      <SectionRevealController />
      <HeroSection />
      <ChallengeCarousel />
      <MessageSection />
      <SocialProofSlider />
      <CommunityPhotosSection />
      <IncludedFeatures />
      <HowItWorks />
      <PricingSection />
      <FaqSection />
      <FloatingWhatsAppButton />
    </main>
  );
}
