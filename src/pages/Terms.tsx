import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - ZyraCall</title>
        <meta name="description" content="ZyraCall terms of service. Read our terms and conditions for using the ZyraCall calling platform." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
              <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
              <p className="text-muted-foreground mb-4">Last updated: January 2026</p>
              <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
                <p>By using ZyraCall, you agree to these terms and conditions.</p>
                <h2 className="text-xl font-semibold text-foreground mt-8">Use of Service</h2>
                <p>ZyraCall provides browser-based international calling services. You must be at least 18 years old to use our services.</p>
                <h2 className="text-xl font-semibold text-foreground mt-8">Payment Terms</h2>
                <p>All payments are processed securely. Credit added to your wallet is non-refundable but does not expire.</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Terms;
