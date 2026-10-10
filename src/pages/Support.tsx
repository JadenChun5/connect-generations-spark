import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";

const emailLink = "mailto:admin@elderconnect.org";
const linkClass = "text-primary underline underline-offset-4";

const Support = () => (
  <PublicPage
    title="Support"
    description="Questions about ElderConnect? Contact our student-led team and find answers about accounts, safety concerns and the pilot."
    heading="Support"
    intro="Questions about ElderConnect? We are a small student-led team and we read every message."
  >
    <section aria-label="Contact" className="border-y border-border py-8">
      <p className="text-xl font-semibold sm:text-2xl">
        Email us: <a href={emailLink} className={`${linkClass} inline-flex min-h-12 items-center break-all`}>admin@elderconnect.org</a>
      </p>
      <p className="mt-2 text-muted-foreground">We reply as soon as we can.</p>
    </section>
    <section aria-labelledby="common-questions">
      <h2 id="common-questions">Common questions</h2>
      <dl className="mt-6 divide-y divide-border">
        <div className="py-6">
          <dt className="text-xl font-bold">I did not get my verification email</dt>
          <dd className="mt-3 text-muted-foreground">Check your spam or junk folder first. If it still has not arrived, email us from the address you used to sign up and we will help.</dd>
        </div>
        <div className="py-6">
          <dt className="text-xl font-bold">How do I delete my account?</dt>
          <dd className="mt-3 text-muted-foreground">You can delete your account in the app under Settings → Delete account. You can also read how it works on our <Link to="/delete-account" className={linkClass}>account deletion page</Link>.</dd>
        </div>
        <div className="py-6">
          <dt className="text-xl font-bold">I am a parent or guardian and want to review or delete my child's information.</dt>
          <dd className="mt-3 text-muted-foreground">Email us at <a href={emailLink} className={`${linkClass} break-all`}>admin@elderconnect.org</a> and tell us your child's name and the email address on the account. We will help.</dd>
        </div>
        <div className="py-6">
          <dt className="text-xl font-bold">How do I report a safety concern?</dt>
          <dd className="mt-3 text-muted-foreground">Email us right away at <a href={emailLink} className={`${linkClass} break-all`}>admin@elderconnect.org</a>. If someone is in immediate danger, call 911.</dd>
        </div>
        <div className="py-6">
          <dt className="text-xl font-bold">I run a senior center and want to join the pilot.</dt>
          <dd className="mt-3 text-muted-foreground">Use the <Link to="/#join" className={linkClass}>waitlist on our home page</Link> and choose Senior center staff, or <a href={emailLink} className={linkClass}>email us</a>.</dd>
        </div>
      </dl>
    </section>
    <nav aria-label="Support legal links" className="flex flex-wrap gap-x-8 gap-y-4">
      <Link to="/privacy" className={`${linkClass} inline-flex min-h-12 items-center`}>Privacy Policy</Link>
      <Link to="/terms" className={`${linkClass} inline-flex min-h-12 items-center`}>Terms of Service</Link>
    </nav>
  </PublicPage>
);

export default Support;