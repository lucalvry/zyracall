import { Helmet } from "react-helmet-async";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | ZyraCall</title>
        <meta name="description" content="Learn about how ZyraCall uses cookies and similar technologies to improve your experience." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
              <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

              <div className="prose prose-slate max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    ZyraCall uses cookies for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Essential cookies:</strong> Required for the website to function properly, including authentication and security.</li>
                    <li><strong className="text-foreground">Functional cookies:</strong> Remember your preferences such as language and region settings.</li>
                    <li><strong className="text-foreground">Analytics cookies:</strong> Help us understand how visitors interact with our website to improve user experience.</li>
                    <li><strong className="text-foreground">Marketing cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
                  <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">Session Cookies</h3>
                      <p className="text-sm text-muted-foreground">Temporary cookies that expire when you close your browser.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Persistent Cookies</h3>
                      <p className="text-sm text-muted-foreground">Remain on your device until they expire or you delete them.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">First-Party Cookies</h3>
                      <p className="text-sm text-muted-foreground">Set by ZyraCall directly.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Third-Party Cookies</h3>
                      <p className="text-sm text-muted-foreground">Set by our partners for analytics and marketing purposes.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Most web browsers allow you to control cookies through their settings. You can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete all or specific cookies</li>
                    <li>Block cookies from all or specific websites</li>
                    <li>Set your browser to notify you when a cookie is being set</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Please note that blocking all cookies may impact your experience on our website and limit certain functionality.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about our use of cookies, please contact us at{" "}
                    <a href="mailto:privacy@zyracall.com" className="text-primary hover:underline">
                      privacy@zyracall.com
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CookiePolicy;
