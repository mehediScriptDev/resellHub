import { Package, Heart, CreditCard } from "lucide-react";

export default function BuyerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Buyer Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Total Orders</h3>
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Package className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">12</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Wishlist Items</h3>
            <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl"><Heart className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">5</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Payments Made</h3>
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><CreditCard className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">8</div>
        </div>
      </div>
      
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
         <h2 className="text-lg font-bold mb-4">Recent Purchases</h2>
         <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
            No recent purchases found.
         </div>
      </div>
    </div>
  );
}
