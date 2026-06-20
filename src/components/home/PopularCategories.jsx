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
    <section className="pt-16 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-foreground mb-8 tracking-tight">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link href="/products" key={cat.name} className="flex flex-col items-center group bg-card p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-bold text-foreground text-center group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{cat.ads} ads</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
