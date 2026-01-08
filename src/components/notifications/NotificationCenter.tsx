import { Bell, Check, Phone, Wallet, AlertCircle, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNotifications, Notification } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "call_completed":
      return <Phone className="w-4 h-4 text-primary" />;
    case "low_balance":
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    case "payment_received":
      return <Wallet className="w-4 h-4 text-green-500" />;
    case "promo":
      return <Megaphone className="w-4 h-4 text-accent" />;
    default:
      return <Bell className="w-4 h-4 text-muted-foreground" />;
  }
};

const NotificationItem = ({
  notification,
  onMarkAsRead,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}) => {
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    if (notification.action_url) {
      window.location.href = notification.action_url;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex gap-3 p-3 cursor-pointer transition-colors hover:bg-muted/50",
        !notification.read && "bg-primary/5"
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm", !notification.read && "font-medium")}>
          {notification.title}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
        </p>
      </div>
      {!notification.read && (
        <div className="flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
      )}
    </div>
  );
};

const NotificationCenter = () => {
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-auto py-1 px-2 text-xs"
            >
              <Check className="w-3 h-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No notifications yet
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
