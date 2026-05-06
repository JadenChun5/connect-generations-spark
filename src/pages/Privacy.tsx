import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">Effective Date: April 27, 2026 | Version 1.0</p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              ElderConnect ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the ElderConnect mobile application. Please read this policy carefully. If you disagree with its terms, please discontinue use of the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Account Information:</strong> Name, email address, school affiliation (for volunteers), and role (volunteer, coordinator, or senior center partner).</li>
              <li><strong className="text-foreground">Profile Data:</strong> Availability, volunteer hours logged, activity preferences, and profile photos if provided.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Pages visited, features used, session duration, and in-app interactions.</li>
              <li><strong className="text-foreground">Device Information:</strong> Device type, operating system version, and unique device identifiers.</li>
              <li><strong className="text-foreground">Communications:</strong> Messages sent within the platform between volunteers and coordinators.</li>
              <li><strong className="text-foreground">Location Data:</strong> General location (city/region) for matching volunteers with nearby senior centers. We do not collect precise real-time GPS data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Create and manage your account.</li>
              <li>Match volunteers with appropriate senior center partners.</li>
              <li>Facilitate scheduling, coordination, and impact tracking.</li>
              <li>Send service-related communications and notifications.</li>
              <li>Improve App performance, features, and user experience.</li>
              <li>Comply with legal obligations.</li>
              <li>Generate anonymized, aggregate impact reports (e.g., total volunteer hours served).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Sharing of Information</h2>
            <p className="text-muted-foreground mb-3">We do not sell your personal information. We may share information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Senior Center Partners:</strong> Coordinator-facing volunteer profiles (name, school, availability) are shared with the partner facility you are matched with.</li>
              <li><strong className="text-foreground">Service Providers:</strong> Third-party vendors who assist with hosting, analytics, or communications, bound by confidentiality agreements.</li>
              <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, court order, or government authority.</li>
              <li><strong className="text-foreground">Safety:</strong> When disclosure is necessary to protect the safety of users or others.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as your account is active or as needed to provide services. If you delete your account, we will delete or anonymize your data within 30 days, except where retention is required by law or for legitimate operational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Children's Privacy (COPPA)</h2>
            <p className="text-muted-foreground">
              The App is not directed to children under 13. Volunteers between the ages of 13 and 17 may use the App only with verified parental or guardian consent. We do not knowingly collect personal information from children under 13 without consent. If we discover such data has been collected, we will delete it promptly. Parents may contact us at privacy@elderconnect.app to review or delete their child's data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures including encryption in transit (TLS), encrypted storage, and access controls to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal data (subject to legal exceptions).</li>
              <li><strong className="text-foreground">Opt-Out:</strong> Opt out of non-essential communications at any time.</li>
              <li><strong className="text-foreground">California Residents (CCPA):</strong> You have the right to know, delete, and opt out of the sale of personal information. We do not sell personal information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Third-Party Services</h2>
            <p className="text-muted-foreground">
              The App may integrate with third-party services for database hosting and AI features. These services have their own privacy policies, and we encourage you to review them. ElderConnect is not responsible for the privacy practices of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of significant changes via in-app notification or email at least 14 days before they take effect. Your continued use of the App after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions, concerns, or requests regarding this Privacy Policy, please contact:<br />
              ElderConnect Privacy Team<br />
              Manhattan Beach, CA 90266<br />
              Email: privacy@elderconnect.app
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
