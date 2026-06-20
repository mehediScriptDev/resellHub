export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-foreground mb-6">Contact Us</h1>
      <p className="text-muted-foreground mb-8">We are here to help. Reach out to us for any queries, support, or feedback.</p>
      
      <div className="bg-card border rounded p-6 shadow-sm mb-8">
        <h2 className="font-bold text-lg mb-4 text-foreground">Get in Touch</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Email:</strong> support@resellhub.com</p>
          <p><strong className="text-foreground">Phone:</strong> +880 1234 567890</p>
          <p><strong className="text-foreground">Address:</strong> 123 Marketplace Avenue, Dhaka, Bangladesh</p>
        </div>
      </div>
      
      <form className="bg-card border rounded p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-lg mb-4 text-foreground">Send us a Message</h2>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Name</label>
          <input type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background" placeholder="Your email" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Message</label>
          <textarea rows="5" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-background" placeholder="How can we help you?"></textarea>
        </div>
        <button type="button" className="bg-primary text-primary-foreground px-6 py-2.5 rounded font-bold hover:bg-primary/90 transition-colors">Send Message</button>
      </form>
    </div>
  );
}
