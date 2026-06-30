import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-extrabold text-white flex items-center gap-1 mb-3">
              <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-black text-xs">R</div>
              ReSellHub
            </Link>
            <p className="text-xs text-white/80 leading-relaxed">
              The most trusted marketplace in Bangladesh. Buy and sell your pre-owned items safely and efficiently.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Quick Links</h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="/" className="hover:text-white hover:underline transition-all">Home</Link></li>
              <li><Link href="/products" className="hover:text-white hover:underline transition-all">All Ads</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline transition-all">About Us</Link></li>
              <li><Link href="/categories" className="hover:text-white hover:underline transition-all">Categories</Link></li>
              <li><Link href="/dashboard/seller/add-product" className="hover:text-white hover:underline transition-all">Post an Ad</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Support</h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="/contact" className="hover:text-white hover:underline transition-all">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white hover:underline transition-all">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-white hover:underline transition-all">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white hover:underline transition-all">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Connect With Us</h3>
            <div className="flex space-x-3 mb-4">
              <a href="https://resellhub.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white hover:scale-110 transition-all"><Globe className="h-5 w-5" /></a>
              <a href="mailto:support@resellhub.com" className="text-white/80 hover:text-white hover:scale-110 transition-all"><Mail className="h-5 w-5" /></a>
              <a href="tel:+8801234567890" className="text-white/80 hover:text-white hover:scale-110 transition-all"><Phone className="h-5 w-5" /></a>
            </div>
            <p className="text-xs text-white/80">
              Email: support@resellhub.com<br />
              Phone: +880 1234 567890
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-10 pt-6 text-xs text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} ReSell Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
