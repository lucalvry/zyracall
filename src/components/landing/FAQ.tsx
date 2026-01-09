import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    question: "Do I need to download any software or app?",
    answer: "No. ZyraCall works entirely in your web browser. Just sign up, add credit, and start calling. No downloads, no installations, no plugins required.",
  },
  {
    question: "What countries can I call?",
    answer: "ZyraCall supports calls to over 200 countries and territories worldwide. You can check specific rates for any destination before you call.",
  },
  {
    question: "How does billing work?",
    answer: "We use a simple pay-as-you-go model. Add credit to your wallet, and calls are deducted per minute based on the destination rate. No monthly fees, no commitments.",
  },
  {
    question: "Can I see the cost of my call in real-time?",
    answer: "Yes! During every call, you'll see a live cost counter showing exactly how much you're spending. Complete transparency with no surprises.",
  },
  {
    question: "Is call recording available?",
    answer: "Yes, you can optionally enable call recording for any call. Recordings are stored securely in your account and can be downloaded anytime. Please ensure you have consent where legally required.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, including Visa, Mastercard, and American Express. All payments are processed securely through Stripe.",
  },
  {
    question: "How is call quality?",
    answer: "ZyraCall uses premium VoIP infrastructure to ensure crystal-clear call quality. Our system automatically routes calls through the best available path for optimal audio.",
  },
  {
    question: "Can I use ZyraCall for my business?",
    answer: "Absolutely. ZyraCall is perfect for businesses making international calls. Features like call recording, detailed call history, and transparent billing make it ideal for professional use.",
  },
];

export const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

const FAQ = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" id="faq" aria-labelledby="faq-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-accent font-medium text-sm tracking-wide uppercase mb-4">
            FAQ
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ZyraCall
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto" itemScope itemType="https://schema.org/FAQPage">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 shadow-xs data-[state=open]:shadow-card transition-shadow"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  <span itemProp="name">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent 
                  className="text-muted-foreground pb-5"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{faq.answer}</span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
