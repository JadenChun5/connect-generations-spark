import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";
import { Button } from "@/components/ui/button";

const link = "text-primary underline underline-offset-4";

const Parents = () => (
  <PublicPage
    title="For parents and guardians"
    description="What parents and guardians should know about ElderConnect: supervised group activities at senior centers, permission, privacy and account deletion."
    heading="For parents and guardians"
    intro="Here is what your student does with ElderConnect and what we ask of parents and guardians."
  >
    <section aria-labelledby="what">
      <h2 id="what">What ElderConnect is</h2>
      <p className="mt-5 text-muted-foreground">Students sign up for supervised group activities at senior centers.</p>
    </section>
    <section aria-labelledby="does">
      <h2 id="does">What your student does</h2>
      <p className="mt-5 text-muted-foreground">Your student joins a group activity that senior center staff run.</p>
    </section>
    <section aria-labelledby="never">
      <h2 id="never">Never one-on-one</h2>
      <p className="mt-5 text-muted-foreground">Students join group activities only, and senior center staff run every session. <Link to="/safety" className={link}>Read more about safety</Link>.</p>
    </section>
    <section aria-labelledby="permission">
      <h2 id="permission">Permission</h2>
      <p className="mt-5 text-muted-foreground">ElderConnect is for students 13 and older. When a student under 18 creates an account, the app asks for a parent or guardian's contact details so they can give permission, and we keep a record of that permission. You can withdraw permission at any time by emailing admin@elderconnect.org, and we will delete your child's account.</p>
    </section>
    <section aria-labelledby="info">
      <h2 id="info">Your student's information</h2>
      <p className="mt-5 text-muted-foreground">Our <Link to="/privacy" className={link}>Privacy Policy</Link> explains what we collect and why. See the <Link to="/privacy#childrens-privacy" className={link}>Children's Privacy</Link> section in particular.</p>
      <p className="mt-5 text-muted-foreground">You can ask to review, correct or delete the information we hold about your child at any time by emailing admin@elderconnect.org.</p>
    </section>
    <section aria-labelledby="delete">
      <h2 id="delete">How to delete an account</h2>
      <p className="mt-5 text-muted-foreground">Follow the steps on the <Link to="/delete-account" className={link}>Delete account</Link> page. Questions about deleting your child's account? Email <a href="mailto:admin@elderconnect.org" className={`break-all ${link}`}>admin@elderconnect.org</a>.</p>
    </section>
    <section aria-labelledby="contact">
      <h2 id="contact">Contact</h2>
      <p className="mt-5 text-muted-foreground">Email <a href="mailto:admin@elderconnect.org" className={`break-all ${link}`}>admin@elderconnect.org</a>.</p>
    </section>
    <div className="border-t border-border pt-8">
      <Button asChild><a href="mailto:admin@elderconnect.org">Email us a question</a></Button>
      <p className="mt-6 text-base text-muted-foreground"><Link to="/#join" className={link}>Join the waitlist as a parent or guardian</Link></p>
    </div>
  </PublicPage>
);

export default Parents;
