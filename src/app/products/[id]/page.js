"use client";

import { use, useState, useEffect } from "react";
import api from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShoppingCart,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

export default function ProductDetails({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        if (data.success) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    // Get existing from local storage
    const stored = localStorage.getItem("recentlyViewed");
    let viewedList = stored ? JSON.parse(stored) : [];

    // Remove current product if it exists so we can move it to front
    viewedList = viewedList.filter((p) => p._id !== product._id);

    // Add current product to front
    viewedList.unshift(product);

    // Keep only last 4
    if (viewedList.length > 5) {
      viewedList = viewedList.slice(0, 5);
    }

    // Save back to local storage
    localStorage.setItem("recentlyViewed", JSON.stringify(viewedList));

    // Set state to show OTHER recently viewed items
    setRecentlyViewed(
      viewedList.filter((p) => p._id !== product._id).slice(0, 4),
    );
  }, [product]);

  if (loading) {
    return <div className="py-20 text-center">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/products" className="text-primary hover:underline mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium truncate">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-4/3 rounded-2xl overflow-hidden border bg-muted">
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-lg border-2 border-primary overflow-hidden cursor-pointer">
              <img
                src={product.images && product.images.length > 0 ? product.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                {product.condition}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {product.title}
            </h1>
            <div className="text-4xl font-extrabold text-primary mb-6">
              ৳{product.price.toLocaleString()}
            </div>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-6">
            {/* Seller Info box */}
            <div className="bg-card border rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                Seller Information
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl uppercase">
                  {product.sellerId?.name?.charAt(0) || "S"}
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    {product.sellerId?.name || "Unknown Seller"}
                  </div>
                  <div className="flex items-center text-sm text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-500 mr-1" /> 4.8 (24
                    reviews)
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-secondary text-foreground hover:bg-muted py-2 rounded-lg text-sm font-medium transition flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat
                </button>
                <button className="flex-1 bg-secondary text-foreground hover:bg-muted py-2 rounded-lg text-sm font-medium transition flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Link
                href={`/checkout?productId=${product._id}`}
                className="flex-1 bg-primary text-primary-foreground text-center py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition shadow-lg hover:shadow-primary/25"
              >
                Buy Now
              </Link>
              <button className="px-6 border border-border text-foreground hover:bg-muted py-4 rounded-xl font-semibold transition">
                <ShoppingCart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Feature: Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div className="mt-24 pt-12 border-t">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            Recently Viewed Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recentlyViewed.map((item) => (
              <Link
                href={`/products/${item._id}`}
                key={item._id}
                className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition block group"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-foreground truncate mb-1">
                    {item.title}
                  </h4>
                  <div className="text-primary font-bold">
                    ৳{item.price.toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
