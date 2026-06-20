"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const STORIES = [
  {
    id: 1,
    name: "Rakib Hasan",
    role: "Buyer",
    content: "I found an amazing laptop at half the price! The seller was verified and the product was exactly as described.",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Seller",
    content: "Selling my old furniture was incredibly fast. The platform connected me with local buyers in just a few days.",
    image: "https://i.pravatar.cc/150?img=5"
  }
];

export function SuccessStories() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground">Success Stories</h2>
          <p className="text-muted-foreground mt-2">Hear from our community of buyers and sellers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STORIES.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card p-8 rounded-2xl shadow-sm border relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
              <p className="text-lg text-foreground italic mb-6">"{story.content}"</p>
              <div className="flex items-center gap-4">
                <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold">{story.name}</h4>
                  <span className="text-sm text-primary">{story.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
