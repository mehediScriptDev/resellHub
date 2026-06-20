"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export function SustainabilityImpact() {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl p-8 md:p-12 border border-emerald-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 font-medium text-sm mb-6">
                <Leaf className="w-4 h-4" /> Eco-Friendly
              </div>
              <h2 className="text-3xl font-bold mb-4">Reduce, Reuse, ReSell</h2>
              <p className="text-muted-foreground mb-6">
                Every second-hand purchase helps reduce carbon emissions, saves water, and keeps usable items out of landfills. Join us in building a sustainable future.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">50k+</div>
                  <div className="text-sm text-muted-foreground">Items Repurposed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-1">10k+</div>
                  <div className="text-sm text-muted-foreground">Tons of CO2 Saved</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-2xl overflow-hidden bg-emerald-100 flex items-center justify-center"
            >
               <Leaf className="w-24 h-24 text-emerald-300" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
