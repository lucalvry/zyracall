import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About ZyraCall - Browser-Based Global Calling</title>
        <meta name="description" content="Learn about ZyraCall, the browser-based calling platform making international phone calls simple and affordable." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
              <h1 className="text-4xl font-bold text-foreground mb-6 text-center">About ZyraCall</h1>
              <p className="text-lg text-muted-foreground text-center mb-8">
                ZyraCall brings back simple, reliable international calling for the modern web.
              </p>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground">We believe calling someone shouldn't require downloading apps, managing subscriptions, or navigating complex pricing. ZyraCall is built for people who just want to make a call — quickly, affordably, and from any device with a browser.</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
