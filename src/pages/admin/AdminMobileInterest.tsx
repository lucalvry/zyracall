import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { 
  Smartphone, 
  Globe, 
  TrendingUp, 
  Users, 
  Download, 
  Filter,
  BarChart3,
  MapPin
} from "lucide-react";

interface MobileInterest {
  id: string;
  platform: string | null;
  country_code: string;
  use_case: string;
  email: string | null;
  source_tool: string;
  created_at: string;
}

const AdminMobileInterest = () => {
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [useCaseFilter, setUseCaseFilter] = useState<string>("all");

  const { data: interests = [], isLoading } = useQuery({
    queryKey: ["admin-mobile-interest"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mobile_number_interest")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);

      if (error) throw error;
      return data as MobileInterest[];
    },
  });

  // Compute stats
  const stats = useMemo(() => {
    const platformCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    const useCaseCounts: Record<string, number> = {};
    const sourceCounts: Record<string, number> = {};
    let withEmail = 0;

    interests.forEach((item) => {
      if (item.platform) {
        platformCounts[item.platform] = (platformCounts[item.platform] || 0) + 1;
      }
      countryCounts[item.country_code] = (countryCounts[item.country_code] || 0) + 1;
      useCaseCounts[item.use_case] = (useCaseCounts[item.use_case] || 0) + 1;
      sourceCounts[item.source_tool] = (sourceCounts[item.source_tool] || 0) + 1;
      if (item.email) withEmail++;
    });

    const topPlatforms = Object.entries(platformCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const topCountries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      total: interests.length,
      withEmail,
      topPlatforms,
      topCountries,
      useCaseCounts,
      sourceCounts,
      uniquePlatforms: Object.keys(platformCounts).length,
      uniqueCountries: Object.keys(countryCounts).length,
    };
  }, [interests]);

  // Filter data
  const filteredInterests = useMemo(() => {
    return interests.filter((item) => {
      if (platformFilter !== "all" && item.platform !== platformFilter) return false;
      if (countryFilter !== "all" && item.country_code !== countryFilter) return false;
      if (useCaseFilter !== "all" && item.use_case !== useCaseFilter) return false;
      return true;
    });
  }, [interests, platformFilter, countryFilter, useCaseFilter]);

  // Get unique values for filters
  const uniquePlatforms = [...new Set(interests.map((i) => i.platform).filter(Boolean))];
  const uniqueCountries = [...new Set(interests.map((i) => i.country_code))];

  const useCaseLabels: Record<string, string> = {
    "2fa": "2FA Verification",
    "business_calling": "Business",
    "personal": "Personal",
  };

  const exportToCSV = () => {
    const headers = ["Date", "Platform", "Country", "Use Case", "Email", "Source"];
    const rows = filteredInterests.map((item) => [
      format(new Date(item.created_at), "yyyy-MM-dd HH:mm"),
      item.platform || "",
      item.country_code,
      item.use_case,
      item.email || "",
      item.source_tool,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mobile-interest-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Mobile Number Interest
            </h1>
            <p className="text-muted-foreground mt-1">
              Track demand signals for mobile number expansion
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.withEmail}</p>
                  <p className="text-sm text-muted-foreground">With Email</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.uniquePlatforms}</p>
                  <p className="text-sm text-muted-foreground">Platforms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.uniqueCountries}</p>
                  <p className="text-sm text-muted-foreground">Countries</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Demand */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5 text-accent" />
                Top Requested Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topPlatforms.length > 0 ? (
                <div className="space-y-3">
                  {stats.topPlatforms.map(([platform, count]) => (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="font-medium">{platform}</span>
                      <Badge variant="secondary">{count} requests</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No platform data yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-accent" />
                Top Requested Countries
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topCountries.length > 0 ? (
                <div className="space-y-3">
                  {stats.topCountries.map(([country, count]) => (
                    <div key={country} className="flex items-center justify-between">
                      <span className="font-medium">{country}</span>
                      <Badge variant="secondary">{count} requests</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No country data yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-48">
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    {uniquePlatforms.map((p) => (
                      <SelectItem key={p} value={p!}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-48">
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {uniqueCountries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-48">
                <Select value={useCaseFilter} onValueChange={setUseCaseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Use Cases" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Use Cases</SelectItem>
                    <SelectItem value="2fa">2FA Verification</SelectItem>
                    <SelectItem value="business_calling">Business</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
            <CardDescription>
              Showing {filteredInterests.length} of {interests.length} submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : filteredInterests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No submissions yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Use Case</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInterests.slice(0, 100).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(item.created_at), "MMM d, HH:mm")}
                        </TableCell>
                        <TableCell>{item.platform || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.country_code}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary"
                            className={
                              item.use_case === "2fa" 
                                ? "bg-accent/10 text-accent" 
                                : item.use_case === "business_calling"
                                ? "bg-info/10 text-info"
                                : "bg-muted"
                            }
                          >
                            {useCaseLabels[item.use_case] || item.use_case}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.email ? (
                            <span className="text-sm">{item.email}</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {item.source_tool}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredInterests.length > 100 && (
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Showing first 100 results. Export to CSV for full data.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMobileInterest;
