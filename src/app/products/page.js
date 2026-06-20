"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS, CATEGORIES } from "@/lib/mockData";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS;

    // Search filter
    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Sort
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, category, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, category, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Products</h1>
          <p className="text-muted-foreground mt-1">
            Find the best deals on pre-owned items.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card p-6 rounded-2xl shadow-sm border">
            <h3 className="font-semibold text-lg flex items-center mb-4">
              <Filter className="w-5 h-5 mr-2" /> Filters
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Sort By
                </label>
                <select
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {currentProducts.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-dashed">
              <h3 className="text-xl font-medium text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCategory("All");
                  setSortBy("default");
                }}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-shadow group flex flex-col"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold">
                      {product.condition}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col grow">
                    <div className="text-xs text-primary font-medium mb-1">
                      {product.category}
                    </div>
                    <h3
                      className="font-semibold text-lg line-clamp-1 mb-2"
                      title={product.title}
                    >
                      {product.title}
                    </h3>
                    <div className="text-xl font-bold text-foreground mt-auto mb-4">
                      ৳{product.price.toLocaleString()}
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="block w-full text-center px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border rounded-md disabled:opacity-50 hover:bg-accent disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-md text-sm font-medium ${currentPage === i + 1 ? "bg-primary text-primary-foreground" : "border hover:bg-accent"}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 border rounded-md disabled:opacity-50 hover:bg-accent disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
