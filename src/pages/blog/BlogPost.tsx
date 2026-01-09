import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, User, ArrowLeft, Share2, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead, { organizationSchema } from "@/components/seo/SEOHead";
import RelatedContent from "@/components/seo/RelatedContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Blog posts data - in a real app, this would come from a CMS or database
const blogPostsData: Record<string, {
  title: string;
  excerpt: string;
  content: React.ReactNode;
  category: string;
  author: string;
  date: string;
  dateISO: string;
  readTime: string;
  relatedSlugs: string[];
}> = {
  "save-money-international-calls-2025": {
    title: "How to Save Money on International Calls in 2025",
    excerpt: "Discover the best strategies for reducing your international calling costs without sacrificing quality.",
    category: "Tips & Tricks",
    author: "ZyraCall Team",
    date: "January 5, 2025",
    dateISO: "2025-01-05",
    readTime: "5 min read",
    relatedSlugs: ["browser-based-calling-future", "understanding-international-calling-rates"],
    content: (
      <div className="space-y-6">
        <p>
          International calling does not have to break the bank. With the right strategies and tools, 
          you can stay connected with loved ones abroad while keeping costs minimal. Here are our top 
          tips for saving money on international calls in 2025.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Switch to VoIP Services</h2>
        <p>
          Traditional phone carriers charge premium rates for international calls. VoIP services like 
          ZyraCall use your internet connection to make calls, offering rates up to 90% cheaper than 
          traditional carriers.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Use Browser-Based Calling</h2>
        <p>
          Skip the app downloads. Browser-based calling services work directly in your web browser, 
          meaning you can call from any device without installing software. This also means you are 
          always using the latest version with no updates required.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Call Landlines When Possible</h2>
        <p>
          Mobile phone rates are typically 20-50% higher than landline rates due to carrier termination 
          fees. If the person you are calling has access to a landline, use that number to save money.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Check Rates Before Calling</h2>
        <p>
          Use rate calculators to know exactly what you will pay before making a call. This helps avoid 
          surprises and allows you to budget your calling credit effectively.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Pay-As-You-Go vs Subscriptions</h2>
        <p>
          For occasional callers, pay-as-you-go services like ZyraCall offer the best value. You only 
          pay for what you use, with no monthly fees eating into unused credit. For heavy callers, 
          compare subscription packages to find the best deal.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-8">
          <h3 className="font-semibold mb-2">Ready to start saving?</h3>
          <p className="text-muted-foreground mb-4">
            Try ZyraCall today and see how much you can save on international calls.
          </p>
          <Button asChild>
            <Link to="/signup">Get Started Free</Link>
          </Button>
        </div>
      </div>
    ),
  },
  "browser-based-calling-future": {
    title: "Browser-Based Calling: The Future of Communication",
    excerpt: "Why more people are switching from traditional calling apps to browser-based solutions like ZyraCall.",
    category: "Technology",
    author: "ZyraCall Team",
    date: "January 2, 2025",
    dateISO: "2025-01-02",
    readTime: "4 min read",
    relatedSlugs: ["save-money-international-calls-2025", "staying-connected-family-abroad"],
    content: (
      <div className="space-y-6">
        <p>
          The way we communicate is evolving. Browser-based calling represents the next step in 
          telecommunications, offering convenience and accessibility that traditional apps cannot match.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">No Downloads Required</h2>
        <p>
          The biggest advantage of browser-based calling is simplicity. There is no app to download, 
          no updates to install, and no storage space required on your device. Simply open your browser 
          and start calling.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Works on Any Device</h2>
        <p>
          Whether you are on a laptop, desktop, tablet, or smartphone, browser-based calling works 
          seamlessly across all devices. Switch between devices without missing a beat.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Always Up to Date</h2>
        <p>
          With browser-based solutions, you are always using the latest version. No more waiting for 
          app updates or dealing with version compatibility issues.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Enhanced Security</h2>
        <p>
          Modern browsers include robust security features. Browser-based calling services benefit 
          from these protections, including encrypted connections and secure authentication.
        </p>
      </div>
    ),
  },
  "staying-connected-family-abroad": {
    title: "Staying Connected with Family Abroad: A Complete Guide",
    excerpt: "Tips and tools for maintaining strong connections with loved ones across borders and time zones.",
    category: "Guides",
    author: "ZyraCall Team",
    date: "December 28, 2024",
    dateISO: "2024-12-28",
    readTime: "7 min read",
    relatedSlugs: ["save-money-international-calls-2025", "browser-based-calling-future"],
    content: (
      <div className="space-y-6">
        <p>
          Distance should not mean disconnection. With the right approach and tools, you can maintain 
          strong relationships with family members living abroad.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Schedule Regular Call Times</h2>
        <p>
          Time zones can make spontaneous calls challenging. Set up a regular calling schedule that 
          works for both parties. Consistency helps maintain the relationship.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Use Affordable Calling Services</h2>
        <p>
          International calling costs can add up quickly. Services like ZyraCall offer affordable 
          rates that let you talk longer without worrying about the bill.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Mix Communication Methods</h2>
        <p>
          Combine voice calls with video chats, messages, and photo sharing. Different moments call 
          for different types of communication.
        </p>
      </div>
    ),
  },
  "understanding-international-calling-rates": {
    title: "Understanding International Calling Rates: What You Need to Know",
    excerpt: "A breakdown of how international calling rates work and how to find the best deals.",
    category: "Education",
    author: "ZyraCall Team",
    date: "December 20, 2024",
    dateISO: "2024-12-20",
    readTime: "6 min read",
    relatedSlugs: ["save-money-international-calls-2025", "browser-based-calling-future"],
    content: (
      <div className="space-y-6">
        <p>
          International calling rates can seem confusing at first. This guide breaks down everything 
          you need to know about how rates work and how to find the best deals.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">How Rates Are Determined</h2>
        <p>
          International calling rates are influenced by several factors including destination country, 
          phone type (mobile vs landline), and the service provider you use.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Mobile vs Landline Rates</h2>
        <p>
          Mobile phone rates are typically higher due to termination fees charged by mobile carriers. 
          Landlines usually offer more affordable rates.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Avoiding Hidden Fees</h2>
        <p>
          Some providers charge connection fees, minimum call durations, or round up to the nearest 
          minute. Look for providers with transparent, per-second billing.
        </p>
      </div>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsData[slug] : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = post.relatedSlugs
    .map((s) => ({ slug: s, ...blogPostsData[s] }))
    .filter((p) => p.title);

  const breadcrumbs = [
    { name: "Home", url: "https://zyracall.com" },
    { name: "Blog", url: "https://zyracall.com/blog" },
    { name: post.title, url: `https://zyracall.com/blog/${slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ZyraCall",
      logo: {
        "@type": "ImageObject",
        url: "https://zyracall.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zyracall.com/blog/${slug}`,
    },
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | ZyraCall Blog`}
        description={post.excerpt}
        canonicalUrl={`https://zyracall.com/blog/${slug}`}
        keywords={`${post.category.toLowerCase()}, international calling, VoIP, cheap calls`}
        ogImageTitle={post.title}
        ogImageSubtitle={post.category}
        ogType="article"
        breadcrumbs={breadcrumbs}
        structuredData={[organizationSchema, articleSchema]}
      />

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-24 pb-16">
          <article className="container mx-auto px-4 max-w-4xl">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/blog">Blog</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="max-w-[200px] truncate">
                      {post.title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </nav>

            {/* Back Link */}
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b border-border py-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <time dateTime={post.dateISO}>{post.date}</time>
                <Button variant="ghost" size="sm" className="ml-auto">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Article Content */}
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 prose prose-lg dark:prose-invert max-w-none">
                {post.content}
              </div>

              {/* Sidebar with Related Content */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <RelatedContent
                    countries={[
                      { title: "Call India", href: "/call/india" },
                      { title: "Call UK", href: "/call/uk" },
                      { title: "Call Philippines", href: "/call/philippines" },
                    ]}
                    comparisons={[
                      { title: "vs Skype", href: "/compare/zyracall-vs-skype" },
                      { title: "vs Google Voice", href: "/compare/zyracall-vs-google-voice" },
                    ]}
                  />
                </div>
              </aside>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} to={`/blog/${related.slug}`} className="group">
                      <Card className="h-full hover:border-primary/50 transition-all">
                        <CardContent className="p-6">
                          <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                            {related.category}
                          </span>
                          <h3 className="font-semibold group-hover:text-primary transition-colors mb-2">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {related.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Want to Learn More?</h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Check out our complete guide to international calling with everything you need to know.
                </p>
                <Button asChild>
                  <Link to="/blog/international-calling-guide">
                    Read the Complete Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
