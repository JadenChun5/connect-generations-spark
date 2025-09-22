import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Play, Users, MapPin, Clock, ArrowLeft, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Demo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [demoAccounts, setDemoAccounts] = useState<any[]>([]);

  const createDemoData = async () => {
    setLoading(true);
    
    try {
      const demoUsers = [
        {
          email: "sarah.johnson@demo.com",
          password: "demopass123",
          role: "teen_volunteer",
          first_name: "Sarah",
          last_name: "Johnson",
          grade_level: 16,
          school: "Lincoln High School"
        },
        {
          email: "marcus.chen@demo.com", 
          password: "demopass123",
          role: "teen_volunteer",
          first_name: "Marcus",
          last_name: "Chen",
          grade_level: 17,
          school: "Roosevelt Academy"
        },
        {
          email: "emma.rodriguez@demo.com",
          password: "demopass123", 
          role: "teen_volunteer",
          first_name: "Emma",
          last_name: "Rodriguez",
          grade_level: 15,
          school: "Washington Prep"
        },
        {
          email: "admin.sunset@demo.com",
          password: "demopass123",
          role: "senior_center_admin",
          first_name: "Linda",
          last_name: "Smith",
          center_name: "Sunset Gardens Senior Center"
        },
        {
          email: "admin.golden@demo.com",
          password: "demopass123",
          role: "senior_center_admin", 
          first_name: "Michael",
          last_name: "Johnson",
          center_name: "Golden Years Community"
        }
      ];

      const createdAccounts = [];

      for (const user of demoUsers) {
        const { data, error } = await supabase.auth.signUp({
          email: user.email,
          password: user.password,
          options: {
            data: {
              role: user.role,
              first_name: user.first_name,
              last_name: user.last_name,
              approval_status: 'approved',
              ...user
            }
          }
        });

        if (!error && data.user) {
          createdAccounts.push({
            ...user,
            id: data.user.id
          });
        }
      }

      setDemoAccounts(createdAccounts);
      
      toast({
        title: "Demo data created!",
        description: "You can now sign in with any demo account to explore the platform.",
      });

    } catch (error) {
      console.error('Error creating demo data:', error);
      toast({
        title: "Error",
        description: "Failed to create demo data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signInAs = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: "Sign in failed", 
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed in successfully!",
        description: "Redirecting to your dashboard..."
      });
      // Navigation will be handled by useAuth hook
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Try ElderConnect Demo
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore the platform with pre-populated demo data. See how teens connect with senior centers
            and how the volunteering process works from start to finish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>What's Included</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">5+ Demo teen volunteers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">4 Senior centers with locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">7+ Seniors with available time slots</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Pre-configured time slots & scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Messaging system demo</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Demo Workflow</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="text-xs">1</Badge>
                <span className="text-sm">Browse senior centers by location</span>
              </div>
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="text-xs">2</Badge>
                <span className="text-sm">View seniors and their available time slots</span>
              </div>
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="text-xs">3</Badge>
                <span className="text-sm">Request volunteer slots instantly</span>
              </div>
              <div className="flex items-start space-x-3">
                <Badge variant="outline" className="text-xs">4</Badge>
                <span className="text-sm">See admin notifications & approval process</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <Button 
            onClick={createDemoData} 
            disabled={loading}
            variant="hero"
            size="lg"
            className="mb-6"
          >
            {loading ? "Creating Demo Data..." : "Create Demo Data"}
          </Button>
          
          <p className="text-sm text-muted-foreground">
            This will create demo accounts and populate the database with sample data
          </p>
        </div>

        {demoAccounts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Demo Accounts Created</CardTitle>
              <CardDescription>
                Click on any account below to sign in and explore that user's perspective
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {demoAccounts.filter(account => account.role === 'teen_volunteer').map(account => (
                  <div key={account.email} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{account.first_name} {account.last_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Teen Volunteer • {account.school} • Grade {account.grade_level}
                      </p>
                      <p className="text-xs text-muted-foreground">{account.email}</p>
                    </div>
                    <Button 
                      variant="teen" 
                      size="sm"
                      onClick={() => signInAs(account.email, account.password)}
                    >
                      Sign In as {account.first_name}
                    </Button>
                  </div>
                ))}
                
                {demoAccounts.filter(account => account.role === 'senior_center_admin').map(account => (
                  <div key={account.email} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{account.first_name} {account.last_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Senior Center Admin • {account.center_name}
                      </p>
                      <p className="text-xs text-muted-foreground">{account.email}</p>
                    </div>
                    <Button 
                      variant="senior" 
                      size="sm"
                      onClick={() => signInAs(account.email, account.password)}
                    >
                      Sign In as {account.first_name}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-muted/30">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Ready to get started for real?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your actual account to start connecting teens with seniors in your community
            </p>
            <Button variant="outline" onClick={() => navigate('/signup')}>
              Create Real Account
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;