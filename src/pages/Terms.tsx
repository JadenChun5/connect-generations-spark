import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CONTACT_EMAIL = "admin@elderconnect.org";

const EmailLink = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
    {CONTACT_EMAIL}
  </a>
);

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-2">Last updated: October 9, 2026</p>
        <p className="text-muted-foreground italic text-sm mb-10">
          These terms are a working draft pending attorney review and may be updated.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By creating an account or using the ElderConnect app ("ElderConnect," "the App," "we," "us"),
              you agree to these Terms of Service. If you are under 18, your parent or legal guardian must
              also review and agree to these Terms on your behalf, as described in Section 3.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. What ElderConnect Is</h2>
            <p className="text-muted-foreground">
              ElderConnect is a nonprofit app where student volunteers sign up for supervised group
              activities at senior centers. Senior center staff run every session, and volunteers are never
              alone with seniors. ElderConnect does not arrange one-on-one visits, does not match individual
              seniors with volunteers, and does not arrange home visits. ElderConnect is not a nursing home,
              assisted living facility, home health agency, or medical or care service, and does not
              provide, coordinate, or supervise medical or personal care of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Eligibility</h2>
            <p className="text-muted-foreground">
              You must be at least 13 years old to create an account. If you are under 18, you confirm that
              your parent or legal guardian has reviewed and agreed to these Terms and consents to your
              participation in supervised activities. We may suspend or delete accounts that violate these
              age requirements. Senior center accounts must be created by an authorized staff member of a
              legitimate senior or community center organization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Supervised Activities</h2>
            <p className="text-muted-foreground">
              All activities on ElderConnect are supervised by senior center staff. Volunteers must follow
              staff instructions at all times. ElderConnect connects volunteers with senior centers and does
              not directly supervise activities; the senior center is responsible for running and supervising
              each session.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Account Responsibility</h2>
            <p className="text-muted-foreground">
              You are responsible for keeping your account information accurate and for what happens under
              your account. Do not create an account for someone else, and do not misrepresent your age,
              identity, or connection to a senior center. Please tell us promptly if you believe your account
              has been used without your permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Acceptable Conduct</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Treat seniors, volunteers, and staff with respect and courtesy.</li>
              <li>Follow the instructions of senior center staff during activities.</li>
              <li>Do not share a senior's private information outside the app.</li>
              <li>Do not try to arrange contact with a senior outside the app's supervised activities.</li>
              <li>Do not use ElderConnect to solicit, advertise, fundraise, or promote unrelated products, services, or causes.</li>
              <li>Do not harass, discriminate against, or abuse any user.</li>
              <li>Do not try to get around the age or parental permission requirements.</li>
              <li>Do not collect or store information about other users beyond what the app provides.</li>
              <li>Do not use the app for any unlawful purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Reporting Concerns</h2>
            <p className="text-muted-foreground">
              If you have a concern about the safety or wellbeing of a volunteer or a senior, report it
              through the in-app concern reporting feature so it can reach the right senior center staff or
              ElderConnect team member. If someone needs immediate help, contact local emergency services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Activity Records and Volunteer Hours</h2>
            <p className="text-muted-foreground">
              Attendance and volunteer hours for the activities you take part in are recorded by senior
              center staff. If you believe a record is inaccurate, you can dispute it through the in-app
              process, which routes to the relevant senior center for resolution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Content You Submit</h2>
            <p className="text-muted-foreground">
              Senior centers and ElderConnect team members may post activities and updates visible to
              volunteers. You keep ownership of content you submit, but you give ElderConnect permission to
              display it in the app for its intended purpose. ElderConnect may remove content that violates
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Account Suspension and Termination</h2>
            <p className="text-muted-foreground">
              ElderConnect may suspend or delete any account that violates these Terms, poses a safety
              concern, does not meet the age requirements in Section 3, or for any other reason at
              ElderConnect's discretion. You can delete your own account at any time through Settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Disclaimers</h2>
            <p className="text-muted-foreground">
              ElderConnect is provided "as is." While ElderConnect connects volunteers with senior centers,
              we do not guarantee the conduct of any user, the outcome of any activity, or the availability
              of any specific senior center or activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, ElderConnect and its founders, officers, and volunteers
              are not liable for indirect, incidental, or consequential damages arising from use of the app.
              This section is pending attorney review and will be finalized based on ElderConnect's actual
              insurance coverage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">13. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by the laws of the State of California. Venue and dispute resolution
              provisions are pending attorney review.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">14. Changes to These Terms</h2>
            <p className="text-muted-foreground">
              ElderConnect may update these Terms from time to time. Material changes will be explained in
              the app before they take effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">15. Contact</h2>
            <p className="text-muted-foreground">
              Questions about these Terms can be sent to <EmailLink />.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
