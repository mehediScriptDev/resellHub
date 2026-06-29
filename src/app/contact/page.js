"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const { data } = await api.post("/contact", form);
      if (data.success) {
        setStatus({ type: "success", message: data.message });
        setForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Failed to send message" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-foreground mb-6">Contact Us</h1>
      <p className="text-muted-foreground mb-8">
        We are here to help. Reach out to us for any queries, support, or feedback.
      </p>

      <div className="bg-card border rounded p-6 shadow-sm mb-8">
        <h2 className="font-bold text-lg mb-4 text-foreground">Get in Touch</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Email:</strong> support@resellhub.com</p>
          <p><strong className="text-foreground">Phone:</strong> +880 1234 567890</p>
          <p><strong className="text-foreground">Address:</strong> 123 Marketplace Avenue, Dhaka, Bangladesh</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border rounded p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-lg mb-4 text-foreground">Send us a Message</h2>
        {status && (
          <div className={`p-3 rounded text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {status.message}
          </div>
        )}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background"
            placeholder="Your email"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Message</label>
          <textarea
            rows="5"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background"
            placeholder="How can we help you?"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
