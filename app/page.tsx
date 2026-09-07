import { ChallengeCarousel } from "@/components/ChallengeCarousel";
import { CommunityPhotosSection } from "@/components/CommunityPhotosSection";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { IncludedFeatures } from "@/components/IncludedFeatures";
import { LandingAnalytics } from "@/components/LandingAnalytics";
import { MessageSection } from "@/components/MessageSection";
import { PricingSection } from "@/components/PricingSection";
import { SectionRevealController } from "@/components/SectionRevealController";
import { SocialProofSlider } from "@/components/SocialProofSlider";
import { ValueComparisonSection } from "@/components/ValueComparisonSection";

export default function Home() {
  return (
    <main
      className="bg-page-texture w-full text-white"
      data-section-reveal
    >
      <SectionRevealController />
      <LandingAnalytics />
      <HeroSection />
      <ChallengeCarousel />
      <MessageSection />
      <SocialProofSlider />
      <CommunityPhotosSection />
      <IncludedFeatures />
      <HowItWorks />
      <ValueComparisonSection />
      <PricingSection />
      <FaqSection />
      <FloatingWhatsAppButton />
    </main>
  );
}
