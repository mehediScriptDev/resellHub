import { Package, ShoppingBag, CreditCard, Clock } from "lucide-react";

export default function SellerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Seller Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground text-sm">Total Products</h3>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><ShoppingBag className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold">24</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground text-sm">Total Sales</h3>
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Package className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold">89</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground text-sm">Total Revenue</h3>
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg"><CreditCard className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold">৳ 45,200</div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground text-sm">Pending Orders</h3>
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg"><Clock className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold">3</div>
        </div>
      </div>
      
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
         <h2 className="text-lg font-bold mb-4">Recent Orders Waiting For Action</h2>
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="text-muted-foreground bg-muted">
               <tr>
                 <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                 <th className="px-4 py-3">Product</th>
                 <th className="px-4 py-3">Date</th>
                 <th className="px-4 py-3">Status</th>
                 <th className="px-4 py-3 rounded-r-lg">Action</th>
               </tr>
             </thead>
             <tbody>
               <tr className="border-b last:border-0">
                 <td className="px-4 py-4 font-medium">#ORD-0982</td>
                 <td className="px-4 py-4">Used Dell Inspiron 15</td>
                 <td className="px-4 py-4">Oct 24, 2023</td>
                 <td className="px-4 py-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-600 rounded text-xs font-semibold">Pending</span></td>
                 <td className="px-4 py-4"><button className="text-primary hover:underline font-medium">View</button></td>
               </tr>
               <tr className="border-b last:border-0">
                 <td className="px-4 py-4 font-medium">#ORD-0981</td>
                 <td className="px-4 py-4">Sony Alpha Camera</td>
                 <td className="px-4 py-4">Oct 23, 2023</td>
                 <td className="px-4 py-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-600 rounded text-xs font-semibold">Pending</span></td>
                 <td className="px-4 py-4"><button className="text-primary hover:underline font-medium">View</button></td>
               </tr>
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
