import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, User, ArrowLeft, Calendar, BookOpen, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CalendarBooking from "@/components/CalendarBooking";
import MyBookings from "@/components/MyBookings";
import StudentProfile from "@/components/StudentProfile";

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

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [seniorCenters, setSeniorCenters] = useState<SeniorCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<SeniorCenter | null>(null);
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeniorCenters();
  }, []);

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

  const handleCenterClick = (center: SeniorCenter) => {
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Centers</TabsTrigger>
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
                </CardTitle>
                <CardDescription>Browse local senior centers and their residents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {seniorCenters.map((center) => (
                    <Card key={center.id} className="hover:shadow-elegant transition-shadow">
                      <CardHeader>
                        <CardTitle>{center.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{center.full_address}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Badge variant="secondary">3 seniors available</Badge>
                          <Button className="w-full" onClick={() => handleCenterClick(center)}>
                            View Seniors & Times
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedCenter && (
                  <div className="mt-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedCenter(null)}>
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Centers
                      </Button>
                      <h2 className="text-2xl font-bold">{selectedCenter.name}</h2>
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
                                    {seniorTimeSlots.map((slot) => (
                                      <div key={slot.id} className="flex items-center justify-between p-2 border rounded">
                                        <div className="flex items-center space-x-2">
                                          <Clock className="h-4 w-4 text-muted-foreground" />
                                          <div>
                                            <p className="text-sm font-medium">{formatDate(slot.available_date)}</p>
                                            <p className="text-xs text-muted-foreground">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</p>
                                          </div>
                                        </div>
                                        <Button size="sm" disabled={slot.is_booked} onClick={() => handleBookTimeSlot(slot, senior)}>
                                          {slot.is_booked ? 'Requested' : 'Request'}
                                        </Button>
                                      </div>
                                    ))}
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