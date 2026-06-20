"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const SELLERS = [
  { id: 1, name: "Tech Haven", category: "Electronics", rating: 4.9, image: "https://i.pravatar.cc/150?img=33" },
  { id: 2, name: "Vintage Styles", category: "Fashion", rating: 4.8, image: "https://i.pravatar.cc/150?img=47" },
  { id: 3, name: "Drive Motors", category: "Vehicles", rating: 4.7, image: "https://i.pravatar.cc/150?img=59" },
  { id: 4, name: "Home Comforts", category: "Furniture", rating: 4.9, image: "https://i.pravatar.cc/150?img=68" },
];

export function TrustedSellers() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Trusted Sellers Showcase</h2>
          <p className="text-muted-foreground mt-2">Buy with confidence from our highly-rated community members.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {SELLERS.map((seller, index) => (
            <motion.div
              key={seller.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="relative inline-block mb-4">
                <img src={seller.image} alt={seller.name} className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-sm" />
                <BadgeCheck className="absolute bottom-0 right-0 w-6 h-6 text-blue-500 fill-white" />
              </div>
              <h3 className="font-bold text-lg">{seller.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{seller.category}</p>
              <div className="inline-flex items-center px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded text-sm font-medium">
                ★ {seller.rating}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
