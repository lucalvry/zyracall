import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import { User, Bell, Shield, Trash2 } from "lucide-react";

const Settings = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { preferences, isLoading, isSaving, savePreferences } = useNotificationPreferences();
  
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callRecordingEnabled, setCallRecordingEnabled] = useState(true);

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile settings have been saved.",
    });
  };

  const handleSaveNotifications = () => {
    savePreferences({
      email_notifications: preferences.email_notifications,
      sms_notifications: preferences.sms_notifications,
      push_notifications: preferences.push_notifications,
      call_summary_emails: preferences.call_summary_emails,
      marketing_emails: preferences.marketing_emails,
      low_balance_alert_threshold: preferences.low_balance_alert_threshold,
    });
  };

  const handleDeleteAccount = () => {
    toast({
      variant: "destructive",
      title: "Are you sure?",
      description: "This action cannot be undone. Please contact support to delete your account.",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const updatePreference = (key: keyof typeof preferences, value: boolean | number) => {
    savePreferences({ [key]: value });
  };

  return (
    <>
      <Helmet>
        <title>Settings | ZyraCall</title>
        <meta name="description" content="Manage your ZyraCall account settings and preferences." />
      </Helmet>
      <DashboardLayout>
        <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account preferences</p>
          </div>

          {/* Profile Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Profile</CardTitle>
              </div>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {getInitials(displayName || user?.email || "U")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change avatar
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Configure how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your calls and account via email
                  </p>
                </div>
                <Switch
                  checked={preferences.email_notifications}
                  onCheckedChange={(checked) => updatePreference("email_notifications", checked)}
                  disabled={isLoading || isSaving}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get text messages for important account alerts
                  </p>
                </div>
                <Switch
                  checked={preferences.sms_notifications}
                  onCheckedChange={(checked) => updatePreference("sms_notifications", checked)}
                  disabled={isLoading || isSaving}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Call Summary Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly summaries of your calling activity
                  </p>
                </div>
                <Switch
                  checked={preferences.call_summary_emails}
                  onCheckedChange={(checked) => updatePreference("call_summary_emails", checked)}
                  disabled={isLoading || isSaving}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Low Balance Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your wallet balance falls below ${preferences.low_balance_alert_threshold}
                  </p>
                </div>
                <Input
                  type="number"
                  className="w-20"
                  value={preferences.low_balance_alert_threshold}
                  onChange={(e) => updatePreference("low_balance_alert_threshold", parseFloat(e.target.value) || 5)}
                  disabled={isLoading || isSaving}
                  min="1"
                  step="0.5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Privacy & Security</CardTitle>
              </div>
              <CardDescription>Manage your privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Call Recording</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable recording for your calls (you can toggle per call)
                  </p>
                </div>
                <Switch
                  checked={callRecordingEnabled}
                  onCheckedChange={setCallRecordingEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-destructive" />
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Settings;
