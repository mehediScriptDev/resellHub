import Link from "next/link";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="grow flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-sm border p-8 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="bg-muted/30 border rounded-xl p-4 text-left mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="font-medium">TRX-987654321</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="font-bold text-primary">৳35,170</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/dashboard/buyer"
            className="w-full flex justify-center items-center py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition"
          >
            <Package className="w-4 h-4 mr-2" /> View Dashboard
          </Link>
          <Link
            href="/products"
            className="w-full flex justify-center items-center py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition"
          >
            Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
