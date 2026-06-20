import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FAQ } from "@/components/home/FAQ";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SafetyTips } from "@/components/home/SafetyTips";
import { AppPromo } from "@/components/home/AppPromo";
import { MarketplaceStats } from "@/components/home/MarketplaceStats";
import { SuccessStories } from "@/components/home/SuccessStories";
import { SustainabilityImpact } from "@/components/home/SustainabilityImpact";
import { TrustedSellers } from "@/components/home/TrustedSellers";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20 pb-0">
      <HeroSection />
      <MarketplaceStats />
      <PopularCategories />
      <FeaturedProducts />
      <TrustedSellers />
      <SustainabilityImpact />
      <SuccessStories />
      <HowItWorks />
      <SafetyTips />
      <FAQ />
      <AppPromo />
    </div>
  );
}
