"use client";

import { Smartphone, Monitor, Armchair, CarFront, Shirt, Home, Briefcase, HeartPulse, Camera, Baby } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { name: "Mobiles", icon: Smartphone, ads: "55,213" },
  { name: "Electronics", icon: Monitor, ads: "22,109" },
  { name: "Vehicles", icon: CarFront, ads: "12,340" },
  { name: "Property", icon: Home, ads: "9,840" },
  { name: "Home & Living", icon: Armchair, ads: "16,290" },
  { name: "Fashion", icon: Shirt, ads: "25,102" },
  { name: "Jobs", icon: Briefcase, ads: "4,432" },
  { name: "Pets", icon: HeartPulse, ads: "2,943" },
  { name: "Hobbies", icon: Camera, ads: "8,210" },
  { name: "Kids", icon: Baby, ads: "5,300" },
];

export function PopularCategories() {
  return (
    <section className="pt-8 pb-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border rounded shadow-sm p-4 md:p-6">
          <h2 className="text-base font-bold text-foreground mb-4">Browse items by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-6 gap-x-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link href="/products" key={cat.name} className="flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/5 transition-colors">
                    <Icon className="w-7 h-7 text-primary/80 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm text-foreground text-center group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{cat.ads} ads</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
