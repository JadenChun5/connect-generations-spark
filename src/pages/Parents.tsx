import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";
import PageEnd from "@/components/PageEnd";

const link = "text-primary underline underline-offset-4";

const Parents = () => (
  <PublicPage
    title="For parents and guardians"
    description="What parents and guardians should know about ElderConnect: supervised group activities at senior centers, permission, privacy and account deletion."
    heading="For parents and guardians"
    intro="Here is what your student does with ElderConnect and how you stay in control."
  >
    <section aria-labelledby="what">
      <h2 id="what">What ElderConnect is</h2>
      <p className="mt-5 text-muted-foreground">Students sign up for supervised group activities at senior centers.</p>
    </section>
    <section aria-labelledby="does">
      <h2 id="does">What your student does</h2>
      <p className="mt-5 text-muted-foreground">Your student joins a group activity that senior center staff run.</p>
    </section>
    <section aria-labelledby="permission">
      <h2 id="permission">Permission</h2>
      <p className="mt-5 text-muted-foreground">Students under 18 need parent or guardian permission. The minimum age is 13.</p>
    </section>
    <section aria-labelledby="info">
      <h2 id="info">Your student's information</h2>
      <p className="mt-5 text-muted-foreground">Our <Link to="/privacy" className={link}>Privacy Policy</Link> explains what we collect and why. See the <Link to="/privacy#childrens-privacy" className={link}>Children's Privacy</Link> section in particular.</p>
    </section>
    <section aria-labelledby="delete">
      <h2 id="delete">How to delete an account</h2>
      <p className="mt-5 text-muted-foreground">Follow the steps on the <Link to="/delete-account" className={link}>Delete account</Link> page. A parent or guardian can also ask us to delete a child's account.</p>
    </section>
    <section aria-labelledby="contact">
      <h2 id="contact">Contact</h2>
      <p className="mt-5 text-muted-foreground">Email <a href="mailto:admin@elderconnect.org" className={`break-all ${link}`}>admin@elderconnect.org</a>.</p>
    </section>
    <PageEnd />
  </PublicPage>
);

export default Parents;
