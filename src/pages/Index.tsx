import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import seniorCentersPhoto from "@/assets/photos/senior-centers.webp.asset.json";

const steps = [
  { title: "Centers post group activities", text: "A senior center lists an activity it already runs, such as a game afternoon, a craft hour or a music session, and how many volunteers it can welcome." },
  { title: "Students sign up", text: "Students aged 13 and up browse upcoming activities and reserve a spot. They can cancel if plans change, and the center sees who is coming." },
  { title: "Staff lead the session", text: "Students show up, join in and follow staff direction. Center staff run the activity from start to finish." },
];
const studentBenefits = ["Browse activities at nearby senior centers", "Sign up, and cancel if something comes up", "Always a staff member leading, never one-on-one", "Under 18? You take part with a parent or guardian's permission"];
const safety = [
  { title: "Group activities only", text: "There are no one-on-one visits. Every activity is a group, in the center." },
  { title: "Staff run every session", text: "Center staff lead each activity and students follow their instructions." },
  { title: "Age 13 and up", text: "Students under 18 take part with a parent or guardian's permission." },
  { title: "You control your data", text: "We collect only what we need to run activities, and you can delete your account in the app." },
];
const questions = [
  { question: "Who can volunteer?", answer: "Students aged 13 and up. Students under 18 need a parent or guardian's permission." },
  { question: "Are volunteers ever alone with seniors?", answer: "No. ElderConnect supports group activities that center staff run. There are no one-on-one visits." },
  { question: "What does it cost?", answer: "Nothing for students or centers during the pilot." },
  { question: "Is ElderConnect a nonprofit?", answer: "We are a student-led project and our nonprofit registration is in progress." },
  { question: "Where is it available?", answer: "We are starting in the South Bay area of Los Angeles. Join the waitlist and tell us where you are." },
];

const BenefitList = ({ items }: { items: string[] }) => (
  <ul className="my-7 list-disc space-y-3 pl-6 text-muted-foreground marker:text-primary">
    {items.map(item => <li key={item} className="pl-1">{item}</li>)}
  </ul>
);

const Index = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      document.getElementById(id)?.scrollIntoView();
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="how" className="border-y border-border bg-card py-16 lg:py-20">
          <div className="site-container">
            <h2>How it works</h2>
            <p className="mt-4 text-muted-foreground">Three steps, and a staff member is in the room for all of them.</p>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl bg-background p-7 lg:p-8">
                  <span className="text-5xl font-bold leading-none text-primary">{index + 1}</span>
                  <h3 className="mb-4 mt-6 text-[22px]">{step.title}</h3>
                  <p className="text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section id="students" className="site-container py-16 lg:py-24">
          <div className="max-w-[760px]">
            <h2>For students</h2>
            <p className="mt-5 text-muted-foreground">Find a group activity near you, sign up in a minute, and spend an afternoon with people who are glad you came.</p>
            <BenefitList items={studentBenefits} />
            <Button asChild><a href="#join">Join the student waitlist</a></Button>
          </div>
        </section>
        <section id="centers" className="site-container grid items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-20 lg:pb-24">
          <div>
            <h2>For senior centers</h2>
            <p className="mt-5 text-muted-foreground">Keep running your activities the way you do now. ElderConnect gives you a steady group of students who sign up in advance, so you can plan.</p>
            <Button asChild className="mt-7"><Link to="/senior-centers">Talk to us about a pilot</Link></Button>
          </div>
          <figure className="min-w-0">
            <img src={seniorCentersPhoto.url} alt="A group of seniors in a chair exercise class." width={1600} height={1067} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <figcaption className="mt-2 text-sm text-muted-foreground">
              <a href="https://www.pexels.com/photo/seniors-exercising-11674389/" className="underline underline-offset-2">Photo: Centre for Ageing Better on Pexels</a>
            </figcaption>
          </figure>
        </section>
        <section id="safety" className="bg-band py-16 text-band-foreground lg:py-20">
          <div className="site-container">
            <h2>Built around supervision</h2>
            <div className="mt-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {safety.map(item => <div key={item.title}><h3 className="mb-4 text-[22px]">{item.title}</h3><p>{item.text}</p></div>)}
            </div>
          </div>
        </section>
        <section className="site-container grid gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div className="lg:py-8">
            <h2>Where we are</h2>
            <p className="mt-5 text-muted-foreground">ElderConnect is a new, student-led project preparing its first pilot in the South Bay. The app is in testing, and we are signing up our first senior center partners and student clubs.</p>
            <p className="mt-6 text-base text-muted-foreground">[ADD ONLY WHAT IS TRUE ON THE DAY: number of confirmed centers, clubs signed up, first session date.]</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-7 lg:p-10">
            <h2>Why I started this</h2>
            <p className="mt-5 text-muted-foreground">[2 to 3 sentences in Jaden's own words: what you saw at a senior center, and why a group format.]</p>
            <p className="mt-7 font-bold">Jaden Chun, founder</p>
          </div>
        </section>
        <section id="faq" className="border-y border-border bg-card py-16 lg:py-20">
          <div className="site-container max-w-[960px]">
            <h2>Questions</h2>
            <dl className="mt-8 divide-y divide-border">
              {questions.map(item => <div key={item.question} className="py-6"><dt className="text-[22px] font-bold leading-snug">{item.question}</dt><dd className="mt-3 text-muted-foreground">{item.answer}</dd></div>)}
            </dl>
          </div>
        </section>
        <section id="join" className="site-container py-16 lg:py-24">
          <div className="mx-auto max-w-[720px] rounded-[20px] bg-primary p-6 text-primary-foreground sm:p-10 lg:p-12">
            <h2>Join the waitlist</h2>
            <p className="mt-4">Tell us who you are and we will write when the first activities open.</p>
            <WaitlistForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
