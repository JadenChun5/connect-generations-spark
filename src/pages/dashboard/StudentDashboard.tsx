import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, User, ArrowLeft, Calendar, BookOpen, UserCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CalendarBooking from "@/components/CalendarBooking";
import MyBookings from "@/components/MyBookings";
import StudentProfile from "@/components/StudentProfile";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { RequirementsDisplay } from "@/components/RequirementsDisplay";
import { Checkbox } from "@/components/ui/checkbox";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useTutorial } from "@/hooks/useTutorial";

interface SeniorCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code?: string;
  contact_email?: string;
  contact_phone?: string;
  full_address?: string;
}

interface Senior {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  bio: string;
  interests: string[];
}

interface TimeSlot {
  id: string;
  senior_id: string;
  available_date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface AvailabilitySlot {
  id?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface SeniorCenterWithMatch extends SeniorCenter {
  matchPercentage?: number;
  availableSlots?: number;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { isProfileComplete, loading: profileLoading } = useProfileCompletion();
  const { showTutorial, loading: tutorialLoading, completeTutorial, skipTutorial, setShowTutorial } = useTutorial('student-dashboard');
  const [seniorCenters, setSeniorCenters] = useState<SeniorCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<SeniorCenterWithMatch | null>(null);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [userAvailability, setUserAvailability] = useState<AvailabilitySlot[]>([]);
  const [teenVolunteerId, setTeenVolunteerId] = useState<string | null>(null);
  const [filteredCenters, setFilteredCenters] = useState<SeniorCenterWithMatch[]>([]);
  const [requirementsAgreed, setRequirementsAgreed] = useState(false);

  const joyrideSteps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      content: (
        <div>
          <h3 className="text-base font-medium">Welcome to Your Dashboard!</h3>
          <p className="mt-1 text-sm text-muted-foreground">Let's take a quick tour to help you get started with volunteering. We'll show you how to find opportunities and book your first session.</p>
        </div>
      ),
    },
    {
      target: '#student-availability-tab',
      placement: 'bottom',
      content: 'First, tell us when you’re available to volunteer. This helps us show you opportunities that fit your schedule perfectly.',
    },
    {
      target: '#student-browse-tab',
      placement: 'bottom',
      content: 'Explore senior centers near you. Each center has different residents and opportunities waiting for volunteers like you!',
    },
    {
      target: '#student-centers-list',
      placement: 'right',
      content: 'Click on any senior center to see available time slots and learn about the seniors you can visit.',
    },
    {
      target: '#student-calendar-tab',
      placement: 'bottom',
      content: "Found the perfect match? Click 'Book' to request a volunteer session. The center will review and approve your request!",
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
    fetchSeniorCenters();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (userAvailability.length > 0) {
      calculateMatches();
    } else {
      setFilteredCenters(seniorCenters.map(center => ({ ...center })));
    }
  }, [seniorCenters, userAvailability, timeSlots]);

  const fetchCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      const { data: teenVolunteer } = await supabase
        .from('teen_volunteers')
        .select('id')
        .eq('profile_id', profile.id)
        .single();

      if (teenVolunteer) {
        setTeenVolunteerId(teenVolunteer.id);
      } else {
        // For demo purposes, create a fallback ID
        setTeenVolunteerId('demo-teen-volunteer-id');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const calculateMatches = () => {
    const centersWithMatches = seniorCenters.map(center => {
      // Get all time slots for this center
      const centerTimeSlots = timeSlots.filter(slot => 
        seniors.some(senior => 
          senior.id === slot.senior_id && center.id.includes('center')
        )
      );

      if (centerTimeSlots.length === 0) {
        return { ...center, matchPercentage: 0, availableSlots: 0 };
      }

      // Calculate match percentage based on availability overlap
      let matchingSlots = 0;
      let totalSlots = centerTimeSlots.length;

      centerTimeSlots.forEach(slot => {
        const slotDate = new Date(slot.available_date);
        const dayOfWeek = slotDate.getDay();
        const slotStartHour = parseInt(slot.start_time.split(':')[0]);
        const slotEndHour = parseInt(slot.end_time.split(':')[0]);

        // Check if user is available during this time slot
        const isAvailable = userAvailability.some(availability => {
          if (availability.dayOfWeek !== dayOfWeek) return false;
          
          const availStartHour = parseInt(availability.startTime.split(':')[0]);
          const availEndHour = parseInt(availability.endTime.split(':')[0]);
          
          // Check for time overlap
          return (slotStartHour >= availStartHour && slotStartHour < availEndHour) ||
                 (slotEndHour > availStartHour && slotEndHour <= availEndHour) ||
                 (slotStartHour <= availStartHour && slotEndHour >= availEndHour);
        });

        if (isAvailable) {
          matchingSlots++;
        }
      });

      const matchPercentage = totalSlots > 0 ? Math.round((matchingSlots / totalSlots) * 100) : 0;
      
      return {
        ...center,
        matchPercentage,
        availableSlots: matchingSlots
      };
    });

    // Sort by match percentage (highest first) and filter out centers with no matches if user has availability set
    const shouldFilter = userAvailability.length > 0;
    const filtered = shouldFilter 
      ? centersWithMatches.filter(center => center.matchPercentage! > 0)
      : centersWithMatches;
    
    filtered.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
    setFilteredCenters(filtered);
  };

  const handleAvailabilityChange = (availability: AvailabilitySlot[]) => {
    setUserAvailability(availability);
  };

  const fetchSeniorCenters = async () => {
    try {
      // Fetch real senior centers from Supabase
      const { data: centers, error } = await supabase
        .from('senior_centers')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching senior centers:', error);
        // Show empty state instead of demo data
        setSeniorCenters([]);
      } else {
        setSeniorCenters(centers || []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching senior centers:', error);
      setSeniorCenters([]);
      setLoading(false);
    }
  };

  const fetchCenterDetails = async (centerId: string) => {
    try {
      setLoading(true);
      
      // Fetch real seniors from the selected center
      const { data: seniorsData, error: seniorsError } = await supabase
        .from('seniors')
        .select('*')
        .eq('senior_center_id', centerId)
        .order('first_name');

      if (seniorsError) {
        console.error('Error fetching seniors:', seniorsError);
        setSeniors([]);
      } else {
        setSeniors(seniorsData || []);
      }

      // TODO: Time slots functionality needs to be re-implemented with new schema
      // Commenting out until senior_time_slots table is added
      /*
      // Fetch available time slots for these seniors
      const { data: timeSlotsData, error: timeSlotsError } = await supabase
        .from('senior_time_slots')
        .select(`
          id,
          day_of_week,
          start_time,
          end_time,
          is_available,
          senior_id,
          seniors!inner(senior_center_id)
        `)
        .eq('seniors.senior_center_id', centerId)
        .eq('is_available', true)
        .order('day_of_week')
        .order('start_time');

      if (timeSlotsError) {
        console.error('Error fetching time slots:', timeSlotsError);
        setTimeSlots([]);
      } else {
        // Convert the time slots to the expected format
        const convertedTimeSlots = (timeSlotsData || []).map(slot => {
          // Convert day_of_week to a future date
          const today = new Date();
          const daysUntilSlot = (slot.day_of_week - today.getDay() + 7) % 7;
          const slotDate = new Date(today);
          slotDate.setDate(today.getDate() + daysUntilSlot);
          
          return {
            id: slot.id,
            senior_id: slot.senior_id,
            available_date: slotDate.toISOString().split('T')[0],
            start_time: slot.start_time,
            end_time: slot.end_time,
            is_booked: false
          };
        });
        
        setTimeSlots(convertedTimeSlots);
      }
      */
      setTimeSlots([]);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching center details:', error);
      setSeniors([]);
      setTimeSlots([]);
      setLoading(false);
    }
  };

  const handleCenterClick = (center: SeniorCenterWithMatch) => {
    setSelectedCenter(center);
    setRequirementsAgreed(false); // Reset agreement for new center
    fetchCenterDetails(center.id);
  };

  const handleBookTimeSlot = async (timeSlot: TimeSlot, senior: Senior) => {
    if (!requirementsAgreed) {
      toast.error('Please agree to the requirements first');
      return;
    }

    try {
      // Get current user profile data
      const { data: { user } } = await supabase.auth.getUser();
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      // Create notification data with real user info
      const notificationData = {
        volunteerName: userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : 'Volunteer',
        volunteerEmail: userProfile?.email || '',
        volunteerPhone: userProfile?.phone || '',
        seniorName: `${senior.first_name} ${senior.last_name}`,
        date: timeSlot.available_date,
        startTime: timeSlot.start_time,
        endTime: timeSlot.end_time,
        activityType: 'General companionship'
      };

      // Send real-time notification to staff dashboard  
      const channel = supabase.channel('volunteer-notifications');
      await channel.send({
        type: 'broadcast',
        event: 'volunteer_request',
        payload: notificationData
      });

      // Send email notification to senior center staff
      console.log('📧 Sending volunteer request email to center:', {
        center: selectedCenter?.name,
        email: selectedCenter?.contact_email,
        volunteer: notificationData.volunteerName
      });

      const { error: emailError } = await supabase.functions.invoke('send-volunteer-request-email', {
        body: {
          ...notificationData,
          seniorCenterName: selectedCenter?.name || 'Senior Center',
          seniorCenterEmail: selectedCenter?.contact_email || 'info@seniorcenter.org',
          dashboardUrl: `${window.location.origin}/dashboard/staff`
        }
      });

      if (emailError) {
        console.error('❌ Failed to send email notification:', emailError);
        toast.error(
          'Your request was saved, but we could not send an email notification to the center. They can still see your request in their dashboard.',
          { duration: 6000 }
        );
      } else {
        console.log('✅ Email notification sent successfully to center');
      }

      // Mark the time slot as requested locally
      setTimeSlots(prev => prev.map(slot => 
        slot.id === timeSlot.id ? { ...slot, is_booked: true } : slot
      ));

      toast.success(
        `Volunteer request sent for ${senior.first_name} ${senior.last_name}! The senior center will review your request and send a confirmation email.`,
        { duration: 6000 }
      );

    } catch (error) {
      console.error('Error submitting volunteer request:', error);
      toast.error('Failed to submit volunteer request. Please try again.');
    }
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
            <div>
              <h1 className="text-xl font-bold text-foreground">Teen Volunteer Dashboard</h1>
              <p className="text-sm text-muted-foreground">Find volunteer opportunities at senior centers</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Change User Type
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="browse" id="student-browse-tab">
              Browse Centers
            </TabsTrigger>
            <TabsTrigger value="availability" id="student-availability-tab">
              Set My Availability
            </TabsTrigger>
            <TabsTrigger value="calendar" id="student-calendar-tab">
              Calendar Booking
            </TabsTrigger>
            <TabsTrigger value="bookings">
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Senior Centers Near You</span>
                  {userAvailability.length > 0 && (
                    <Badge variant="secondary">
                      Filtered by your availability
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {userAvailability.length > 0 
                    ? "Showing opportunities that match your available times"
                    : "Browse local senior centers and their residents - set your availability to see personalized matches"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredCenters.length === 0 && userAvailability.length > 0 ? (
                  <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                      <h3 className="text-lg font-medium mb-2">No matching opportunities found</h3>
                      <p className="text-muted-foreground mb-4">
                        No senior centers have time slots that match your current availability.
                        Try adjusting your available hours or check back later for new opportunities.
                      </p>
                      <Button variant="outline" onClick={() => setUserAvailability([])}>
                        Show All Centers
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="student-centers-list">
                    {filteredCenters.map((center) => (
                      <Card key={center.id} className="hover:shadow-elegant transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle>{center.name}</CardTitle>
                              <CardDescription className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{center.full_address}</span>
                              </CardDescription>
                            </div>
                            {center.matchPercentage !== undefined && center.matchPercentage > 0 && (
                              <Badge variant="default" className="ml-2">
                                {center.matchPercentage}% match
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary">3 seniors available</Badge>
                              {center.availableSlots !== undefined && center.availableSlots > 0 && (
                                <Badge variant="outline">
                                  {center.availableSlots} matching slots
                                </Badge>
                              )}
                            </div>
                            <Button className="w-full" onClick={() => handleCenterClick(center)}>
                              View Seniors & Times
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {selectedCenter && (
                  <div className="mt-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedCenter(null)}>
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Centers
                      </Button>
                      <h2 className="text-2xl font-bold">{selectedCenter.name}</h2>
                      {selectedCenter.matchPercentage !== undefined && selectedCenter.matchPercentage > 0 && (
                        <Badge variant="default">
                          {selectedCenter.matchPercentage}% match with your availability
                        </Badge>
                      )}
                    </div>

                    {/* Requirements Display */}
                    <div className="mb-8">
                      <RequirementsDisplay centerName={selectedCenter.name} />
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="mb-6 p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="requirements-agreement"
                          checked={requirementsAgreed}
                          onCheckedChange={(checked) => setRequirementsAgreed(checked as boolean)}
                        />
                        <label 
                          htmlFor="requirements-agreement" 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          I understand and agree to meet all requirements listed above before volunteering at this senior center.
                        </label>
                      </div>
                      {!requirementsAgreed && (
                        <p className="text-xs text-muted-foreground mt-2 ml-6">
                          You must agree to the requirements before you can request volunteer time slots.
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {seniors.map((senior) => {
                        const seniorTimeSlots = timeSlots.filter(slot => slot.senior_id === senior.id);
                        return (
                          <Card key={senior.id}>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
                                <span>{senior.first_name} {senior.last_name}</span>
                                {senior.age && <Badge variant="secondary">Age {senior.age}</Badge>}
                              </CardTitle>
                              <CardDescription>{senior.bio}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {senior.interests && (
                                <div>
                                  <p className="text-sm font-medium mb-2">Interests:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {senior.interests.map((interest, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">{interest}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium mb-2">Available Times:</p>
                                {seniorTimeSlots.length > 0 ? (
                                  <div className="space-y-2">
                                    {seniorTimeSlots.map((slot) => {
                                      // Check if this slot matches user availability
                                      const slotDate = new Date(slot.available_date);
                                      const dayOfWeek = slotDate.getDay();
                                      const slotStartHour = parseInt(slot.start_time.split(':')[0]);
                                      const slotEndHour = parseInt(slot.end_time.split(':')[0]);
                                      
                                      const isMatchingSlot = userAvailability.some(availability => {
                                        if (availability.dayOfWeek !== dayOfWeek) return false;
                                        const availStartHour = parseInt(availability.startTime.split(':')[0]);
                                        const availEndHour = parseInt(availability.endTime.split(':')[0]);
                                        return (slotStartHour >= availStartHour && slotStartHour < availEndHour) ||
                                               (slotEndHour > availStartHour && slotEndHour <= availEndHour) ||
                                               (slotStartHour <= availStartHour && slotEndHour >= availEndHour);
                                      });

                                      return (
                                        <div key={slot.id} className={`flex items-center justify-between p-2 border rounded ${isMatchingSlot ? 'border-primary bg-primary/5' : ''}`}>
                                          <div className="flex items-center space-x-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                              <p className="text-sm font-medium">{formatDate(slot.available_date)}</p>
                                              <p className="text-xs text-muted-foreground">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</p>
                                              {isMatchingSlot && userAvailability.length > 0 && (
                                                <Badge variant="outline" className="text-xs mt-1">Matches your availability</Badge>
                                              )}
                                            </div>
                                          </div>
                                          <Button 
                                            size="sm" 
                                            disabled={slot.is_booked || !requirementsAgreed} 
                                            onClick={() => handleBookTimeSlot(slot, senior)}
                                            title={!requirementsAgreed ? "Please agree to requirements first" : ""}
                                          >
                                            {slot.is_booked ? 'Requested' : 'Request'}
                                          </Button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">No available time slots</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityCalendar
              teenVolunteerId={teenVolunteerId || 'demo-teen-volunteer-id'}
              onAvailabilityChange={handleAvailabilityChange}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarBooking 
              seniors={seniors}
              timeSlots={timeSlots}
              onBookSlot={handleBookTimeSlot}
              isProfileComplete={isProfileComplete}
            />
          </TabsContent>

          <TabsContent value="bookings">
            <MyBookings />
          </TabsContent>

          <TabsContent value="profile">
            <StudentProfile />
          </TabsContent>
        </Tabs>
      </main>

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

export default StudentDashboard;