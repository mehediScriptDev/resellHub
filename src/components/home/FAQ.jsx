"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  {
    question: "How do I post an ad?",
    answer: "Click the yellow 'POST YOUR AD' button at the top right of the page. You will need to log in or create an account to post. Fill out the details, add photos, and submit!"
  },
  {
    question: "Is it free to post an ad?",
    answer: "Yes! Posting standard ads is completely free. We also offer premium features like 'Urgent' or 'Bump Up' for a small fee if you want to sell faster."
  },
  {
    question: "How do I contact a seller?",
    answer: "Open any ad and click the 'Chat' button to send a direct message, or view their phone number to call them directly."
  },
  {
    question: "How do I stay safe on ReSell Hub?",
    answer: "Always meet in a safe, public place. Inspect the item thoroughly before paying. Do not send money in advance before receiving the item."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-8 bg-white border-t mt-4">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-4 bg-muted/10 hover:bg-muted/30 transition-colors text-left font-medium text-foreground text-sm"
              >
                {faq.question}
                {openIndex === index ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white text-sm text-muted-foreground border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
