import PublicPage from "@/components/PublicPage";
import WaitlistForm from "@/components/WaitlistForm";
import AppStoreButton from "@/components/AppStoreButton";
import seniorCentersPhoto from "@/assets/photos/senior-centers.webp.asset.json";

const centerBenefits = [
  "You choose which activities to open and how many volunteers you want",
  "You see who has signed up before the day",
  "Your staff lead the session, and you decide who may take part",
  "Free for centers during our pilot",
];

const SeniorCenters = () => (
  <PublicPage
    title="For senior centers"
    description="Explore ElderConnect's senior-center pilot: volunteers join group activities led by your staff. Contact us about a pilot."
    heading="For senior centers"
    intro="Keep running your activities the way you do now. ElderConnect gives you a steady group of volunteers who sign up in advance, so you can plan."
  >
    <ul className="list-disc space-y-3 pl-6 text-muted-foreground marker:text-primary">
      {centerBenefits.map(item => <li key={item} className="pl-1">{item}</li>)}
    </ul>
    <figure className="min-w-0">
      <img src={seniorCentersPhoto.url} alt="A group of seniors in a chair exercise class." width={1600} height={1067} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
      <figcaption className="mt-2 text-sm text-muted-foreground">
        <a href="https://www.pexels.com/photo/seniors-exercising-11674389/" className="underline underline-offset-2">Photo: Centre for Ageing Better on Pexels</a>
      </figcaption>
    </figure>
    <p className="text-muted-foreground">Staff run every session. Volunteers join as groups, never one-on-one.</p>
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8" aria-labelledby="download-heading">
      <h2 id="download-heading">Get ElderConnect for your center</h2>
      <p className="mt-4 text-muted-foreground">Download the app to create your center's account and start planning supervised group activities.</p>
      <AppStoreButton label="Download the app" className="mt-6" />
    </section>
    <section className="max-w-[720px]" aria-labelledby="updates-heading">
      <h2 id="updates-heading">Stay in the loop</h2>
      <p className="mt-3 text-muted-foreground">Get updates about new centers and activities.</p>
      <WaitlistForm defaultRole="Senior center staff" />
      <p className="mt-6 text-base text-muted-foreground">Contact: <a href="mailto:admin@elderconnect.org" className="text-primary underline underline-offset-4">admin@elderconnect.org</a></p>
    </section>
  </PublicPage>
);

export default SeniorCenters;
