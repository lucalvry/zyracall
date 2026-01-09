import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/seo/SEOHead";

const Contact = () => {
  return (
    <>
      <SEOHead
        title="Contact ZyraCall - Get in Touch"
        description="Contact ZyraCall for support, sales inquiries, or partnership opportunities. We're here to help with your international calling needs."
        canonicalUrl="https://zyracall.com/contact"
        ogImageTitle="Contact Us"
        ogImageSubtitle="We're here to help"
        ogImageType="default"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl">
              <h1 className="text-4xl font-bold text-foreground mb-6 text-center">Contact Us</h1>
              <p className="text-lg text-muted-foreground text-center mb-8">Have questions? We'd love to hear from you.</p>
              <form className="space-y-4">
                <Input placeholder="Your name" />
                <Input type="email" placeholder="Email address" />
                <Textarea placeholder="Your message" rows={5} />
                <Button className="w-full bg-accent hover:bg-accent/90">Send Message</Button>
              </form>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
