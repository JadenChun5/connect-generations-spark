import { Link } from "react-router-dom";
import PublicPage from "@/components/PublicPage";

const CONTACT_EMAIL = "admin@elderconnect.org";

const EmailLink = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
    {CONTACT_EMAIL}
  </a>
);

const sections = [
  ["overview", "Overview"],
  ["information-collected", "Information we collect and how long we keep it"],
  ["information-not-collected", "Information we do not collect"],
  ["how-we-use-information", "How we use information"],
  ["information-sharing", "How information is shared"],
  ["childrens-privacy", "Children’s privacy"],
  ["data-security", "Data security"],
  ["deleting-your-account", "Deleting your account"],
  ["rights-and-choices", "Your rights and choices"],
  ["state-privacy-details", "California and other US state details"],
  ["policy-changes", "Changes to this policy"],
  ["contact-us", "Contact us"],
];

const informationCategories = [
  ["Identifiers (names, email, phone, ZIP code, IP address, account sign-in)", "Yes"],
  ["Customer-records information (name, contact details, school/education)", "Yes"],
  ["Age or date of birth", "Yes — no other protected characteristics such as race, ethnicity, gender or marital status are collected"],
  ["Internet/network activity (aggregate page views and logs)", "Yes"],
  ["Sensitive personal information (account login details and personal data from known minors)", "Yes"],
  ["Commercial/payment information", "No"],
  ["Biometric information", "No"],
  ["Precise geolocation", "No"],
  ["Professional or employment history", "No"],
  ["Inferences/profiling", "No"],
];

const Privacy = () => {
  return (
    <PublicPage title="Privacy Policy" heading="Privacy Policy" description="How ElderConnect handles account and website waitlist information, children’s privacy, parental permission and requests to review or delete data.">
      <p className="text-muted-foreground mb-2">Last updated: October 26, 2026</p>
      <p className="text-muted-foreground italic text-sm mb-10">
        This policy is a working draft pending attorney review and may be updated.
      </p>

      <div className="prose prose-lg max-w-none space-y-8 text-foreground">
        <section aria-labelledby="privacy-summary">
          <h2 id="privacy-summary" className="text-2xl font-semibold mb-3">Summary</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>We collect account, activity and consent information, waitlist email addresses and roles, support messages, messages between users, photos, community posts and likes, ZIP code, and basic technical information.</li>
            <li>We use information to run supervised volunteer activities, provide support, and keep the service secure and working.</li>
            <li>Senior center staff and service providers see information needed to plan activities and operate the service; authorities may receive it where required by law.</li>
            <li>ElderConnect is for ages 13 and older. Users aged 13 to 17 need a parent or guardian’s permission.</li>
            <li>You can request access, correction or deletion, or ask a privacy question, by emailing <EmailLink />.</li>
            <li>We do not sell personal information or share it for advertising.</li>
          </ul>
        </section>

        <nav aria-labelledby="privacy-contents">
          <h2 id="privacy-contents" className="text-2xl font-semibold mb-3">Table of contents</h2>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            {sections.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="text-primary hover:underline">{label}</a></li>
            ))}
          </ol>
        </nav>

        <section id="overview" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">1. Overview</h2>
          <p className="text-muted-foreground">
            ElderConnect is a student-led project that connects student volunteers with supervised group
            activities at senior centers. This policy explains what information we collect, why we
            collect it, how long we keep it, and the choices you have.
          </p>
          <p className="text-muted-foreground">
            We collect the minimum information needed to run volunteer activities safely — we are not
            building a detailed profile of you.
          </p>
        </section>

        <section id="information-collected" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">2. Information We Collect and How Long We Keep It</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Account information:</strong> your name, school, ZIP code,
              and contact details (such as your email address) when you create an account. If you are under
              18, we also ask for a parent or guardian's contact details so they can give permission.
              Senior center staff give us their name, email, and phone number so they can manage activities.
            </p>
            <p>An account may include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Names and email addresses.</li>
              <li>Phone numbers for senior center staff.</li>
              <li>Passwords and other sign-in details.</li>
              <li>School name and age or date of birth.</li>
              <li>ZIP code, used to show you the communities closest to you.</li>
              <li>Activity sign-up and attendance records.</li>
              <li>Waiver and parental consent records.</li>
            </ul>
            <p>
              <strong className="text-foreground">Website waitlist:</strong> if you join the waitlist on our
              website, we store your email address and the role you select so we can contact you about
              ElderConnect. We keep it until you ask us to remove it or until the waitlist is no longer
              needed. To have it removed, email <EmailLink />.
            </p>
            <p>
              <strong className="text-foreground">Support messages:</strong> if you send us a message
              through the support form, we store your name, email address, topic and message so we can
              respond, and keep them for as long as needed to handle your request.
            </p>
            <p>
              <strong className="text-foreground">Notifications:</strong> if you allow them, we store a
              device token so we can send reminders and message alerts. You can turn them off in your phone
              settings.
            </p>
            <p>
              <strong className="text-foreground">Community posts and likes:</strong> if you post in the
              app's community feed as an ambassador, we store your post and the account that posted it. If
              you like a post, we store that like. Posts are visible to other users of the app. We keep them
              while your account is active. Please do not include private information about seniors or
              others in a post.
            </p>
            <p>
              <strong className="text-foreground">Messages between users:</strong> we store messages you
              send and receive in the app so conversations stay available. Please don't share private
              information about seniors.
            </p>
            <p>
              <strong className="text-foreground">Photos:</strong> you can add a profile photo and photos
              for activities. We only access your camera or photo library when you choose to take or upload
              a photo, and we only store the photos you choose to add. Profile photos and activity photos
              may be visible to other users of the app. We delete your photos when you delete your account.
            </p>
            <p>
              <strong className="text-foreground">Reports and concerns:</strong> if you submit a concern
              through Report a concern in the app, we store what you send, such as your message and the
              account it came from, so we can review it and follow up.
            </p>
            <p>
              <strong className="text-foreground">Website visits:</strong> our website may record basic,
              aggregate visit information through our hosting provider, such as which pages are viewed,
              the type of device and the country of the visit. We do not use it for advertising.
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
              <strong className="text-foreground">Technical information:</strong> like most services,
              our hosting and app providers automatically record log and usage information such as IP
              address, browser and device type, operating system, and pages or screens used, to keep the
              service secure and working.
            </p>
            <p>
              <strong className="text-foreground">How long we keep it:</strong> we keep this information
              while your account is active. When your account is deleted, we delete your personal
              information, except records we are legally required to keep (for example consent and
              activity records). Waitlist email addresses are kept until removal is requested or the
              waitlist is no longer needed.
            </p>
          </div>
        </section>

        <section id="information-not-collected" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">3. Information We Do Not Collect</h2>
          <p className="text-muted-foreground">
            ElderConnect does not collect medical or health information for any user — no medications,
            diagnoses, health conditions, or care needs. There is no field in the app for this kind of
            information. We do not sell personal information, and we do not use it for advertising.
          </p>
          <p className="text-muted-foreground">We do not collect payment information, government ID numbers, or precise location.</p>
        </section>

        <section id="how-we-use-information" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">4. How We Use Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>To run activities: sign-ups, scheduling, attendance records, and volunteer hours.</li>
            <li>To check age and, for users under 18, to record parental or guardian permission.</li>
            <li>To send you messages about your account and your activities.</li>
            <li>To route safety concerns to the right senior center staff or ElderConnect team member.</li>
            <li>To keep the records needed for youth-protection and safety compliance.</li>
            <li>To respond to inquiries and support requests.</li>
            <li>To send administrative messages about the service.</li>
            <li>To protect the service and keep it secure and working.</li>
            <li>To understand how the service is used in aggregate and improve it.</li>
          </ul>
        </section>

        <section id="information-sharing" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">5. How Information Is Shared</h2>
          <p className="text-muted-foreground">
            We share information with the senior center you volunteer with, so staff can plan and
            supervise activities. We also share it with the service providers that help us run the app,
            such as our database and hosting provider and our email delivery provider.
          </p>
          <p className="text-muted-foreground">
            We do not sell personal information and do not share it with third parties for advertising
            or marketing. We may disclose information where we are required to do so by law.
          </p>
          <p className="text-muted-foreground">Provider categories include:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Cloud computing and data storage.</li>
            <li>Website hosting.</li>
            <li>Email and communication tools.</li>
            <li>Account sign-in services.</li>
            <li>Analytics for aggregate website visits.</li>
          </ul>
          <p className="text-muted-foreground">Government authorities may also receive information where required by law.</p>
          <p className="text-muted-foreground">
            If ElderConnect is ever transferred through a merger or sale, information may transfer with
            it. We would tell users about the transfer and what it means for their information.
          </p>
          <p className="text-muted-foreground">We have not sold or shared personal information for advertising in the past 12 months.</p>
        </section>

        <section id="childrens-privacy" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">6. Children's Privacy</h2>
          <p className="text-muted-foreground">Our website, including the waitlist, is not directed to children under 13, and children under 13 should not submit their information.</p>
          <p className="text-muted-foreground">
            ElderConnect is intended for users aged 13 and older. We do not knowingly collect personal
            information from children under 13. This is consistent with the Children's Online Privacy
            Protection Act (COPPA). If we learn that we have collected information from a
            child under 13, we delete it promptly. If you believe a child under 13 has given us
            information, please contact us at <EmailLink />.
          </p>
          <p className="text-muted-foreground">
            Users aged 13 to 17 may use the app only with permission from a parent or legal guardian. We
            collect only what is needed to run volunteer activities — such as name, contact details, ZIP
            code, activity sign-up records, and any photos or messages they choose to add. We do not sell
            personal information and do not use it for advertising.
          </p>
          <p className="text-muted-foreground">
            A parent or guardian can ask to review the information we hold about their child, ask us to
            correct or delete it, and withdraw permission for their child to use ElderConnect at any time
            by contacting us at <EmailLink />. If permission is withdrawn, we will delete the child's account.
          </p>
          <p className="text-muted-foreground">
            Senior center staff supervise all sessions, and we share a student's name, school and activity
            details with the senior center they volunteer with so staff can plan and supervise activities.
          </p>
        </section>

        <section id="data-security" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">7. Data Security</h2>
          <p className="text-muted-foreground">
            ElderConnect uses industry-standard measures to protect your information, including encrypted
            sign-in and role-based access controls that limit which staff and systems can see different
            kinds of data. No method of storage or transmission is 100% secure, so we cannot guarantee
            absolute security.
          </p>
        </section>

        <section id="deleting-your-account" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">8. Deleting Your Account</h2>
          <p className="text-muted-foreground">
            You can delete your account in the app through Settings. When you do, we delete your personal
            data, except where we are legally required to keep it. A parent or guardian can also ask us
            to review, correct, or delete information about a child by contacting us at <EmailLink />.
            A parent or guardian may also withdraw permission, which ends the child's use of ElderConnect.
          </p>
          <p className="text-muted-foreground">
            See our <Link to="/delete-account" className="text-primary hover:underline">Delete account page</Link> for
            instructions on how to request deletion.
          </p>
        </section>

        <section id="rights-and-choices" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">9. Your Rights and Choices</h2>
          <p className="text-muted-foreground">
            You can ask us what personal information we hold about you, ask us to correct it, or ask us
            to delete it by contacting us at <EmailLink />. Depending on where you live, including
            California and other states with privacy laws, you may have the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access: learn whether we process your personal information and what we hold.</li>
            <li>Correction: ask us to correct inaccurate personal information.</li>
            <li>Deletion: ask us to delete your personal information, subject to legal exceptions.</li>
            <li>Copy: request a copy of your personal information.</li>
            <li>Withdrawal of consent: withdraw consent where we rely on it. This does not affect processing that took place before you withdrew it.</li>
            <li>Non-discrimination: exercise your privacy rights without unlawful discrimination.</li>
          </ul>
          <p className="text-muted-foreground">
            California residents also have rights under the CCPA/CPRA, including the right to know what
            personal information we hold, request deletion, and opt out of certain uses. We do not sell
            personal information or share it for advertising.
          </p>
          <p className="text-muted-foreground">
            You may designate an authorized agent to make a request for you. We may need proof of their
            authority. We will verify your identity using the information in your request and respond
            within the time the law requires.
          </p>
          <p className="text-muted-foreground">
            If we decline your request, you can appeal by emailing <EmailLink /> with “Appeal” in the
            subject. If your appeal does not resolve your concern, you may contact your state attorney general.
          </p>
          <p className="text-muted-foreground">
            California’s “Shine the Light” law allows residents to request information about disclosures
            of personal information to third parties for their direct marketing. We do not disclose
            personal information for that purpose. You can contact us with any questions about this right.
          </p>
        </section>

        <section id="state-privacy-details" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">10. California and Other US State Details</h2>
          <table className="w-full table-fixed border-collapse text-sm text-muted-foreground">
            <caption className="mb-3 text-left font-semibold text-foreground">Categories of personal information we collect</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="w-3/5 break-words py-3 pr-3 text-left font-semibold text-foreground">Category</th>
                <th scope="col" className="break-words py-3 text-left font-semibold text-foreground">Collected?</th>
              </tr>
            </thead>
            <tbody>
              {informationCategories.map(([category, collected]) => (
                <tr key={category} className="border-b border-border">
                  <th scope="row" className="break-words py-3 pr-3 text-left font-normal">{category}</th>
                  <td className="break-words py-3 align-top">{collected}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-muted-foreground">
            We do not sell personal information, share it for cross-context behavioral advertising, or
            use sensitive personal information to infer characteristics. We disclose these categories
            only to service providers and senior centers as described above.
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Do Not Track:</strong> we do not currently respond to
            Do Not Track or Global Privacy Control signals because we don't sell or share personal
            information for advertising.
          </p>
        </section>

        <section id="policy-changes" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">11. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. Material changes will be explained in
            the app before they take effect.
          </p>
        </section>

        <section id="contact-us" className="scroll-mt-8">
          <h2 className="text-2xl font-semibold mb-3">12. Contact Us</h2>
          <p className="text-muted-foreground">
            Questions about this Privacy Policy, or requests about your information, can be sent to <EmailLink />.
          </p>
        </section>
      </div>
    </PublicPage>
  );
};

export default Privacy;
