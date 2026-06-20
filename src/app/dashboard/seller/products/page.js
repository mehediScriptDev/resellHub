"use client";

import { Package, Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function SellerProductsPage() {
  const products = [
    { id: "PROD-1", title: "Samsung Galaxy S22 Ultra", price: "65,000", views: 245, status: "Active" },
    { id: "PROD-2", title: "Sony A7III Camera Body", price: "120,000", views: 890, status: "Active" },
    { id: "PROD-3", title: "Herman Miller Aeron Chair", price: "45,000", views: 12, status: "Under Review" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Products</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your active and pending ads.</p>
        </div>
        <Link href="/dashboard/seller/add-product" className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Post New Ad
        </Link>
      </div>

      <div className="bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search products..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{product.title}</td>
                  <td className="px-6 py-4">৳{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      product.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{product.views}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
