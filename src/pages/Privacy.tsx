import PublicPage from "@/components/PublicPage";

const CONTACT_EMAIL = "admin@elderconnect.org";

const EmailLink = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
    {CONTACT_EMAIL}
  </a>
);

const Privacy = () => {
  return (
    <PublicPage title="Privacy Policy" heading="Privacy Policy" description="How ElderConnect handles account and website waitlist information, children’s privacy, parental permission and requests to review or delete data.">
        <p className="text-muted-foreground mb-2">Last updated: October 10, 2026</p>
        <p className="text-muted-foreground italic text-sm mb-10">
          This policy is a working draft pending attorney review and may be updated.
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Overview</h2>
            <p className="text-muted-foreground">
              ElderConnect is a student-led project that connects student volunteers with supervised group
              activities at senior centers. This policy explains what information we collect, why we
              collect it, how long we keep it, and the choices you have. We collect the minimum
              information needed to run volunteer activities safely — we are not building a detailed
              profile of you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Data We Collect and How Long We Keep It</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Account information:</strong> your name, school, and
                contact details (such as your email address) when you create an account. If you are under
                18, we also ask for a parent or guardian's contact details so they can give permission.
                Senior center staff give us their name, email, and phone number so they can manage
                activities.
              </p>
              <p>
                Website waitlist: if you join the waitlist on our website, we store your email address and the role you select so we can contact you about ElderConnect. We keep it until you ask us to remove it or until the waitlist is no longer needed. To have it removed, email admin@elderconnect.org.
              </p>
              <p>
                Website visits: our website may record basic, aggregate visit information through our hosting provider, such as which pages are viewed, the type of device and the country of the visit. We do not use it for advertising.
              </p>
              <p>
                <strong className="text-foreground">Activity sign-ups:</strong> the activities you sign up
                for, the senior center you signed up with, and records of which sessions you attended, so
                volunteer hours can be confirmed.
              </p>
              <p>
                <strong className="text-foreground">Waiver and consent records:</strong> permission forms
                and parental consent records, so we can show that permission was given.
              </p>
              <p>
                <strong className="text-foreground">How long we keep it:</strong> we keep this information
                while your account is active. When your account is deleted, we delete your personal
                information, except records we are legally required to keep (for example consent and
                activity records).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Information We Do Not Collect</h2>
            <p className="text-muted-foreground">
              ElderConnect does not collect medical or health information for any user — no medications,
              diagnoses, health conditions, or care needs. There is no field in the app for this kind of
              information. We do not sell personal information, and we do not use it for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To run activities: sign-ups, scheduling, attendance records, and volunteer hours.</li>
              <li>To check age and, for users under 18, to record parental or guardian permission.</li>
              <li>To send you messages about your account and your activities.</li>
              <li>To route safety concerns to the right senior center staff or ElderConnect team member.</li>
              <li>To keep the records needed for youth-protection and safety compliance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. How Information Is Shared</h2>
            <p className="text-muted-foreground">
              We share information with the senior center you volunteer with, so staff can plan and
              supervise activities. We also share it with the service providers that help us run the app,
              such as our database and hosting provider and our email delivery provider. We do not sell
              personal information and do not share it with third parties for advertising or marketing.
              We may disclose information where we are required to do so by law.
            </p>
          </section>

          <section id="childrens-privacy" className="scroll-mt-8">
            <h2 className="text-2xl font-semibold mb-3">6. Children's Privacy</h2>
            <p className="text-muted-foreground">Our website, including the waitlist, is not directed to children under 13, and children under 13 should not submit their information.</p>
            <p className="text-muted-foreground">
              ElderConnect is intended for users aged 13 and older. We do not knowingly collect personal
              information from children under 13. If we learn that we have collected information from a
              child under 13, we delete it promptly. If you believe a child under 13 has given us
              information, please contact us at <EmailLink />.
            </p>
            <p className="text-muted-foreground">
              Users aged 13 to 17 may use the app only with permission from a parent or legal guardian. We
              collect only what is needed to run volunteer activities — name, school, contact details, and
              activity sign-up records. We do not sell personal information and do not use it for
              advertising.
            </p>
            <p className="text-muted-foreground">A parent or guardian can ask to review the information we hold about their child, ask us to correct or delete it, and withdraw permission for their child to use ElderConnect at any time by contacting us at admin@elderconnect.org. If permission is withdrawn, we will delete the child's account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Data Security</h2>
            <p className="text-muted-foreground">
              ElderConnect uses industry-standard measures to protect your information, including encrypted
              sign-in and role-based access controls that limit which staff and systems can see different
              kinds of data. No method of storage or transmission is 100% secure, so we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Deleting Your Account</h2>
            <p className="text-muted-foreground">
              You can delete your account in the app through Settings. When you do, we delete your personal
              data, except where we are legally required to keep it. A parent or guardian can also ask us
              to review, correct, or delete information about a child by contacting us at{" "}
              <EmailLink />. A parent or guardian may also withdraw permission, which ends the child's use of ElderConnect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Your Rights & Choices</h2>
            <p className="text-muted-foreground">
              You can ask us what personal information we hold about you, ask us to correct it, or ask us
              to delete it by contacting us at <EmailLink />. If you are a California resident, you also
              have rights under the CCPA/CPRA, including the right to know what personal information we
              hold, request deletion, and opt out of certain uses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Material changes will be explained in
              the app before they take effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground">
              Questions about this Privacy Policy, or requests about your information, can be sent to{" "}
              <EmailLink />.
            </p>
          </section>
        </div>
    </PublicPage>
  );
};

export default Privacy;
