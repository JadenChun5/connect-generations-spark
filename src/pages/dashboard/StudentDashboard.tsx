import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, User, ArrowLeft, Calendar, BookOpen, UserCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CalendarBooking from "@/components/CalendarBooking";
import MyBookings from "@/components/MyBookings";
import StudentProfile from "@/components/StudentProfile";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";

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
  const [seniorCenters, setSeniorCenters] = useState<SeniorCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<SeniorCenterWithMatch | null>(null);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [userAvailability, setUserAvailability] = useState<AvailabilitySlot[]>([]);
  const [teenVolunteerId, setTeenVolunteerId] = useState<string | null>(null);
  const [filteredCenters, setFilteredCenters] = useState<SeniorCenterWithMatch[]>([]);

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
      // For demo, show sample centers
      const demoSeniorCenters = [
        {
          id: 'center-1',
          name: 'Sunrise Senior Center',
          address: '123 Oak Street',
          city: 'Springfield',
          state: 'CA',
          full_address: '123 Oak Street, Springfield, CA 90210'
        },
        {
          id: 'center-2', 
          name: 'Golden Years Community Center',
          address: '456 Maple Avenue',
          city: 'Riverside',
          state: 'CA',
          full_address: '456 Maple Avenue, Riverside, CA 92501'
        },
        {
          id: 'center-3',
          name: 'Peaceful Pines Senior Living',
          address: '789 Pine Boulevard',
          city: 'Lakewood',
          state: 'CA', 
          full_address: '789 Pine Boulevard, Lakewood, CA 90712'
        }
      ];

      setSeniorCenters(demoSeniorCenters);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching senior centers:', error);
      setLoading(false);
    }
  };

  const fetchCenterDetails = async (centerId: string) => {
    try {
      setLoading(true);
      
      // Demo data for seniors and time slots
      const demoSeniors = [
        {
          id: 'senior-1',
          first_name: 'Dorothy',
          last_name: 'Johnson',
          age: 78,
          bio: 'Former teacher who loves reading and crossword puzzles',
          interests: ['Reading', 'Puzzles', 'Gardening']
        },
        {
          id: 'senior-2',
          first_name: 'Robert', 
          last_name: 'Miller',
          age: 82,
          bio: 'Retired engineer with a passion for chess and woodworking',
          interests: ['Chess', 'Woodworking', 'History']
        },
        {
          id: 'senior-3',
          first_name: 'Margaret',
          last_name: 'Davis',
          age: 75,
          bio: 'Loves music and has many stories to share about her travels',
          interests: ['Music', 'Travel', 'Cooking']
        }
      ];

      const demoTimeSlots = [
        {
          id: 'slot-1',
          senior_id: 'senior-1',
          available_date: '2025-01-15',
          start_time: '14:00',
          end_time: '16:00',
          is_booked: false
        },
        {
          id: 'slot-2', 
          senior_id: 'senior-1',
          available_date: '2025-01-17',
          start_time: '10:00',
          end_time: '12:00',
          is_booked: false
        },
        {
          id: 'slot-3',
          senior_id: 'senior-2',
          available_date: '2025-01-16',
          start_time: '15:00',
          end_time: '17:00',
          is_booked: false
        },
        {
          id: 'slot-4',
          senior_id: 'senior-3',
          available_date: '2025-01-18',
          start_time: '13:00',
          end_time: '15:00',
          is_booked: false
        }
      ];

      setSeniors(demoSeniors);
      setTimeSlots(demoTimeSlots);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching center details:', error);
      setLoading(false);
    }
  };

  const handleCenterClick = (center: SeniorCenterWithMatch) => {
    setSelectedCenter(center);
    fetchCenterDetails(center.id);
  };

  const handleBookTimeSlot = (timeSlot: TimeSlot, senior: Senior) => {
    // For demo, just show success message
    toast.success(`Volunteer request sent for ${senior.first_name} ${senior.last_name}!`);
    
    // Mark the time slot as requested (in real app, this would create a pending request)
    setTimeSlots(prev => prev.map(slot => 
      slot.id === timeSlot.id ? { ...slot, is_booked: true } : slot
    ));
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
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
            <TabsTrigger value="browse">Browse Centers</TabsTrigger>
            <TabsTrigger value="availability">Set My Availability</TabsTrigger>
            <TabsTrigger value="calendar">Calendar Booking</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                          <Button size="sm" disabled={slot.is_booked} onClick={() => handleBookTimeSlot(slot, senior)}>
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
            {teenVolunteerId ? (
              <AvailabilityCalendar
                teenVolunteerId={teenVolunteerId}
                onAvailabilityChange={handleAvailabilityChange}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Set My Availability</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Please complete your volunteer profile to set your availability.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarBooking 
              seniors={seniors}
              timeSlots={timeSlots}
              onBookSlot={handleBookTimeSlot}
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
    </div>
  );
};

export default StudentDashboard;