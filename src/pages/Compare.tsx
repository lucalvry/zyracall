import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import CompetitorCard from "@/components/compare/CompetitorCard";
import { Helmet } from "react-helmet-async";

const competitors = [
  {
    name: "Skype",
    slug: "skype",
    icon: "💬",
    description: "See how ZyraCall compares to Skype for international calling. No app downloads, better rates.",
  },
  {
    name: "Google Voice",
    slug: "google-voice",
    icon: "🔊",
    description: "Compare ZyraCall and Google Voice for global calling. More countries, simpler pricing.",
  },
  {
    name: "Rebtel",
    slug: "rebtel",
    icon: "📱",
    description: "ZyraCall vs Rebtel: Browser-based calling vs app-based. See which works better for you.",
  },
  {
    name: "Talk360",
    slug: "talk360",
    icon: "🌐",
    description: "Compare ZyraCall and Talk360 for calling abroad. Transparent rates, no subscriptions.",
  },
  {
    name: "Vonage",
    slug: "vonage",
    icon: "☎️",
    description: "ZyraCall vs Vonage: Simple browser calling vs enterprise solutions. Find the right fit.",
  },
];

const Compare = () => {
  return (
    <>
      <Helmet>
        <title>Compare ZyraCall - See How We Stack Up | ZyraCall</title>
        <meta 
          name="description" 
          content="Compare ZyraCall with Skype, Google Voice, Rebtel, and other international calling services. See why ZyraCall offers the best value for browser-based global calling." 
        />
        <link rel="canonical" href="https://zyracall.com/compare" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 gradient-mesh" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block text-accent font-medium text-sm tracking-wide uppercase mb-4">
                  Comparisons
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  How ZyraCall compares to{" "}
                  <span className="gradient-text-accent">the competition</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  See detailed comparisons with popular calling services. 
                  Find out why thousands choose ZyraCall for international calls.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Grid */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {competitors.map((competitor) => (
                  <CompetitorCard key={competitor.slug} {...competitor} />
                ))}
              </div>
            </div>
          </section>

          {/* Why ZyraCall */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Why users switch to ZyraCall
                </h2>
                <div className="grid sm:grid-cols-3 gap-8 mt-12">
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">100%</div>
                    <p className="text-muted-foreground">Browser-based</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">200+</div>
                    <p className="text-muted-foreground">Countries supported</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">$0</div>
                    <p className="text-muted-foreground">Monthly fees</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Compare;
