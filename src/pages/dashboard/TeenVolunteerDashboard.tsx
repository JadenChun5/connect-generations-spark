import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, User, Users, Award, Heart, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SeniorCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  full_address: string;
}

interface Senior {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  bio: string;
  senior_center_id: string;
}

interface TimeSlot {
  id: string;
  senior_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface VolunteerRequest {
  id: string;
  seniors?: Senior;
  senior_centers?: SeniorCenter;
  requested_date: string;
  requested_start_time: string;
  requested_end_time: string;
  status: string;
  created_at: string;
}

const TeenVolunteerDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [teenVolunteer, setTeenVolunteer] = useState<any>(null);
  const [seniorCenters, setSeniorCenters] = useState<SeniorCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<SeniorCenter | null>(null);
  const [centerSeniors, setCenterSeniors] = useState<Senior[]>([]);
  const [seniorTimeSlots, setSeniorTimeSlots] = useState<TimeSlot[]>([]);
  const [myRequests, setMyRequests] = useState<VolunteerRequest[]>([]);
  const [showSeniorsDialog, setShowSeniorsDialog] = useState(false);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // For demo mode, we'll bypass user authentication and show sample data
    try {
      // Set demo profile data
      const demoProfile = {
        id: 'demo-profile-id',
        user_id: 'demo-user-id',
        first_name: 'Marcus',
        last_name: 'Chen',
        role: 'teen_volunteer',
        email: 'marcus.chen@demo.com'
      };
      
      setProfile(demoProfile);
      
      // Set demo teen volunteer data
      const demoTeenVolunteer = {
        id: 'demo-teen-volunteer-id',
        profile_id: demoProfile.id,
        grade_level: 17,
        school_id: 'demo-school-id'
      };
      
      setTeenVolunteer(demoTeenVolunteer);
      
      // Set empty requests for now
      setMyRequests([]);

      // Fetch all senior centers (this will work without auth)
      const { data: centersData } = await supabase
        .from('senior_centers')
        .select('*')
        .order('name');

      setSeniorCenters(centersData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCenterSeniors = async (centerId: string) => {
    try {
      const { data: seniorsData } = await supabase
        .from('seniors')
        .select('*')
        .eq('senior_center_id', centerId)
        .order('first_name');

      setCenterSeniors(seniorsData || []);

      // Fetch time slots for all seniors in this center
      if (seniorsData && seniorsData.length > 0) {
        const seniorIds = seniorsData.map(s => s.id);
        const { data: timeSlotsData } = await supabase
          .from('senior_time_slots')
          .select('*')
          .in('senior_id', seniorIds)
          .eq('is_available', true)
          .order('day_of_week')
          .order('start_time');

        setSeniorTimeSlots(timeSlotsData || []);
      }
    } catch (error) {
      console.error('Error fetching center seniors:', error);
    }
  };

  const handleCenterClick = async (center: SeniorCenter) => {
    setSelectedCenter(center);
    await fetchCenterSeniors(center.id);
    setShowSeniorsDialog(true);
  };

  const handleVolunteerRequest = async (senior: Senior, timeSlot: TimeSlot) => {
    if (!teenVolunteer) return;

    try {
      // Calculate next occurrence of the day
      const today = new Date();
      const targetDay = timeSlot.day_of_week;
      const daysUntilTarget = (targetDay - today.getDay() + 7) % 7 || 7;
      const requestedDate = new Date(today);
      requestedDate.setDate(today.getDate() + daysUntilTarget);

      // Insert volunteer request
      const { error: requestError } = await supabase
        .from('volunteer_requests')
        .insert({
          teen_volunteer_id: teenVolunteer.id,
          senior_id: senior.id,
          senior_center_id: senior.senior_center_id,
          time_slot_id: timeSlot.id,
          requested_date: requestedDate.toISOString().split('T')[0],
          requested_start_time: timeSlot.start_time,
          requested_end_time: timeSlot.end_time,
          message: `${profile?.first_name} ${profile?.last_name} is interested in volunteering with ${senior.first_name} ${senior.last_name} on ${dayNames[timeSlot.day_of_week]} from ${timeSlot.start_time} to ${timeSlot.end_time}.`
        });

      if (requestError) throw requestError;

      // Send notification to senior center admin
      const { data: centerData } = await supabase
        .from('senior_centers')
        .select('admin_id')
        .eq('id', senior.senior_center_id)
        .single();

      if (centerData?.admin_id) {
        await supabase
          .from('notifications')
          .insert({
            recipient_id: centerData.admin_id,
            sender_id: profile.id,
            type: 'volunteer_interest',
            title: 'New Volunteer Request',
            message: `${profile?.first_name} ${profile?.last_name} wants to volunteer with ${senior.first_name} ${senior.last_name} on ${dayNames[timeSlot.day_of_week]} from ${timeSlot.start_time} to ${timeSlot.end_time}.`,
            metadata: {
              teen_volunteer_id: teenVolunteer.id,
              senior_id: senior.id,
              time_slot_id: timeSlot.id,
              requested_date: requestedDate.toISOString().split('T')[0]
            }
          });
      }

      toast({
        title: "Request Sent!",
        description: `Your volunteer request has been sent to ${selectedCenter?.name}. They'll review it and get back to you soon.`,
      });

      setShowSeniorsDialog(false);
      fetchUserData(); // Refresh requests

    } catch (error) {
      console.error('Error sending volunteer request:', error);
      toast({
        title: "Error",
        description: "Failed to send volunteer request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getSeniorTimeSlots = (seniorId: string) => {
    return seniorTimeSlots.filter(slot => slot.senior_id === seniorId);
  };

  const handleSignOut = async () => {
    // For demo mode, just navigate back to demo page
    window.location.href = '/demo';
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
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Teen Volunteer Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {profile?.first_name || 'Demo User'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="default">Active Volunteer</Badge>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{seniorCenters.length}</p>
                  <p className="text-sm text-muted-foreground">Centers Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{myRequests.length}</p>
                  <p className="text-sm text-muted-foreground">Requests Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {myRequests.filter(r => r.status === 'approved').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="centers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="centers">Senior Centers Near You</TabsTrigger>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="centers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Senior Centers Near You</span>
                </CardTitle>
                <CardDescription>
                  Click on a center to see available seniors and their time slots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seniorCenters.map(center => (
                    <Card key={center.id} className="cursor-pointer hover:shadow-medium transition-smooth">
                      <CardContent className="p-6" onClick={() => handleCenterClick(center)}>
                        <h3 className="font-semibold text-foreground mb-2">{center.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          {center.full_address}
                        </p>
                        <Button variant="teen" size="sm" className="w-full">
                          View Available Seniors
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>My Volunteer Requests</CardTitle>
                <CardDescription>Track your volunteer requests and their status</CardDescription>
              </CardHeader>
              <CardContent>
                {myRequests.length > 0 ? (
                  <div className="space-y-4">
                    {myRequests.map(request => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {request.seniors?.first_name} {request.seniors?.last_name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              at {request.senior_centers?.name}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-sm">
                              <Badge variant={
                                request.status === 'approved' ? 'default' :
                                request.status === 'declined' ? 'destructive' : 'secondary'
                              }>
                                {request.status.toUpperCase()}
                              </Badge>
                              <span className="text-muted-foreground">
                                📅 {request.requested_date}
                              </span>
                              <span className="text-muted-foreground">
                                🕒 {request.requested_start_time} - {request.requested_end_time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No requests yet. Check out senior centers to get started!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Seniors Dialog */}
      <Dialog open={showSeniorsDialog} onOpenChange={setShowSeniorsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Seniors at {selectedCenter?.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {centerSeniors.map(senior => {
              const timeSlots = getSeniorTimeSlots(senior.id);
              return (
                <Card key={senior.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>{senior.first_name} {senior.last_name}, {senior.age}</span>
                    </CardTitle>
                    <CardDescription>{senior.bio}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3">Available Time Slots:</h4>
                    {timeSlots.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {timeSlots.map(slot => (
                          <div key={slot.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{dayNames[slot.day_of_week]}</p>
                                <p className="text-sm text-muted-foreground">
                                  {slot.start_time} - {slot.end_time}
                                </p>
                              </div>
                              <Button 
                                variant="teen" 
                                size="sm"
                                onClick={() => handleVolunteerRequest(senior, slot)}
                              >
                                Request This Slot
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No time slots available for this senior.</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
            
            {centerSeniors.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No seniors available at this center right now.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeenVolunteerDashboard;