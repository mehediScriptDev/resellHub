"use client";

import { Users, ShoppingBag, Package, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/stats/admin").then(({ data }) => {
      if (data.success) setStats(data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Total Users</h3>
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Users className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">{stats?.totalUsers?.toLocaleString()}</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Total Products</h3>
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><ShoppingBag className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">{stats?.totalProducts?.toLocaleString()}</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Total Orders</h3>
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><Package className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">{stats?.totalOrders?.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Recent Users</h2>
            <Link href="/dashboard/admin/users" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {stats?.recentUsers?.map((user) => (
              <div key={user._id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full overflow-hidden">
                    <img src={user.photo || `https://i.pravatar.cc/150?u=${user._id}`} alt="avatar" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                  user.status === "active" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Reported Products</h2>
            <Link href="/dashboard/admin/products?status=reported" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          {stats?.reportedProducts?.length > 0 ? (
            <div className="space-y-3">
              {stats.reportedProducts.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.sellerId?.name}</p>
                  </div>
                  <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
                    <AlertTriangle className="w-3 h-3" /> {product.reportCount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No reported products currently.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
