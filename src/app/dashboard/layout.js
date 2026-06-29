"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  CreditCard,
  Settings,
  Package,
  Users,
  BarChart3,
  Loader2,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const role = user?.role || "buyer";

  useEffect(() => {
    if (!loading && user) {
      if (pathname.includes("/admin") && user.role !== "admin") {
        router.replace(`/dashboard/${user.role}`);
      } else if (pathname.includes("/seller") && user.role !== "seller" && user.role !== "admin") {
        router.replace(`/dashboard/${user.role}`);
      } else if (pathname.includes("/buyer") && user.role === "seller") {
        // sellers can still view buyer dashboard if needed - skip
      }
    }
  }, [user, loading, pathname, router]);

  const LINKS = {
    buyer: [
      { name: "Dashboard", href: "/dashboard/buyer", icon: LayoutDashboard },
      { name: "My Orders", href: "/dashboard/buyer/orders", icon: Package },
      { name: "Wishlist", href: "/dashboard/buyer/wishlist", icon: Heart },
      { name: "Payment History", href: "/dashboard/buyer/payments", icon: CreditCard },
      { name: "Profile", href: "/dashboard/buyer/profile", icon: Settings },
    ],
    seller: [
      { name: "Dashboard", href: "/dashboard/seller", icon: LayoutDashboard },
      { name: "Add Product", href: "/dashboard/seller/add-product", icon: Package },
      { name: "My Products", href: "/dashboard/seller/products", icon: ShoppingBag },
      { name: "Manage Orders", href: "/dashboard/seller/orders", icon: Package },
      { name: "Analytics", href: "/dashboard/seller/analytics", icon: BarChart3 },
    ],
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      { name: "Manage Products", href: "/dashboard/admin/products", icon: ShoppingBag },
      { name: "Manage Orders", href: "/dashboard/admin/orders", icon: Package },
      { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
    ],
  };

  const currentLinks = LINKS[role] || LINKS.buyer;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="grow flex flex-col md:flex-row bg-muted/20">
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 md:min-h-[calc(100vh-4rem)] py-6">
        <div className="mb-6 px-6">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {role} Menu
          </p>
          {user && (
            <p className="text-sm text-foreground mt-1 font-medium truncate">{user.name}</p>
          )}
        </div>
        <nav className="space-y-1 px-4">
          {currentLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mr-3 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
