"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { UploadCloud, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { DEFAULT_CATEGORIES } from "@/lib/categories";

const CONDITIONS = ["Used", "Like New", "Refurbished", "Good", "Fair"];

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [formData, setFormData] = useState({
    category: "",
    condition: "Used",
    title: "",
    description: "",
    price: "",
    stock: "1",
    imageUrl: "",
  });

  useEffect(() => {
    api.get("/stats/categories").then(({ data }) => {
      if (data.success && data.data.length > 0) {
        setCategories(data.data.map((c) => c.name));
      }
    }).catch(() => {});

    api.get(`/products/${id}`).then(({ data }) => {
      if (data.success) {
        const p = data.data;
        setFormData({
          category: p.category || "",
          condition: p.condition || "Used",
          title: p.title || "",
          description: p.description || "",
          price: String(p.price || ""),
          stock: String(p.stock ?? 1),
          imageUrl: p.images?.[0] || "",
        });
      }
    }).catch(() => setError("Failed to load product")).finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const images = formData.imageUrl
        ? [formData.imageUrl]
        : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"];

      const { data } = await api.put(`/products/${id}`, {
        title: formData.title,
        category: formData.category,
        condition: formData.condition,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images,
      });

      if (data.success) router.push("/dashboard/seller/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground mb-6 border-b pb-4">Edit Product</h1>
      {error && <div className="p-4 bg-red-100 text-red-700 rounded mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-card border rounded p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Category *</label>
            <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded text-sm bg-background">
              <option value="">Select a category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Condition *</label>
            <select value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })} className="w-full px-3 py-2 border rounded text-sm bg-background">
              {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Title *</label>
            <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded text-sm bg-background" />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Description *</label>
            <textarea required rows={6} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded text-sm bg-background" />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Stock Quantity *</label>
            <input required type="number" min="0" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full md:w-1/2 px-3 py-2 border rounded text-sm bg-background" />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Image URL</label>
            <input type="url" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full px-3 py-2 border rounded text-sm bg-background" placeholder="https://example.com/image.jpg" />
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2"><UploadCloud className="w-4 h-4" /> Paste a direct image URL.</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">Price *</label>
            <input required type="number" min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full md:w-1/2 px-3 py-2 border rounded text-sm bg-background" />
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <Link href="/dashboard/seller/products" className="px-6 py-2 border rounded font-bold text-sm hover:bg-muted transition-colors">Cancel</Link>
          <button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground px-8 py-2 rounded font-bold hover:bg-primary/90 disabled:opacity-50">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
