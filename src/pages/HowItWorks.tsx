import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { UserPlus, Wallet, Phone, ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

const generateHowToSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Make International Calls with ZyraCall",
  "description": "Get started making affordable international calls in 3 simple steps: sign up, add credit, and start calling worldwide from your browser.",
  "url": "https://zyracall.com/how-it-works",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "5"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Create Your Account",
      "text": "Sign up for free with just your email address. No credit card required to get started.",
      "url": "https://zyracall.com/signup"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Add Credit to Your Wallet",
      "text": "Add credit to your wallet using any major credit card or debit card. Start with as little as $5.",
      "url": "https://zyracall.com/wallet"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Start Calling Worldwide",
      "text": "Enter any phone number and click call. Your browser handles everything - no app downloads needed.",
      "url": "https://zyracall.com/dashboard"
    }
  ]
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://zyracall.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "How It Works",
      "item": "https://zyracall.com/how-it-works"
    }
  ]
};

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up for free with just your email address. No credit card required to get started.",
    detail: "Takes less than 30 seconds"
  },
  {
    icon: Wallet,
    title: "Add Credit",
    description: "Add credit to your wallet using any major credit card or debit card. Start with as little as $5.",
    detail: "Secure payment via Stripe"
  },
  {
    icon: Phone,
    title: "Start Calling",
    description: "Enter any phone number and click call. Your browser handles everything - no app downloads needed.",
    detail: "Call 200+ countries"
  }
];

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How ZyraCall Works - Simple Browser-Based Calling</title>
        <meta name="description" content="Learn how ZyraCall works. Sign up, add credit, and start calling any phone number worldwide from your browser in minutes. No apps required." />
        <link rel="canonical" href="https://zyracall.com/how-it-works" />
        <meta name="keywords" content="how to call internationally, browser calling guide, VoIP setup, international calling tutorial, make cheap calls online, web calling instructions" />
        
        {/* Open Graph */}
        <meta property="og:title" content="How ZyraCall Works - Simple Browser-Based Calling" />
        <meta property="og:description" content="Learn how ZyraCall works. Sign up, add credit, and start calling any phone number worldwide from your browser in minutes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zyracall.com/how-it-works" />
        <meta property="og:site_name" content="ZyraCall" />
        <meta property="og:image" content="https://zyracall.com/og-how-it-works.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How ZyraCall Works - Simple Browser-Based Calling" />
        <meta name="twitter:description" content="Learn how ZyraCall works. Sign up, add credit, and start calling any phone number worldwide from your browser in minutes." />
        <meta name="twitter:image" content="https://zyracall.com/og-how-it-works.png" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateHowToSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              {/* Breadcrumb Navigation */}
              <Breadcrumb className="mb-8">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>How It Works</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">How ZyraCall Works</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get started in 3 simple steps: Sign up with email, add credit to your wallet, and start calling worldwide.
                </p>
              </div>

              {/* Steps */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {steps.map((step, index) => (
                  <article 
                    key={index}
                    className="relative bg-card border border-border rounded-2xl p-6 text-center"
                    itemScope
                    itemType="https://schema.org/HowToStep"
                  >
                    <meta itemProp="position" content={String(index + 1)} />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mt-4 mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2" itemProp="name">{step.title}</h2>
                    <p className="text-muted-foreground mb-3" itemProp="text">{step.description}</p>
                    <span className="text-sm text-primary font-medium">{step.detail}</span>
                  </article>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Ready to start calling?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Join thousands of users making affordable international calls directly from their browser.
                </p>
                <Button asChild size="lg" className="gap-2">
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HowItWorks;
