import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingPreview from "@/components/landing/PricingPreview";
import TrustSection from "@/components/landing/TrustSection";
import FAQ, { generateFAQSchema } from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import SEOHead, { organizationSchema, websiteSchema, generateSpeakableSchema } from "@/components/seo/SEOHead";

const Landing = () => {
  return (
    <>
      <SEOHead
        title="ZyraCall - International Calls from Your Browser | No App Needed"
        description="Make affordable international calls directly from your browser. No app downloads, pay-as-you-go pricing, crystal-clear quality to 200+ countries. Start calling free today."
        canonicalUrl="https://zyracall.com"
        keywords="international calling, browser calling, VoIP, cheap international calls, no app calling, pay as you go calling"
        ogImageTitle="ZyraCall"
        ogImageSubtitle="International calls from your browser"
        ogImageType="default"
        structuredData={[
          organizationSchema,
          websiteSchema,
          generateFAQSchema(),
          generateSpeakableSchema("https://zyracall.com", "ZyraCall - Browser-Based International Calling"),
        ]}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <Features />
          <HowItWorks />
          <PricingPreview />
          <TrustSection />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Landing;
