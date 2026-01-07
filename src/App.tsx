import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SpeedDial from "./pages/SpeedDial";
import History from "./pages/History";
import Wallet from "./pages/Wallet";
import Rates from "./pages/Rates";
import PublicRates from "./pages/PublicRates";
import Compare from "./pages/Compare";
import ZyraCallVsSkype from "./pages/compare/ZyraCallVsSkype";
import ZyraCallVsGoogleVoice from "./pages/compare/ZyraCallVsGoogleVoice";
import ZyraCallVsRebtel from "./pages/compare/ZyraCallVsRebtel";
import ZyraCallVsTalk360 from "./pages/compare/ZyraCallVsTalk360";
import ZyraCallVsVonage from "./pages/compare/ZyraCallVsVonage";
import SkypeAlternative from "./pages/alternatives/SkypeAlternative";
import WhatsAppAlternative from "./pages/alternatives/WhatsAppAlternative";
import ViberAlternative from "./pages/alternatives/ViberAlternative";
import GoogleVoiceAlternative from "./pages/alternatives/GoogleVoiceAlternative";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCallLogs from "./pages/admin/AdminCallLogs";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminRates from "./pages/admin/AdminRates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
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
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Comparison Pages */}
            <Route path="/compare" element={<Compare />} />
            <Route path="/compare/zyracall-vs-skype" element={<ZyraCallVsSkype />} />
            <Route path="/compare/zyracall-vs-google-voice" element={<ZyraCallVsGoogleVoice />} />
            <Route path="/compare/zyracall-vs-rebtel" element={<ZyraCallVsRebtel />} />
            <Route path="/compare/zyracall-vs-talk360" element={<ZyraCallVsTalk360 />} />
            <Route path="/compare/zyracall-vs-vonage" element={<ZyraCallVsVonage />} />
            
            {/* Alternative Pages */}
            <Route path="/alternatives/skype-alternative" element={<SkypeAlternative />} />
            <Route path="/alternatives/whatsapp-calling-alternative" element={<WhatsAppAlternative />} />
            <Route path="/alternatives/viber-out-alternative" element={<ViberAlternative />} />
            <Route path="/alternatives/google-voice-alternative" element={<GoogleVoiceAlternative />} />
            
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
  </HelmetProvider>
);

export default App;
