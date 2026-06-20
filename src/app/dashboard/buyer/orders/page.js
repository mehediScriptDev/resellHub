"use client";

import { Package, Search, ChevronRight } from "lucide-react";

export default function BuyerOrdersPage() {
  const mockOrders = [
    { id: "ORD-9821", date: "Oct 24, 2026", product: "Samsung Galaxy S22 Ultra", seller: "TechHaven", amount: "65,000", status: "Delivered" },
    { id: "ORD-9810", date: "Oct 12, 2026", product: "MacBook Pro M1", seller: "AppleResell BD", amount: "115,000", status: "Processing" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">Track and manage your purchases.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search orders..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        
        <div className="divide-y">
          {mockOrders.map((order) => (
            <div key={order.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{order.product}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>Order #{order.id}</span>
                    <span>•</span>
                    <span>{order.date}</span>
                    <span>•</span>
                    <span>Seller: {order.seller}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-bold text-foreground">৳{order.amount}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                    order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
