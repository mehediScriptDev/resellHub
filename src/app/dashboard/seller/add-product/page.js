"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2, MapPin } from "lucide-react";
import { CATEGORIES } from "@/lib/mockData";
import api from "@/lib/api";

export default function AddProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    condition: "Used",
    title: "",
    description: "",
    price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const { data } = await api.post("/products", {
        ...formData,
        price: Number(formData.price),
        images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=60"], // Mock image
      });
      if (data.success) {
        setSuccess(true);
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
          <p className="text-muted-foreground mb-6">Your ad is now under review and will be live shortly.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Post Another Ad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-foreground mb-6 border-b pb-4">Post an Ad</h1>
      {error && <div className="p-4 bg-red-100 text-red-700 rounded mb-6">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Category & Details */}
        <div className="bg-card border rounded p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Ad Details</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Category <span className="text-red-500">*</span></label>
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background">
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Condition <span className="text-red-500">*</span></label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="condition" value="Used" checked={formData.condition === "Used"} onChange={e => setFormData({...formData, condition: e.target.value})} className="accent-primary w-4 h-4" />
                  <span className="text-sm font-medium text-foreground">Used</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="condition" value="New" checked={formData.condition === "New"} onChange={e => setFormData({...formData, condition: e.target.value})} className="accent-primary w-4 h-4" />
                  <span className="text-sm font-medium text-foreground">New</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Title <span className="text-red-500">*</span></label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" maxLength={70} className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background" placeholder="Keep it short and descriptive" />
              <p className="text-[10px] text-muted-foreground mt-1 text-right">Max 70 characters</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Description <span className="text-red-500">*</span></label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={6} className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background" placeholder="Describe your item in detail..."></textarea>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-card border rounded p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Photos</h2>
          <div className="border-2 border-dashed rounded p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/30 transition-colors">
            <UploadCloud className="w-10 h-10 text-primary mb-2" />
            <p className="text-sm font-bold text-foreground">Click to upload photos</p>
            <p className="text-xs text-muted-foreground mt-1">Upload up to 5 photos (JPG, PNG). Max 5MB each.</p>
          </div>
        </div>

        {/* Price & Location */}
        <div className="bg-card border rounded p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b pb-2">Price & Location</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Price (৳) <span className="text-red-500">*</span></label>
              <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" min="0" className="w-full md:w-1/2 px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background" placeholder="e.g. 5000" />
              <label className="flex items-center gap-2 mt-3 cursor-pointer w-max">
                <input type="checkbox" className="accent-primary w-4 h-4" />
                <span className="text-xs text-foreground font-medium">Negotiable</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Location <span className="text-red-500">*</span></label>
              <div className="relative md:w-1/2">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <select required className="w-full pl-9 pr-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background appearance-none">
                  <option value="">Select City/Area</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <button type="button" className="px-6 py-2 border rounded font-bold text-sm hover:bg-muted transition-colors text-foreground">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="bg-secondary text-secondary-foreground px-8 py-2 rounded font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 flex items-center gap-2">
            {isSubmitting ? "Posting..." : "Post Ad"}
          </button>
        </div>
      </form>
    </div>
  );
}
