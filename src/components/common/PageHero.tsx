import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageHeroStat {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

interface PageHeroBadge {
  icon?: React.ComponentType<{ className?: string }>;
  text: string;
}

interface PageHeroProps {
  badge?: PageHeroBadge;
  title: string;
  titleAccent?: string;
  description: string;
  stats?: PageHeroStat[];
  children?: React.ReactNode;
  className?: string;
  size?: "default" | "large";
}

const PageHero = ({
  badge,
  title,
  titleAccent,
  description,
  stats,
  children,
  className,
  size = "default",
}: PageHeroProps) => {
  const BadgeIcon = badge?.icon;
  
  // Parse title to insert accent part
  const renderTitle = () => {
    if (!titleAccent) {
      return title;
    }
    
    // If title contains the accent text, split and render with accent styling
    if (title.includes(titleAccent)) {
      const parts = title.split(titleAccent);
      return (
        <>
          {parts[0]}
          <span className="text-accent">{titleAccent}</span>
          {parts[1]}
        </>
      );
    }
    
    // Otherwise append accent as separate element
    return (
      <>
        {title}{" "}
        <span className="text-accent">{titleAccent}</span>
      </>
    );
  };

  return (
    <section className={cn(
      size === "large" ? "pt-32 pb-16 lg:pt-40 lg:pb-20" : "pt-20 pb-12",
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "mx-auto text-center",
          size === "large" ? "max-w-4xl" : "max-w-3xl"
        )}>
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6">
              {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          )}
          
          {/* Title */}
          <h1 className={cn(
            "font-bold text-foreground leading-tight",
            size === "large" 
              ? "text-4xl md:text-5xl lg:text-6xl" 
              : "text-4xl md:text-5xl"
          )}>
            {renderTitle()}
          </h1>
          
          {/* Description */}
          <p className={cn(
            "mt-6 text-muted-foreground",
            size === "large" 
              ? "text-lg md:text-xl max-w-2xl mx-auto" 
              : "text-lg"
          )}>
            {description}
          </p>
          
          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-2 text-muted-foreground">
                    <StatIcon className="w-5 h-5 text-accent" />
                    <span>{stat.text}</span>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Additional Content */}
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
