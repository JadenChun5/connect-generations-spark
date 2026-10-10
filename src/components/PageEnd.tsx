import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PageEnd = () => (
  <div className="border-t border-border pt-8">
    <Button asChild><Link to="/#join">Join the waitlist</Link></Button>
    <p className="mt-6 text-base text-muted-foreground">Questions? <a href="mailto:admin@elderconnect.org" className="break-all text-primary underline underline-offset-4">admin@elderconnect.org</a></p>
  </div>
);

export default PageEnd;
