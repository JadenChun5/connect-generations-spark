import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Play,
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Award,
  ArrowRight,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";

const DemoPreview = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Smart Matching",
      description: "AI-powered system matches teens with seniors based on shared interests, availability, and location",
      icon: Users,
      color: "primary"
    },
    {
      title: "Easy Scheduling", 
      description: "Intuitive calendar system for booking volunteer sessions that work for everyone",
      icon: Calendar,
      color: "secondary"
    },
    {
      title: "Hour Tracking",
      description: "Automatic verification and tracking of volunteer hours for college applications",
      icon: Clock,
      color: "accent"
    },
    {
      title: "Reward System",
      description: "Earn points and redeem rewards from local business partners for consistent volunteering",
      icon: Award,
      color: "lavender"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            See ElderConnect
            <span className="text-primary block mt-2">In Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Take a guided tour through the platform and discover how easy it is to create meaningful 
            connections between generations in your community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Demo Video/Preview */}
          <div className="relative">
            {/* Video Preview Card */}
            <Card className="relative overflow-hidden shadow-strong border-0 bg-gradient-hero">
              <div className="aspect-video bg-white/10 flex items-center justify-center relative">
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    variant="secondary" 
                    size="xl"
                    className="rounded-full w-20 h-20 shadow-strong hover:shadow-medium transition-bounce"
                  >
                    <Play className="h-8 w-8 fill-current ml-1" />
                  </Button>
                </div>

                {/* Mock UI Elements */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-soft">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-foreground">Sarah, 17</div>
                      <div className="text-xs text-muted-foreground">matched with Eleanor</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-soft">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium text-foreground">15.5 hours logged</span>
                  </div>
                </div>
              </div>

              {/* Device Frame Indicators */}
              <div className="absolute -top-2 -right-2 flex gap-1">
                <div className="bg-white/20 p-2 rounded-full">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <Tablet className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <Monitor className="h-4 w-4 text-white" />
                </div>
              </div>
            </Card>

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-strong border">
              <div className="flex items-center gap-3">
                <div className="bg-secondary-soft p-2 rounded-lg">
                  <Star className="h-5 w-5 text-secondary fill-current" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">4.9/5 Rating</div>
                  <div className="text-xs text-muted-foreground">from 500+ users</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature List */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                Platform Highlights
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our comprehensive platform makes it simple for all stakeholders to participate 
                in meaningful intergenerational volunteering.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, idx) => {
                const FeatureIcon = feature.icon;
                
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={`bg-${feature.color}-soft p-3 rounded-lg shrink-0`}>
                      <FeatureIcon className={`h-5 w-5 text-${feature.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="lg" onClick={() => navigate('/demo')}>
                <Play className="h-5 w-5 mr-2" />
                Watch Full Demo
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/demo')}>
                Try Interactive Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Trusted by leading organizations</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="bg-muted rounded-lg px-6 py-3 text-sm font-medium">
              Local School Districts
            </div>
            <div className="bg-muted rounded-lg px-6 py-3 text-sm font-medium">
              Senior Living Communities
            </div>
            <div className="bg-muted rounded-lg px-6 py-3 text-sm font-medium">
              Community Centers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoPreview;