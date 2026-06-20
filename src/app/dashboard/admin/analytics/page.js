"use client";

import { LineChart, Activity, Users, ShoppingBag, CreditCard } from "lucide-react";

export default function AdminAnalyticsPage() {
  const kpis = [
    { title: "Total Users", value: "1,245", growth: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Active Listings", value: "842", growth: "+5%", icon: ShoppingBag, color: "text-green-500", bg: "bg-green-100" },
    { title: "Completed Orders", value: "3,104", growth: "+24%", icon: Activity, color: "text-purple-500", bg: "bg-purple-100" },
    { title: "Total Platform Volume", value: "৳ 12.5M", growth: "+18%", icon: CreditCard, color: "text-orange-500", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Platform Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">High-level insights into marketplace growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`h-10 w-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {kpi.growth}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-medium mb-1">{kpi.title}</p>
              <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-card border rounded-lg shadow-sm p-6 h-80 flex flex-col items-center justify-center text-center">
          <LineChart className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-bold text-foreground">User Growth Chart</h3>
          <p className="text-sm text-muted-foreground max-w-xs mt-2">Mock data visualization placeholder for monthly active users.</p>
        </div>
        <div className="bg-card border rounded-lg shadow-sm p-6 h-80 flex flex-col items-center justify-center text-center">
          <LineChart className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-bold text-foreground">Revenue Trend Chart</h3>
          <p className="text-sm text-muted-foreground max-w-xs mt-2">Mock data visualization placeholder for daily transaction volumes.</p>
        </div>
      </div>
    </div>
  );
}
