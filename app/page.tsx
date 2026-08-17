import { ChallengeCarousel } from "@/components/ChallengeCarousel";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { IncludedFeatures } from "@/components/IncludedFeatures";
import { MessageSection } from "@/components/MessageSection";
import { PricingSection } from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="bg-page-texture w-full overflow-hidden text-white">
      <HeroSection />
      <ChallengeCarousel />
      <MessageSection />
      <IncludedFeatures />
      <HowItWorks />
      <PricingSection />
      <FloatingWhatsAppButton />
    </main>
  );
}
