"use client";

import { Search, MapPin, Eye, AlertCircle } from "lucide-react";

export default function AdminOrdersPage() {
  const orders = [
    { id: "ORD-9912", date: "Oct 25, 2026", amount: "35,000", buyer: "Rakib Hasan", seller: "TechHaven", status: "Processing" },
    { id: "ORD-9905", date: "Oct 23, 2026", amount: "5,000", buyer: "John Doe", seller: "Scammer123", status: "Disputed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Global Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor platform-wide transactions and resolve disputes.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b flex flex-wrap gap-4 justify-between items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search Order ID..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <select className="border rounded-md text-sm px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Disputed</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Buyer</th>
                <th className="px-6 py-4">Seller</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{order.id}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.buyer}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.seller}</td>
                  <td className="px-6 py-4 font-bold">৳{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 w-max ${
                      order.status === "Disputed" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {order.status === "Disputed" && <AlertCircle className="w-3 h-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline font-medium text-xs flex items-center justify-end gap-1">
                      <Eye className="h-3 w-3" /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
