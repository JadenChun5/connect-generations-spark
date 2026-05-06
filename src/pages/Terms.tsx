import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">Effective Date: April 27, 2026 | Version 1.0</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By downloading, installing, or using the ElderConnect mobile application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App. ElderConnect is a nonprofit platform connecting high school volunteers with seniors at local senior centers across the South Bay, Los Angeles area.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Volunteers:</strong> Must be currently enrolled high school students. Users under 18 require verifiable parental or guardian consent.</li>
              <li><strong className="text-foreground">Senior Center Partners:</strong> Must be a registered senior care facility or community organization with a designated coordinator.</li>
              <li><strong className="text-foreground">General Users:</strong> Must be at least 13 years of age. Users between 13–17 may only access features approved for minors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Description of Services</h2>
            <p className="text-muted-foreground">
              ElderConnect provides a platform that facilitates meaningful connections between volunteer high school students and senior residents at partnering care facilities. Services include volunteer scheduling, activity coordination, messaging between coordinators and volunteers, and impact tracking. ElderConnect does not provide medical, legal, or financial advice and is not a licensed healthcare provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration. You must notify us immediately of any unauthorized use of your account at support@elderconnect.app.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Acceptable Use</h2>
            <p className="text-muted-foreground mb-3">You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Use the App for any unlawful purpose or in violation of any applicable laws.</li>
              <li>Harass, bully, or threaten other users, including seniors or volunteers.</li>
              <li>Share false, misleading, or fraudulent information.</li>
              <li>Attempt to gain unauthorized access to any portion of the App or its systems.</li>
              <li>Use automated tools (bots, scrapers) to access or collect data from the App.</li>
              <li>Distribute spam, malware, or any harmful content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Volunteer Responsibilities</h2>
            <p className="text-muted-foreground">
              Volunteers acknowledge that their interactions with senior residents carry a duty of care and respect. Volunteers agree to: (a) complete any required onboarding or safety training; (b) honor confirmed commitments and notify coordinators promptly of cancellations; (c) treat all seniors with dignity; and (d) comply with the policies of each senior center partner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Content Ownership</h2>
            <p className="text-muted-foreground">
              You retain ownership of content you submit to the App. By submitting content, you grant ElderConnect a non-exclusive, royalty-free, worldwide license to use, display, and distribute such content solely for operating and improving the platform. ElderConnect does not sell your content to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Disclaimers</h2>
            <p className="text-muted-foreground">
              The App is provided "as is" without warranties of any kind, express or implied. ElderConnect does not guarantee uninterrupted or error-free service. We are not responsible for the conduct of any user, volunteer, or senior center partner on or off the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, ElderConnect and its founders, officers, and volunteers shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the App, even if advised of the possibility of such damages. Our total liability shall not exceed $100.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate your account at any time for violations of these Terms or for any conduct we deem harmful to the community. You may delete your account at any time from within the App settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these Terms periodically. We will notify you of material changes via in-app notification or email. Continued use of the App after changes take effect constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by the laws of the State of California, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Los Angeles County, California.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">13. Contact Us</h2>
            <p className="text-muted-foreground">
              Questions about these Terms? Reach us at:<br />
              ElderConnect<br />
              Manhattan Beach, CA 90266<br />
              Email: legal@elderconnect.app
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
