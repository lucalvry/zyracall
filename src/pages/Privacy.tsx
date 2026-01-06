import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - ZyraCall</title>
        <meta name="description" content="ZyraCall privacy policy. Learn how we protect your data and privacy." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
              <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
              <p className="text-muted-foreground mb-4">Last updated: January 2026</p>
              <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
                <p>Your privacy is important to us. This policy explains how ZyraCall collects, uses, and protects your personal information.</p>
                <h2 className="text-xl font-semibold text-foreground mt-8">Information We Collect</h2>
                <p>We collect information you provide directly, such as your email address and payment information when you create an account and make purchases.</p>
                <h2 className="text-xl font-semibold text-foreground mt-8">How We Use Your Information</h2>
                <p>We use your information to provide our calling services, process payments, and communicate with you about your account.</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Privacy;
