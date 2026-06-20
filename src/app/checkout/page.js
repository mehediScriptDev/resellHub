"use client";

import Link from "next/link";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center"><Truck className="w-5 h-5 mr-2" /> Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="text-sm font-medium mb-1 block">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg bg-background" defaultValue="Rakib Hasan" />
               </div>
               <div>
                  <label className="text-sm font-medium mb-1 block">Phone Number</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg bg-background" defaultValue="+8801712345678" />
               </div>
               <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-1 block">Address</label>
                  <textarea className="w-full px-3 py-2 border rounded-lg bg-background" rows="3" defaultValue="House 12, Road 5, Dhanmondi, Dhaka"></textarea>
               </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center"><CreditCard className="w-5 h-5 mr-2" /> Payment Method (Stripe Mock)</h2>
            <div className="p-4 border rounded-xl bg-muted/30 mb-4">
               <div className="flex items-center gap-3 mb-4">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-primary" />
                  <span className="font-medium">Credit/Debit Card</span>
                  <div className="ml-auto flex gap-1">
                     <div className="w-8 h-5 bg-blue-600 rounded text-[8px] text-white flex items-center justify-center font-bold">VISA</div>
                     <div className="w-8 h-5 bg-orange-500 rounded text-[8px] text-white flex items-center justify-center font-bold">MC</div>
                  </div>
               </div>
               <div className="space-y-3">
                  <input type="text" placeholder="Card Number" className="w-full px-3 py-2 border rounded-lg bg-background" />
                  <div className="grid grid-cols-2 gap-3">
                     <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border rounded-lg bg-background" />
                     <input type="text" placeholder="CVC" className="w-full px-3 py-2 border rounded-lg bg-background" />
                  </div>
               </div>
            </div>
            <p className="text-sm text-muted-foreground flex items-center">
               <ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> Payments are secure and encrypted.
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex items-center gap-4 mb-4 pb-4 border-b">
               <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="item" className="w-full h-full object-cover" />
               </div>
               <div>
                  <h4 className="font-medium line-clamp-2 text-sm">Used Dell Inspiron 15 Laptop</h4>
                  <p className="text-primary font-bold mt-1">৳35,000</p>
               </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
               <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>৳35,000</span></div>
               <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>৳120</span></div>
               <div className="flex justify-between"><span className="text-muted-foreground">Platform Fee</span><span>৳50</span></div>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 border-t mb-6">
               <span>Total</span><span>৳35,170</span>
            </div>
            <Link href="/payment-success" className="w-full flex justify-center py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition shadow-lg">
               Pay ৳35,170
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
