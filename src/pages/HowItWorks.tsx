import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

const HowItWorks = () => {
  return (
    <>
      <Helmet>
        <title>How ZyraCall Works - Simple Browser-Based Calling</title>
        <meta name="description" content="Learn how ZyraCall works. Sign up, add credit, and start calling any phone number worldwide from your browser in minutes." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
              <h1 className="text-4xl font-bold text-foreground mb-6">How ZyraCall Works</h1>
              <p className="text-lg text-muted-foreground">
                Get started in 3 simple steps: Sign up with email, add credit to your wallet, and start calling worldwide.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HowItWorks;
