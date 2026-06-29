"use client";

import { Heart, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function BuyerWishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get("/wishlist");
      if (data.success) setWishlist(data.data);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWishlist(); }, []);

  const removeItem = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
        <p className="text-muted-foreground text-sm mt-1">Ads you have saved for later.</p>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
          Your wishlist is empty. <Link href="/products" className="text-primary hover:underline">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-card border rounded-lg shadow-sm overflow-hidden group">
              <div className="relative h-48">
                <img src={item.images?.[0] || ""} alt={item.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeItem(item._id)}
                  className="absolute top-3 right-3 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2 line-clamp-1">{item.title}</h3>
                <p className="font-bold text-primary text-lg">৳{item.price?.toLocaleString()}</p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/products/${item._id}`}
                    className="flex-1 bg-primary text-primary-foreground text-sm font-bold py-2 rounded hover:bg-primary/90 transition-colors text-center"
                  >
                    View Ad
                  </Link>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="px-3 border rounded text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
