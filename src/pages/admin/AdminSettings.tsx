import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, Phone, CreditCard, Bell, Shield, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [minWalletBalance, setMinWalletBalance] = useState("1.00");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [enforce2FA, setEnforce2FA] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Platform settings have been updated successfully.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Admin Settings | ZyraCall</title>
      </Helmet>
      <AdminLayout>
        <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Platform Settings</h1>
            <p className="text-muted-foreground mt-1">Configure system-wide settings</p>
          </div>

          {/* Integration Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <CardTitle>Integration Status</CardTitle>
              </div>
              <CardDescription>Current status of external service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Twilio</p>
                    <p className="text-sm text-muted-foreground">Voice calling service</p>
                  </div>
                </div>
                <Badge variant="default" className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Connected
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Stripe</p>
                    <p className="text-sm text-muted-foreground">Payment processing</p>
                  </div>
                </div>
                <Badge variant="default" className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Connected
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>System Settings</CardTitle>
              </div>
              <CardDescription>Configure platform behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minBalance">Minimum Wallet Balance ($)</Label>
                  <Input
                    id="minBalance"
                    type="number"
                    step="0.01"
                    value={minWalletBalance}
                    onChange={(e) => setMinWalletBalance(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Users must maintain this balance to make calls
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Auto-logout after inactivity
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable the platform for maintenance
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>Configure security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enforce Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin accounts
                  </p>
                </div>
                <Switch
                  checked={enforce2FA}
                  onCheckedChange={setEnforce2FA}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings}>Save All Settings</Button>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminSettings;
