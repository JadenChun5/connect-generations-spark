import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Award, Shield, Clock, Heart, MapPin, Bell, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intuitive calendar system that makes booking volunteer visits effortless. Students can see available time slots and book visits in seconds.",
      benefits: ["Real-time availability", "Automatic confirmations", "Calendar sync", "Flexible rescheduling"]
    },
    {
      icon: Users,
      title: "Profile Management",
      description: "Comprehensive profiles for both volunteers and senior centers. Track hours, view history, and showcase accomplishments.",
      benefits: ["Hour tracking", "Visit history", "Achievement badges", "Skill verification"]
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Built with safety as a priority. Verified accounts, secure communications, and proper oversight for all interactions.",
      benefits: ["Account verification", "Secure messaging", "Parent notifications", "Background checks"]
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Stay informed with instant updates about bookings, confirmations, reminders, and messages.",
      benefits: ["Booking alerts", "Visit reminders", "Status updates", "Emergency notifications"]
    },
    {
      icon: Award,
      title: "Volunteer Tracking",
      description: "Automatic logging of volunteer hours with verification. Perfect for college applications and award programs.",
      benefits: ["Automatic hour logging", "Official verification", "Download certificates", "Share achievements"]
    },
    {
      icon: MapPin,
      title: "Location Matching",
      description: "Find volunteer opportunities near you. Our smart matching system connects students with nearby senior centers.",
      benefits: ["Distance-based search", "Map view", "Multiple locations", "Transit information"]
    },
    {
      icon: Heart,
      title: "Impact Metrics",
      description: "See the difference you're making. Track your impact with detailed statistics and heartwarming feedback.",
      benefits: ["Hours contributed", "Seniors helped", "Community impact", "Personal stories"]
    },
    {
      icon: CheckCircle2,
      title: "Requirements Management",
      description: "Senior centers can specify their needs and preferences. Students can see exactly what's expected before volunteering.",
      benefits: ["Custom requirements", "Skill matching", "Age preferences", "Special certifications"]
    },
    {
      icon: Clock,
      title: "Flexible Time Slots",
      description: "Senior centers set their own availability. Students choose times that work with their busy schedules.",
      benefits: ["Custom schedules", "Recurring visits", "One-time events", "Seasonal programs"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Powerful Features for Meaningful Connections
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Everything you need to organize, manage, and celebrate teen volunteer programs at senior centers.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/demo">
                <Button variant="hero" size="lg">
                  View Demo
                </Button>
              </Link>
              <Link to="/connect">
                <Button variant="outline" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-elegant transition-smooth">
                <div className="bg-gradient-hero p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-20">
          <Card className="p-12 text-center bg-gradient-subtle">
            <h2 className="text-3xl font-bold mb-4">Ready to See It in Action?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our interactive demo to experience how ElderConnect makes volunteer coordination seamless and rewarding.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/demo">
                <Button variant="hero" size="lg">
                  Explore Demo
                </Button>
              </Link>
              <Link to="/connect">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
