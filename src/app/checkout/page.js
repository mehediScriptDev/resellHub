"use client";

import Link from "next/link";
import { CreditCard, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "@/lib/api";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useSearchParams } from "next/navigation";

// Initialize Stripe (use NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY from env in real app)
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  
  const [clientSecret, setClientSecret] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntentAndProduct = async () => {
      try {
        // Just mock product if no ID provided
        const productData = productId 
          ? (await api.get(`/products/${productId}`)).data.data 
          : { _id: "test", title: "Used Dell Inspiron 15 Laptop", price: 35000, images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=60"] };
        
        setProduct(productData);

        const { data } = await api.post("/payments/create-intent", {
          amount: productData.price,
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Failed to init checkout", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIntentAndProduct();
  }, [productId]);

  if (loading) return <div className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;
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

          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} productId={product?._id} />
            </Elements>
          ) : (
            <div className="bg-card border rounded-2xl p-6 shadow-sm text-center">Loading payment...</div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex items-center gap-4 mb-4 pb-4 border-b">
               <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden shrink-0">
                  <img src={product?.images?.[0] || ""} alt="item" className="w-full h-full object-cover" />
               </div>
               <div>
                  <h4 className="font-medium line-clamp-2 text-sm">{product?.title}</h4>
                  <p className="text-primary font-bold mt-1">৳{product?.price?.toLocaleString()}</p>
               </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
               <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>৳{product?.price?.toLocaleString()}</span></div>
               <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>৳120</span></div>
               <div className="flex justify-between"><span className="text-muted-foreground">Platform Fee</span><span>৳50</span></div>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 border-t mb-6">
               <span>Total</span><span>৳{((product?.price || 0) + 170).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
