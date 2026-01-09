import { Link } from "react-router-dom";
import { ArrowRight, Globe, Heart, Rocket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/seo/SEOHead";

const values = [
  {
    icon: Globe,
    title: "Global Impact",
    description: "Help connect people across borders and make international communication accessible to everyone.",
  },
  {
    icon: Rocket,
    title: "Innovation First",
    description: "We're building the future of browser-based calling with cutting-edge WebRTC technology.",
  },
  {
    icon: Users,
    title: "Remote-First",
    description: "Work from anywhere in the world. We believe talent has no geographical boundaries.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description: "Every decision we make is guided by what's best for the people who use ZyraCall.",
  },
];

const Careers = () => {
  return (
    <>
      <SEOHead
        title="Careers at ZyraCall | Join Our Team"
        description="Join the ZyraCall team and help us revolutionize international calling. We're building the future of browser-based communication."
        canonicalUrl="https://zyracall.com/careers"
        ogImageTitle="Join Our Team"
        ogImageSubtitle="Build the future of calling"
        ogImageType="default"
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Join the <span className="text-primary">ZyraCall</span> Team
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Help us make international calling accessible to everyone. 
                  We're building something special and we want you to be part of it.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {values.map((value, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
                <p className="text-muted-foreground text-center mb-12">
                  We're always looking for talented people to join our team.
                </p>

                {/* No Open Positions Notice */}
                <div className="bg-card border border-border rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Open Positions Right Now</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We don't have any open positions at the moment, but we're always interested in meeting talented people. Send us your resume and we'll keep it on file.
                  </p>
                  <Button asChild variant="outline">
                    <a href="mailto:careers@zyracall.com">
                      Send Your Resume
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Why Work With Us</h2>
                <p className="text-muted-foreground mb-8">
                  We offer competitive benefits and a great work environment.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-left">
                  {[
                    "Competitive salary & equity",
                    "Remote-first culture",
                    "Flexible working hours",
                    "Health & wellness benefits",
                    "Learning & development budget",
                    "Latest equipment provided",
                    "Unlimited PTO policy",
                    "Team retreats & events",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 bg-muted/30 rounded-lg p-4">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 lg:py-24 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Interested in Joining?</h2>
                <p className="text-muted-foreground mb-8">
                  Even if we don't have an open position that fits your skills, we'd love to hear from you. 
                  Reach out and tell us about yourself.
                </p>
                <Button asChild size="xl" variant="hero">
                  <a href="mailto:careers@zyracall.com">
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </a>
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

export default Careers;
