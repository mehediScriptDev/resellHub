"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export function CheckoutForm({ clientSecret, productId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: user?.name || "Anonymous",
          email: user?.email || "",
        },
      },
    });

    if (paymentError) {
      setError(paymentError.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      // Payment successful! Create order in DB.
      try {
        await api.post("/orders", {
          product: productId,
          amount: paymentIntent.amount / 100, // convert cents back to BDT
        });
        alert("Payment successful!");
        router.push("/dashboard/buyer");
      } catch (err) {
        setError("Payment succeeded but order creation failed.");
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center">Payment Method (Stripe)</h2>
      <div className="p-4 border rounded-xl bg-muted/30 mb-4">
        <CardElement options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } } } }} />
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="w-full flex justify-center py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition shadow-lg disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      <p className="text-sm text-muted-foreground flex items-center mt-4 justify-center">
         <ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> Payments are secure and encrypted.
      </p>
    </form>
  );
}
