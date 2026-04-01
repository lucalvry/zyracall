import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import ZyraCallVsYadaPhone from "./pages/compare/ZyraCallVsYadaPhone";
import Alternatives from "./pages/Alternatives";
import SkypeAlternative from "./pages/alternatives/SkypeAlternative";
import WhatsAppAlternative from "./pages/alternatives/WhatsAppAlternative";
import ViberAlternative from "./pages/alternatives/ViberAlternative";
import GoogleVoiceAlternative from "./pages/alternatives/GoogleVoiceAlternative";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import GDPR from "./pages/GDPR";
import Blog from "./pages/Blog";
import InternationalCallingGuide from "./pages/blog/InternationalCallingGuide";
import SaveMoneyCalls from "./pages/blog/SaveMoneyCalls";
import BrowserCallingFuture from "./pages/blog/BrowserCallingFuture";
import ExpatCallingGuide from "./pages/blog/ExpatCallingGuide";
import MobileVsLandline from "./pages/blog/MobileVsLandline";
import VoIPQuality from "./pages/blog/VoIPQuality";
import WiFiVsVoIP from "./pages/blog/WiFiVsVoIP";
import FreeInternationalCalling from "./pages/blog/FreeInternationalCalling";
import BusinessInternationalCalling from "./pages/blog/BusinessInternationalCalling";
import BlogPost from "./pages/blog/BlogPost";
import Careers from "./pages/Careers";
import CallHub from "./pages/CallHub";
import CountryPage from "./pages/call/CountryPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfitability from "./pages/admin/AdminProfitability";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCallLogs from "./pages/admin/AdminCallLogs";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminRates from "./pages/admin/AdminRates";
import AdminSettings from "./pages/admin/AdminSettings";
import Admin2FAFeedback from "./pages/admin/Admin2FAFeedback";
import AdminMobileInterest from "./pages/admin/AdminMobileInterest";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import TwoFAFinder from "./pages/tools/TwoFAFinder";
import TwoFAPlatformPage from "./pages/tools/TwoFAPlatformPage";
import ToolsHub from "./pages/tools/ToolsHub";
import RateCalculatorTool from "./pages/tools/RateCalculatorTool";
import WebRTCTester from "./pages/tools/WebRTCTester";
import ConnectivityPing from "./pages/tools/ConnectivityPing";

const queryClient = new QueryClient();

const App = () => {
  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/gdpr" element={<GDPR />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/international-calling-guide" element={<InternationalCallingGuide />} />
              <Route path="/blog/save-money-international-calls-2025" element={<SaveMoneyCalls />} />
              <Route path="/blog/browser-based-calling-future" element={<BrowserCallingFuture />} />
              <Route path="/blog/expat-calling-family-guide" element={<ExpatCallingGuide />} />
              <Route path="/blog/mobile-vs-landline-rates" element={<MobileVsLandline />} />
              <Route path="/blog/voip-quality-guide" element={<VoIPQuality />} />
              <Route path="/blog/wifi-calling-vs-voip" element={<WiFiVsVoIP />} />
              <Route path="/blog/free-international-calling" element={<FreeInternationalCalling />} />
              <Route path="/blog/business-international-calling" element={<BusinessInternationalCalling />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/careers" element={<Careers />} />
              
              {/* Free Tools */}
              <Route path="/tools" element={<ToolsHub />} />
              <Route path="/tools/2fa-finder" element={<TwoFAFinder />} />
              <Route path="/tools/2fa-finder/:platform" element={<TwoFAPlatformPage />} />
              <Route path="/tools/rate-calculator" element={<RateCalculatorTool />} />
              <Route path="/tools/webrtc-tester" element={<WebRTCTester />} />
              <Route path="/tools/connectivity-ping" element={<ConnectivityPing />} />
              
              {/* Country Calling Guides */}
              <Route path="/call" element={<CallHub />} />
              <Route path="/call/:country" element={<CountryPage />} />
              
              {/* Comparison Pages */}
              <Route path="/compare" element={<Compare />} />
              <Route path="/compare/zyracall-vs-skype" element={<ZyraCallVsSkype />} />
              <Route path="/compare/zyracall-vs-google-voice" element={<ZyraCallVsGoogleVoice />} />
              <Route path="/compare/zyracall-vs-rebtel" element={<ZyraCallVsRebtel />} />
              <Route path="/compare/zyracall-vs-talk360" element={<ZyraCallVsTalk360 />} />
              <Route path="/compare/zyracall-vs-yadaphone" element={<ZyraCallVsYadaPhone />} />
              <Route path="/compare/zyracall-vs-vonage" element={<ZyraCallVsVonage />} />
              
              {/* Alternative Pages */}
              <Route path="/alternatives" element={<Alternatives />} />
              <Route path="/alternatives/skype-alternative" element={<SkypeAlternative />} />
              <Route path="/alternatives/whatsapp-calling-alternative" element={<WhatsAppAlternative />} />
              <Route path="/alternatives/viber-out-alternative" element={<ViberAlternative />} />
              <Route path="/alternatives/google-voice-alternative" element={<GoogleVoiceAlternative />} />
              
              {/* User Dashboard Routes - Protected */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/speed-dial" element={<ProtectedRoute><SpeedDial /></ProtectedRoute>} />
              <Route path="/dashboard/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/dashboard/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
              <Route path="/dashboard/rates" element={<ProtectedRoute><Rates /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              {/* Admin Routes - Protected */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/profitability" element={<ProtectedRoute><AdminProfitability /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/calls" element={<ProtectedRoute><AdminCallLogs /></ProtectedRoute>} />
              <Route path="/admin/transactions" element={<ProtectedRoute><AdminTransactions /></ProtectedRoute>} />
              <Route path="/admin/rates" element={<ProtectedRoute><AdminRates /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
              <Route path="/admin/2fa-feedback" element={<ProtectedRoute><Admin2FAFeedback /></ProtectedRoute>} />
              <Route path="/admin/mobile-interest" element={<ProtectedRoute><AdminMobileInterest /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
