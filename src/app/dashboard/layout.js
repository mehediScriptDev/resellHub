"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  CreditCard,
  Settings,
  Package,
  Users,
  BarChart3,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // A mock logic to determine role based on URL for demonstration purposes
  let role = "buyer";
  if (pathname.includes("/seller")) role = "seller";
  if (pathname.includes("/admin")) role = "admin";

  const LINKS = {
    buyer: [
      { name: "Dashboard", href: "/dashboard/buyer", icon: LayoutDashboard },
      { name: "My Orders", href: "/dashboard/buyer/orders", icon: Package },
      { name: "Wishlist", href: "/dashboard/buyer/wishlist", icon: Heart },
      {
        name: "Payment History",
        href: "/dashboard/buyer/payments",
        icon: CreditCard,
      },
      { name: "Profile", href: "/dashboard/buyer/profile", icon: Settings },
    ],
    seller: [
      { name: "Dashboard", href: "/dashboard/seller", icon: LayoutDashboard },
      {
        name: "Add Product",
        href: "/dashboard/seller/add-product",
        icon: Package,
      },
      {
        name: "My Products",
        href: "/dashboard/seller/products",
        icon: ShoppingBag,
      },
      {
        name: "Manage Orders",
        href: "/dashboard/seller/orders",
        icon: Package,
      },
      {
        name: "Analytics",
        href: "/dashboard/seller/analytics",
        icon: BarChart3,
      },
    ],
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      {
        name: "Manage Products",
        href: "/dashboard/admin/products",
        icon: ShoppingBag,
      },
      { name: "Manage Orders", href: "/dashboard/admin/orders", icon: Package },
      {
        name: "Analytics",
        href: "/dashboard/admin/analytics",
        icon: BarChart3,
      },
    ],
  };

  const currentLinks = LINKS[role] || LINKS.buyer;

  return (
    <div className="grow flex flex-col md:flex-row bg-muted/20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 md:min-h-[calc(100vh-4rem)] py-6">
        <div className="mb-6 px-6">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {role} Menu
          </p>
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

        {/* Mock Role Switcher for Demo Purposes */}
        <div className="mt-12 pt-6 border-t border-border px-6">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Demo Role Switch
          </p>
          <div className="flex flex-col space-y-3">
            <Link
              href="/dashboard/buyer"
              className="text-sm font-medium text-primary hover:underline"
            >
              View as Buyer
            </Link>
            <Link
              href="/dashboard/seller"
              className="text-sm font-medium text-primary hover:underline"
            >
              View as Seller
            </Link>
            <Link
              href="/dashboard/admin"
              className="text-sm font-medium text-primary hover:underline"
            >
              View as Admin
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
