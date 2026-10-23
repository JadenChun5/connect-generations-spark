import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logoWordmark from "@/assets/elderconnect-logo.svg.asset.json";

const navigation = [
  { name: "How it works", to: "/#how" },
  { name: "For students", to: "/#students" },
  { name: "For senior centers", to: "/senior-centers" },
  { name: "For parents", to: "/parents" },
  { name: "Safety", to: "/safety" },
  { name: "FAQ", to: "/#faq" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isCurrent = (to: string) => {
    const [path, hash] = to.split("#");
    if (hash) return pathname === path; // homepage anchors share the homepage path
    return pathname === to;
  };

  const linkClass = (to: string, mobile = false) =>
    `text-foreground transition-colors hover:text-primary ${
      isCurrent(to) ? "underline decoration-primary decoration-2 underline-offset-8" : ""
    } ${mobile ? "block py-3 text-lg" : ""}`;

  return (
    <header className="border-b border-border bg-background">
      <div className="site-container flex flex-wrap items-center justify-between gap-x-6 gap-y-5 py-6">
        <Link to="/" className="inline-flex">
          <img src={logoWordmark.url} alt="ElderConnect, Bridging Generations" width={256} height={48} className="h-10 w-auto sm:h-12" />
        </Link>
        <button
          type="button"
          className="min-h-11 min-w-11 rounded-md border border-border px-4 text-base font-semibold text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(v => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav aria-label="Main navigation" className="hidden items-center gap-x-5 text-[15px] font-semibold lg:flex">
          {navigation.map(item => (
            <Link key={item.to} to={item.to} aria-current={isCurrent(item.to) ? "page" : undefined} className={linkClass(item.to)}>
              {item.name}
            </Link>
          ))}
          <Button asChild><Link to="/#join">Join the waitlist</Link></Button>
        </nav>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-border lg:hidden">
          <div className="site-container flex flex-col py-4 text-base font-semibold">
            {navigation.map(item => (
              <Link key={item.to} to={item.to} aria-current={isCurrent(item.to) ? "page" : undefined} className={linkClass(item.to, true)} onClick={() => setOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Button asChild className="mt-3"><Link to="/#join" onClick={() => setOpen(false)}>Join the waitlist</Link></Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
