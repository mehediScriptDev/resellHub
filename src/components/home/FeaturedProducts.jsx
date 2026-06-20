"use client";

import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { MapPin, Clock } from "lucide-react";

export function FeaturedProducts() {
  const featured = MOCK_PRODUCTS.slice(0, 10);

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Fresh Recommendations</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {featured.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all flex flex-col group">
              <div className="relative aspect-[4/3] bg-muted border-b border-border/50 overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <div className="text-primary font-black text-lg mb-4 tracking-tight">৳ {product.price.toLocaleString()}</div>
                
                <div className="mt-auto flex justify-between items-center text-xs text-muted-foreground font-medium">
                   <div className="flex items-center">
                      Dhaka
                   </div>
                   <div className="flex items-center">
                      Just now
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
