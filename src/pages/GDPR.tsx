import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const GDPR = () => {
  return (
    <>
      <Helmet>
        <title>GDPR Compliance | ZyraCall</title>
        <meta name="description" content="Learn about ZyraCall's commitment to GDPR compliance and how we protect your personal data." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">GDPR Compliance</h1>
              <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

              <div className="prose prose-slate max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Our Commitment to GDPR</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    ZyraCall is committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR). This page explains how we handle personal data of individuals in the European Economic Area (EEA) and United Kingdom.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Your Rights Under GDPR</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    As a data subject, you have the following rights:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">Right to Access:</strong> Request a copy of your personal data we hold.</li>
                    <li><strong className="text-foreground">Right to Rectification:</strong> Request correction of inaccurate personal data.</li>
                    <li><strong className="text-foreground">Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
                    <li><strong className="text-foreground">Right to Restrict Processing:</strong> Request limitation of how we use your data.</li>
                    <li><strong className="text-foreground">Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
                    <li><strong className="text-foreground">Right to Object:</strong> Object to processing of your personal data.</li>
                    <li><strong className="text-foreground">Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We process personal data under the following legal bases:
                  </p>
                  <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">Contract Performance</h3>
                      <p className="text-sm text-muted-foreground">Processing necessary to provide our calling services to you.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Legitimate Interests</h3>
                      <p className="text-sm text-muted-foreground">Processing for fraud prevention, security, and service improvement.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Legal Obligation</h3>
                      <p className="text-sm text-muted-foreground">Processing required by law, such as tax and financial reporting.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Consent</h3>
                      <p className="text-sm text-muted-foreground">Processing based on your explicit consent, such as marketing communications.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect and process the following categories of personal data:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Account information (email, name)</li>
                    <li>Payment information (processed securely via Stripe)</li>
                    <li>Call records and usage data</li>
                    <li>Technical data (IP address, browser type)</li>
                    <li>Communication preferences</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain personal data only for as long as necessary for the purposes outlined in our Privacy Policy, or as required by law. Call records are typically retained for 12 months, while account data is retained for the duration of your account plus 3 years for legal compliance.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">International Transfers</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    When we transfer personal data outside the EEA, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Exercising Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To exercise any of your GDPR rights, please contact our Data Protection Officer at{" "}
                    <a href="mailto:dpo@zyracall.com" className="text-primary hover:underline">
                      dpo@zyracall.com
                    </a>
                    . We will respond to your request within 30 days.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Supervisory Authority</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you are not satisfied with how we handle your personal data, you have the right to lodge a complaint with your local data protection supervisory authority.
                  </p>
                </section>

                <section className="pt-4">
                  <p className="text-muted-foreground">
                    For more details on how we handle your data, please read our full{" "}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
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

export default GDPR;
