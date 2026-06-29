"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function BuyerPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get("/payments");
        if (data.success) setPayments(data.data);
      } catch (error) {
        console.error("Failed to fetch payments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
        <p className="text-muted-foreground text-sm mt-1">View your transaction receipts.</p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-bold text-foreground">Transaction History</h2>
        </div>
        {loading ? (
          <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : payments.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No transactions yet.</div>
        ) : (
          <div className="divide-y">
            {payments.map((txn) => (
              <div key={txn._id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground truncate max-w-[200px]">
                      {txn.orderId?.productId?.title || "Order Payment"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{new Date(txn.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="truncate max-w-[150px]">{txn.transactionId}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-foreground">৳{txn.amount?.toLocaleString()}</span>
                  <p className={`text-xs mt-1 capitalize ${txn.paymentStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                    {txn.paymentStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
