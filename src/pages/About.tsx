import { Heart, Users, Shield, Target, Award, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Every interaction is built on genuine care and respect for our seniors and volunteers."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Comprehensive background checks and safety protocols protect all participants."
    },
    {
      icon: Target,
      title: "Meaningful Impact",
      description: "Focused on creating lasting connections that benefit both generations."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building stronger communities through intergenerational relationships."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-soft/50 px-6 py-3 rounded-full mb-8">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">About ElderConnect</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Bridging Generations Through
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Technology</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            ElderConnect is more than a platform—it's a movement to combat social isolation among seniors 
            while empowering teens to make a meaningful difference in their communities.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            We believe that every senior deserves companionship and every teen deserves the opportunity 
            to contribute meaningfully to society. Our platform creates safe, supervised connections 
            that enrich lives across generations.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Through technology, we're solving the loneliness epidemic while building stronger, 
            more connected communities.
          </p>
          <Link to="/">
            <Button 
              variant="hero" 
              size="lg"
            >
              Join Our Mission
            </Button>
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="bg-gradient-hero p-3 rounded-lg w-fit mx-auto shadow-soft">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Jaden, Founder
            </h2>
          </div>
          
          <Card className="bg-gradient-warm/10 border-secondary/20">
            <CardContent className="p-8 lg:p-12">
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  I am a high school junior who believes that technology should connect us, not isolate us. I founded ElderConnect after seeing two problems could solve each other. Seniors struggling with loneliness and students searching for meaningful volunteer work.
                </p>
                <p>
                  ElderConnect was started with a simple idea: what if we made it easy for high school students to show up consistently with seniors in our communities? An idea born from lines of code is now a full-fledged platform that connects volunteers with local senior centers throughout the South Bay, because everyone deserves companionship, and every generation has something to teach the next.
                </p>
                <p>
                  Each conversation between a student and a senior is a shared story, a lesson learned, and a reminder that we're not alone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of others who are building stronger communities through 
            intergenerational connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
              >
                Get Started Today
              </Button>
            </Link>
            <Link to="/connect">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                Contact Us
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

export default About;