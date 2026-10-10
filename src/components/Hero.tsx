import { Button } from "@/components/ui/button";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

const Hero = () => (
  <section className="site-container grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:pb-20 lg:pt-16">
    <div>
      <p className="mb-5 text-sm font-bold uppercase tracking-[0.12em] text-primary">Starting in the South Bay</p>
      <h1 className="text-[38px] font-bold leading-[1.08] sm:text-5xl lg:text-[64px]">Group volunteering at senior centers, led by center staff.</h1>
      <p className="mt-7 text-muted-foreground">ElderConnect helps students sign up for supervised group activities at local senior centers. Staff run every session, so students always have someone to follow and seniors always have a familiar team.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button asChild><a href="#join">Join the waitlist</a></Button>
        <Button asChild variant="outline"><a href="#centers">I run a senior center</a></Button>
      </div>
      <p className="mt-6 max-w-xl text-base text-muted-foreground">Built by a student in the South Bay who wanted a simple, safe way for young people to spend time with their neighbors.</p>
    </div>
    <PhotoPlaceholder>[REAL PHOTO: a staff-led activity at a senior center, with permission]</PhotoPlaceholder>
  </section>
);

export default Hero;
