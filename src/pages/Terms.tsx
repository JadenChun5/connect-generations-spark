import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-2">Effective Date: April 27, 2026 | Version 1.0</p>
        <p className="text-muted-foreground italic text-sm mb-10">
          This policy is a working draft pending attorney review and may be updated.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By creating an account or using the ElderConnect mobile application ("ElderConnect," "the App," "we," "us"), you agree to these Terms of Service. If you are under 18, your parent or legal guardian must also review and consent to these Terms on your behalf, as described in Section 4.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. What ElderConnect Is</h2>
            <p className="text-muted-foreground">
              ElderConnect is a nonprofit platform connecting high school student volunteers with active, independent seniors at partner senior and community centers for supervised one-on-one and group visits. ElderConnect facilitates social connection and volunteer engagement. ElderConnect is NOT a nursing home, assisted living facility, home health agency, or medical/care service. ElderConnect does not provide, coordinate, or supervise medical or personal care of any kind. All visits take place at partner centers and are supervised by center staff.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Eligibility</h2>
            <p className="text-muted-foreground">
              Users under 14 years old may not create an account. Users 14–17 years old may register as a Volunteer or Community Ambassador with verified parental or guardian consent. Users 18 and older may register as a Volunteer, Community Ambassador, or Senior Center representative. Senior Center accounts must be created by an authorized staff member of a legitimate senior or community center organization. ElderConnect reserves the right to verify age and identity information and to deny or remove any account that does not meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Parental Consent for Minors</h2>
            <p className="text-muted-foreground">
              If you are between 14 and 17 years old, ElderConnect will request contact information for a parent or legal guardian during sign-up. Your account will remain in a pending state until your parent or guardian affirmatively consents through the process ElderConnect provides. A parent or guardian may withdraw consent at any time by contacting ElderConnect, which will result in deactivation of the minor's account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Roles on ElderConnect</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Volunteer</strong> — signs up to visit seniors at partner centers, either one-on-one (by request, subject to center confirmation) or through group activities.</li>
              <li><strong className="text-foreground">Community Ambassador</strong> — a Volunteer who also helps welcome and orient new volunteers in their community and monitors reported concerns; an Ambassador remains a Volunteer as well.</li>
              <li><strong className="text-foreground">Senior Center</strong> — a partner organization's staff account used to manage senior participants, confirm visit requests, and run supervised visit sessions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Account Responsibilities</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining accurate information on your account and for all activity that occurs under it. You may not create an account on behalf of someone else, or misrepresent your age, identity, or affiliation with a senior center. You must promptly report any concern about the safety or wellbeing of a volunteer or senior participant through the in-app concern reporting feature.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Conduct & Community Guidelines</h2>
            <p className="text-muted-foreground">
              Treat all seniors, volunteers, and staff with respect and courtesy. Do not share a senior participant's private information (beyond what they've chosen to share in their public profile) outside the App. Do not use ElderConnect to solicit, advertise, fundraise, or promote unrelated products, services, or causes. Do not attempt to arrange visits or contact with seniors outside of ElderConnect's supervised process. Senior Center staff, not volunteers or ambassadors, are responsible for starting and ending all visit sessions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Senior Center Partner Responsibilities</h2>
            <p className="text-muted-foreground">
              Senior Centers that partner with ElderConnect agree to the terms of a separate Partnership Agreement, which addresses supervision of visits, timely confirmation or decline of visit requests, accurate senior participant consent records, and compliance with applicable youth-protection laws where they apply to the center's own staff.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Content You Submit</h2>
            <p className="text-muted-foreground">
              Community Ambassadors and Senior Centers may post activities and updates visible to volunteers in their community. You retain ownership of content you submit, but grant ElderConnect a license to display it within the App for its intended purpose. ElderConnect may remove content that violates these Terms or the Community Guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Visit Verification & Hours</h2>
            <p className="text-muted-foreground">
              Visit hours are recorded by Senior Center staff when a session is started and ended in the App. If a volunteer believes recorded hours are inaccurate, they may dispute them through the in-app process, which routes to the relevant center or ambassador for resolution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Prohibited Uses</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Attempting to bypass age verification or parental consent requirements.</li>
              <li>Harassment, discrimination, or abusive behavior toward any user.</li>
              <li>Collecting or storing information about other users beyond what the App provides.</li>
              <li>Using the App for any unlawful purpose.</li>
              <li>Attempting to access another user's account or impersonate another person.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Disclaimers</h2>
            <p className="text-muted-foreground">
              ElderConnect is provided "as is." While ElderConnect facilitates connections between volunteers and senior centers, ElderConnect does not guarantee the conduct of any user, the outcome of any visit, or the availability of any specific volunteer or senior center.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">13. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, ElderConnect and its founders, officers, and volunteers are not liable for indirect, incidental, or consequential damages arising from use of the App. This section is pending attorney review and will be finalized based on ElderConnect's actual insurance coverage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">14. Termination</h2>
            <p className="text-muted-foreground">
              ElderConnect may suspend or terminate any account that violates these Terms, poses a safety concern, or for any other reason at ElderConnect's discretion. Users may deactivate their own account at any time through Settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">15. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by the laws of the State of California. Venue and dispute resolution provisions are pending attorney review.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">16. Changes to These Terms</h2>
            <p className="text-muted-foreground">
              ElderConnect may update these Terms from time to time. Material changes will be communicated in-app before taking effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">17. Contact</h2>
            <p className="text-muted-foreground">
              Questions about these Terms can be sent to <a href="mailto:admin@elderconnect.org" className="text-primary hover:underline">admin@elderconnect.org</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
