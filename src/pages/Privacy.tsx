import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-2">Effective Date: April 27, 2026 | Version 1.0</p>
        <p className="text-muted-foreground italic text-sm mb-10">
          This policy is a working draft pending attorney review and may be updated.
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Overview</h2>
            <p className="text-muted-foreground">
              This policy describes what information ElderConnect collects, how it is used, and the choices you have. ElderConnect is built around collecting the minimum information needed to safely connect volunteers with senior centers — not to build detailed profiles of any user.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">From Volunteers and Community Ambassadors:</strong> name, email address, school, and grade (for Ambassador applicants); profile photo, bio, and interests (optional, user-provided); parent or guardian contact information, for users under 18; community/location information; visit history and hours logged through the App.
              </p>
              <p>
                <strong className="text-foreground">From Senior Centers:</strong> staff contact information, center name, address, hours, and program details; information about senior participants added to the roster.
              </p>
              <p>
                <strong className="text-foreground">From Senior Participants</strong> (added by Senior Center staff, with the senior's consent): photo, first name and last initial, age, bio, interests, and general availability.
              </p>
              <p>
                ElderConnect intentionally does not collect additional personal information beyond what's listed above for any user type.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Information We Do Not Collect</h2>
            <p className="text-muted-foreground">
              ElderConnect does not collect or store medical or health information for any user — including medications, diagnoses, health conditions, or care needs. There is no field in the App for this information, for volunteers, ambassadors, or senior participants.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To operate core features: visit requests, scheduling, session verification, messaging, and community activities.</li>
              <li>To verify age and, for minors, to obtain and record parental consent.</li>
              <li>To route safety concerns to the appropriate ambassador or ElderConnect administrator.</li>
              <li>To communicate with you about your account and activity.</li>
              <li>To maintain records needed for youth-protection and safety compliance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. How Information Is Shared</h2>
            <p className="text-muted-foreground">
              Within the App, information is visible only as needed for the feature it supports — for example, a senior's profile (photo, first name, bio, interests) is visible to volunteers browsing that center, and a volunteer's profile is visible to the ambassador and center managing their visits. ElderConnect does not sell personal information, and does not share it with third parties for advertising or marketing purposes. We share information with service providers solely to operate the App, including our database/backend provider and our email delivery provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Children's Privacy</h2>
            <p className="text-muted-foreground">
              ElderConnect does not permit account creation for anyone under 14. Users 14–17 may only register with verified parental or guardian consent, obtained through the process described in our Terms of Service. A parent or guardian may review, request correction of, or request deletion of their child's information at any time by contacting us at <a href="mailto:admin@elderconnect.org" className="text-primary hover:underline">admin@elderconnect.org</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Data Security</h2>
            <p className="text-muted-foreground">
              ElderConnect uses industry-standard measures to protect your information, including encrypted authentication and role-based access controls that limit which staff and systems can view different categories of data. No method of storage or transmission is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Data Retention & Deletion</h2>
            <p className="text-muted-foreground">
              We retain account information for as long as your account is active. You may request deletion of your account at any time through Settings or by contacting us; underlying records are retained only as necessary for legal, safety, or compliance recordkeeping (for example, visit and consent records).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Your Rights & Choices</h2>
            <p className="text-muted-foreground">
              If you are a California resident, you have rights under the CCPA/CPRA to know what personal information we hold about you, request its deletion, and opt out of certain uses. To exercise these rights, contact us at <a href="mailto:admin@elderconnect.org" className="text-primary hover:underline">admin@elderconnect.org</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Material changes will be communicated in-app before taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground">
              Questions about this Privacy Policy, or requests regarding your information, can be sent to <a href="mailto:admin@elderconnect.org" className="text-primary hover:underline">admin@elderconnect.org</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
