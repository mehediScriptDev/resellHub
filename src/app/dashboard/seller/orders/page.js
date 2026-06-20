"use client";

import { Package, Search, Eye } from "lucide-react";

export default function SellerOrdersPage() {
  const orders = [
    { id: "ORD-1092", date: "Oct 24, 2026", customer: "John Doe", product: "Samsung Galaxy S22 Ultra", amount: "65,000", status: "Pending" },
    { id: "ORD-1088", date: "Oct 22, 2026", customer: "Jane Smith", product: "Sony A7III Camera Body", amount: "120,000", status: "Shipped" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">View and process incoming purchases.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search orders..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <select className="border rounded-md text-sm px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
        
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
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{order.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 max-w-[200px] truncate">{order.product}</td>
                  <td className="px-6 py-4 font-medium">৳{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      order.status === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline font-medium text-xs flex items-center justify-end gap-1">
                      <Eye className="h-3 w-3" /> View
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
