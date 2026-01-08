import { useState, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus,
  MoreVertical,
  Pencil,
  Power,
  PowerOff,
  Save,
  X,
  Loader2,
  TrendingUp,
  TrendingDown,
  DollarSign
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getCountryFlag } from "@/hooks/useCallRates";

const AdminRates = () => {
  const [search, setSearch] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState<any>(null);
  const [autoCalcEnabled, setAutoCalcEnabled] = useState(true);
  const [editForm, setEditForm] = useState({
    base_cost_mobile: 0,
    base_cost_landline: 0,
    markup_percentage: 50,
    mobile_rate: 0,
    landline_rate: 0,
    provider: 'twilio',
    fallback_provider: '',
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch rates from database
  const { data: rates = [], isLoading } = useQuery({
    queryKey: ["admin-rates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("call_rates")
        .select("*")
        .order("country_name");

      if (error) throw error;
      return data || [];
    },
  });

  // Calculate customer rates from base cost + markup
  const calculateRate = (baseCost: number, markupPercentage: number) => {
    return baseCost * (1 + markupPercentage / 100);
  };

  // Calculate profit per minute
  const calculateProfit = (customerRate: number, baseCost: number) => {
    return customerRate - baseCost;
  };

  // Get margin color based on percentage
  const getMarginColor = (baseCost: number, customerRate: number) => {
    if (baseCost === 0) return "text-muted-foreground";
    const margin = ((customerRate - baseCost) / customerRate) * 100;
    if (margin >= 30) return "text-success";
    if (margin >= 15) return "text-warning";
    return "text-destructive";
  };

  // Auto-calculate customer rates when base cost or markup changes
  const handleBaseCostChange = (field: 'base_cost_mobile' | 'base_cost_landline', value: number) => {
    setEditForm(prev => {
      const newForm = { ...prev, [field]: value };
      if (autoCalcEnabled) {
        if (field === 'base_cost_mobile') {
          newForm.mobile_rate = calculateRate(value, prev.markup_percentage);
        } else {
          newForm.landline_rate = calculateRate(value, prev.markup_percentage);
        }
      }
      return newForm;
    });
  };

  const handleMarkupChange = (value: number) => {
    setEditForm(prev => {
      const newForm = { ...prev, markup_percentage: value };
      if (autoCalcEnabled) {
        newForm.mobile_rate = calculateRate(prev.base_cost_mobile, value);
        newForm.landline_rate = calculateRate(prev.base_cost_landline, value);
      }
      return newForm;
    });
  };

  // Update rate mutation
  const updateRateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { error } = await supabase
        .from("call_rates")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-rates"] });
      toast({
        title: "Rate updated",
        description: `${selectedRate?.country_name} rates have been updated`,
      });
      setEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Toggle enabled mutation
  const toggleEnabledMutation = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      const { error } = await supabase
        .from("call_rates")
        .update({ is_active: enabled })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, { enabled }) => {
      queryClient.invalidateQueries({ queryKey: ["admin-rates"] });
      queryClient.invalidateQueries({ queryKey: ["call-rates"] });
      toast({
        title: enabled ? "Country enabled" : "Country disabled",
        description: `Country has been ${enabled ? "enabled" : "disabled"}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredRates = rates.filter(
    (rate) =>
      rate.country_name.toLowerCase().includes(search.toLowerCase()) ||
      rate.country_code.includes(search)
  );

  // Calculate stats
  const stats = useMemo(() => {
    const activeRates = rates.filter(r => r.is_active);
    const totalCountries = activeRates.length;
    const avgMarkup = activeRates.length > 0 
      ? activeRates.reduce((sum, r) => sum + Number(r.markup_percentage || 0), 0) / activeRates.length
      : 0;
    const lowMarginCount = activeRates.filter(r => {
      const mobileCost = Number(r.base_cost_mobile || 0);
      const mobileRate = Number(r.mobile_rate || 0);
      if (mobileCost === 0) return false;
      const margin = ((mobileRate - mobileCost) / mobileRate) * 100;
      return margin < 15;
    }).length;
    
    return { totalCountries, avgMarkup, lowMarginCount };
  }, [rates]);

  const handleEdit = (rate: any) => {
    setSelectedRate(rate);
    setEditForm({
      base_cost_mobile: Number(rate.base_cost_mobile) || 0,
      base_cost_landline: Number(rate.base_cost_landline) || 0,
      markup_percentage: Number(rate.markup_percentage) || 50,
      mobile_rate: Number(rate.mobile_rate) || 0,
      landline_rate: Number(rate.landline_rate) || 0,
      provider: rate.provider || 'twilio',
      fallback_provider: rate.fallback_provider || '',
    });
    setAutoCalcEnabled(true);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    if (!selectedRate) return;
    updateRateMutation.mutate({
      id: selectedRate.id,
      updates: {
        base_cost_mobile: editForm.base_cost_mobile,
        base_cost_landline: editForm.base_cost_landline,
        markup_percentage: editForm.markup_percentage,
        mobile_rate: editForm.mobile_rate,
        landline_rate: editForm.landline_rate,
        provider: editForm.provider,
        fallback_provider: editForm.fallback_provider || null,
      },
    });
  };

  const handleToggleEnabled = (rate: any) => {
    toggleEnabledMutation.mutate({
      id: rate.id,
      enabled: !rate.is_active,
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Rates & Providers</h1>
          <p className="text-muted-foreground">
            Manage per-country calling rates and profit margins
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Country
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Countries</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalCountries}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Markup</p>
              <p className="text-2xl font-bold text-foreground">{stats.avgMarkup.toFixed(0)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", stats.lowMarginCount > 0 ? "bg-destructive/10" : "bg-success/10")}>
              <TrendingDown className={cn("w-5 h-5", stats.lowMarginCount > 0 ? "text-destructive" : "text-success")} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Low Margin Routes</p>
              <p className={cn("text-2xl font-bold", stats.lowMarginCount > 0 ? "text-destructive" : "text-foreground")}>
                {stats.lowMarginCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by country or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Rates Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Country</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Code</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Base Cost</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Customer Rate</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Margin</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRates.map((rate) => {
                const baseCostMobile = Number(rate.base_cost_mobile) || 0;
                const mobileRate = Number(rate.mobile_rate) || 0;
                const marginColor = getMarginColor(baseCostMobile, mobileRate);
                const marginPercent = baseCostMobile > 0 
                  ? ((mobileRate - baseCostMobile) / mobileRate * 100).toFixed(0) 
                  : '—';
                
                return (
                  <tr key={rate.id} className={cn(
                    "hover:bg-muted/30 transition-colors",
                    !rate.is_active && "opacity-50"
                  )}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getCountryFlag(rate.country_name)}</span>
                        <span className="font-medium text-foreground">{rate.country_name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">
                      +{rate.country_code}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                      ${baseCostMobile.toFixed(3)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-primary">
                      ${mobileRate.toFixed(2)}/min
                    </td>
                    <td className={cn("px-4 py-3 text-right font-mono font-medium", marginColor)}>
                      {marginPercent}%
                    </td>
                    <td className="px-4 py-3 text-center">
                      {rate.is_active ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border">Disabled</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="iconSm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(rate)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Rates
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleEnabled(rate)}>
                            {rate.is_active ? (
                              <>
                                <PowerOff className="w-4 h-4 mr-2" />
                                Disable Country
                              </>
                            ) : (
                              <>
                                <Power className="w-4 h-4 mr-2" />
                                Enable Country
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedRate && getCountryFlag(selectedRate.country_name)}</span>
              Edit {selectedRate?.country_name} Rates
            </DialogTitle>
            <DialogDescription>
              Set base costs and markup to calculate customer rates
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Base Costs Section */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Base Costs (What you pay)
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base_cost_mobile">Mobile ($/min)</Label>
                  <Input
                    id="base_cost_mobile"
                    type="number"
                    min="0"
                    step="0.001"
                    value={editForm.base_cost_mobile}
                    onChange={(e) => handleBaseCostChange('base_cost_mobile', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base_cost_landline">Landline ($/min)</Label>
                  <Input
                    id="base_cost_landline"
                    type="number"
                    min="0"
                    step="0.001"
                    value={editForm.base_cost_landline}
                    onChange={(e) => handleBaseCostChange('base_cost_landline', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            {/* Markup Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Markup Percentage
                </Label>
                <span className="text-lg font-bold text-primary">{editForm.markup_percentage}%</span>
              </div>
              <Slider
                value={[editForm.markup_percentage]}
                onValueChange={(value) => handleMarkupChange(value[0])}
                min={0}
                max={200}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
                <span>200%</span>
              </div>
            </div>

            {/* Customer Rates Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Customer Rates
                </Label>
                <div className="flex items-center gap-2">
                  <Label htmlFor="auto-calc" className="text-sm text-muted-foreground">Auto-calculate</Label>
                  <Switch
                    id="auto-calc"
                    checked={autoCalcEnabled}
                    onCheckedChange={setAutoCalcEnabled}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile_rate">Mobile ($/min)</Label>
                  <Input
                    id="mobile_rate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editForm.mobile_rate.toFixed(2)}
                    onChange={(e) => setEditForm(prev => ({ ...prev, mobile_rate: parseFloat(e.target.value) || 0 }))}
                    disabled={autoCalcEnabled}
                    className={autoCalcEnabled ? "bg-muted" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landline_rate">Landline ($/min)</Label>
                  <Input
                    id="landline_rate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editForm.landline_rate.toFixed(2)}
                    onChange={(e) => setEditForm(prev => ({ ...prev, landline_rate: parseFloat(e.target.value) || 0 }))}
                    disabled={autoCalcEnabled}
                    className={autoCalcEnabled ? "bg-muted" : ""}
                  />
                </div>
              </div>
            </div>

            {/* Profit Preview */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Profit Preview
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Mobile</p>
                  <p className={cn("text-lg font-bold", getMarginColor(editForm.base_cost_mobile, editForm.mobile_rate))}>
                    ${calculateProfit(editForm.mobile_rate, editForm.base_cost_mobile).toFixed(3)}/min
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Landline</p>
                  <p className={cn("text-lg font-bold", getMarginColor(editForm.base_cost_landline, editForm.landline_rate))}>
                    ${calculateProfit(editForm.landline_rate, editForm.base_cost_landline).toFixed(3)}/min
                  </p>
                </div>
              </div>
            </div>

            {/* Provider Section */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Provider
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provider">Primary</Label>
                  <Input
                    id="provider"
                    value={editForm.provider}
                    onChange={(e) => setEditForm(prev => ({ ...prev, provider: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fallback_provider">Fallback (optional)</Label>
                  <Input
                    id="fallback_provider"
                    value={editForm.fallback_provider}
                    onChange={(e) => setEditForm(prev => ({ ...prev, fallback_provider: e.target.value }))}
                    placeholder="None"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={updateRateMutation.isPending}>
              {updateRateMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminRates;