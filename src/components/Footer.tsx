import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="site-container flex flex-col justify-between gap-8 py-12 lg:flex-row lg:gap-12">
      <div>
        <Link to="/" className="text-[26px] font-bold text-foreground">ElderConnect</Link>
        <p className="mt-3 text-base text-muted-foreground">A student-led project. Nonprofit registration in progress.</p>
        <p className="mt-2 text-base text-muted-foreground">Contact: <a href="mailto:jaden@techonsite.com" className="text-primary underline underline-offset-4">jaden@techonsite.com</a></p>
      </div>
      <nav aria-label="Footer navigation" className="flex flex-wrap content-start gap-x-7 gap-y-4 text-base font-semibold">
        <Link to="/#how">How it works</Link>
        <Link to="/#faq">FAQ</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
