import { Shield, Lock, Globe, CreditCard } from "lucide-react";

const trustItems = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Bank-Level Security",
    description: "256-bit encryption on all calls and data",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Privacy First",
    description: "We never sell or share your data",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "200+ Countries",
    description: "Global coverage with reliable connectivity",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Secure Payments",
    description: "PCI-compliant payment processing",
  },
];

const TrustSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-foreground/10 mb-4">
                <div className="text-primary-foreground">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
