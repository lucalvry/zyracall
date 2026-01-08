import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  PhoneOutgoing,
  Search,
  Calendar,
  Mic,
  Clock,
  DollarSign,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallHistory } from "@/hooks/useCallHistory";
import AudioPlayer from "@/components/history/AudioPlayer";

const History = () => {
  const [search, setSearch] = useState("");
  const { data: callLogs = [], isLoading, error } = useCallHistory();

  const filteredHistory = callLogs.filter(
    (entry) =>
      entry.destination_number.includes(search) ||
      entry.destination_country.toLowerCase().includes(search.toLowerCase())
  );

  // Group by date
  const groupedHistory = filteredHistory.reduce((acc, entry) => {
    const date = new Date(entry.started_at).toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, typeof callLogs>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === today.toISOString().split("T")[0]) {
      return "Today";
    } else if (dateStr === yesterday.toISOString().split("T")[0]) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8">
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <p className="text-destructive">Failed to load call history. Please try again.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Call History</h1>
            <p className="text-muted-foreground">
              View your past calls and recordings
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by number or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* History List */}
        {Object.keys(groupedHistory).length === 0 ? (
          <div className="text-center py-16">
            <Phone className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No calls yet</h3>
            <p className="text-muted-foreground">
              Your call history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedHistory).map(([date, entries]) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {formatDate(date)}
                  </h3>
                </div>

                <div className="space-y-2">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-card transition-shadow"
                    >
                      {/* Icon */}
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        entry.status === "completed" 
                          ? "bg-success/10 text-success"
                          : entry.status === "no-answer"
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                      )}>
                        <PhoneOutgoing className="w-5 h-5" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground font-mono truncate">
                            {entry.destination_number}
                          </p>
                          {entry.recording_url && (
                            <Mic className="w-3.5 h-3.5 text-primary shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {entry.destination_country} • {formatTime(entry.started_at)}
                        </p>
                      </div>

                      {/* Metrics */}
                      <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(entry.duration_seconds)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span>${Number(entry.cost).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Audio Player / Actions */}
                      <div className="flex items-center gap-2">
                        {entry.recording_url ? (
                          <AudioPlayer recordingPath={entry.recording_url} />
                        ) : null}
                        <Button variant="call" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default History;
