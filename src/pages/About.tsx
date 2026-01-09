import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const generateAboutSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About ZyraCall",
  "description": "Learn about ZyraCall, the browser-based calling platform making international phone calls simple and affordable.",
  "url": "https://zyracall.com/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "ZyraCall",
    "description": "Browser-based international calling platform that makes staying connected with friends, family, and colleagues around the world simple and affordable.",
    "url": "https://zyracall.com",
    "logo": "https://zyracall.com/logo.png",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": "https://zyracall.com/contact"
    }
  }
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://zyracall.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://zyracall.com/about"
    }
  ]
};

const About = () => {
  return (
    <>
      <Helmet>
        <title>About ZyraCall - Browser-Based Global Calling</title>
        <meta name="description" content="Learn about ZyraCall, the browser-based calling platform making international phone calls simple and affordable. No apps, no subscriptions." />
        <link rel="canonical" href="https://zyracall.com/about" />
        <meta name="keywords" content="about zyracall, browser calling company, international calling platform, VoIP service, affordable calling, web-based phone calls" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About ZyraCall - Browser-Based Global Calling" />
        <meta property="og:description" content="Learn about ZyraCall, the browser-based calling platform making international phone calls simple and affordable." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zyracall.com/about" />
        <meta property="og:site_name" content="ZyraCall" />
        <meta property="og:image" content="https://zyracall.com/og-about.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About ZyraCall - Browser-Based Global Calling" />
        <meta name="twitter:description" content="Learn about ZyraCall, the browser-based calling platform making international phone calls simple and affordable." />
        <meta name="twitter:image" content="https://zyracall.com/og-about.png" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateAboutSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
              {/* Breadcrumb Navigation */}
              <Breadcrumb className="mb-8">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>About</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-center">About ZyraCall</h1>
              <p className="text-lg text-muted-foreground text-center mb-8">
                ZyraCall brings back simple, reliable international calling for the modern web.
              </p>
              <article className="prose prose-gray max-w-none">
                <p className="text-muted-foreground">We believe calling someone shouldn't require downloading apps, managing subscriptions, or navigating complex pricing. ZyraCall is built for people who just want to make a call — quickly, affordably, and from any device with a browser.</p>
                
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Our Mission</h2>
                <p className="text-muted-foreground">To make international calling as simple as opening a web page. No installations, no monthly fees, no complicated plans — just straightforward, pay-as-you-go calling to any phone number worldwide.</p>
                
                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Why ZyraCall?</h2>
                <ul className="text-muted-foreground space-y-2">
                  <li><strong>Browser-Based:</strong> Call directly from Chrome, Safari, Firefox, or any modern browser</li>
                  <li><strong>No Apps Required:</strong> Skip the app store entirely</li>
                  <li><strong>Pay As You Go:</strong> Only pay for the minutes you use</li>
                  <li><strong>Transparent Pricing:</strong> See rates upfront with no hidden fees</li>
                  <li><strong>Global Reach:</strong> Call landlines and mobiles in 200+ countries</li>
                </ul>
              </article>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
