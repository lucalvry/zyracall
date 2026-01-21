import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import { usePlatformBookmarks } from "@/hooks/usePlatformBookmarks";
import { platforms } from "@/data/2fa-platforms";
import { User, Bell, Shield, Trash2, Bookmark, ExternalLink, X } from "lucide-react";

const Settings = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { preferences, isLoading, isSaving, savePreferences } = useNotificationPreferences();
  const { bookmarks, isLoading: bookmarksLoading, removeBookmark, toggleNotification, refetch } = usePlatformBookmarks();
  
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callRecordingEnabled, setCallRecordingEnabled] = useState(true);

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile settings have been saved.",
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

  const getPlatformName = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform?.name || platformId;
  };

  const getPlatformIcon = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform?.icon || "🔐";
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

          {/* 2FA Bookmarks Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-primary" />
                <CardTitle>2FA Bookmarks</CardTitle>
              </div>
              <CardDescription>Platforms you're tracking for 2FA compatibility updates</CardDescription>
            </CardHeader>
            <CardContent>
              {bookmarksLoading ? (
                <div className="py-8 text-center text-muted-foreground">
                  Loading bookmarks...
                </div>
              ) : bookmarks.length === 0 ? (
                <div className="py-8 text-center">
                  <Bookmark className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground mb-4">
                    No bookmarked platforms yet
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/tools/2fa-finder">
                      Browse 2FA Finder
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookmarks.map((bookmark) => (
                    <div 
                      key={bookmark.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getPlatformIcon(bookmark.platformId)}</span>
                        <div>
                          <div className="font-medium">{getPlatformName(bookmark.platformId)}</div>
                          {bookmark.countryCode && (
                            <div className="text-sm text-muted-foreground">
                              Country: {bookmark.countryCode}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`notify-${bookmark.id}`} className="text-sm text-muted-foreground">
                            Email alerts
                          </Label>
                          <Switch
                            id={`notify-${bookmark.id}`}
                            checked={bookmark.notifyOnChange}
                            onCheckedChange={(checked) => 
                              toggleNotification(bookmark.id, checked)
                            }
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeBookmark(bookmark.platformId, bookmark.countryCode)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 text-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/tools/2fa-finder">
                        Add More Bookmarks
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
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