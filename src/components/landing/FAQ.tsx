import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    question: "Do I need to download any software or app to use ZyraCall?",
    answer: "No. ZyraCall works entirely in your web browser using WebRTC technology. Just sign up, add credit, and start calling any phone number worldwide. No downloads, no installations, no browser plugins required.",
  },
  {
    question: "What countries can I call with ZyraCall?",
    answer: "ZyraCall supports VoIP calls to over 200 countries and territories worldwide, including mobile and landline numbers. You can check specific per-minute rates for any destination before placing your call.",
  },
  {
    question: "How does ZyraCall billing and pricing work?",
    answer: "ZyraCall uses a simple pay-as-you-go model with no subscriptions or monthly fees. Add credit to your wallet and calls are deducted per minute based on the destination country's rate. Credits never expire.",
  },
  {
    question: "Can I see the cost of my international call in real-time?",
    answer: "Yes. During every call, ZyraCall displays a live cost counter showing exactly how much you're spending per minute. This real-time cost display ensures complete transparency with no surprises on your bill.",
  },
  {
    question: "Is call recording available on ZyraCall?",
    answer: "Yes, you can optionally enable call recording for any international call. Recordings are stored securely in your account using encrypted storage and can be downloaded anytime. Ensure you have consent where legally required.",
  },
  {
    question: "What payment methods does ZyraCall accept?",
    answer: "ZyraCall accepts all major credit and debit cards including Visa, Mastercard, and American Express. Payments are processed securely through Stripe, a PCI-compliant payment processor used by millions of businesses worldwide.",
  },
  {
    question: "How is VoIP call quality on ZyraCall?",
    answer: "ZyraCall uses premium VoIP infrastructure with WebRTC technology to deliver HD audio quality. The system automatically routes calls through the optimal path for clear, reliable audio with minimal latency and jitter.",
  },
  {
    question: "Can I use ZyraCall for business international calling?",
    answer: "Absolutely. ZyraCall is ideal for businesses making international calls. Features like call recording, detailed call history with cost tracking, transparent per-minute billing, and browser-based access make it perfect for professional use.",
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
            Frequently asked questions about ZyraCall
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about browser-based international calling with ZyraCall
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
