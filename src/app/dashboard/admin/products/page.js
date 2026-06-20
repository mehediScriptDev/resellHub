"use client";

import { Search, CheckCircle, XCircle, AlertTriangle, Eye, Trash2 } from "lucide-react";

export default function AdminProductsPage() {
  const products = [
    { id: "PROD-01", title: "Samsung Galaxy S22 Ultra", seller: "TechHaven BD", price: "65,000", status: "Pending", reports: 0 },
    { id: "PROD-02", title: "Fake Rolex Watch", seller: "Scammer123", price: "5,000", status: "Active", reports: 12 },
    { id: "PROD-03", title: "Sony A7III Camera", seller: "Camera Zone", price: "120,000", status: "Active", reports: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Products</h1>
        <p className="text-muted-foreground text-sm mt-1">Approve listings, review reports, and moderate content.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b flex flex-wrap gap-4 justify-between items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search products..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <select className="border rounded-md text-sm px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Statuses</option>
            <option>Pending Approval</option>
            <option>Active</option>
            <option>Reported</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Seller</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Reports</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground line-clamp-1">{product.title}</div>
                    <div className="text-xs text-primary font-medium mt-0.5">৳{product.price}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{product.seller}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      product.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.reports > 0 ? (
                      <span className="flex items-center gap-1.5 text-red-500 font-bold bg-red-50 px-2 py-1 rounded w-max">
                        <AlertTriangle className="w-3 h-3" /> {product.reports}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-muted-foreground hover:text-blue-500 transition-colors" title="View Listing">
                        <Eye className="h-4 w-4" />
                      </button>
                      {product.status === "Pending" && (
                        <button className="p-1.5 text-muted-foreground hover:text-green-500 transition-colors" title="Approve">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors" title="Reject / Delete">
                        <XCircle className="h-4 w-4" />
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
