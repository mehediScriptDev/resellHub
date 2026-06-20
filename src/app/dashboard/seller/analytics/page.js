"use client";

import { BarChart3, TrendingUp, Users, Eye } from "lucide-react";

export default function SellerAnalyticsPage() {
  const stats = [
    { title: "Total Revenue", value: "৳ 245,000", icon: TrendingUp, color: "text-green-500", bg: "bg-green-100" },
    { title: "Profile Views", value: "12,450", icon: Eye, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Unique Customers", value: "84", icon: Users, color: "text-purple-500", bg: "bg-purple-100" },
    { title: "Conversion Rate", value: "3.2%", icon: BarChart3, color: "text-orange-500", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Deep dive into your store's performance.</p>
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

      <div className="bg-card border rounded-lg shadow-sm p-6 h-96 flex flex-col items-center justify-center text-center">
        <BarChart3 className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h3 className="font-bold text-lg text-foreground">Detailed charts coming soon</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-2">We are gathering enough data to generate your monthly revenue trends and traffic sources.</p>
      </div>
    </div>
  );
}
