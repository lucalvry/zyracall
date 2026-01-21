import { useState, useEffect, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { platforms } from "@/data/2fa-platforms";
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Download,
  RefreshCw,
  Shield,
  TrendingUp,
  Users,
  MessageSquare
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FeedbackItem {
  id: string;
  platform_id: string;
  country_code: string;
  number_type: string;
  worked: boolean;
  comment: string | null;
  user_id: string | null;
  created_at: string;
  status: string;
}

interface FeedbackStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  successRate: number;
}

const Admin2FAFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [workedFilter, setWorkedFilter] = useState<string>("all");
  const { toast } = useToast();

  const fetchFeedback = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('platform_feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedback(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast({
        title: "Error",
        description: "Failed to fetch feedback data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const stats: FeedbackStats = useMemo(() => {
    const total = feedback.length;
    const pending = feedback.filter(f => f.status === 'pending').length;
    const approved = feedback.filter(f => f.status === 'approved').length;
    const rejected = feedback.filter(f => f.status === 'rejected').length;
    const workedCount = feedback.filter(f => f.worked && f.status === 'approved').length;
    const successRate = approved > 0 ? (workedCount / approved) * 100 : 0;

    return { total, pending, approved, rejected, successRate };
  }, [feedback]);

  const filteredFeedback = useMemo(() => {
    return feedback.filter(item => {
      const matchesSearch = searchQuery === "" || 
        item.platform_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.comment && item.comment.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesPlatform = platformFilter === "all" || item.platform_id === platformFilter;
      const matchesWorked = workedFilter === "all" || 
        (workedFilter === "yes" && item.worked) ||
        (workedFilter === "no" && !item.worked);

      return matchesSearch && matchesStatus && matchesPlatform && matchesWorked;
    });
  }, [feedback, searchQuery, statusFilter, platformFilter, workedFilter]);

  const updateFeedbackStatus = async (ids: string[], status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('platform_feedback')
        .update({ status })
        .in('id', ids);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${ids.length} item(s) ${status}.`,
      });

      setSelectedItems(new Set());
      fetchFeedback();
    } catch (error) {
      console.error('Error updating feedback:', error);
      toast({
        title: "Error",
        description: "Failed to update feedback status.",
        variant: "destructive",
      });
    }
  };

  const deleteFeedback = async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from('platform_feedback')
        .delete()
        .in('id', ids);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: `${ids.length} item(s) deleted.`,
      });

      setSelectedItems(new Set());
      fetchFeedback();
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to delete feedback.",
        variant: "destructive",
      });
    }
  };

  const calculateCompatibilityScores = async () => {
    try {
      // Get only approved feedback
      const approvedFeedback = feedback.filter(f => f.status === 'approved');
      
      // Group by platform, country, number_type
      const grouped = approvedFeedback.reduce((acc, item) => {
        const key = `${item.platform_id}-${item.country_code}-${item.number_type}`;
        if (!acc[key]) {
          acc[key] = { worked: 0, total: 0, platformId: item.platform_id, countryCode: item.country_code, numberType: item.number_type };
        }
        acc[key].total++;
        if (item.worked) acc[key].worked++;
        return acc;
      }, {} as Record<string, { worked: number; total: number; platformId: string; countryCode: string; numberType: string }>);

      // Upsert into compatibility_scores table
      for (const key of Object.keys(grouped)) {
        const data = grouped[key];
        const successRate = (data.worked / data.total) * 100;

        await supabase
          .from('platform_compatibility_scores')
          .upsert({
            platform_id: data.platformId,
            country_code: data.countryCode,
            number_type: data.numberType,
            success_rate: successRate,
            total_reports: data.total,
            last_calculated: new Date().toISOString(),
          }, {
            onConflict: 'platform_id,country_code,number_type'
          });
      }

      toast({
        title: "Scores Calculated",
        description: `Updated compatibility scores for ${Object.keys(grouped).length} combinations.`,
      });
    } catch (error) {
      console.error('Error calculating scores:', error);
      toast({
        title: "Error",
        description: "Failed to calculate compatibility scores.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    const headers = ['Platform', 'Country', 'Number Type', 'Worked', 'Comment', 'Status', 'Date'];
    const rows = filteredFeedback.map(item => [
      item.platform_id,
      item.country_code,
      item.number_type,
      item.worked ? 'Yes' : 'No',
      item.comment || '',
      item.status,
      format(new Date(item.created_at), 'yyyy-MM-dd HH:mm')
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `2fa-feedback-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const getPlatformName = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform?.name || platformId;
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === filteredFeedback.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredFeedback.map(f => f.id)));
    }
  };

  const toggleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">2FA Platform Feedback</h1>
            <p className="text-muted-foreground">
              Review and manage user-submitted compatibility reports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={fetchFeedback} disabled={isLoading}>
              <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
              Refresh
            </Button>
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                  <p className="text-xs text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.successRate.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by platform, country, or comment..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  {platforms.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={workedFilter} onValueChange={setWorkedFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Worked" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="yes">Worked</SelectItem>
                  <SelectItem value="no">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            {selectedItems.size > 0 && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {selectedItems.size} selected
                </span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => updateFeedbackStatus(Array.from(selectedItems), 'approved')}
                  className="text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => updateFeedbackStatus(Array.from(selectedItems), 'rejected')}
                  className="text-red-500 border-red-500/20 hover:bg-red-500/10"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => deleteFeedback(Array.from(selectedItems))}
                >
                  Delete
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Calculate Scores */}
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium">Calculate Official Compatibility Scores</h3>
              <p className="text-sm text-muted-foreground">
                Aggregate approved feedback into official compatibility scores
              </p>
            </div>
            <Button onClick={calculateCompatibilityScores}>
              <Shield className="w-4 h-4 mr-2" />
              Generate Scores
            </Button>
          </CardContent>
        </Card>

        {/* Feedback Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedItems.size === filteredFeedback.length && filteredFeedback.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Worked</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedback.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No feedback found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFeedback.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedItems.has(item.id)}
                          onCheckedChange={() => toggleSelectItem(item.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {getPlatformName(item.platform_id)}
                      </TableCell>
                      <TableCell>{item.country_code}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {item.number_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.worked ? (
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                            Yes
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                            No
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {item.comment || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={cn(
                            item.status === 'pending' && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                            item.status === 'approved' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                            item.status === 'rejected' && "bg-red-500/10 text-red-500 border-red-500/20",
                          )}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(item.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            size="icon" 
                            variant="ghost"
                            className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
                            onClick={() => updateFeedbackStatus([item.id], 'approved')}
                            disabled={item.status === 'approved'}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            onClick={() => updateFeedbackStatus([item.id], 'rejected')}
                            disabled={item.status === 'rejected'}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Admin2FAFeedback;
