import { Users, ThumbsUp, ThumbsDown } from "lucide-react";

interface FeedbackStatsProps {
  platformName: string;
  className?: string;
}

const FeedbackStats = ({ platformName, className }: FeedbackStatsProps) => {
  // Note: In a production app, you'd fetch real stats via an edge function
  // For now, we display a prompt for user contributions
  
  return (
    <div className={className}>
      <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Community Reports</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Help improve {platformName} data by reporting your verification experiences. 
              Click the <ThumbsUp className="w-3 h-3 inline mx-1" /> or <ThumbsDown className="w-3 h-3 inline mx-1" /> 
              buttons next to each number type in the table below.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackStats;
