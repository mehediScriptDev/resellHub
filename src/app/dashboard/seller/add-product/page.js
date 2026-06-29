"use client";

import { useState, useEffect } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

const CONDITIONS = ["Used", "Like New", "Refurbished", "Good", "Fair"];

export default function AddProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    condition: "Used",
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    api.get("/stats/categories").then(({ data }) => {
      if (data.success) setCategories(data.data.map((c) => c.name));
    }).catch(() => {
      setCategories(["Electronics", "Mobile Phones", "Furniture", "Vehicles", "Fashion"]);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const images = formData.imageUrl
        ? [formData.imageUrl]
        : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"];

      const { data } = await api.post("/products", {
        title: formData.title,
        category: formData.category,
        condition: formData.condition,
        description: formData.description,
        price: Number(formData.price),
        images,
      });
      if (data.success) {
        setSuccess(true);
        setFormData({ category: "", condition: "Used", title: "", description: "", price: "", imageUrl: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post ad.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-card border rounded p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Ad Posted Successfully!</h2>
          <p className="text-muted-foreground mb-6">Your ad is now under review and will be live after admin approval.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setSuccess(false)}
              className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Post Another Ad
            </button>
            <Link href="/dashboard/seller/products" className="border px-6 py-2 rounded font-bold hover:bg-muted transition-colors">
              View My Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground mb-6 border-b pb-4">Post an Ad</h1>
      {error && <div className="p-4 bg-red-100 text-red-700 rounded mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-card border rounded p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Ad Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded text-sm bg-background"
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Condition *</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-3 py-2 border rounded text-sm bg-background"
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Title *</label>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                type="text"
                maxLength={70}
                className="w-full px-3 py-2 border rounded text-sm bg-background"
                placeholder="Keep it short and descriptive"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Description *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border rounded text-sm bg-background"
                placeholder="Describe your item in detail..."
              />
            </div>
          </div>
        </div>

        <div className="bg-card border rounded p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Photo</h2>
          <div className="space-y-3">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm bg-background"
              placeholder="https://example.com/your-product-image.jpg"
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <UploadCloud className="w-4 h-4" /> Paste a direct image URL. A default image is used if left empty.
            </p>
          </div>
        </div>

        <div className="bg-card border rounded p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Price</h2>
          <input
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            type="number"
            min="0"
            className="w-full md:w-1/2 px-3 py-2 border rounded text-sm bg-background"
            placeholder="e.g. 5000"
          />
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <Link href="/dashboard/seller/products" className="px-6 py-2 border rounded font-bold text-sm hover:bg-muted transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-secondary text-secondary-foreground px-8 py-2 rounded font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Post Ad"}
          </button>
        </div>
      </form>
    </div>
  );
}
