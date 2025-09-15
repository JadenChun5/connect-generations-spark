import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, UserCheck, AlertTriangle, BarChart3, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PendingVolunteer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  grade_level?: number;
  created_at: string;
}

interface ActiveMatch {
  id: string;
  status: string;
  volunteer_name?: string;
  senior_name?: string;
  scheduled_date?: string;
}

const TeenAdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [pendingVolunteers, setPendingVolunteers] = useState<PendingVolunteer[]>([]);
  const [activeMatches, setActiveMatches] = useState<ActiveMatch[]>([]);
  const [stats, setStats] = useState({
    totalVolunteers: 0,
    pendingApprovals: 0,
    activeMatches: 0,
    completedHours: 0
  });

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch admin profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        
        if (!profileData || profileData.role !== 'teen_admin') {
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges.",
            variant: "destructive"
          });
          return;
        }
      }

      // Fetch admin's teen admin record to get school
      const { data: adminData } = await supabase
        .from('teen_admins')
        .select('*, schools(name)')
        .eq('profile_id', profileData?.id)
        .single();

      if (!adminData?.verified) {
        toast({
          title: "Account Verification Pending",
          description: "Your admin account is awaiting verification.",
        });
      }

      // Fetch pending volunteers from the same school
      const { data: pendingData } = await supabase
        .from('profiles')
        .select(`
          *,
          teen_volunteers!inner(*)
        `)
        .eq('approval_status', 'pending')
        .eq('role', 'teen_volunteer');

      if (pendingData) {
        setPendingVolunteers(pendingData);
      }

      // Fetch active matches
      const { data: matchesData } = await supabase
        .from('matches')
        .select(`
          *,
          teen_volunteers!inner(
            profile_id,
            profiles(first_name, last_name)
          ),
          seniors(first_name, last_name),
          volunteer_slots(scheduled_date)
        `)
        .in('status', ['scheduled', 'checked_in']);

      if (matchesData) {
        const formattedMatches = matchesData.map(match => ({
          ...match,
          volunteer_name: `${(match as any).teen_volunteers?.profiles?.first_name} ${(match as any).teen_volunteers?.profiles?.last_name}`,
          senior_name: `${(match as any).seniors?.first_name} ${(match as any).seniors?.last_name}`,
          scheduled_date: (match as any).volunteer_slots?.scheduled_date
        }));
        setActiveMatches(formattedMatches);
      }

      // Calculate stats
      setStats({
        totalVolunteers: pendingData?.length || 0,
        pendingApprovals: pendingData?.filter(p => p.approval_status === 'pending').length || 0,
        activeMatches: matchesData?.length || 0,
        completedHours: 0 // Would calculate from completed matches
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveVolunteer = async (profileId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          approval_status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', profileId);

      if (error) throw error;

      toast({
        title: "Volunteer Approved",
        description: "The volunteer has been approved and can now sign up for slots.",
      });

      fetchUserData(); // Refresh data
    } catch (error) {
      toast({
        title: "Approval Failed",
        description: "Failed to approve volunteer. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRejectVolunteer = async (profileId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          approval_status: 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', profileId);

      if (error) throw error;

      toast({
        title: "Volunteer Rejected",
        description: "The volunteer application has been rejected.",
      });

      fetchUserData(); // Refresh data
    } catch (error) {
      toast({
        title: "Rejection Failed",
        description: "Failed to reject volunteer. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lavender mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading admin dashboard...</p>
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
              <div className="bg-lavender-soft p-2 rounded-lg">
                <Shield className="h-6 w-6 text-lavender" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Teen Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {profile?.first_name || user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={profile?.approval_status === 'approved' ? 'default' : 'secondary'}>
                {profile?.approval_status === 'approved' ? 'Verified Admin' : 'Pending Verification'}
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
                <Users className="h-8 w-8 text-lavender" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalVolunteers}</p>
                  <p className="text-sm text-muted-foreground">Total Volunteers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <UserCheck className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingApprovals}</p>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.activeMatches}</p>
                  <p className="text-sm text-muted-foreground">Active Matches</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.completedHours}</p>
                  <p className="text-sm text-muted-foreground">Completed Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="approvals">Volunteer Approvals</TabsTrigger>
            <TabsTrigger value="matches">Manage Matches</TabsTrigger>
            <TabsTrigger value="reports">School Reports</TabsTrigger>
            <TabsTrigger value="issues">Handle Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5" />
                  <span>Pending Volunteer Approvals</span>
                </CardTitle>
                <CardDescription>
                  Review and approve teen volunteer applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingVolunteers.length > 0 ? (
                  <div className="space-y-4">
                    {pendingVolunteers.map(volunteer => (
                      <div key={volunteer.id} className="border rounded-lg p-4 hover:shadow-medium transition-smooth">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">
                              {volunteer.first_name} {volunteer.last_name}
                            </h4>
                            <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <span>📚 Grade {volunteer.grade_level}</span>
                              <span>📅 Applied {new Date(volunteer.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleApproveVolunteer(volunteer.id)}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRejectVolunteer(volunteer.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No pending volunteer applications at this time.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Active Volunteer Matches</CardTitle>
                <CardDescription>Monitor and manage active volunteer-senior matches</CardDescription>
              </CardHeader>
              <CardContent>
                {activeMatches.length > 0 ? (
                  <div className="space-y-4">
                    {activeMatches.map(match => (
                      <div key={match.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {match.volunteer_name} ↔ {match.senior_name}
                            </h4>
                            <div className="flex items-center space-x-4 mt-2 text-sm">
                              <Badge variant={
                                match.status === 'checked_in' ? 'default' : 'outline'
                              }>
                                {match.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                              <span className="text-muted-foreground">📅 {match.scheduled_date}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No active matches to monitor.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>School Reports & Analytics</span>
                </CardTitle>
                <CardDescription>View volunteer program performance and impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Detailed reporting dashboard coming soon!</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Track volunteer hours, engagement metrics, and program impact
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Safety Issues & Reports</span>
                </CardTitle>
                <CardDescription>Handle incident reports and safety concerns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No safety issues reported</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Incident reporting system coming soon
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

export default TeenAdminDashboard;