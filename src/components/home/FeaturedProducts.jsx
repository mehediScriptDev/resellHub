"use client";

import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export function FeaturedProducts() {
  const featured = MOCK_PRODUCTS.slice(0, 10);

  return (
    <section className="py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-base font-bold text-foreground">
            Fresh recommendations
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 items-stretch">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-card border rounded hover:shadow-md transition-shadow flex flex-col group h-full"
            >
              <div className="relative aspect-4/3 bg-muted border-b w-full overflow-hidden shrink-0">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-2 md:p-3 flex flex-col grow">
                <h3 className="font-normal text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary">
                  {product.title}
                </h3>
                <div className="text-primary font-bold text-sm md:text-base mb-2 mt-auto">
                  ৳ {product.price.toLocaleString()}
                </div>

                <div className="flex justify-between items-center text-[10px] md:text-[11px] text-muted-foreground pt-2 border-t">
                  <div className="flex items-center">Dhaka</div>
                  <div className="flex items-center">Just now</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
