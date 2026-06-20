"use client";

import { Smartphone, Play, Apple } from "lucide-react";

export function AppPromo() {
  return (
    <section className="py-10 bg-primary mt-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
            <Smartphone className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Get the ReSellHub App</h2>
            <p className="text-sm text-white/80">Buy and sell on the go. Chat with buyers, get alerts, and manage your ads easily.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-black text-white px-5 py-2.5 rounded flex items-center gap-3 hover:bg-gray-900 transition-colors">
            <Play className="w-6 h-6 fill-white" />
            <div className="text-left">
               <div className="text-[9px] leading-none text-gray-300 uppercase tracking-wider">Get it on</div>
               <div className="text-sm font-bold leading-tight mt-0.5">Google Play</div>
            </div>
          </button>
          <button className="bg-black text-white px-5 py-2.5 rounded flex items-center gap-3 hover:bg-gray-900 transition-colors">
            <Apple className="w-7 h-7 fill-white" />
            <div className="text-left">
               <div className="text-[9px] leading-none text-gray-300 uppercase tracking-wider">Download on the</div>
               <div className="text-sm font-bold leading-tight mt-0.5">App Store</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
