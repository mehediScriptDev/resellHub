"use client";

import Link from "next/link";
import {
  Home, Search, Grid3X3, LayoutDashboard, User, PlusCircle,
  Menu, X, LogOut, Settings, ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const profilePath = user?.role === "seller"
    ? "/dashboard/seller"
    : user?.role === "admin"
    ? "/dashboard/admin"
    : "/dashboard/buyer/profile";

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-1">
            <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-black">R</div>
            ReSellHub
          </Link>

          <div className="hidden md:flex items-center space-x-5">
            {!isDashboard && <ThemeToggle />}
            <Link href="/" className="font-medium hover:text-white/80 transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link href="/products" className="font-medium hover:text-white/80 transition-colors flex items-center gap-1.5">
              <Search className="w-4 h-4" /> Products
            </Link>
            <Link href="/categories" className="font-medium hover:text-white/80 transition-colors flex items-center gap-1.5">
              <Grid3X3 className="w-4 h-4" /> Categories
            </Link>

            {user ? (
              <>
                <Link href={`/dashboard/${user.role}`} className="font-medium hover:text-white/80 transition-colors flex items-center gap-1.5">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 font-medium hover:text-white/80 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card text-foreground border rounded-lg shadow-lg py-1 z-50">
                      <p className="px-4 py-2 text-xs text-muted-foreground border-b truncate">{user.email}</p>
                      <Link href={profilePath} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted" onClick={() => setProfileOpen(false)}>
                        <Settings className="w-4 h-4" /> Profile
                      </Link>
                      <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted w-full text-left">
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </div>
                  )}
                </div>
                <Link href="/dashboard/seller/add-product" className="bg-secondary text-secondary-foreground px-4 py-2 rounded font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-sm text-sm">
                  <PlusCircle className="w-4 h-4" /> POST YOUR AD
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="font-medium hover:text-white/80 transition-colors flex items-center gap-1.5">
                  <User className="w-4 h-4" /> Log in
                </Link>
                <Link href="/register" className="font-medium hover:text-white/80 transition-colors">Register</Link>
                <Link href="/login" className="bg-secondary text-secondary-foreground px-4 py-2 rounded font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-sm text-sm">
                  <PlusCircle className="w-4 h-4" /> POST YOUR AD
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            {!isDashboard && <ThemeToggle />}
            <Link href={user ? "/dashboard/seller/add-product" : "/login"} className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
              <PlusCircle className="w-4 h-4" /> POST
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 shadow-xl">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="flex items-center gap-3 font-medium text-lg" onClick={() => setIsOpen(false)}><Home className="w-5 h-5" /> Home</Link>
            <Link href="/products" className="flex items-center gap-3 font-medium text-lg" onClick={() => setIsOpen(false)}><Search className="w-5 h-5" /> Products</Link>
            <Link href="/categories" className="flex items-center gap-3 font-medium text-lg" onClick={() => setIsOpen(false)}><Grid3X3 className="w-5 h-5" /> Categories</Link>
            <div className="border-t border-white/10 my-2" />
            {user ? (
              <>
                <Link href={`/dashboard/${user.role}`} className="flex items-center gap-3 font-medium text-lg" onClick={() => setIsOpen(false)}><LayoutDashboard className="w-5 h-5" /> Dashboard</Link>
                <Link href={profilePath} className="flex items-center gap-3 font-medium text-lg" onClick={() => setIsOpen(false)}><Settings className="w-5 h-5" /> Profile</Link>
                <button onClick={logout} className="flex items-center gap-3 font-medium text-lg w-full text-left"><LogOut className="w-5 h-5" /> Log out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center gap-3 font-medium text-lg" onClick={() => setIsOpen(false)}><User className="w-5 h-5" /> Log in</Link>
                <Link href="/register" className="flex items-center gap-3 font-medium text-lg" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
