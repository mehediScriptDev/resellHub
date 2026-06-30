import Link from "next/link";
import { Leaf, Users, ShieldCheck, Recycle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-foreground mb-4">About ReSellHub</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Bangladesh&apos;s trusted marketplace for buying and selling pre-owned products safely, affordably, and sustainably.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            ReSell Hub helps people turn unused items into cash while giving buyers access to quality second-hand products at fair prices. We believe in reducing waste and promoting sustainable consumption across Bangladesh.
          </p>
        </div>
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">How It Works</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>1. Sellers create an account and post ads with photos and details.</li>
            <li>2. Buyers browse, compare, and contact sellers securely.</li>
            <li>3. Payments are processed through Stripe for safe transactions.</li>
            <li>4. Admins moderate listings to keep the marketplace trustworthy.</li>
          </ul>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { icon: Recycle, title: "Reduce Waste", text: "Extend product lifecycles and keep items out of landfills." },
          { icon: Users, title: "Community First", text: "Connect real buyers and sellers across Bangladesh." },
          { icon: ShieldCheck, title: "Safe Trading", text: "Verified accounts, moderated listings, and secure payments." },
          { icon: Leaf, title: "Sustainability", text: "Every resale contributes to a greener future." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="bg-card border rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      <div className="text-center bg-primary text-primary-foreground rounded-2xl p-10">
        <h2 className="text-2xl font-bold mb-4">Ready to start selling?</h2>
        <p className="mb-6 opacity-90">Join thousands of users buying and selling on ReSellHub.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/register" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
            Create Account
          </Link>
          <Link href="/products" className="border border-white/30 px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
