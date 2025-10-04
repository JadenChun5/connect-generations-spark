import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Play, Users, MapPin, Clock, ArrowLeft, CheckCircle, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Demo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [demoAccounts, setDemoAccounts] = useState<any[]>([]);
  const [timeSlotsCreated, setTimeSlotsCreated] = useState(0);
  const [seniorsCount, setSeniorsCount] = useState(0);

  const createDemoData = async () => {
    setLoading(true);
    
    try {
      // Demo users with corrected dashboard paths
      const demoUsers = [
        {
          email: "sarah.johnson@demo.com",
          password: "demo123",
          role: "teen_volunteer",
          first_name: "Sarah",
          last_name: "Johnson",
          grade_level: 16,
          school: "Lincoln High School",
          dashboard: "/dashboard/student"
        },
        {
          email: "marcus.chen@demo.com",
          password: "demo123",
          role: "teen_volunteer",
          first_name: "Marcus",
          last_name: "Chen",
          grade_level: 17,
          school: "Roosevelt Academy",
          dashboard: "/dashboard/student"
        },
        {
          email: "emma.rodriguez@demo.com",
          password: "demo123",
          role: "teen_volunteer",
          first_name: "Emma",
          last_name: "Rodriguez",
          grade_level: 15,
          school: "Washington Prep",
          dashboard: "/dashboard/student"
        },
        {
          email: "admin.sunset@demo.com",
          password: "demo123",
          role: "senior_center_admin",
          first_name: "Linda",
          last_name: "Smith",
          center_name: "Sunset Gardens Senior Center",
          dashboard: "/dashboard/staff"
        },
        {
          email: "admin.golden@demo.com",
          password: "demo123",
          role: "senior_center_admin", 
          first_name: "Michael",
          last_name: "Johnson",
          center_name: "Golden Years Community",
          dashboard: "/dashboard/staff"
        }
      ];

      // Fetch all seniors from the database
      const { data: seniors, error: seniorsError } = await supabase
        .from('seniors')
        .select('id');

      if (seniorsError) throw seniorsError;

      if (seniors && seniors.length > 0) {
        // Create varied time slots for each senior
        const timeSlotTemplates = [
          { day: 1, start: '09:00', end: '11:00' }, // Monday morning
          { day: 1, start: '14:00', end: '16:00' }, // Monday afternoon
          { day: 2, start: '10:00', end: '12:00' }, // Tuesday morning
          { day: 2, start: '15:00', end: '17:00' }, // Tuesday afternoon
          { day: 3, start: '09:00', end: '11:00' }, // Wednesday morning
          { day: 3, start: '13:00', end: '15:00' }, // Wednesday afternoon
          { day: 4, start: '10:00', end: '12:00' }, // Thursday morning
          { day: 4, start: '16:00', end: '18:00' }, // Thursday evening
          { day: 5, start: '09:00', end: '11:00' }, // Friday morning
          { day: 5, start: '14:00', end: '16:00' }, // Friday afternoon
        ];

        const timeSlotsToInsert = [];
        
        // Create 3-4 varied time slots per senior
        for (const senior of seniors) {
          const numSlots = 3 + Math.floor(Math.random() * 2); // 3 or 4 slots
          const shuffled = [...timeSlotTemplates].sort(() => Math.random() - 0.5);
          
          for (let i = 0; i < numSlots; i++) {
            const template = shuffled[i];
            timeSlotsToInsert.push({
              senior_id: senior.id,
              day_of_week: template.day,
              start_time: template.start,
              end_time: template.end,
              is_available: true
            });
          }
        }

        // Insert all time slots
        const { error: insertError } = await supabase
          .from('senior_time_slots')
          .insert(timeSlotsToInsert);

        if (insertError) throw insertError;

        setTimeSlotsCreated(timeSlotsToInsert.length);
        setSeniorsCount(seniors.length);
      }

      setDemoAccounts(demoUsers);
      
      toast({
        title: "Demo data created!",
        description: `Created ${timeSlotsCreated} time slots across ${seniorsCount} seniors. Login to explore!`,
      });

    } catch (error) {
      console.error('Error setting up demo:', error);
      toast({
        title: "Error",
        description: "Failed to set up demo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loginDemoAccount = async (email: string, password: string, dashboardPath: string, firstName: string) => {
    setLoading(true);
    try {
      // Sign in with demo account
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: `Signed in as ${firstName}!`,
        description: "Redirecting to dashboard...",
      });

      // Navigate to dashboard after successful login
      setTimeout(() => {
        navigate(dashboardPath);
      }, 1000);

    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
                <span className="text-sm">
                  {timeSlotsCreated > 0 
                    ? `${seniorsCount} Seniors with ${timeSlotsCreated} time slots`
                    : '7+ Seniors with available time slots'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-sm">Morning, afternoon & evening availability</span>
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
                      onClick={() => loginDemoAccount(account.email, account.password, account.dashboard, account.first_name)}
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : `View as ${account.first_name}`}
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
                      onClick={() => loginDemoAccount(account.email, account.password, account.dashboard, account.first_name)}
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : `View as ${account.first_name}`}
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
            <Button variant="outline" onClick={() => window.location.href = '/#user-type-selection'}>
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;