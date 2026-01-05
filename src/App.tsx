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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rates" element={<PublicRates />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/speed-dial" element={<SpeedDial />} />
          <Route path="/dashboard/history" element={<History />} />
          <Route path="/dashboard/wallet" element={<Wallet />} />
          <Route path="/dashboard/rates" element={<Rates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
