"use client";

import { Heart, Trash2 } from "lucide-react";

export default function BuyerWishlistPage() {
  const mockWishlist = [
    { id: 1, title: "Sony A7III Camera Body", price: "120,000", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { id: 2, title: "Herman Miller Aeron Chair", price: "45,000", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
          <p className="text-muted-foreground text-sm mt-1">Ads you have saved for later.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWishlist.map((item) => (
          <div key={item.id} className="bg-card border rounded-lg shadow-sm overflow-hidden group">
            <div className="relative h-48">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <button className="absolute top-3 right-3 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md text-red-500 hover:bg-red-50 transition-colors">
                <Heart className="h-4 w-4 fill-current" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-foreground mb-2 line-clamp-1">{item.title}</h3>
              <p className="font-bold text-primary text-lg">৳{item.price}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-primary text-primary-foreground text-sm font-bold py-2 rounded hover:bg-primary/90 transition-colors">
                  View Ad
                </button>
                <button className="px-3 border rounded text-muted-foreground hover:bg-muted transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
