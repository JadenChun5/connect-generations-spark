import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";
import { Button } from "@/components/ui/button";

const Thanks = () => (
  <PublicPage
    noindex
    title="You're on the list"
    description="You're on the ElderConnect waitlist. We'll email you at the address you gave."
    heading="You're on the list"
    intro="Thank you for joining the ElderConnect waitlist. We'll email you at the address you gave."
  >
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Button asChild><Link to="/">Back to the home page</Link></Button>
    </div>
  </PublicPage>
);

export default Thanks;
