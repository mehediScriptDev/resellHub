"use client";

import { Package, Heart, CreditCard, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function BuyerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/buyer");
        if (data.success) {
          setOrders(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Buyer Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Total Orders</h3>
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Package className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">{orders.length}</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Wishlist Items</h3>
            <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl"><Heart className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">0</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Payments Made</h3>
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><CreditCard className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">{orders.length}</div>
        </div>
      </div>
      
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
         <h2 className="text-lg font-bold mb-4">Recent Purchases</h2>
         {loading ? (
            <div className="py-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
         ) : orders.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
               No recent purchases found.
            </div>
         ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-muted/30 transition">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden shrink-0">
                    <img src={order.product?.images?.[0] || ""} alt={order.product?.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-1">{order.product?.title}</h4>
                    <p className="text-sm text-muted-foreground">Status: <span className="text-primary font-medium">{order.status}</span></p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="font-bold text-lg">৳{order.amount?.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
         )}
      </div>
    </div>
  );
}
