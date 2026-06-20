"use client";

import { Search, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-primary to-indigo-950 py-12 md:py-20 relative overflow-hidden">
      {/* Premium subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/40 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
           <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
             Discover Premium Items
           </h1>
           <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">
             The most trusted marketplace to buy and sell safely in Bangladesh.
           </p>
        </div>
        
        <div className="bg-background/95 backdrop-blur-md rounded-2xl shadow-2xl p-2 md:p-3 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto border border-white/10">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <select className="w-full bg-transparent pl-12 pr-4 py-4 text-foreground outline-none appearance-none cursor-pointer font-semibold border-b md:border-b-0 md:border-r border-border">
              <option>All of Bangladesh</option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Sylhet</option>
            </select>
          </div>
          <div className="relative flex-[2]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="w-full bg-transparent pl-12 pr-4 py-4 text-foreground outline-none font-semibold placeholder:font-medium placeholder-muted-foreground" 
            />
          </div>
          <button className="bg-primary text-primary-foreground font-bold px-10 py-4 rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all w-full md:w-auto text-lg">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
