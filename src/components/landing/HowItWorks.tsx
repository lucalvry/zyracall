import { UserPlus, Wallet, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: <UserPlus className="w-6 h-6" />,
    title: "Create Account",
    description: "Sign up in seconds with just your email. No credit card required to get started.",
  },
  {
    number: "02",
    icon: <Wallet className="w-6 h-6" />,
    title: "Add Credit",
    description: "Top up your wallet with any amount. Pay only for what you use, no subscriptions.",
  },
  {
    number: "03",
    icon: <Phone className="w-6 h-6" />,
    title: "Start Calling",
    description: "Dial any phone number worldwide directly from your browser. It's that simple.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" id="how-it-works" itemScope itemType="https://schema.org/HowTo">
      <meta itemProp="name" content="How to make international calls from your browser" />
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/4" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — Q&A Format */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-accent font-medium text-sm tracking-wide uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            How does browser-based{" "}
            <span className="gradient-text-accent">international calling work?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-speakable="true">
            ZyraCall uses WebRTC technology to route VoIP calls through your browser. 
            Sign up with your email, add credit to your wallet, and dial any phone number 
            in over 200 countries — no app downloads, plugins, or SIM cards needed.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="relative" itemProp="step" itemScope itemType="https://schema.org/HowToStep">
              <meta itemProp="position" content={String(index + 1)} />
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[60%] w-full h-px bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="relative text-center">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-card border border-border/50 shadow-card mb-6 relative">
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3" itemProp="name">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto" itemProp="text">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all h-14 px-8 text-base font-semibold group"
            asChild
          >
            <Link to="/signup">
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
