"use client";

import Link from "next/link";
import { MessageCircle, User, PlusCircle, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/90 backdrop-blur-md border-b sticky top-0 z-50 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-primary/20">
                R
              </div>
              <span className="text-foreground">ReSell<span className="text-primary">Hub</span></span>
            </Link>
          </div>
          
          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" /> All Ads
            </Link>
            
            <Link href="/dashboard/buyer/messages" className="font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Messages
            </Link>

            <Link href="/login" className="font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <User className="w-4 h-4" /> Log in
            </Link>

            <Link href="/dashboard/seller/add-product" className="bg-secondary text-white px-6 py-2.5 rounded-full font-bold hover:bg-secondary/90 hover:scale-105 hover:shadow-xl hover:shadow-secondary/20 transition-all flex items-center gap-2">
              <PlusCircle className="w-5 h-5" /> POST AD
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <Link href="/dashboard/seller/add-product" className="bg-secondary text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1 shadow-md">
               <PlusCircle className="w-4 h-4" /> POST
             </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-foreground">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-t shadow-2xl absolute w-full h-screen">
          <div className="px-6 py-6 space-y-6">
            <Link href="/products" className="flex items-center gap-3 font-semibold text-xl text-foreground hover:text-primary"><Search className="w-6 h-6" /> All Ads</Link>
            <div className="border-t"></div>
            <Link href="/dashboard/buyer/messages" className="flex items-center gap-3 font-semibold text-xl text-foreground hover:text-primary"><MessageCircle className="w-6 h-6" /> Messages</Link>
            <Link href="/login" className="flex items-center gap-3 font-semibold text-xl text-foreground hover:text-primary"><User className="w-6 h-6" /> Log in</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
