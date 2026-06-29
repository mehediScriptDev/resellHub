"use client";

import { BarChart3, TrendingUp, Users, Eye, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function SellerAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/stats/seller").then(({ data }) => {
      if (data.success) setAnalytics(data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  const stats = [
    { title: "Total Revenue", value: `৳ ${analytics?.totalRevenue?.toLocaleString() || 0}`, icon: TrendingUp, color: "text-green-500", bg: "bg-green-100" },
    { title: "Profile Views", value: analytics?.totalViews?.toLocaleString() || "0", icon: Eye, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Unique Customers", value: analytics?.uniqueCustomers || 0, icon: Users, color: "text-purple-500", bg: "bg-purple-100" },
    { title: "Conversion Rate", value: `${analytics?.conversionRate || 0}%`, icon: BarChart3, color: "text-orange-500", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Deep dive into your store&apos;s performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {analytics?.monthlyRevenue?.length > 0 && (
        <div className="bg-card border rounded-lg shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4">Monthly Revenue</h3>
          <div className="space-y-3">
            {analytics.monthlyRevenue.map((m) => (
              <div key={m._id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">{m._id}</span>
                <div className="text-right">
                  <span className="font-bold text-primary">৳{m.revenue?.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground ml-2">({m.orders} orders)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
