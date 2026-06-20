"use client";

import { Search, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <div className="bg-primary py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-white text-center text-xl md:text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
          Find anything in <span className="underline decoration-secondary decoration-4 underline-offset-4 font-bold flex items-center"><MapPin className="w-5 h-5 mr-1" fill="currentColor" stroke="none" /> Bangladesh</span>
        </h1>
        
        <div className="bg-white rounded flex flex-col md:flex-row p-1.5 gap-1.5 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select className="w-full bg-transparent pl-10 pr-4 py-3 text-gray-800 outline-none appearance-none cursor-pointer font-medium border-b md:border-b-0 md:border-r border-gray-200">
              <option>All of Bangladesh</option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Sylhet</option>
            </select>
          </div>
          <div className="relative flex-[2]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="w-full bg-transparent pl-10 pr-4 py-3 text-gray-800 outline-none font-medium placeholder-gray-500" 
            />
          </div>
          <button className="bg-secondary text-secondary-foreground font-bold px-8 py-3 rounded hover:bg-yellow-400 transition-colors w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
