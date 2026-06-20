"use client";

import { Search, UserCheck, UserX, Shield, Trash2, MoreVertical } from "lucide-react";

export default function AdminUsersPage() {
  const users = [
    { id: "user001", name: "Md. Rakib Hasan", email: "rakib@example.com", role: "buyer", status: "Active", joined: "Oct 20, 2026" },
    { id: "user002", name: "TechHaven BD", email: "techhaven@example.com", role: "seller", status: "Active", joined: "Sep 15, 2026" },
    { id: "user003", name: "Suspicious User", email: "scammer@example.com", role: "seller", status: "Blocked", joined: "Oct 25, 2026" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor, block, or delete platform users.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b flex flex-wrap gap-4 justify-between items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search by name or email..." className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <select className="border rounded-md text-sm px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Roles</option>
            <option>Buyer</option>
            <option>Seller</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 capitalize font-medium text-primary">
                    <span className="flex items-center gap-1.5">
                      {user.role === 'admin' && <Shield className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {user.status === "Active" ? (
                        <button className="p-1.5 text-muted-foreground hover:text-orange-500 transition-colors" title="Block User">
                          <UserX className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="p-1.5 text-muted-foreground hover:text-green-500 transition-colors" title="Unblock User">
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors" title="Delete User">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
