import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SpeedDial from "./pages/SpeedDial";
import History from "./pages/History";
import Wallet from "./pages/Wallet";
import Rates from "./pages/Rates";
import PublicRates from "./pages/PublicRates";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCallLogs from "./pages/admin/AdminCallLogs";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminRates from "./pages/admin/AdminRates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rates" element={<PublicRates />} />
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/speed-dial" element={<SpeedDial />} />
          <Route path="/dashboard/history" element={<History />} />
          <Route path="/dashboard/wallet" element={<Wallet />} />
          <Route path="/dashboard/rates" element={<Rates />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/calls" element={<AdminCallLogs />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/rates" element={<AdminRates />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
