"use client";

import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="bg-primary py-8 md:py-10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-center text-xl md:text-2xl font-semibold mb-6 flex items-center justify-center gap-2"
        >
          Find anything in{" "}
          <span className="underline decoration-secondary decoration-4 underline-offset-4 font-bold flex items-center">
            <MapPin className="w-5 h-5 mr-1" fill="currentColor" stroke="none" /> Bangladesh
          </span>
        </motion.h1>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded flex flex-col md:flex-row p-1.5 gap-1.5 max-w-4xl mx-auto shadow-lg"
        >
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="w-full bg-transparent pl-10 pr-4 py-3 text-gray-800 outline-none appearance-none cursor-pointer font-medium border-b md:border-b-0 md:border-r border-gray-200"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All of Bangladesh</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>
          <div className="relative flex-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full bg-transparent pl-10 pr-4 py-3 text-gray-800 outline-none font-medium placeholder-gray-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-secondary text-secondary-foreground font-bold px-8 py-3 rounded hover:bg-yellow-400 transition-colors w-full md:w-auto"
          >
            Search
          </button>
        </motion.form>
      </div>
    </div>
  );
}
