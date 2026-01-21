import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { usePlatformBookmarks } from "@/hooks/usePlatformBookmarks";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  platformId: string;
  countryCode?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "ghost" | "outline" | "default";
  className?: string;
  showLabel?: boolean;
}

const BookmarkButton = ({ 
  platformId, 
  countryCode = "", 
  size = "icon",
  variant = "ghost",
  className,
  showLabel = false
}: BookmarkButtonProps) => {
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark, isLoading } = usePlatformBookmarks();
  const [isUpdating, setIsUpdating] = useState(false);

  const bookmarked = isBookmarked(platformId, countryCode);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isUpdating) return;

    setIsUpdating(true);
    try {
      if (bookmarked) {
        await removeBookmark(platformId, countryCode);
      } else {
        await addBookmark(platformId, countryCode);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const tooltipContent = !user 
    ? "Log in to bookmark" 
    : bookmarked 
      ? "Remove bookmark" 
      : "Get notified when compatibility changes";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={size}
          variant={variant}
          onClick={handleClick}
          disabled={isUpdating || isLoading}
          className={cn(
            bookmarked && "text-accent",
            className
          )}
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : bookmarked ? (
            <BookmarkCheck className="w-4 h-4" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
          {showLabel && (
            <span className="ml-2">
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default BookmarkButton;
