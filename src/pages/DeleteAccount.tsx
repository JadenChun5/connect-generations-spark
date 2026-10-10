import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";

const DeleteAccount = () => (
  <PublicPage
    title="Delete account"
    description="Learn how to delete your ElderConnect account in the app or by email, what gets deleted and which records must be kept."
    heading="Delete your ElderConnect account"
    intro="You can delete your account at any time. This page explains how and what happens to your information."
  >
    <section aria-labelledby="delete-in-app">
      <h2 id="delete-in-app">Delete it in the app</h2>
      <ol className="mt-5 list-decimal space-y-3 pl-7 text-muted-foreground">
        <li>Open ElderConnect and sign in.</li>
        <li>Go to Settings.</li>
        <li>Choose Delete account and confirm.</li>
      </ol>
    </section>
    <section aria-labelledby="cant-use-app">
      <h2 id="cant-use-app">Can't use the app?</h2>
      <p className="mt-5 text-muted-foreground">Email <a href="mailto:jaden@techonsite.com" className="break-all text-primary underline underline-offset-4">jaden@techonsite.com</a> from the address on your account and ask us to delete it. For your safety we may ask you to confirm it is you. A parent or guardian can also ask us to delete a child's account.</p>
    </section>
    <section aria-labelledby="what-gets-deleted">
      <h2 id="what-gets-deleted">What gets deleted</h2>
      <p className="mt-5 text-muted-foreground">Your personal information is deleted, including your name, school, contact details, activity sign-ups, and attendance records, except records we are legally required to keep, such as consent and activity records.</p>
    </section>
    <section aria-labelledby="what-we-keep">
      <h2 id="what-we-keep">What we keep</h2>
      <p className="mt-5 text-muted-foreground">Records we are legally required to keep, for example parental consent and activity records, are kept only as long as the law requires.</p>
    </section>
    <p className="border-t border-border pt-8">See our <Link to="/privacy" className="text-primary underline underline-offset-4">Privacy Policy</Link> for more.</p>
  </PublicPage>
);

export default DeleteAccount;