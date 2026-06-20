import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20 pb-12">
      <HeroSection />
      <PopularCategories />
      <FeaturedProducts />
    </div>
  );
}
