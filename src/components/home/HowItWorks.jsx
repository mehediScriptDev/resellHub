"use client";

import { UserPlus, ImagePlus, DollarSign } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-8 bg-muted/10 border-t">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-foreground mb-6 text-center">How to sell fast on ReSell Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded border flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-sm mb-2">1. Create an Account</h3>
            <p className="text-xs text-muted-foreground">Sign up for free in less than a minute. Verify your phone number to build trust.</p>
          </div>
          <div className="bg-card p-6 rounded border flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <ImagePlus className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-bold text-sm mb-2">2. Post Your Ad</h3>
            <p className="text-xs text-muted-foreground">Take clear photos, write a good description, and set a fair price for your item.</p>
          </div>
          <div className="bg-card p-6 rounded border flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-sm mb-2">3. Start Earning</h3>
            <p className="text-xs text-muted-foreground">Receive calls and messages from real buyers. Meet safely and get your cash.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
