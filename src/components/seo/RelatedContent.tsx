import { Link } from "react-router-dom";
import { ArrowRight, Phone, BarChart3, BookOpen } from "lucide-react";

interface RelatedItem {
  title: string;
  href: string;
  description?: string;
}

interface RelatedContentProps {
  countries?: RelatedItem[];
  comparisons?: RelatedItem[];
  articles?: RelatedItem[];
  showRateCalculator?: boolean;
  showSignupCTA?: boolean;
}

const RelatedContent = ({
  countries = [],
  comparisons = [],
  articles = [],
  showRateCalculator = true,
  showSignupCTA = true,
}: RelatedContentProps) => {
  const hasContent = countries.length > 0 || comparisons.length > 0 || articles.length > 0;

  if (!hasContent && !showRateCalculator && !showSignupCTA) {
    return null;
  }

  return (
    <aside className="bg-muted/30 border border-border rounded-2xl p-6 lg:p-8">
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
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
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
          className="block bg-primary text-primary-foreground rounded-xl p-4 text-center hover:bg-primary/90 transition-colors"
        >
          <p className="font-medium">Start Calling Today</p>
          <p className="text-xs opacity-80">Free signup, pay only for calls</p>
        </Link>
      )}
    </aside>
  );
};

export default RelatedContent;
