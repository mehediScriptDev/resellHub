"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

export function SuccessStories() {
  const stories = [
    {
      name: "Ahmed Raza",
      role: "Verified Buyer",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      story: "I found an amazing DSLR camera for half the retail price. The condition was exactly as described and the seller was super helpful!",
      rating: 5,
    },
    {
      name: "Sabrina Rahman",
      role: "Top Rated Seller",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      story: "ReSell Hub helped me clear out my old university textbooks and electronics securely. It's my go-to platform for selling things I no longer need.",
      rating: 5,
    },
    {
      name: "Imran Khan",
      role: "Verified Buyer",
      image: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      story: "The transaction process is incredibly smooth and the support team is responsive. Highly recommended for finding great deals.",
      rating: 5,
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Success Stories</h2>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
            Hear from our community of buyers and sellers who trust ReSell Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={i} 
              className="bg-card p-8 rounded-2xl border shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(story.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-8">"{story.story}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                <div>
                  <h4 className="font-bold text-foreground">{story.name}</h4>
                  <p className="text-xs text-primary font-medium">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
