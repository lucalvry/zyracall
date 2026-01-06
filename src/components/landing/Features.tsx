import { Shield, Clock, Mic, History, Wallet, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Real-time Cost Display",
    description: "See exactly what you're spending during every call. Complete transparency with no surprises on your bill.",
    color: "accent",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Private",
    description: "Enterprise-grade encryption protects all your calls. Your conversations remain completely private.",
    color: "primary",
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Call Recording",
    description: "Optionally record important calls for future reference. All recordings stored securely in your account.",
    color: "accent",
  },
  {
    icon: <History className="w-6 h-6" />,
    title: "Complete Call History",
    description: "Access your full call log anytime with duration, cost, and recording access in one place.",
    color: "primary",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Simple Wallet System",
    description: "Top up your balance anytime you want. No subscriptions, no commitments, no hidden fees.",
    color: "accent",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Transparent Rates",
    description: "Check rates for any country before you call. What you see is exactly what you pay.",
    color: "primary",
  },
];

const Features = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" id="features">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-accent font-medium text-sm tracking-wide uppercase mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Everything you need for{" "}
            <span className="gradient-text-accent">global calling</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade calling tools designed for reliability, transparency, and ease of use.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="group relative bg-card border border-border/50 rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div 
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                  feature.color === "accent" 
                    ? "bg-accent/10 text-accent" 
                    : "bg-primary/10 text-primary"
                }`}
              >
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Gradient Border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-gradient" />
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all duration-300 group"
          >
            Start calling today
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
