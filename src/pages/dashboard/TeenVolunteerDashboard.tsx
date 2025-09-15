import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Clock, Star, Award, Calendar, Users, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VolunteerSlot {
  id: string;
  title: string;
  description: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  senior_center_name?: string;
}

interface Match {
  id: string;
  status: string;
  senior_name?: string;
  slot_title?: string;
  scheduled_date?: string;
  hours_logged?: number;
  points_awarded?: number;
}

const TeenVolunteerDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<VolunteerSlot[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        
        if (profileData.approval_status !== 'approved') {
          toast({
            title: "Approval Pending",
            description: "Your account is awaiting admin approval before you can start volunteering.",
          });
        }
      }

      // Fetch available volunteer slots
      const { data: slotsData } = await supabase
        .from('volunteer_slots')
        .select(`
          *,
          senior_centers (name)
        `)
        .gte('scheduled_date', new Date().toISOString().split('T')[0])
        .limit(10);

      if (slotsData) {
        const formattedSlots = slotsData.map(slot => ({
          ...slot,
          senior_center_name: (slot as any).senior_centers?.name
        }));
        setAvailableSlots(formattedSlots);
      }

      // Fetch user's matches
      const { data: matchesData } = await supabase
        .from('matches')
        .select(`
          *,
          seniors (first_name, last_name),
          volunteer_slots (title, scheduled_date)
        `)
        .eq('teen_volunteer_id', profileData?.id || '');

      if (matchesData) {
        const formattedMatches = matchesData.map(match => ({
          ...match,
          senior_name: `${(match as any).seniors?.first_name} ${(match as any).seniors?.last_name}`,
          slot_title: (match as any).volunteer_slots?.title,
          scheduled_date: (match as any).volunteer_slots?.scheduled_date
        }));
        setMatches(formattedMatches);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background shadow-soft border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-secondary-soft p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Teen Volunteer Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {profile?.first_name || user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={profile?.approval_status === 'approved' ? 'default' : 'secondary'}>
                {profile?.approval_status === 'approved' ? 'Approved' : 'Pending Approval'}
              </Badge>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {matches.reduce((total, match) => total + (match.hours_logged || 0), 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Star className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{profile?.points || 0}</p>
                  <p className="text-sm text-muted-foreground">Points Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{matches.length}</p>
                  <p className="text-sm text-muted-foreground">Seniors Met</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {matches.filter(m => m.status === 'completed').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Visits Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="slots" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="slots">Available Slots</TabsTrigger>
            <TabsTrigger value="matches">My Matches</TabsTrigger>
            <TabsTrigger value="hours">Volunteer Hours</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="slots">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Available Volunteer Opportunities</span>
                </CardTitle>
                <CardDescription>
                  {profile?.approval_status === 'approved' 
                    ? "Sign up for volunteer slots that match your interests"
                    : "You'll be able to sign up for slots once your account is approved"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {availableSlots.length > 0 ? (
                  <div className="space-y-4">
                    {availableSlots.map(slot => (
                      <div key={slot.id} className="border rounded-lg p-4 hover:shadow-medium transition-smooth">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{slot.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{slot.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <span>📅 {slot.scheduled_date}</span>
                              <span>🕒 {slot.start_time} - {slot.end_time}</span>
                              <span>🏢 {slot.senior_center_name}</span>
                            </div>
                          </div>
                          <Button 
                            variant="teen" 
                            size="sm"
                            disabled={profile?.approval_status !== 'approved'}
                          >
                            Sign Up
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No volunteer slots available at this time. Check back soon!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>My Volunteer Matches</CardTitle>
                <CardDescription>Your scheduled and completed volunteer sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {matches.length > 0 ? (
                  <div className="space-y-4">
                    {matches.map(match => (
                      <div key={match.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{match.slot_title}</h4>
                            <p className="text-sm text-muted-foreground">With {match.senior_name}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm">
                              <Badge variant={
                                match.status === 'completed' ? 'default' :
                                match.status === 'checked_in' ? 'secondary' : 'outline'
                              }>
                                {match.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                              <span className="text-muted-foreground">📅 {match.scheduled_date}</span>
                            </div>
                          </div>
                          {match.status === 'completed' && (
                            <div className="text-right">
                              <p className="text-sm font-medium">⏱️ {match.hours_logged}h</p>
                              <p className="text-sm text-secondary">⭐ +{match.points_awarded} pts</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No matches yet. Sign up for volunteer slots to get started!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Volunteer Hours Log</span>
                </CardTitle>
                <CardDescription>Track your volunteer hours for college applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Detailed hours tracking coming soon!</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Current total: {matches.reduce((total, match) => total + (match.hours_logged || 0), 0)} hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Rewards & Recognition</span>
                </CardTitle>
                <CardDescription>Redeem your points for local business rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">Current Balance: {profile?.points || 0} Points</p>
                  <p className="text-muted-foreground">Rewards catalog coming soon!</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Partner with local businesses to offer gift cards and experiences
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeenVolunteerDashboard;