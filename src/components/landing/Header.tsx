import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Calculator, Shield, Wifi, Wrench } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/zyracall-logo.png";

const toolsMenu = [
  { icon: Shield, label: "2FA Finder", href: "/tools/2fa-finder", description: "Check 2FA compatibility" },
  { icon: Calculator, label: "Rate Calculator", href: "/tools/rate-calculator", description: "Calculate call costs" },
  { icon: Wifi, label: "WebRTC Tester", href: "/tools/webrtc-tester", description: "Test your connection" },
  { icon: Wrench, label: "All Tools", href: "/tools", description: "View all tools" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="ZyraCall" 
              className="h-8 lg:h-9 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/rates">Rates</NavLink>
            <NavLink to="/compare">Compare</NavLink>
            
            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-lg hover:bg-muted/50 flex items-center gap-1">
                  Tools
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {toolsMenu.map((tool) => (
                  <DropdownMenuItem key={tool.href} asChild>
                    <Link to={tool.href} className="flex items-start gap-3 p-2">
                      <tool.icon className="w-4 h-4 text-accent mt-0.5" />
                      <div>
                        <div className="font-medium">{tool.label}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-foreground/80 hover:text-foreground hover:bg-transparent"
              asChild
            >
              <Link to="/login">Log in</Link>
            </Button>
            <Button 
              size="sm" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm hover:shadow-md transition-all"
              asChild
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <MobileNavLink to="/rates" onClick={() => setIsMobileMenuOpen(false)}>Rates</MobileNavLink>
              <MobileNavLink to="/compare" onClick={() => setIsMobileMenuOpen(false)}>Compare</MobileNavLink>
              
              {/* Tools Section in Mobile */}
              <div className="py-2">
                <span className="text-sm font-medium text-muted-foreground">Tools</span>
                <div className="mt-2 ml-2 space-y-1">
                  {toolsMenu.map((tool) => (
                    <Link
                      key={tool.href}
                      to={tool.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-1.5 text-foreground/80 hover:text-foreground transition-colors"
                    >
                      <tool.icon className="w-4 h-4 text-accent" />
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <MobileNavLink to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
              <div className="h-px bg-border my-2" />
              <Link 
                to="/login" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-2"
                asChild
              >
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to}
    className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  to, 
  children, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode; 
  onClick: () => void;
}) => (
  <Link 
    to={to}
    onClick={onClick}
    className="py-2 text-foreground font-medium hover:text-accent transition-colors"
  >
    {children}
  </Link>
);

export default Header;