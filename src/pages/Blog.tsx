import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, User, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Categories for filtering
const categories = ["All", "Guides", "Tips & Tricks", "Technology", "Education", "Business"];

// Blog posts with ISO dates for proper semantic markup
const blogPosts = [
  {
    id: 1,
    title: "How to Save Money on International Calls in 2025",
    excerpt: "Discover the best strategies for reducing your international calling costs without sacrificing quality.",
    category: "Tips & Tricks",
    author: "ZyraCall Team",
    date: "January 5, 2025",
    dateISO: "2025-01-05",
    readTime: "5 min read",
    slug: "save-money-international-calls-2025",
  },
  {
    id: 2,
    title: "Browser-Based Calling: The Future of Communication",
    excerpt: "Why more people are switching from traditional calling apps to browser-based solutions like ZyraCall.",
    category: "Technology",
    author: "ZyraCall Team",
    date: "January 2, 2025",
    dateISO: "2025-01-02",
    readTime: "4 min read",
    slug: "browser-based-calling-future",
  },
  {
    id: 3,
    title: "WiFi Calling vs VoIP: What's the Difference?",
    excerpt: "Understand the key differences between WiFi calling and VoIP services, and learn which is best for international calls.",
    category: "Technology",
    author: "ZyraCall Team",
    date: "January 10, 2025",
    dateISO: "2025-01-10",
    readTime: "5 min read",
    slug: "wifi-calling-vs-voip",
  },
  {
    id: 4,
    title: "Free International Calling: What Really Works?",
    excerpt: "An honest review of 'free' international calling options—what works, what doesn't, and when paid services are worth it.",
    category: "Education",
    author: "ZyraCall Team",
    date: "January 12, 2025",
    dateISO: "2025-01-12",
    readTime: "6 min read",
    slug: "free-international-calling",
  },
  {
    id: 5,
    title: "Business International Calling: A Complete Guide",
    excerpt: "How small and medium businesses can cut international calling costs by 70-90% while maintaining professional quality.",
    category: "Business",
    author: "ZyraCall Team",
    date: "January 14, 2025",
    dateISO: "2025-01-14",
    readTime: "7 min read",
    slug: "business-international-calling",
  },
  {
    id: 6,
    title: "Staying Connected with Family Abroad",
    excerpt: "Tips and tools for maintaining strong connections with loved ones across borders and time zones.",
    category: "Guides",
    author: "ZyraCall Team",
    date: "December 28, 2024",
    dateISO: "2024-12-28",
    readTime: "7 min read",
    slug: "expat-calling-family-guide",
  },
  {
    id: 7,
    title: "Mobile vs Landline: Which is Cheaper?",
    excerpt: "Understanding the price difference can save you 20-50% on your international calls.",
    category: "Education",
    author: "ZyraCall Team",
    date: "December 20, 2024",
    dateISO: "2024-12-20",
    readTime: "5 min read",
    slug: "mobile-vs-landline-rates",
  },
  {
    id: 8,
    title: "Understanding VoIP Quality",
    excerpt: "What makes some VoIP calls sound great while others are choppy? Learn the factors that affect call quality.",
    category: "Technology",
    author: "ZyraCall Team",
    date: "December 15, 2024",
    dateISO: "2024-12-15",
    readTime: "6 min read",
    slug: "voip-quality-guide",
  },
];

// Featured pillar article
const pillarArticle = {
  title: "The Ultimate Guide to International Calling",
  excerpt: "Everything you need to know about making cheap, crystal-clear international calls. From VoIP technology to money-saving tips, this comprehensive guide covers it all.",
  readTime: "15 min read",
  slug: "international-calling-guide",
};

// Generate JSON-LD structured data for the blog
const generateBlogSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "ZyraCall Blog",
  description: "Tips, guides, and insights for staying connected globally through affordable international calling",
  url: "https://zyracall.com/blog",
  publisher: {
    "@type": "Organization",
    name: "ZyraCall",
    logo: {
      "@type": "ImageObject",
      url: "https://zyracall.com/logo.png",
    },
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    url: `https://zyracall.com/blog/${post.slug}`,
  })),
});

// Generate breadcrumb schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://zyracall.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://zyracall.com/blog",
    },
  ],
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Blog | ZyraCall - International Calling Tips & News</title>
        <meta
          name="description"
          content="Stay updated with the latest tips, guides, and news about international calling, browser-based communication, and staying connected globally."
        />
        <link rel="canonical" href="https://zyracall.com/blog" />
        <meta
          name="keywords"
          content="international calling tips, VoIP blog, cheap calls abroad, browser calling guide, international phone rates, calling overseas"
        />

        {/* Open Graph */}
        <meta property="og:title" content="ZyraCall Blog - International Calling Tips & News" />
        <meta
          property="og:description"
          content="Stay updated with the latest tips, guides, and news about international calling, browser-based communication, and staying connected globally."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zyracall.com/blog" />
        <meta property="og:site_name" content="ZyraCall" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ZyraCall Blog - International Calling Tips & News" />
        <meta
          name="twitter:description"
          content="Stay updated with the latest tips, guides, and news about international calling."
        />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(generateBlogSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto mb-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Blog</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </nav>

            {/* Header */}
            <header className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">ZyraCall Blog</h1>
              <p className="text-xl text-muted-foreground">
                Tips, guides, and insights for staying connected globally
              </p>
            </header>

            {/* Featured Pillar Article */}
            <section className="max-w-5xl mx-auto mb-12">
              <Link to={`/blog/${pillarArticle.slug}`} className="block group">
                <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20 overflow-hidden hover:border-primary/40 transition-all">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                          <Sparkles className="w-4 h-4" />
                          Featured Guide
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {pillarArticle.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">{pillarArticle.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            Complete Guide
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {pillarArticle.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <ArrowRight className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </section>

            {/* Category Filter */}
            <section className="max-w-5xl mx-auto mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="max-w-5xl mx-auto" aria-label="Blog posts">
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Placeholder image area */}
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="text-primary/30 text-sm">Featured Image</span>
                    </div>

                    <div className="p-6">
                      <span
                        itemProp="articleSection"
                        className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3"
                      >
                        {post.category}
                      </span>

                      <h2 className="text-xl font-bold mb-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          itemProp="url"
                          className="hover:text-primary transition-colors"
                        >
                          <span itemProp="headline">{post.title}</span>
                        </Link>
                      </h2>

                      <p
                        itemProp="description"
                        className="text-muted-foreground text-sm mb-4 line-clamp-2"
                      >
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span
                            itemProp="author"
                            itemScope
                            itemType="https://schema.org/Organization"
                            className="flex items-center gap-1"
                          >
                            <User className="w-3 h-3" aria-hidden="true" />
                            <span itemProp="name">{post.author}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            <span itemProp="timeRequired">{post.readTime}</span>
                          </span>
                        </div>
                        <time itemProp="datePublished" dateTime={post.dateISO}>
                          {post.date}
                        </time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found in this category.</p>
                </div>
              )}

              {/* Coming Soon Notice */}
              <aside className="mt-16 text-center">
                <div className="bg-muted/30 border border-border rounded-2xl p-8 max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold mb-2">More Content Coming Soon</h3>
                  <p className="text-muted-foreground mb-6">
                    We are working on more helpful articles and guides. Sign up to be notified when
                    new content is published.
                  </p>
                  <Button asChild variant="hero">
                    <Link to="/signup">
                      Get Updates
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </aside>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
