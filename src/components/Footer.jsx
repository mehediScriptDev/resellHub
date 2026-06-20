import Link from "next/link";
import { Globe, Mail, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-foreground mb-4 block">
              ReSell<span className="text-primary">Hub</span>
            </Link>
            <p className="text-sm">
              Your trusted marketplace for buying and selling pre-owned products. Reduce waste and find great deals.
            </p>
          </div>
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-foreground font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Mail className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><MessageCircle className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Phone className="h-5 w-5" /></a>
            </div>
            <p className="text-sm mt-4">
              Email: support@resellhub.com<br />
              Phone: +880 1234 567890
            </p>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} ReSell Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
