"use client";

import Link from "next/link";
import { MessageCircle, User, PlusCircle, Search, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-1">
              <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-black">R</div>
              ReSellHub
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {!isDashboard && <ThemeToggle />}
            
            <Link href="/products" className="font-medium hover:text-white/80 transition-colors flex items-center gap-2">
              <Search className="w-5 h-5" /> All ads
            </Link>
            
            {user ? (
              <>
                <Link href={`/dashboard/${user.role}`} className="font-medium hover:text-white/80 transition-colors flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <button onClick={logout} className="font-medium hover:text-white/80 transition-colors flex items-center gap-2">
                  <LogOut className="w-5 h-5" /> Log out
                </button>
                <Link href="/dashboard/seller/add-product" className="bg-secondary text-secondary-foreground px-5 py-2 rounded font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-sm">
                  <PlusCircle className="w-5 h-5" /> POST YOUR AD
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="font-medium hover:text-white/80 transition-colors flex items-center gap-2">
                  <User className="w-5 h-5" /> Log in
                </Link>
                <Link href="/login" className="bg-secondary text-secondary-foreground px-5 py-2 rounded font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-sm">
                  <PlusCircle className="w-5 h-5" /> POST YOUR AD
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
            <Link href="/products" className="flex items-center gap-3 font-medium text-lg"><Search className="w-5 h-5" /> All ads</Link>
            <div className="border-t border-white/10 my-2"></div>
            {user ? (
              <>
                <Link href={`/dashboard/${user.role}`} className="flex items-center gap-3 font-medium text-lg"><LayoutDashboard className="w-5 h-5" /> Dashboard</Link>
                <button onClick={logout} className="flex items-center gap-3 font-medium text-lg w-full text-left"><LogOut className="w-5 h-5" /> Log out</button>
              </>
            ) : (
              <Link href="/login" className="flex items-center gap-3 font-medium text-lg"><User className="w-5 h-5" /> Log in</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
