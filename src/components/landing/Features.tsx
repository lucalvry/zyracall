import { Shield, Clock, Mic, History, Wallet, Search } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Private",
    description: "Enterprise-grade encryption for all calls. Your conversations stay private.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Real-time Cost Display",
    description: "See exactly what you're spending during every call. No surprises.",
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: "Call Recording",
    description: "Optional recording for important calls. Stored securely in your account.",
  },
  {
    icon: <History className="w-6 h-6" />,
    title: "Complete Call History",
    description: "Access your full call log with duration, cost, and recordings.",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Simple Wallet System",
    description: "Top up your balance anytime. No subscriptions or commitments.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Transparent Rates",
    description: "Check rates for any country before you call. No hidden fees.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to call globally
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, professional tools for reliable international calling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-card border border-border/50 shadow-card hover:shadow-md transition-all hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
