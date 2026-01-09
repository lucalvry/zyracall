import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  Wallet, 
  Globe, 
  Settings,
  LogOut,
  Menu,
  X,
  Shield
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/zyracall-logo.png";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import { useAuth } from "@/contexts/AuthContext";

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Phone, label: "Call Logs", href: "/admin/calls" },
  { icon: Wallet, label: "Transactions", href: "/admin/transactions" },
  { icon: Globe, label: "Rates & Providers", href: "/admin/rates" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleExitAdmin = async () => {
    try {
      await signOut();
    } finally {
      setSidebarOpen(false);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="lg:hidden sticky top-0 z-40 h-14 border-b border-border bg-background flex items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 ml-3">
            <img src={logo} alt="ZyraCall" className="h-7 w-auto" />
            <span className="font-semibold text-foreground">Admin</span>
          </div>
        </div>
        <NotificationCenter />
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-60 bg-foreground transition-transform duration-200 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-foreground/10">
            <div className="flex items-center gap-2">
              <img src={logo} alt="ZyraCall" className="h-8 w-auto" />
              <span className="font-semibold text-background">Admin</span>
            </div>
            <Button 
              variant="ghost" 
              size="iconSm" 
              className="lg:hidden text-background/70 hover:text-background hover:bg-foreground/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-background/70 hover:text-background hover:bg-foreground/10"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-3 border-t border-foreground/10 space-y-1">
            <Link
              to="/admin/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-background/70 hover:text-background hover:bg-foreground/10 transition-colors"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
            <button
              onClick={handleExitAdmin}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-background/70 hover:text-background hover:bg-foreground/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Exit Admin
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-60">
        <div className="min-h-screen p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
