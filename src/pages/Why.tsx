import { Heart, Users, Brain, Sparkles, HandHeart, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Why = () => {
  const reasons = [
    {
      icon: Heart,
      title: "Loneliness Is an Epidemic",
      description:
        "Nearly 1 in 4 adults over 65 are considered socially isolated. Loneliness has health impacts comparable to smoking 15 cigarettes a day. No one should grow old feeling forgotten.",
    },
    {
      icon: Users,
      title: "Generations Are Drifting Apart",
      description:
        "Today's teens and seniors rarely cross paths in meaningful ways. We're losing the everyday wisdom, stories, and mentorship that used to flow naturally between generations.",
    },
    {
      icon: Brain,
      title: "Connection Improves Health",
      description:
        "Regular social interaction reduces the risk of dementia, depression, and heart disease in seniors—and gives students a sense of purpose that transforms how they see the world.",
    },
    {
      icon: HandHeart,
      title: "Volunteering Should Be Meaningful",
      description:
        "Students need volunteer hours, but they deserve more than busywork. Showing up for the same senior week after week creates real relationships, not just resume lines.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-soft/50 px-6 py-3 rounded-full mb-8">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">Why We Do This</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Because Every Generation
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Needs the Other</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              ElderConnect exists because we believe two of the most overlooked groups in our
              communities—seniors and high school students—are the answer to each other's biggest
              challenges.
            </p>
          </div>
        </section>

        {/* Reasons Grid */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {reasons.map((reason, idx) => (
                <Card key={idx} className="border-border/50 hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="bg-gradient-hero p-3 rounded-lg w-fit mb-5 shadow-soft">
                      <reason.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">{reason.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-16 px-6 lg:px-8 bg-card/50">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
            <p className="text-2xl lg:text-3xl font-medium text-foreground leading-relaxed mb-6">
              "We don't see seniors as people who need help. We see them as people with stories
              worth hearing—and students as the ones lucky enough to hear them."
            </p>
            <p className="text-muted-foreground">— The ElderConnect Team</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-8 bg-gradient-hero">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Be Part of the Reason
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Every visit, every conversation, every shared story is proof that we can rebuild the
              bridges between generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/connect">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Get Involved
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Learn About Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Why;
