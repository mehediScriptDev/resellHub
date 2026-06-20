"use client";

import { CreditCard, Download, Plus } from "lucide-react";

export default function BuyerPaymentsPage() {
  const transactions = [
    { id: "TXN-001", date: "Oct 24, 2026", method: "Visa •••• 4242", amount: "65,000", status: "Completed" },
    { id: "TXN-002", date: "Oct 12, 2026", method: "bKash", amount: "115,000", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment Methods & History</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your cards and view receipts.</p>
        </div>
        <button className="bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-primary-foreground shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <CreditCard className="h-8 w-8" />
            <span className="font-bold tracking-widest uppercase">Visa</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm opacity-80">Card Number</p>
            <p className="font-mono text-lg tracking-widest">•••• •••• •••• 4242</p>
          </div>
          <div className="flex justify-between mt-6 text-sm">
            <div>
              <p className="opacity-80">Card Holder</p>
              <p className="font-bold tracking-wide">MD. MEHEDI HASAN</p>
            </div>
            <div>
              <p className="opacity-80">Expires</p>
              <p className="font-bold tracking-wide">12/28</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-lg shadow-sm mt-8">
        <div className="p-4 border-b">
          <h2 className="font-bold text-foreground">Transaction History</h2>
        </div>
        <div className="divide-y">
          {transactions.map(txn => (
            <div key={txn.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-foreground">{txn.id}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{txn.date}</span>
                  <span>•</span>
                  <span>{txn.method}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-foreground">৳{txn.amount}</span>
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
