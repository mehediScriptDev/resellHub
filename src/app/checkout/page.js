"use client";

import { Truck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "@/lib/api";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx"
);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [product, setProduct] = useState(null);
  const [fees, setFees] = useState({ deliveryFee: 120, platformFee: 50 });
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setDeliveryInfo({
        fullName: user.name || "",
        phone: user.phone || "",
        address: user.location || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchCheckout = async () => {
      try {
        const [productRes, feesRes] = await Promise.all([
          api.get(`/products/${productId}`),
          api.get("/products/fees"),
        ]);

        const productData = productRes.data.data;
        setProduct(productData);
        setFees(feesRes.data.data);

        const total = productData.price + feesRes.data.data.deliveryFee + feesRes.data.data.platformFee;
        const { data } = await api.post("/payments/create-intent", {
          amount: total,
          productId,
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Failed to init checkout", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckout();
  }, [productId]);

  if (authLoading || loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      </div>
    );
  }

  if (!productId || !product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold mb-4">No product selected</h2>
        <Link href="/products" className="text-primary hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  const totalAmount = product.price + fees.deliveryFee + fees.platformFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2" /> Delivery Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                  value={deliveryInfo.fullName}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">Address</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                  rows="3"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                clientSecret={clientSecret}
                product={product}
                deliveryInfo={deliveryInfo}
                totalAmount={totalAmount}
              />
            </Elements>
          ) : (
            <div className="bg-card border rounded-2xl p-6 shadow-sm text-center">
              Loading payment...
            </div>
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳{product?.price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>৳{fees.deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee</span>
                <span>৳{fees.platformFee}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 border-t mb-6">
              <span>Total</span>
              <span>৳{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
