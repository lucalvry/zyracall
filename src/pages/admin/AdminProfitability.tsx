import { useState } from "react";
import { 
  TrendingUp, DollarSign, Percent, Phone, AlertTriangle,
  ArrowUp, ArrowDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AdminLayout from "@/components/admin/AdminLayout";
import { useProfitabilityStats, useDefaultDateRange } from "@/hooks/useProfitabilityStats";
import { format, subDays, subMonths, startOfMonth, endOfMonth } from "date-fns";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const datePresets = [
  { label: "Last 7 Days", getValue: () => ({ start: subDays(new Date(), 7), end: new Date() }) },
  { label: "Last 30 Days", getValue: () => ({ start: subDays(new Date(), 30), end: new Date() }) },
  { label: "This Month", getValue: () => ({ start: startOfMonth(new Date()), end: new Date() }) },
  { label: "Last Month", getValue: () => ({ start: startOfMonth(subMonths(new Date(), 1)), end: endOfMonth(subMonths(new Date(), 1)) }) },
];

const AdminProfitability = () => {
  const defaultRange = useDefaultDateRange();
  const [dateRange, setDateRange] = useState(defaultRange);
  const [activePreset, setActivePreset] = useState("Last 30 Days");
  
  const { summary, dailyTrends, topCountries, lowMarginAlerts, isLoading } = useProfitabilityStats(dateRange);

  const handlePresetClick = (preset: typeof datePresets[0]) => {
    setActivePreset(preset.label);
    setDateRange(preset.getValue());
  };

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Profitability Analytics</h1>
            <p className="text-muted-foreground">
              Revenue, costs, and margin analysis
            </p>
          </div>
          
          {/* Date Presets */}
          <div className="flex flex-wrap gap-2">
            {datePresets.map((preset) => (
              <Button
                key={preset.label}
                variant={activePreset === preset.label ? "default" : "outline"}
                size="sm"
                onClick={() => handlePresetClick(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{formatCurrency(summary?.totalRevenue || 0)}</div>
                  <p className="text-xs text-muted-foreground">From {summary?.totalCalls || 0} calls</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Provider Cost</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{formatCurrency(summary?.totalCost || 0)}</div>
                  <p className="text-xs text-muted-foreground">Twilio charges</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(summary?.totalProfit || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Avg {formatCurrency(summary?.avgProfitPerCall || 0)}/call
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Margin</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {formatPercent(summary?.marginPercentage || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Overall margin</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue vs Cost Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Cost Trend</CardTitle>
              <CardDescription>Daily revenue and provider cost comparison</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={dailyTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(v) => format(new Date(v), "MMM d")}
                      className="text-xs"
                    />
                    <YAxis tickFormatter={(v) => `$${v}`} className="text-xs" />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label) => format(new Date(label), "MMM d, yyyy")}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue"
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cost" 
                      name="Cost"
                      stackId="2"
                      stroke="hsl(var(--destructive))" 
                      fill="hsl(var(--destructive))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Profit Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Profit Trend</CardTitle>
              <CardDescription>Daily gross profit</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={dailyTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(v) => format(new Date(v), "MMM d")}
                      className="text-xs"
                    />
                    <YAxis tickFormatter={(v) => `$${v}`} className="text-xs" />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label) => format(new Date(label), "MMM d, yyyy")}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      name="Profit"
                      stroke="hsl(142.1 76.2% 36.3%)" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle>Top Profitable Countries</CardTitle>
            <CardDescription>Countries generating the most profit</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topCountries || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" tickFormatter={(v) => `$${v}`} />
                  <YAxis 
                    dataKey="country" 
                    type="category" 
                    width={100}
                    className="text-xs"
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === "profit" ? formatCurrency(value) : formatPercent(value),
                      name === "profit" ? "Profit" : "Margin"
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="profit" name="Profit" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Low Margin Alerts */}
        {(lowMarginAlerts?.length || 0) > 0 && (
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Low Margin Alerts
              </CardTitle>
              <CardDescription>Countries with margin below 25% (min 5 calls)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Calls</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Profit</TableHead>
                    <TableHead className="text-right">Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowMarginAlerts?.map((row) => (
                    <TableRow key={row.country}>
                      <TableCell className="font-medium">{row.country}</TableCell>
                      <TableCell className="text-right">{row.calls}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.revenue)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.cost)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.profit)}</TableCell>
                      <TableCell className="text-right text-destructive font-medium">
                        {formatPercent(row.margin)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProfitability;
