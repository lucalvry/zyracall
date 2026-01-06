import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CompetitorCardProps {
  name: string;
  description: string;
  slug: string;
  icon?: string;
}

const CompetitorCard = ({ name, description, slug, icon }: CompetitorCardProps) => {
  return (
    <Link 
      to={`/compare/zyracall-vs-${slug}`}
      className="group block bg-card border border-border/50 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground">
              ZyraCall vs {name}
            </h3>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CompetitorCard;
