import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Camera, DollarSign, MessageCircle, Calendar, Activity, Gift } from "lucide-react";

const FamilyMemberDashboard = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    recentVisits: 0,
    totalDonations: 0,
    photoShares: 0,
    volunteerHours: 0
  });

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

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
        recentVisits: 0,
        totalDonations: 0,
        photoShares: 0,
        volunteerHours: 0
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
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
              <div className="bg-primary-soft p-2 rounded-lg">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Family Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {profile?.first_name || user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={profile?.approval_status === 'approved' ? 'default' : 'secondary'}>
                {profile?.approval_status === 'approved' ? 'Verified' : 'Pending Verification'}
              </Badge>
              <Button variant="outline" onClick={signOut}>
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
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.recentVisits}</p>
                  <p className="text-sm text-muted-foreground">Recent Visits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.volunteerHours}</p>
                  <p className="text-sm text-muted-foreground">Volunteer Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Camera className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.photoShares}</p>
                  <p className="text-sm text-muted-foreground">Photos Shared</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">${stats.totalDonations}</p>
                  <p className="text-sm text-muted-foreground">Total Donations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activity">Senior's Activity</TabsTrigger>
            <TabsTrigger value="photos">Photo Gallery</TabsTrigger>
            <TabsTrigger value="donations">Make Donations</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Senior's Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Stay updated on your senior family member's social engagement and volunteer interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No Recent Activity</p>
                  <p className="text-muted-foreground mb-6">
                    Activity updates will appear here once your senior starts participating in volunteer programs
                  </p>
                  <div className="p-4 bg-muted rounded-lg max-w-md mx-auto">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Your account is pending verification. 
                      Once verified, you'll see real-time updates about volunteer visits, 
                      activities, and social engagement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Photo Gallery</span>
                </CardTitle>
                <CardDescription>
                  View photos from volunteer visits and activities (with permission)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">Photo Sharing Coming Soon</p>
                  <p className="text-muted-foreground mb-6">
                    With proper consent, volunteers will be able to share photos from activities with family members
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Support the Program</span>
                </CardTitle>
                <CardDescription>
                  Make donations to support volunteer programs and reward outstanding volunteers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">Donation System Coming Soon</p>
                  <p className="text-muted-foreground mb-6">
                    Soon you'll be able to donate to the program and tip exceptional volunteers
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <Button variant="family" className="w-full" disabled>
                      <Gift className="h-4 w-4 mr-2" />
                      Donate to Program
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                      <Heart className="h-4 w-4 mr-2" />
                      Tip a Volunteer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Family Communication</span>
                </CardTitle>
                <CardDescription>
                  Communicate with senior center staff and volunteer coordinators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">Communication Hub Coming Soon</p>
                  <p className="text-muted-foreground mb-6">
                    A secure messaging system for communicating with center staff and coordinators
                  </p>
                  <div className="space-y-3 max-w-md mx-auto">
                    <Button variant="outline" className="w-full" disabled>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Center Staff
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                      Schedule Family Visit
                    </Button>
                    <Button variant="family" className="w-full" disabled>
                      Request Activity Updates
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

export default FamilyMemberDashboard;