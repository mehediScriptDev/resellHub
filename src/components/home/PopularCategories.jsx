"use client";

import { Smartphone, Monitor, Armchair, CarFront, Shirt, Home, Briefcase, HeartPulse, Camera, Baby, Package } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

const ICON_MAP = {
  Electronics: Monitor,
  "Mobile Phones": Smartphone,
  Mobiles: Smartphone,
  Vehicles: CarFront,
  Property: Home,
  "Home & Living": Armchair,
  Furniture: Armchair,
  Fashion: Shirt,
  Jobs: Briefcase,
  Pets: HeartPulse,
  Hobbies: Camera,
  Kids: Baby,
};

export function PopularCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/stats/categories").then(({ data }) => {
      if (data.success) setCategories(data.data);
    }).catch(console.error);
  }, []);

  return (
    <section className="pt-8 pb-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border rounded shadow-sm p-4 md:p-6">
          <h2 className="text-base font-bold text-foreground mb-4">Browse items by category</h2>
          {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No categories yet. Be the first to list a product!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-6 gap-x-4">
              {categories.map((cat) => {
                const Icon = ICON_MAP[cat.name] || Package;
                return (
                  <Link
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    key={cat.name}
                    className="flex flex-col items-center group"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/5 transition-colors">
                      <Icon className="w-7 h-7 text-primary/80 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm text-foreground text-center group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{cat.count} ads</p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
