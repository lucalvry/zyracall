import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlatformFeedback } from "@/hooks/usePlatformFeedback";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platformId: string;
  platformName: string;
  countryCode: string;
  countryName: string;
  countryFlag: string;
  preSelectedType?: 'mobile' | 'voip' | 'virtual';
  preSelectedWorked?: boolean;
}

const FeedbackDialog = ({
  open,
  onOpenChange,
  platformId,
  platformName,
  countryCode,
  countryName,
  countryFlag,
  preSelectedType,
  preSelectedWorked,
}: FeedbackDialogProps) => {
  const [numberType, setNumberType] = useState<'mobile' | 'voip' | 'virtual'>(preSelectedType || 'mobile');
  const [worked, setWorked] = useState<boolean | null>(preSelectedWorked ?? null);
  const [comment, setComment] = useState("");
  const { submitFeedback, isSubmitting } = usePlatformFeedback();

  const handleSubmit = async () => {
    if (worked === null) return;
    
    const success = await submitFeedback({
      platformId,
      countryCode,
      numberType,
      worked,
      comment: comment.trim() || undefined,
    });

    if (success) {
      onOpenChange(false);
      // Reset form
      setWorked(null);
      setComment("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Verification Result</DialogTitle>
          <DialogDescription>
            Help others by sharing if verification worked for {platformName} in {countryFlag} {countryName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Number Type Selection */}
          <div className="space-y-3">
            <Label>Number Type Used</Label>
            <RadioGroup
              value={numberType}
              onValueChange={(v) => setNumberType(v as 'mobile' | 'voip' | 'virtual')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile" className="font-normal cursor-pointer">Mobile</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="voip" id="voip" />
                <Label htmlFor="voip" className="font-normal cursor-pointer">VoIP</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="virtual" id="virtual" />
                <Label htmlFor="virtual" className="font-normal cursor-pointer">Virtual</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Worked/Didn't Work Selection */}
          <div className="space-y-3">
            <Label>Did verification work?</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "flex-1 gap-2 transition-colors",
                  worked === true && "border-emerald-500 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                )}
                onClick={() => setWorked(true)}
              >
                <ThumbsUp className="w-4 h-4" />
                Yes, it worked
              </Button>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "flex-1 gap-2 transition-colors",
                  worked === false && "border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                )}
                onClick={() => setWorked(false)}
              >
                <ThumbsDown className="w-4 h-4" />
                No, it failed
              </Button>
            </div>
          </div>

          {/* Optional Comment */}
          <div className="space-y-3">
            <Label htmlFor="comment">Additional details (optional)</Label>
            <Textarea
              id="comment"
              placeholder="e.g., Code received but delayed, or specific error message..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/500
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={worked === null || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
