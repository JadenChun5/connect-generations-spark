import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users2, Calendar, UserPlus, Settings, BarChart3, QrCode } from "lucide-react";

const SeniorCenterAdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalSeniors: 0,
    activeSlots: 0,
    scheduledVisits: 0,
    completedVisits: 0
  });

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    // Demo mode: when no authenticated user, show sample data and stop loading
    if (!user) {
      const demoProfile = {
        id: 'demo-admin-profile-id',
        user_id: 'demo-user-id',
        first_name: 'Michael',
        last_name: 'Demo',
        role: 'senior_center_admin',
        email: 'michael.demo@demo.com'
      };

      setProfile(demoProfile);
      setStats({
        totalSeniors: 12,
        activeSlots: 4,
        scheduledVisits: 2,
        completedVisits: 18
      });
      setLoading(false);
      return;
    }

    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // In a real implementation, fetch actual data
      setStats({
        totalSeniors: 0,
        activeSlots: 0,
        scheduledVisits: 0,
        completedVisits: 0
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (user) {
      await signOut();
    }
    window.location.href = '/demo';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
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
              <div className="bg-accent-soft p-2 rounded-lg">
                <Users2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Senior Center Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {profile?.first_name || user?.email || 'Demo Admin'}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users2 className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalSeniors}</p>
                  <p className="text-sm text-muted-foreground">Registered Seniors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.activeSlots}</p>
                  <p className="text-sm text-muted-foreground">Active Slots</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <QrCode className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.scheduledVisits}</p>
                  <p className="text-sm text-muted-foreground">Scheduled Visits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.completedVisits}</p>
                  <p className="text-sm text-muted-foreground">Completed Visits</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="seniors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="seniors">Manage Seniors</TabsTrigger>
            <TabsTrigger value="slots">Volunteer Slots</TabsTrigger>
            <TabsTrigger value="visits">Manage Visits</TabsTrigger>
            <TabsTrigger value="checkin">Check-in System</TabsTrigger>
          </TabsList>

          <TabsContent value="seniors">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Senior Residents</span>
                  </div>
                  <Button variant="senior">Add New Senior</Button>
                </CardTitle>
                <CardDescription>
                  Manage senior resident profiles and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <UserPlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No Seniors Added Yet</p>
                  <p className="text-muted-foreground mb-6">
                    Start by adding senior resident profiles to enable volunteer matching
                  </p>
                  <Button variant="senior" size="lg">
                    Add First Senior Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="slots">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Volunteer Slots</span>
                  </div>
                  <Button variant="senior">Create New Slot</Button>
                </CardTitle>
                <CardDescription>
                  Create and manage volunteer time slots for teen volunteers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No Volunteer Slots Created</p>
                  <p className="text-muted-foreground mb-6">
                    Create time slots for volunteers to schedule visits with your residents
                  </p>
                  <Button variant="senior" size="lg">
                    Create First Slot
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visits">
            <Card>
              <CardHeader>
                <CardTitle>Manage Visits</CardTitle>
                <CardDescription>
                  Overview of scheduled and ongoing volunteer visits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No Scheduled Visits</p>
                  <p className="text-muted-foreground">
                    Visits will appear here once volunteers sign up for your time slots
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checkin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5" />
                  <span>Check-in System</span>
                </CardTitle>
                <CardDescription>
                  Mobile-friendly check-in system for volunteer visits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">Digital Check-in System</p>
                  <p className="text-muted-foreground mb-6">
                    QR code and mobile check-in system coming soon
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="lg" className="w-full max-w-md">
                      Generate Check-in QR Code
                    </Button>
                    <Button variant="senior" size="lg" className="w-full max-w-md">
                      Manual Check-in
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SeniorCenterAdminDashboard;