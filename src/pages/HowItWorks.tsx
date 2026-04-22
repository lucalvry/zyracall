import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
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
import SEOHead, { organizationSchema, generateSpeakableSchema, generateHowToSchema } from "@/components/seo/SEOHead";

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
  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "How It Works", url: "https://zyracall.com/how-it-works" },
  ];

  const howToSchema = generateHowToSchema(
    "How to Make International Calls with ZyraCall",
    "Get started making affordable international calls in 3 simple steps: sign up, add credit, and start calling worldwide from your browser.",
    [
      { name: "Create Your Account", text: "Sign up for free with just your email address. No credit card required to get started.", url: "https://zyracall.com/signup" },
      { name: "Add Credit to Your Wallet", text: "Add credit to your wallet using any major credit card or debit card. Start with as little as $5.", url: "https://zyracall.com/wallet" },
      { name: "Start Calling Worldwide", text: "Enter any phone number and click call. Your browser handles everything - no app downloads needed.", url: "https://zyracall.com/dashboard" },
    ],
    "PT5M"
  );

  const speakableSchema = generateSpeakableSchema(
    "https://zyracall.com/how-it-works",
    "How ZyraCall Works"
  );

  return (
    <>
      <SEOHead
        title="How ZyraCall Works - Simple Browser-Based Calling"
        description="Learn how ZyraCall works. Sign up, add credit, and start calling any phone number worldwide from your browser in minutes. No apps required."
        canonicalUrl="https://zyracall.com/how-it-works"
        keywords="how to call internationally, browser calling guide, VoIP setup, international calling tutorial, make cheap calls online, web calling instructions"
        ogImageTitle="How ZyraCall Works"
        ogImageSubtitle="Simple Browser-Based Calling"
        breadcrumbs={breadcrumbs}
        structuredData={[organizationSchema, howToSchema, speakableSchema]}
      />
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">How do you call any country from a browser with ZyraCall?</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-speakable="true">
                  ZyraCall uses WebRTC technology to route VoIP calls through your browser.
                  Sign up with your email, add credit to your wallet, and dial any phone number
                  in over 200 countries — no app downloads, plugins, or SIM cards needed.
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
