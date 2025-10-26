import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Users, 
  Heart, 
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Gift,
  BookOpen,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ValuePropositions = () => {
  const navigate = useNavigate();
  const benefits = [
    {
      category: "For Teen Volunteers",
      icon: Trophy,
      gradient: "gradient-warm",
      textColor: "text-secondary",
      benefits: [
        {
          icon: BookOpen,
          title: "College Application Hours",
          description: "Earn verified volunteer hours that make your college applications stand out with meaningful community service."
        },
        {
          icon: Gift, 
          title: "Local Business Rewards",
          description: "Get exclusive discounts and rewards from local partners for consistent volunteering and engagement."
        },
        {
          icon: Users,
          title: "Meaningful Connections",
          description: "Build real relationships with seniors who have incredible stories and wisdom to share."
        },
        {
          icon: Target,
          title: "Interest-Based Matching", 
          description: "Get matched with seniors who share your hobbies, interests, or career aspirations."
        }
      ]
    },
    {
      category: "For Senior Centers", 
      icon: Activity,
      gradient: "gradient-hero",
      textColor: "text-accent",
      benefits: [
        {
          icon: Sparkles,
          title: "Enhanced Resident Engagement",
          description: "Bring new energy to your community with enthusiastic young volunteers who care about making connections."
        },
        {
          icon: Users,
          title: "Reliable Volunteer Pool",
          description: "Access a consistent group of committed teen volunteers with structured scheduling and oversight."
        },
        {
          icon: CheckCircle,
          title: "Easy Program Management",
          description: "Streamlined tools for volunteer coordination, resident matching, and program success tracking."
        },
        {
          icon: Heart,
          title: "Community Impact",
          description: "Create lasting positive change in your community while addressing senior loneliness and isolation."
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Real Benefits for
            <span className="text-primary block mt-2">Everyone Involved</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ElderConnect isn't just volunteering—it's a platform that creates genuine value and meaningful impact 
            for teens, seniors, and entire communities.
          </p>
        </div>

        <div className="space-y-16">
          {benefits.map((section, sectionIdx) => {
            const SectionIcon = section.icon;
            
            return (
              <div key={sectionIdx}>
                {/* Section Header */}
                <div className="text-center mb-12">
                  <div className={`bg-${section.gradient} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-medium`}>
                    <SectionIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-semibold ${section.textColor} mb-2`}>
                    {section.category}
                  </h3>
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {section.benefits.map((benefit, idx) => {
                    const BenefitIcon = benefit.icon;
                    
                    return (
                      <Card 
                        key={idx}
                        className="group p-6 hover:shadow-strong transition-smooth cursor-pointer border-0 shadow-soft"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="bg-primary-soft p-3 rounded-lg mb-4 group-hover:scale-110 transition-bounce">
                            <BenefitIcon className="h-6 w-6 text-primary" />
                          </div>
                          
                          <h4 className="font-semibold text-foreground mb-3">
                            {benefit.title}
                          </h4>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats & CTA */}
        <div className="mt-20 text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Seniors report increased happiness</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">85%</div>
              <div className="text-muted-foreground">Teens continue volunteering long-term</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">200%</div>
              <div className="text-muted-foreground">Increase in center engagement</div>
            </div>
          </div>

          <div className="bg-gradient-subtle p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              See ElderConnect in Action
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore our interactive demo to see how we're connecting thousands of teens and seniors across communities.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="hero" size="xl" onClick={() => navigate('/demo')}>
                View Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="xl" onClick={() => navigate('/connect')}>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;