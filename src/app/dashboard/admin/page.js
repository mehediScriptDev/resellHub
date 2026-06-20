import { Users, ShoppingBag, Package, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Total Users</h3>
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Users className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">1,254</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Total Products</h3>
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><ShoppingBag className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">8,432</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Total Orders</h3>
            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><Package className="w-6 h-6" /></div>
          </div>
          <div className="text-4xl font-extrabold text-foreground">5,621</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold">Recent Users</h2>
               <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-4">
               {[1,2,3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full overflow-hidden">
                           <img src={`https://i.pravatar.cc/150?img=${i * 10}`} alt="avatar" />
                        </div>
                        <div>
                           <p className="font-medium text-sm">User Name {i}</p>
                           <p className="text-xs text-muted-foreground">user{i}@example.com</p>
                        </div>
                     </div>
                     <span className="text-xs font-semibold px-2 py-1 bg-green-500/10 text-green-600 rounded">Active</span>
                  </div>
               ))}
            </div>
         </div>
         <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold">Reported Products</h2>
               <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
               <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
               <p>No reported products currently.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
