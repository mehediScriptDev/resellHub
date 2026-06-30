"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Smartphone, Monitor, Armchair, CarFront, Shirt, Home,
  Briefcase, HeartPulse, Camera, Baby, Package,
} from "lucide-react";
import api from "@/lib/api";
import { DEFAULT_CATEGORIES } from "@/lib/categories";

const ICON_MAP = {
  Electronics: Monitor,
  "Mobile Phones": Smartphone,
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

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/stats/categories").then(({ data }) => {
      if (data.success && data.data.length > 0) {
        setCategories(data.data);
      } else {
        setCategories(DEFAULT_CATEGORIES.map((name) => ({ name, count: 0 })));
      }
    }).catch(() => {
      setCategories(DEFAULT_CATEGORIES.map((name) => ({ name, count: 0 })));
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">Browse Categories</h1>
        <p className="text-muted-foreground mt-2">Find pre-owned items by category across ReSellHub.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.name] || Package;
          return (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="bg-card border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.count} ads</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
