"use client";

import { Search, CheckCircle, XCircle, AlertTriangle, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";

export default function AdminProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const { data } = await api.get(`/products/admin/all?${params}`);
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const moderate = async (productId, status) => {
    try {
      const { data } = await api.put(`/products/${productId}/moderate`, { status });
      if (data.success) {
        setProducts((prev) => prev.map((p) => (p._id === productId ? data.data : p)));
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to moderate product");
    }
  };

  const deleteProduct = async (productId) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete");
    }
  };

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
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md text-sm px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Approval</option>
            <option value="available">Active</option>
            <option value="rejected">Rejected</option>
            <option value="reported">Reported</option>
          </select>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : (
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
                  <tr key={product._id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground line-clamp-1">{product.title}</div>
                      <div className="text-xs text-primary font-medium mt-0.5">৳{product.price?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{product.sellerId?.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold capitalize ${
                        product.status === "available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.reportCount > 0 ? (
                        <span className="flex items-center gap-1.5 text-red-500 font-bold bg-red-50 px-2 py-1 rounded w-max">
                          <AlertTriangle className="w-3 h-3" /> {product.reportCount}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/products/${product._id}`} className="p-1.5 text-muted-foreground hover:text-blue-500 transition-colors text-xs">View</Link>
                        {product.status === "pending" && (
                          <button onClick={() => moderate(product._id, "available")} className="p-1.5 text-muted-foreground hover:text-green-500 transition-colors" title="Approve">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button onClick={() => moderate(product._id, "rejected")} className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors" title="Reject">
                          <XCircle className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteProduct(product._id)} className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
