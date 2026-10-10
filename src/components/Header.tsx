import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navigation = [
  { name: "How it works", to: "/#how" },
  { name: "For senior centers", to: "/senior-centers" },
  { name: "Safety", to: "/safety" },
  { name: "FAQ", to: "/#faq" },
];

const Header = () => (
  <header className="border-b border-border bg-background">
    <div className="site-container flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-6">
      <Link to="/" className="text-[26px] font-bold leading-tight text-foreground">ElderConnect</Link>
      <nav aria-label="Main navigation" className="flex w-full flex-wrap items-center gap-x-6 gap-y-4 text-base font-semibold lg:w-auto lg:gap-x-7">
        {navigation.map(item => <Link key={item.to} to={item.to} className="text-foreground transition-colors hover:text-primary">{item.name}</Link>)}
        <Button asChild><Link to="/#join">Join the waitlist</Link></Button>
      </nav>
    </div>
  </header>
);

export default Header;
