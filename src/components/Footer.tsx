import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Success Stories", href: "#success-stories" },
    { name: "Safety Guidelines", href: "#safety" },
    { name: "Help Center", href: "#help" }
  ];

  const userTypes = [
    { name: "High School Students", href: "#teens" },
    { name: "Senior Centers", href: "#centers" },
    { name: "Teen Supervisors", href: "#admins" },
    { name: "Family Members", href: "#family" }
  ];

  const resources = [
    { name: "Training Materials", href: "#training" },
    { name: "Best Practices", href: "#best-practices" },
    { name: "Community Guidelines", href: "#guidelines" },
    { name: "Partner Resources", href: "#partners" }
  ];

  const company = [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Press Kit", href: "#press" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-hero p-2 rounded-lg shadow-soft">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">ElderConnect</div>
                <div className="text-xs text-muted-foreground">Bridging Generations</div>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Creating meaningful connections between high school teens and seniors through 
              volunteer opportunities that benefit entire communities.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                hello@elderconnect.com
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                (555) 123-ELDER
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Building Community Nationwide
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary-soft hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* User Types */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get Started</h4>
            <ul className="space-y-3">
              {userTypes.map((type) => (
                <li key={type.name}>
                  <a 
                    href={type.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {type.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-2xl">
            <h4 className="font-semibold text-foreground mb-2">Stay Connected</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get updates on new features, success stories, and opportunities in your community.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 ElderConnect. All rights reserved. Made with ❤️ for community building.
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
              </Link>
              <a href="#accessibility" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;