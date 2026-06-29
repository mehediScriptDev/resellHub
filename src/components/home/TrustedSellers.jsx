"use client";

import { BadgeCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export function TrustedSellers() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    api.get("/stats/sellers").then(({ data }) => {
      if (data.success) setSellers(data.data);
    }).catch(console.error);
  }, []);

  if (sellers.length === 0) return null;

  return (
    <section className="py-20 bg-muted/10 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Trusted Sellers Showcase</h2>
            <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
              Shop with confidence from our highest-rated community members.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              key={seller._id}
              className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative inline-block mb-4">
                <img
                  src={seller.photo || `https://i.pravatar.cc/150?u=${seller._id}`}
                  alt={seller.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-muted group-hover:border-primary/20 transition-colors"
                />
                <BadgeCheck className="w-7 h-7 text-blue-500 fill-white absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
              </div>
              <h3 className="font-bold text-foreground text-lg">{seller.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{seller.category}</p>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                <span className="flex items-center text-yellow-500 font-bold">
                  {seller.salesCount > 10 ? "4.9" : seller.salesCount > 5 ? "4.7" : "4.5"}
                  <Star className="w-4 h-4 ml-1 fill-current" />
                </span>
                <span>•</span>
                <span>{seller.productCount} Listings</span>
              </div>

              <p className="text-xs text-muted-foreground">{seller.salesCount} sales completed</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
