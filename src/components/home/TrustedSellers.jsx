"use client";

import { BadgeCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

export function TrustedSellers() {
  const sellers = [
    { name: "TechHaven BD", category: "Electronics", rating: 4.9, reviews: 342, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Gadget Gear", category: "Mobile Phones", rating: 4.8, reviews: 156, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Vintage Reads", category: "Books", rating: 5.0, reviews: 89, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Home Comforts", category: "Furniture", rating: 4.7, reviews: 210, image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
  ];

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
              key={i} 
              className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="relative inline-block mb-4">
                <img src={seller.image} alt={seller.name} className="w-24 h-24 rounded-full object-cover border-4 border-muted group-hover:border-primary/20 transition-colors" />
                <BadgeCheck className="w-7 h-7 text-blue-500 fill-white absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
              </div>
              <h3 className="font-bold text-foreground text-lg">{seller.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{seller.category}</p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                <span className="flex items-center text-yellow-500 font-bold">
                  {seller.rating} <Star className="w-4 h-4 ml-1 fill-current" />
                </span>
                <span>•</span>
                <span>{seller.reviews} Reviews</span>
              </div>
              
              <button className="w-full py-2 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground text-sm font-bold rounded-lg transition-colors">
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
