import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FAQ } from "@/components/home/FAQ";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SafetyTips } from "@/components/home/SafetyTips";
import { AppPromo } from "@/components/home/AppPromo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20 pb-0">
      <HeroSection />
      <PopularCategories />
      <FeaturedProducts />
      <HowItWorks />
      <SafetyTips />
      <FAQ />
      <AppPromo />
    </div>
  );
}
