"use client";

import { ShieldCheck, AlertTriangle, Eye } from "lucide-react";

export function SafetyTips() {
  return (
    <section className="py-8 bg-muted/10 border-t">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h2 className="text-xl font-bold text-foreground">Safety Tips for Buyers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded border border-green-100 dark:border-green-900 flex gap-3">
            <Eye className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-green-900 dark:text-green-100 mb-1">Inspect the item</h3>
              <p className="text-xs text-green-800 dark:text-green-200">Always check the item's condition in person before handing over your money.</p>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded border border-amber-100 dark:border-amber-900 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-amber-900 dark:text-amber-100 mb-1">Never pay in advance</h3>
              <p className="text-xs text-amber-800 dark:text-amber-200">Do not send money via mobile banking or wire transfer before receiving the item.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
