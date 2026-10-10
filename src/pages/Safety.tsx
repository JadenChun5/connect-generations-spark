import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";
import PageEnd from "@/components/PageEnd";

const link = "text-primary underline underline-offset-4";

const Safety = () => (
  <PublicPage
    title="Safety"
    description="How ElderConnect keeps activities supervised: group activities only, run by senior center staff, for students 13 and older."
    heading="Built around supervision"
    intro="ElderConnect is designed so students and seniors spend time together in supervised group settings."
  >
    <section aria-labelledby="group-only">
      <h2 id="group-only">Group activities only, never one-on-one</h2>
      <p className="mt-5 text-muted-foreground">Students join group activities at senior centers. There are no one-on-one visits.</p>
    </section>
    <section aria-labelledby="staff-run">
      <h2 id="staff-run">Senior center staff run every session</h2>
      <p className="mt-5 text-muted-foreground">Center staff lead each activity, and students follow their instructions.</p>
    </section>
    <section aria-labelledby="ages">
      <h2 id="ages">Students are 13 and older</h2>
      <p className="mt-5 text-muted-foreground">The minimum age is 13. Students under 18 need parent or guardian permission to take part.</p>
    </section>
    <section aria-labelledby="delete">
      <h2 id="delete">Deleting your account</h2>
      <ol className="mt-5 list-decimal space-y-3 pl-7 text-muted-foreground">
        <li>Open ElderConnect and sign in.</li>
        <li>Go to Settings.</li>
        <li>Choose Delete account and confirm.</li>
      </ol>
      <p className="mt-5 text-muted-foreground">Can't use the app? See the <Link to="/delete-account" className={link}>Delete account</Link> page.</p>
    </section>
    <section aria-labelledby="concern">
      <h2 id="concern">Report a concern</h2>
      <p className="mt-5 text-muted-foreground">If something worries you, email <a href="mailto:admin@elderconnect.org" className={`break-all ${link}`}>admin@elderconnect.org</a>.</p>
    </section>
    <PageEnd />
  </PublicPage>
);

export default Safety;
