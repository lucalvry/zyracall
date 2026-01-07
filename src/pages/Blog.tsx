import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

// Placeholder blog posts - in a real app, these would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: "How to Save Money on International Calls in 2025",
    excerpt: "Discover the best strategies for reducing your international calling costs without sacrificing quality.",
    category: "Tips & Tricks",
    author: "ZyraCall Team",
    date: "January 5, 2025",
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
    readTime: "4 min read",
    slug: "browser-based-calling-future",
  },
  {
    id: 3,
    title: "Staying Connected with Family Abroad: A Complete Guide",
    excerpt: "Tips and tools for maintaining strong connections with loved ones across borders and time zones.",
    category: "Guides",
    author: "ZyraCall Team",
    date: "December 28, 2024",
    readTime: "7 min read",
    slug: "staying-connected-family-abroad",
  },
  {
    id: 4,
    title: "Understanding International Calling Rates: What You Need to Know",
    excerpt: "A breakdown of how international calling rates work and how to find the best deals.",
    category: "Education",
    author: "ZyraCall Team",
    date: "December 20, 2024",
    readTime: "6 min read",
    slug: "understanding-international-calling-rates",
  },
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | ZyraCall - International Calling Tips & News</title>
        <meta 
          name="description" 
          content="Stay updated with the latest tips, guides, and news about international calling, browser-based communication, and staying connected globally." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">ZyraCall Blog</h1>
              <p className="text-xl text-muted-foreground">
                Tips, guides, and insights for staying connected globally
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Placeholder image area */}
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="text-primary/30 text-sm">Featured Image</span>
                    </div>
                    
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                        {post.category}
                      </span>
                      
                      <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Coming Soon Notice */}
              <div className="mt-16 text-center">
                <div className="bg-muted/30 border border-border rounded-2xl p-8 max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold mb-2">More Content Coming Soon</h3>
                  <p className="text-muted-foreground mb-6">
                    We're working on more helpful articles and guides. Sign up to be notified when new content is published.
                  </p>
                  <Button asChild variant="hero">
                    <Link to="/signup">
                      Get Updates
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
