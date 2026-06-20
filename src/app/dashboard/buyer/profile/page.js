"use client";

import { User, Mail, Phone, MapPin } from "lucide-react";

export default function BuyerProfilePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Update your personal information.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <button type="button" className="bg-secondary text-secondary-foreground font-bold px-4 py-2 rounded text-sm hover:bg-yellow-400 transition-colors">
              Upload New Avatar
            </button>
            <p className="text-xs text-muted-foreground mt-2">JPG or PNG, max 1MB.</p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">First Name</label>
              <input type="text" defaultValue="Mehedi" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Last Name</label>
              <input type="text" defaultValue="Hasan" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-background" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input type="email" defaultValue="mehedi@example.com" disabled className="w-full pl-9 px-3 py-2 border rounded text-sm bg-muted/30 text-muted-foreground cursor-not-allowed" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input type="tel" defaultValue="+880 1711-000000" className="w-full pl-9 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-background" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Shipping Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea rows={3} defaultValue="House 12, Road 5, Dhanmondi, Dhaka" className="w-full pl-9 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-background" />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="button" className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
