"use client";

import { Search, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

const STATUS_OPTIONS = ["all", "pending", "accepted", "processing", "shipped", "delivered", "cancelled"];

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const { data } = await api.get(`/orders/seller?${params}`);
      if (data.success) setOrders(data.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchOrders, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await api.put(`/orders/${orderId}/status`, { status });
      if (data.success) {
        setOrders((prev) => prev.map((o) => (o._id === orderId ? data.data : o)));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">View and process incoming purchases.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b flex flex-wrap gap-4 justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md text-sm px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">{order._id.slice(-8)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{order.buyerId?.name}</td>
                    <td className="px-6 py-4 max-w-[200px] truncate">{order.productId?.title}</td>
                    <td className="px-6 py-4 font-medium">৳{order.totalAmount?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 capitalize">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {order.orderStatus === "pending" && (
                        <button onClick={() => updateStatus(order._id, "accepted")} className="text-primary hover:underline text-xs mr-2">Accept</button>
                      )}
                      {order.orderStatus === "accepted" && (
                        <button onClick={() => updateStatus(order._id, "shipped")} className="text-primary hover:underline text-xs mr-2">Ship</button>
                      )}
                      {order.orderStatus === "shipped" && (
                        <button onClick={() => updateStatus(order._id, "delivered")} className="text-primary hover:underline text-xs">Deliver</button>
                      )}
                    </td>
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
