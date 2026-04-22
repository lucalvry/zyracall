import { Link } from "react-router-dom";
import { ArrowRight, Phone, BarChart3, BookOpen, Calculator, UserPlus } from "lucide-react";
import { getRelatedContent } from "@/data/topical-map";

interface RelatedItem {
  title: string;
  href: string;
  description?: string;
}

interface RelatedContentProps {
  /**
   * Provide the current page's pathname (e.g. "/call/india") to auto-populate
   * related links from the topical map. Overrides any manual props if provided.
   */
  currentHref?: string;
  countries?: RelatedItem[];
  comparisons?: RelatedItem[];
  articles?: RelatedItem[];
  showRateCalculator?: boolean;
  showSignupCTA?: boolean;
  variant?: "sidebar" | "inline" | "footer";
}

const RelatedContent = ({
  currentHref,
  countries: countriesProp = [],
  comparisons: comparisonsProp = [],
  articles: articlesProp = [],
  showRateCalculator = true,
  showSignupCTA = true,
  variant = "sidebar",
}: RelatedContentProps) => {
  // If currentHref is provided, derive related links from the topical map.
  const derived = currentHref ? getRelatedContent(currentHref) : null;
  const countries: RelatedItem[] = derived?.countries.length ? derived.countries : countriesProp;
  const comparisons: RelatedItem[] = derived?.comparisons.length ? derived.comparisons : comparisonsProp;
  const articles: RelatedItem[] = derived?.articles.length ? derived.articles : articlesProp;
  const hasContent = countries.length > 0 || comparisons.length > 0 || articles.length > 0;

  if (!hasContent && !showRateCalculator && !showSignupCTA) {
    return null;
  }

  // Inline variant for embedding within content
  if (variant === "inline") {
    return (
      <div className="my-8 p-6 bg-muted/50 rounded-xl border border-border">
        <h4 className="text-base font-semibold mb-4">You might also like</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {countries.slice(0, 3).map((country) => (
            <Link
              key={country.href}
              to={country.href}
              className="flex items-center gap-2 p-3 bg-background rounded-lg hover:bg-primary/5 transition-colors group"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {country.title}
              </span>
            </Link>
          ))}
          {comparisons.slice(0, 3).map((comparison) => (
            <Link
              key={comparison.href}
              to={comparison.href}
              className="flex items-center gap-2 p-3 bg-background rounded-lg hover:bg-primary/5 transition-colors group"
            >
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {comparison.title}
              </span>
            </Link>
          ))}
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.href}
              to={article.href}
              className="flex items-center gap-2 p-3 bg-background rounded-lg hover:bg-primary/5 transition-colors group"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {article.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Footer variant for page bottom
  if (variant === "footer") {
    return (
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold mb-8 text-center">Explore More</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {countries.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Popular Destinations
                </h4>
                <ul className="space-y-2">
                  {countries.slice(0, 5).map((country) => (
                    <li key={country.href}>
                      <Link
                        to={country.href}
                        className="text-sm hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {country.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {comparisons.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Compare Services
                </h4>
                <ul className="space-y-2">
                  {comparisons.slice(0, 5).map((comparison) => (
                    <li key={comparison.href}>
                      <Link
                        to={comparison.href}
                        className="text-sm hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {comparison.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {articles.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Learn More
                </h4>
                <ul className="space-y-2">
                  {articles.slice(0, 5).map((article) => (
                    <li key={article.href}>
                      <Link
                        to={article.href}
                        className="text-sm hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default sidebar variant
  return (
    <aside className="bg-muted/30 border border-border rounded-2xl p-6 lg:p-8 sticky top-24">
      <h3 className="text-lg font-semibold mb-6">Related Resources</h3>

      {/* Related Countries */}
      {countries.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Call Other Countries
          </h4>
          <ul className="space-y-2">
            {countries.map((country) => (
              <li key={country.href}>
                <Link
                  to={country.href}
                  className="text-sm text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>{country.title}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {country.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{country.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Comparisons */}
      {comparisons.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Comparisons
          </h4>
          <ul className="space-y-2">
            {comparisons.map((comparison) => (
              <li key={comparison.href}>
                <Link
                  to={comparison.href}
                  className="text-sm text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>{comparison.title}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {comparison.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{comparison.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Articles */}
      {articles.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Helpful Articles
          </h4>
          <ul className="space-y-2">
            {articles.map((article) => (
              <li key={article.href}>
                <Link
                  to={article.href}
                  className="text-sm text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                >
                  <span>{article.title}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {article.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{article.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rate Calculator CTA */}
      {showRateCalculator && (
        <Link
          to="/rates"
          className="block bg-primary/10 hover:bg-primary/20 rounded-xl p-4 mb-4 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Check Calling Rates</p>
              <p className="text-xs text-muted-foreground">See rates for 200+ countries</p>
            </div>
          </div>
        </Link>
      )}

      {/* Signup CTA */}
      {showSignupCTA && (
        <Link
          to="/signup"
          className="block bg-primary text-primary-foreground rounded-xl p-4 text-center hover:bg-primary/90 transition-colors group"
        >
          <div className="flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" />
            <p className="font-medium">Start Calling Today</p>
          </div>
          <p className="text-xs opacity-80 mt-1">Free signup, pay only for calls</p>
        </Link>
      )}
    </aside>
  );
};

export default RelatedContent;
