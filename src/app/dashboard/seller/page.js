"use client";

import { Package, ShoppingBag, CreditCard, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function SellerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/seller");
        if (data.success) {
          setOrders(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch seller orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Seller Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground text-sm">Total Products</h3>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><ShoppingBag className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold">{orders.length}</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground text-sm">Total Sales</h3>
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Package className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold">{orders.filter(o => o.orderStatus === "Delivered").length}</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground text-sm">Total Revenue</h3>
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg"><CreditCard className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold">৳ {orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()}</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground text-sm">Pending Orders</h3>
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg"><Clock className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold">{orders.filter(o => o.orderStatus === "Pending").length}</div>
        </div>
      </div>
      
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
         <h2 className="text-lg font-bold mb-4">Recent Orders Waiting For Action</h2>
         {loading ? (
           <div className="py-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
         ) : orders.length === 0 ? (
           <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
              No recent orders found.
           </div>
         ) : (
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="text-muted-foreground bg-muted">
                 <tr>
                   <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                   <th className="px-4 py-3">Product</th>
                   <th className="px-4 py-3">Date</th>
                   <th className="px-4 py-3">Status</th>
                   <th className="px-4 py-3 rounded-r-lg">Amount</th>
                 </tr>
               </thead>
               <tbody>
                 {orders.map((order) => (
                   <tr key={order._id} className="border-b last:border-0 hover:bg-muted/30">
                     <td className="px-4 py-4 font-medium truncate max-w-[100px]">{order._id}</td>
                     <td className="px-4 py-4 truncate max-w-[200px]">{order.productId?.title}</td>
                     <td className="px-4 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                     <td className="px-4 py-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-600 rounded text-xs font-semibold">{order.orderStatus}</span></td>
                     <td className="px-4 py-4 font-bold">৳{order.totalAmount?.toLocaleString()}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         )}
      </div>
    </div>
  );
}
