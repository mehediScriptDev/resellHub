"use client";

import { Activity, Users, ShoppingBag, CreditCard, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/stats/admin/analytics").then(({ data }) => {
      if (data.success) setAnalytics(data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  const kpis = [
    { title: "Total Users", value: analytics?.totalUsers?.toLocaleString(), icon: Users, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Active Listings", value: analytics?.activeListings?.toLocaleString(), icon: ShoppingBag, color: "text-green-500", bg: "bg-green-100" },
    { title: "Completed Orders", value: analytics?.completedOrders?.toLocaleString(), icon: Activity, color: "text-purple-500", bg: "bg-purple-100" },
    { title: "Total Platform Volume", value: `৳ ${analytics?.totalRevenue?.toLocaleString()}`, icon: CreditCard, color: "text-orange-500", bg: "bg-orange-100" },
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
              <div className={`h-10 w-10 rounded-lg ${kpi.bg} flex items-center justify-center mb-4`}>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <p className="text-sm text-muted-foreground font-medium mb-1">{kpi.title}</p>
              <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-card border rounded-lg shadow-sm p-6">
          <h3 className="font-bold text-foreground mb-4">Monthly User Growth</h3>
          {analytics?.monthlyUsers?.length > 0 ? (
            <div className="space-y-2">
              {analytics.monthlyUsers.map((m) => (
                <div key={m._id} className="flex justify-between p-2 bg-muted/30 rounded">
                  <span>{m._id}</span>
                  <span className="font-bold">{m.count} users</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No user data yet.</p>
          )}
        </div>
        <div className="bg-card border rounded-lg shadow-sm p-6">
          <h3 className="font-bold text-foreground mb-4">Monthly Revenue</h3>
          {analytics?.monthlyOrders?.length > 0 ? (
            <div className="space-y-2">
              {analytics.monthlyOrders.map((m) => (
                <div key={m._id} className="flex justify-between p-2 bg-muted/30 rounded">
                  <span>{m._id}</span>
                  <span className="font-bold text-primary">৳{m.revenue?.toLocaleString()} ({m.count} orders)</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No revenue data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
