"use client";

import { User, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function BuyerProfilePage() {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", location: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", phone: user.phone || "", location: user.location || "" });
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const result = await updateProfile(form);
    setMessage(result?.success ? { type: "success", text: "Profile updated successfully" } : { type: "error", text: result?.message });
    setSaving(false);
  };

  if (authLoading) {
    return <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Update your personal information.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 overflow-hidden">
            {user?.photo ? (
              <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="h-10 w-10 text-primary" />
            )}
          </div>
          <div>
            <p className="font-bold text-foreground">{user?.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{user?.role} account</p>
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-background"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full pl-9 px-3 py-2 border rounded text-sm bg-muted/30 text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full pl-9 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-background"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Shipping Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea
                rows={3}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full pl-9 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-background"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
