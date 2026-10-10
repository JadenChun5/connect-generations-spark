import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";
import { Button } from "@/components/ui/button";

const Thanks = () => (
  <PublicPage
    title="Thank you"
    description="Thank you for joining the ElderConnect waitlist. We will write when the first activities open."
    heading="Thank you"
    intro="You are on the list. We will write when the first activities open."
  >
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Button asChild><Link to="/">Back to the home page</Link></Button>
      <Button variant="link" asChild><Link to="/#how">Read how it works</Link></Button>
    </div>
  </PublicPage>
);

export default Thanks;