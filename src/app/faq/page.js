import { FAQ } from "@/components/home/FAQ";

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Help & Support</h1>
      <p className="text-muted-foreground mb-8 text-center">Find answers to common questions about buying and selling on ReSell Hub.</p>
      
      <div className="bg-card border rounded p-2 shadow-sm">
         <FAQ />
      </div>
    </div>
  );
}
