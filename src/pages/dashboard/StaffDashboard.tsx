import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users2, Calendar, UserPlus, Clock, CheckCircle, XCircle, Settings, FileText, Edit, Shield, AlertCircle } from "lucide-react";
import { AddSeniorDialog } from "@/components/AddSeniorDialog";
import { SeniorsManagement } from "@/components/SeniorsManagement";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import StaffTimeSlotManagement from "@/components/StaffTimeSlotManagement";
import VisitHistory from "@/components/VisitHistory";
import CenterSettings from "@/components/CenterSettings";
import { RequirementsManagement } from "@/components/RequirementsManagement";
import { RealtimeNotifications } from "@/components/RealtimeNotifications";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import StaffProfile from "@/components/StaffProfile";
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useTutorial } from "@/hooks/useTutorial";

interface Senior {
  id: string;
  first_name: string;
  last_name: string;
  age?: number;
  bio?: string;
  interests?: string[];
  preferred_activities?: string[];
  mobility_notes?: string;
  senior_center_id: string;
  created_at: string;
}

interface VolunteerRequest {
  id: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  requested_date: string;
  requested_start_time: string;
  requested_end_time: string;
  senior_id: string;
  senior_name: string;
  status: string;
  created_at: string;
}

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { isProfileComplete, loading: profileLoading } = useProfileCompletion();
  const { showTutorial, loading: tutorialLoading, completeTutorial, skipTutorial, setShowTutorial } = useTutorial('staff-dashboard');
  const [loading, setLoading] = useState(true);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [requests, setRequests] = useState<VolunteerRequest[]>([]);
  const [editingSenior, setEditingSenior] = useState<Senior | null>(null);
  const [stats, setStats] = useState({
    totalSeniors: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    completedVisits: 0
  });

  const joyrideSteps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      content: (
        <div>
          <h3 className="text-base font-medium">Welcome to Staff Dashboard!</h3>
          <p className="mt-1 text-sm text-muted-foreground">Let's walk through how to manage your senior center and connect with teen volunteers. This will only take a minute!</p>
        </div>
      ),
    },
    {
      target: '#staff-seniors-tab',
      placement: 'bottom',
      content: 'Start by adding profiles for your senior residents. Include their interests and preferences to help match them with the right volunteers.',
    },
    {
      target: '#staff-schedule-tab',
      placement: 'bottom',
      content: 'Set up available time slots when volunteers can visit. You can schedule recurring times or one-time sessions.',
    },
    {
      target: '#staff-requests-tab',
      placement: 'bottom',
      content: "When teens request to volunteer, you'll see their requests here. Review their information and approve the ones that are a good fit!",
    },
    {
      target: '#staff-history-tab',
      placement: 'bottom',
      content: "Check visit history and stats to see the positive impact volunteers are making at your center. You're all set!",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      if (status === STATUS.FINISHED) {
        completeTutorial();
      } else {
        skipTutorial();
      }
    }
  };
  useEffect(() => {
    if (isProfileComplete && !tutorialLoading && showTutorial) {
      // Small delay to let the dashboard render
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isProfileComplete, tutorialLoading]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Demo data for staff dashboard
      const demoSeniors: Senior[] = [
        {
          id: 'senior-1',
          first_name: 'Dorothy',
          last_name: 'Johnson',
          age: 78,
          bio: 'Former teacher who loves reading and crossword puzzles',
          interests: ['Reading', 'Puzzles', 'Gardening'],
          preferred_activities: ['board games', 'walks', 'storytelling'],
          mobility_notes: 'Uses a walker for longer distances',
          senior_center_id: 'demo-senior-center-id',
          created_at: new Date().toISOString()
        },
        {
          id: 'senior-2',
          first_name: 'Robert', 
          last_name: 'Miller',
          age: 82,
          bio: 'Retired engineer with a passion for chess and woodworking',
          interests: ['Chess', 'Woodworking', 'History'],
          preferred_activities: ['card games', 'discussions', 'art projects'],
          mobility_notes: 'No mobility restrictions',
          senior_center_id: 'demo-senior-center-id',
          created_at: new Date().toISOString()
        },
        {
          id: 'senior-3',
          first_name: 'Margaret',
          last_name: 'Davis',
          age: 75,
          bio: 'Loves music and has many stories to share about her travels', 
          interests: ['Music', 'Travel', 'Cooking'],
          preferred_activities: ['singing', 'crafts', 'mentoring'],
          mobility_notes: 'Prefers seated activities',
          senior_center_id: 'demo-senior-center-id',
          created_at: new Date().toISOString()
        }
      ];

      const demoRequests: VolunteerRequest[] = [
        {
          id: 'req-1',
          student_name: 'Sarah Johnson',
          student_email: 'sarah.j@email.com',
          student_phone: '(555) 123-4567',
          requested_date: '2025-01-15',
          requested_start_time: '14:00',
          requested_end_time: '16:00',
          senior_id: 'senior-1',
          senior_name: 'Dorothy Johnson',
          status: 'pending',
          created_at: '2025-01-10T10:30:00Z'
        },
        {
          id: 'req-2',
          student_name: 'Michael Chen',
          student_email: 'michael.c@email.com', 
          student_phone: '(555) 987-6543',
          requested_date: '2025-01-16',
          requested_start_time: '15:00',
          requested_end_time: '17:00',
          senior_id: 'senior-2',
          senior_name: 'Robert Miller',
          status: 'pending',
          created_at: '2025-01-11T14:15:00Z'
        }
      ];

      setSeniors(demoSeniors);
      setRequests(demoRequests);
      setStats({
        totalSeniors: demoSeniors.length,
        pendingRequests: demoRequests.filter(r => r.status === 'pending').length,
        approvedRequests: demoRequests.filter(r => r.status === 'approved').length,
        completedVisits: 18
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleSeniorAdded = (newSenior?: any) => {
    if (newSenior) {
      setSeniors(prev => [newSenior, ...prev]);
      setStats(prev => ({ ...prev, totalSeniors: prev.totalSeniors + 1 }));
    }
  };

  const handleRequestAction = (requestId: string, action: 'approve' | 'deny') => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: action === 'approve' ? 'approved' : 'denied' } : req
    ));
    
    setStats(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1,
      approvedRequests: action === 'approve' ? prev.approvedRequests + 1 : prev.approvedRequests
    }));

    toast.success(`Volunteer request ${action === 'approve' ? 'approved' : 'denied'}!`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading || profileLoading) {
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
                <h1 className="text-xl font-bold text-foreground">Senior Center Staff Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, Demo Staff Member
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Change User Type
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
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
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingRequests}</p>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.approvedRequests}</p>
                  <p className="text-sm text-muted-foreground">Approved Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.completedVisits}</p>
                  <p className="text-sm text-muted-foreground">Completed Visits</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="requests" id="staff-requests-tab">
              Requests
            </TabsTrigger>
            <TabsTrigger value="seniors" id="staff-seniors-tab">
              Seniors
            </TabsTrigger>
            <TabsTrigger value="schedule" disabled={!isProfileComplete} id="staff-schedule-tab">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="requirements" disabled={!isProfileComplete}>
              Requirements
            </TabsTrigger>
            <TabsTrigger value="history" disabled={!isProfileComplete} id="staff-history-tab">
              History
            </TabsTrigger>
            <TabsTrigger value="settings" disabled={!isProfileComplete}>
              Settings
            </TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <div className="space-y-6">
              <RealtimeNotifications onRequestAction={handleRequestAction} />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>All Volunteer Requests</span>
                  </CardTitle>
                  <CardDescription>
                    Review and approve volunteer requests from students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                {requests.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-xl font-semibold mb-2">No Volunteer Requests</p>
                    <p className="text-muted-foreground">
                      Requests from students will appear here for your review
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <Card key={request.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{request.student_name}</h3>
                              <Badge variant={
                                request.status === 'pending' ? 'secondary' :
                                request.status === 'approved' ? 'default' : 'destructive'
                              }>
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              wants to volunteer with <strong>{request.senior_name}</strong>
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{formatDate(request.requested_date)}</span>
                              <span>
                                {formatTime(request.requested_start_time)} - {formatTime(request.requested_end_time)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Contact: {request.student_email} • {request.student_phone}
                            </p>
                          </div>
                          
                          {request.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRequestAction(request.id, 'deny')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Deny
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleRequestAction(request.id, 'approve')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
               </CardContent>
             </Card>
            </div>
          </TabsContent>

          <TabsContent value="seniors">
            <SeniorsManagement 
              seniors={seniors}
              onSeniorAdded={handleSeniorAdded}
              onEditSenior={setEditingSenior}
              seniorCenterId="demo-senior-center-id"
              isProfileComplete={isProfileComplete}
            />
          </TabsContent>

          <TabsContent value="schedule">
            <StaffTimeSlotManagement seniors={seniors} isProfileComplete={isProfileComplete} />
          </TabsContent>

          <TabsContent value="requirements">
            <RequirementsManagement seniorCenterId="demo-senior-center-id" />
          </TabsContent>

          <TabsContent value="history">
            <VisitHistory />
          </TabsContent>

          <TabsContent value="settings">
            <CenterSettings />
          </TabsContent>

          <TabsContent value="profile">
            <StaffProfile />
          </TabsContent>
        </Tabs>
      </main>
      
      <AddSeniorDialog
        open={!!editingSenior}
        onOpenChange={(open) => {
          if (!open) setEditingSenior(null);
        }}
        onSeniorAdded={handleSeniorAdded}
        seniorCenterId="demo-senior-center-id"
        editingSenior={editingSenior}
      />

      {/* Onboarding Tour */}
      {isProfileComplete && showTutorial && (
        <Joyride
          steps={joyrideSteps}
          run
          continuous
          showSkipButton
          showProgress
          scrollToFirstStep
          disableScrolling={false}
          spotlightClicks={false}
          spotlightPadding={8}
          styles={{ options: { zIndex: 10000 }, overlay: { backgroundColor: 'rgba(0,0,0,0.6)' } }}
          callback={handleJoyrideCallback}
          locale={{ back: 'Previous', close: 'Close', last: 'Finish', next: 'Next', skip: 'Skip' }}
        />
      )}
    </div>
  );
};

export default StaffDashboard;