import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Ready to start calling{" "}
            <span className="gradient-text-accent">worldwide</span>?
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of users making crystal-clear international calls 
            directly from their browser. No apps, no hassle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all h-14 px-8 text-base font-semibold group"
              asChild
            >
              <Link to="/signup">
                <Phone className="w-5 h-5 mr-2" />
                Start Calling Free
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-border/60 hover:bg-muted/50 h-14 px-8 text-base font-medium"
              asChild
            >
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>

          {/* Trust Note */}
          <p className="text-sm text-muted-foreground mt-8">
            No credit card required · Free minutes on signup · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
