import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="site-container flex flex-col justify-between gap-8 py-12 lg:flex-row lg:gap-12">
      <div>
        <Link to="/" className="inline-flex items-center gap-3 text-[26px] font-bold text-foreground">
          <img src={logo} alt="" width={36} height={36} loading="lazy" className="h-9 w-9" />
          ElderConnect
        </Link>
        <p className="mt-3 text-base text-muted-foreground">A student-led project.</p>
        <p className="mt-2 text-base text-muted-foreground">Contact: <a href="mailto:admin@elderconnect.org" className="text-primary underline underline-offset-4">admin@elderconnect.org</a></p>
      </div>
      <nav aria-label="Footer navigation" className="flex flex-wrap content-start gap-x-7 gap-y-4 text-base font-semibold">
        <Link to="/#how">How it works</Link>
        <Link to="/#students">For students</Link>
        <Link to="/senior-centers">For senior centers</Link>
        <Link to="/parents">For parents</Link>
        <Link to="/safety">Safety</Link>
        <Link to="/#faq">FAQ</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/support">Support</Link>
        <Link to="/delete-account">Delete account</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
