import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import FeedbackDialog from "./FeedbackDialog";
import { usePlatformFeedback } from "@/hooks/usePlatformFeedback";

interface FeedbackButtonProps {
  platformId: string;
  platformName: string;
  countryCode: string;
  countryName: string;
  countryFlag: string;
  numberType: 'mobile' | 'voip' | 'virtual';
  className?: string;
}

const FeedbackButton = ({
  platformId,
  platformName,
  countryCode,
  countryName,
  countryFlag,
  numberType,
  className,
}: FeedbackButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [preSelectedWorked, setPreSelectedWorked] = useState<boolean | undefined>();
  const { hasFeedback } = usePlatformFeedback();

  const alreadySubmitted = hasFeedback(platformId, countryCode, numberType);

  const handleClick = (worked: boolean) => {
    setPreSelectedWorked(worked);
    setDialogOpen(true);
  };

  if (alreadySubmitted) {
    return (
      <div className={cn("flex items-center gap-1 text-emerald-400 text-xs", className)}>
        <Check className="w-3 h-3" />
        <span>Submitted</span>
      </div>
    );
  }

  return (
    <>
      <div className={cn("flex items-center gap-1", className)}>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-emerald-500/20 hover:text-emerald-400"
          onClick={() => handleClick(true)}
          title="This worked"
        >
          <ThumbsUp className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-red-500/20 hover:text-red-400"
          onClick={() => handleClick(false)}
          title="This didn't work"
        >
          <ThumbsDown className="w-3 h-3" />
        </Button>
      </div>

      <FeedbackDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        platformId={platformId}
        platformName={platformName}
        countryCode={countryCode}
        countryName={countryName}
        countryFlag={countryFlag}
        preSelectedType={numberType}
        preSelectedWorked={preSelectedWorked}
      />
    </>
  );
};

export default FeedbackButton;
