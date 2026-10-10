import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <PublicPage
    noindex
    title="Page not found"
    description="This ElderConnect link may be old or mistyped. Return to the home page or contact support."
    heading="We can't find that page"
    intro="The link may be old or mistyped."
  >
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Button asChild><Link to="/">Back to the home page</Link></Button>
      <Button variant="link" asChild><Link to="/support">Contact support</Link></Button>
    </div>
  </PublicPage>
);

export default NotFound;
