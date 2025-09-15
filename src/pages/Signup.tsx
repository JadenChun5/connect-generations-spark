import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Shield, Building, Heart } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const signupOptions = [
    {
      id: 'teen-volunteer',
      title: 'Teen Volunteer',
      subtitle: 'High School Student',
      description: 'Earn volunteer hours while making a difference in seniors\' lives',
      icon: GraduationCap,
      color: 'bg-gradient-to-br from-blue-500/10 to-blue-600/10',
      iconColor: 'text-blue-600',
      path: '/register/teen-volunteer'
    },
    {
      id: 'teen-admin',
      title: 'Teen Admin',
      subtitle: 'School Administrator',
      description: 'Manage and coordinate teen volunteer programs at your school',
      icon: Shield,
      color: 'bg-gradient-to-br from-purple-500/10 to-purple-600/10',
      iconColor: 'text-purple-600',
      path: '/register/teen-admin'
    },
    {
      id: 'senior-center-admin',
      title: 'Senior Center Staff',
      subtitle: 'Facility Administrator',
      description: 'Connect your senior community with enthusiastic teen volunteers',
      icon: Building,
      color: 'bg-gradient-to-br from-green-500/10 to-green-600/10',
      iconColor: 'text-green-600',
      path: '/register/senior-center-admin'
    },
    {
      id: 'family-member',
      title: 'Family Member',
      subtitle: 'Senior\'s Family',
      description: 'Stay connected with your loved one\'s volunteer interactions',
      icon: Heart,
      color: 'bg-gradient-to-br from-rose-500/10 to-rose-600/10',
      iconColor: 'text-rose-600',
      path: '/register/family-member'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your Role
          </h1>
          <p className="text-xl text-muted-foreground">
            Select the option that best describes you to get started with ElderConnect
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {signupOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card key={option.id} className={`p-8 hover:shadow-lg transition-all duration-300 ${option.color} border-border/50`}>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/50 mb-4">
                    <IconComponent className={`h-8 w-8 ${option.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium mb-4">
                    {option.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {option.description}
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate(option.path)}
                >
                  Sign Up as {option.title}
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Already have an account?
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;