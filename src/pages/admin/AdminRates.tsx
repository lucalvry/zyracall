import { useState } from "react";
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
  Loader2
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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getCountryFlag } from "@/hooks/useCallRates";

const AdminRates = () => {
  const [search, setSearch] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    mobile_rate: 0,
    landline_rate: 0,
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

  const handleEdit = (rate: any) => {
    setSelectedRate(rate);
    setEditForm({
      mobile_rate: rate.mobile_rate,
      landline_rate: rate.landline_rate,
    });
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    if (!selectedRate) return;
    updateRateMutation.mutate({
      id: selectedRate.id,
      updates: editForm,
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
            Manage per-country calling rates
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Country
        </Button>
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
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Mobile Rate</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Landline Rate</th>
                <th className="text-center px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRates.map((rate) => (
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
                  <td className="px-4 py-3 text-right font-mono font-medium text-primary">
                    ${Number(rate.mobile_rate).toFixed(2)}/min
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-foreground">
                    ${Number(rate.landline_rate).toFixed(2)}/min
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedRate && getCountryFlag(selectedRate.country_name)}</span>
              Edit {selectedRate?.country_name} Rates
            </DialogTitle>
            <DialogDescription>
              Adjust the per-minute calling rates
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile_rate">Mobile Rate ($/min)</Label>
                <Input
                  id="mobile_rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editForm.mobile_rate}
                  onChange={(e) => setEditForm(prev => ({ ...prev, mobile_rate: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landline_rate">Landline Rate ($/min)</Label>
                <Input
                  id="landline_rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editForm.landline_rate}
                  onChange={(e) => setEditForm(prev => ({ ...prev, landline_rate: parseFloat(e.target.value) || 0 }))}
                />
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
