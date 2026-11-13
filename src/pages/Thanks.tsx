import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";
import { Button } from "@/components/ui/button";
import AppStoreButton from "@/components/AppStoreButton";

const Thanks = () => (
  <PublicPage
    noindex
    title="You're on the list"
    description="You're signed up for ElderConnect email updates. We'll email you at the address you gave."
    heading="You're on the list"
    intro="Thank you for signing up for ElderConnect email updates. We'll email you at the address you gave."
  >
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <AppStoreButton label="Ready to start? Download the app" />
      <Button asChild variant="outline"><Link to="/">Back to the home page</Link></Button>
    </div>
  </PublicPage>
);

export default Thanks;
