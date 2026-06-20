"use client";

import { Leaf, Recycle, TreePine } from "lucide-react";
import { motion } from "framer-motion";

export function SustainabilityImpact() {
  return (
    <section className="py-20 bg-green-50 dark:bg-green-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-6">
              Shop Second-Hand. <span className="text-green-600">Save the Planet.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every item you buy or sell on ReSell Hub contributes to a more sustainable future. 
              By choosing pre-owned products, you are directly reducing electronic waste, carbon emissions, and the demand for new manufacturing.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg text-green-600 dark:text-green-400">
                  <Recycle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">Reduce E-Waste</h4>
                  <p className="text-muted-foreground text-sm">Extending the life of electronics prevents harmful toxins from entering landfills.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg text-green-600 dark:text-green-400">
                  <TreePine className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">Lower Carbon Footprint</h4>
                  <p className="text-muted-foreground text-sm">Manufacturing new products generates significant CO2. Buying used skips this step entirely.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Sustainability" 
              className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border flex items-center gap-4">
              <div className="bg-green-500 rounded-full p-4 text-white">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-foreground">12,000+</p>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Items Rescued</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
