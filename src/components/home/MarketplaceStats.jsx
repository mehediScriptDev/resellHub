"use client";

import { motion } from "framer-motion";
import { Users, ShoppingBag, Store, CheckCircle } from "lucide-react";

const STATS = [
  { label: "Total Products", value: "15,000+", icon: ShoppingBag },
  { label: "Total Sellers", value: "2,500+", icon: Store },
  { label: "Total Buyers", value: "50,000+", icon: Users },
  { label: "Completed Orders", value: "120,000+", icon: CheckCircle },
];

export function MarketplaceStats() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto w-12 h-12 mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
