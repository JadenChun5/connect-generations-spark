import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Users2, 
  Shield, 
  Heart,
  ArrowRight,
  Star,
  Award,
  Clock,
  UserCheck
} from "lucide-react";

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const handleUserTypeSelect = (userType: string) => {
    navigate(`/register/${userType}`);
  };

  const userTypes = [
    {
      id: "teen-volunteer",
      title: "High School Students",
      subtitle: "Earn Hours & Build Connections",
      description: "Get college application-worthy volunteer hours while forming meaningful relationships with seniors in your community.",
      icon: GraduationCap,
      color: "secondary",
      features: [
        "College application hours",
        "Local business rewards", 
        "Flexible scheduling",
        "Interest-based matching"
      ],
      cta: "Start Volunteering"
    },
    {
      id: "senior-center-admin",
      title: "Senior Center Staff",
      subtitle: "Coordinate & Manage Programs",
      description: "Efficiently manage volunteer programs with tools for scheduling, resident matching, and program oversight.",
      icon: Users2,
      color: "accent", 
      features: [
        "Volunteer scheduling tools",
        "Resident management", 
        "Check-in systems",
        "Program analytics"
      ],
      cta: "Manage Program"
    },
    {
      id: "teen-admin",
      title: "Teen Supervisors",
      subtitle: "Oversee & Ensure Safety",
      description: "Supervise teen volunteers with comprehensive oversight tools, approval workflows, and safety monitoring.",
      icon: Shield,
      color: "lavender",
      features: [
        "Approval workflows",
        "Safety monitoring",
        "Program oversight", 
        "School integration"
      ],
      cta: "Supervise Teams"
    },
    {
      id: "family-member",
      title: "Family Members", 
      subtitle: "Stay Connected & Support",
      description: "Monitor your senior family member's social engagement and support the programs that bring them joy.",
      icon: Heart,
      color: "primary",
      features: [
        "Activity updates",
        "Photo sharing",
        "Donation options",
        "Family communication"
      ],
      cta: "Support Family"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Choose Your Path to 
            <span className="text-primary block mt-2">Making a Difference</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ElderConnect brings together four different communities to create meaningful intergenerational connections. 
            Select your role to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {userTypes.map((type, index) => {
            const IconComponent = type.icon;
            
            return (
              <Card 
                key={type.id}
                className={`group relative p-8 border-2 border-transparent hover:border-${type.color} transition-smooth hover:shadow-strong cursor-pointer transform hover:scale-105`}
              >
                {/* Icon Header */}
                <div className={`bg-${type.color}-soft p-4 rounded-xl mb-6 w-fit`}>
                  <IconComponent className={`h-8 w-8 text-${type.color}`} />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {type.title}
                  </h3>
                  <p className={`text-sm font-medium text-${type.color} mb-3`}>
                    {type.subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-8">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 text-secondary fill-current" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  variant={
                    type.id === "teen-volunteer" ? "teen" :
                    type.id === "senior-center-admin" ? "senior" :
                    type.id === "teen-admin" ? "admin" :
                    "family"
                  }
                  className="w-full group-hover:shadow-medium"
                  onClick={() => handleUserTypeSelect(type.id)}
                >
                  {type.cta}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-smooth" />
                </Button>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Not sure which path is right for you?
          </p>
          <Button variant="outline" size="lg">
            <UserCheck className="h-5 w-5 mr-2" />
            Take Our Quick Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelection;