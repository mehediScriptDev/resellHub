"use client";

import { Users, ShoppingBag, ShoppingCart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function MarketplaceStats() {
  const stats = [
    { title: "Total Products", value: "24,500+", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Total Sellers", value: "1,200+", icon: Users, color: "text-green-500", bg: "bg-green-100" },
    { title: "Total Buyers", value: "15,400+", icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-100" },
    { title: "Completed Orders", value: "32,100+", icon: CheckCircle, color: "text-orange-500", bg: "bg-orange-100" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Marketplace Statistics</h2>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
            Join the fastest growing second-hand community in the country.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={i} variants={itemVariants} className="text-center p-6 bg-muted/30 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center ${stat.bg} mb-4`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.title}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
