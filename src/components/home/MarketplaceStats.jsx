"use client";

import { Users, ShoppingBag, ShoppingCart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export function MarketplaceStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/stats/public").then(({ data }) => {
      if (data.success) setStats(data.data);
    }).catch(console.error);
  }, []);

  const items = stats
    ? [
        { title: "Total Products", value: stats.totalProducts.toLocaleString(), icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-100" },
        { title: "Total Sellers", value: stats.totalSellers.toLocaleString(), icon: Users, color: "text-green-500", bg: "bg-green-100" },
        { title: "Total Buyers", value: stats.totalBuyers.toLocaleString(), icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-100" },
        { title: "Completed Orders", value: stats.completedOrders.toLocaleString(), icon: CheckCircle, color: "text-orange-500", bg: "bg-orange-100" },
      ]
    : [];

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Marketplace Statistics</h2>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
            Join the fastest growing second-hand community in the country.
          </p>
        </div>

        {!stats ? (
          <div className="text-center text-muted-foreground py-8">Loading statistics...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {items.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-muted/30 rounded-2xl border border-border hover:shadow-lg transition-shadow"
                >
                  <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center ${stat.bg} mb-4`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.title}</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
