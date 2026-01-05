import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  PhoneOutgoing,
  Play,
  Download,
  Search,
  Calendar,
  Mic,
  Clock,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CallHistoryEntry {
  id: string;
  phoneNumber: string;
  country: string;
  date: string;
  time: string;
  duration: string;
  cost: number;
  hasRecording: boolean;
  status: "completed" | "failed" | "no-answer";
}

// Mock data
const mockHistory: CallHistoryEntry[] = [
  {
    id: "1",
    phoneNumber: "+1 555 123 4567",
    country: "United States",
    date: "2026-01-05",
    time: "14:32",
    duration: "5:23",
    cost: 0.42,
    hasRecording: true,
    status: "completed",
  },
  {
    id: "2",
    phoneNumber: "+44 20 7946 0958",
    country: "United Kingdom",
    date: "2026-01-05",
    time: "11:15",
    duration: "2:10",
    cost: 0.18,
    hasRecording: false,
    status: "completed",
  },
  {
    id: "3",
    phoneNumber: "+49 30 123 4567",
    country: "Germany",
    date: "2026-01-04",
    time: "16:45",
    duration: "0:00",
    cost: 0,
    hasRecording: false,
    status: "no-answer",
  },
  {
    id: "4",
    phoneNumber: "+33 1 23 45 67 89",
    country: "France",
    date: "2026-01-04",
    time: "09:22",
    duration: "8:45",
    cost: 0.89,
    hasRecording: true,
    status: "completed",
  },
  {
    id: "5",
    phoneNumber: "+81 3 1234 5678",
    country: "Japan",
    date: "2026-01-03",
    time: "22:10",
    duration: "3:12",
    cost: 0.35,
    hasRecording: false,
    status: "completed",
  },
];

const History = () => {
  const [search, setSearch] = useState("");
  const [history] = useState<CallHistoryEntry[]>(mockHistory);

  const filteredHistory = history.filter(
    (entry) =>
      entry.phoneNumber.includes(search) ||
      entry.country.toLowerCase().includes(search.toLowerCase())
  );

  const groupedHistory = filteredHistory.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, CallHistoryEntry[]>);

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
                        "w-10 h-10 rounded-full flex items-center justify-center",
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
                          <p className="font-medium text-foreground font-mono">
                            {entry.phoneNumber}
                          </p>
                          {entry.hasRecording && (
                            <Mic className="w-3.5 h-3.5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {entry.country} • {entry.time}
                        </p>
                      </div>

                      {/* Metrics */}
                      <div className="hidden sm:flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{entry.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span>${entry.cost.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {entry.hasRecording && (
                          <>
                            <Button variant="ghost" size="iconSm">
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="iconSm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
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
