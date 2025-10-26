import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHowItWorksClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'user-type-selection' } });
    } else {
      document.getElementById('user-type-selection')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigation = [
    { name: "How It Works", href: "#user-type-selection", onClick: handleHowItWorksClick },
    { name: "Features", href: "/features" },
    { name: "Demo", href: "/demo" },
    { name: "About", href: "/about" },
    { name: "Connect", href: "/connect" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-hero p-2 rounded-lg shadow-soft">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">ElderConnect</div>
              <div className="text-xs text-muted-foreground">Bridging Generations</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-smooth font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  className="text-muted-foreground hover:text-foreground transition-smooth font-medium cursor-pointer"
                >
                  {item.name}
                </a>
              )
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/demo">
              <Button variant="outline" size="sm">
                View Demo
              </Button>
            </Link>
            <Link to="/connect">
              <Button variant="hero" size="sm">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
        )}>
          <nav className="flex flex-col gap-4 pt-4">
            {navigation.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-smooth font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-smooth font-medium py-2 cursor-pointer"
                  onClick={(e) => {
                    item.onClick?.(e);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              )
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Link to="/demo" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  View Demo
                </Button>
              </Link>
              <Link to="/connect" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" size="sm" className="w-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;