import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, MapPin, Phone, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Booking {
  id: string;
  senior: {
    id: string;
    first_name: string;
    last_name: string;
    age: number;
    bio: string;
    interests: string[];
  };
  center: {
    id: string;
    name: string;
    address: string;
  };
  date: string;
  start_time: string;
  end_time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  hours_completed?: number;
  rating?: number;
  feedback?: string;
}

const MyBookings = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  // Demo bookings data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'booking-1',
      senior: {
        id: 'senior-1',
        first_name: 'Dorothy',
        last_name: 'Johnson', 
        age: 78,
        bio: 'Former teacher who loves reading and crossword puzzles',
        interests: ['Reading', 'Puzzles', 'Gardening']
      },
      center: {
        id: 'center-1',
        name: 'Sunrise Senior Center',
        address: '123 Oak Street, Springfield, CA'
      },
      date: '2025-01-15',
      start_time: '14:00',
      end_time: '16:00',
      status: 'upcoming'
    },
    {
      id: 'booking-2',
      senior: {
        id: 'senior-2',
        first_name: 'Robert',
        last_name: 'Miller',
        age: 82,
        bio: 'Retired engineer with a passion for chess and woodworking',
        interests: ['Chess', 'Woodworking', 'History']
      },
      center: {
        id: 'center-2',
        name: 'Golden Years Community Center', 
        address: '456 Maple Avenue, Riverside, CA'
      },
      date: '2024-12-20',
      start_time: '15:00',
      end_time: '17:00',
      status: 'completed',
      hours_completed: 2,
      rating: 5,
      feedback: 'Had a wonderful time discussing chess strategies and woodworking techniques!'
    },
    {
      id: 'booking-3',
      senior: {
        id: 'senior-3',
        first_name: 'Margaret',
        last_name: 'Davis',
        age: 75,
        bio: 'Loves music and has many stories to share about her travels',
        interests: ['Music', 'Travel', 'Cooking']
      },
      center: {
        id: 'center-1',
        name: 'Sunrise Senior Center',
        address: '123 Oak Street, Springfield, CA'
      },
      date: '2024-12-18',
      start_time: '13:00', 
      end_time: '15:00',
      status: 'completed',
      hours_completed: 2,
      rating: 4,
      feedback: 'Margaret shared amazing travel stories from her trips to Europe. Looking forward to learning her cookie recipe next time!'
    }
  ]);

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed');

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

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    ));
    toast.success("Booking cancelled successfully");
  };

  const handleAddFeedback = (booking: Booking) => {
    setSelectedBooking(booking);
    setFeedback(booking.feedback || "");
    setRating(booking.rating || 5);
    setFeedbackDialogOpen(true);
  };

  const submitFeedback = () => {
    if (selectedBooking) {
      setBookings(prev => prev.map(booking =>
        booking.id === selectedBooking.id 
          ? { ...booking, feedback, rating }
          : booking
      ));
      toast.success("Feedback submitted successfully!");
      setFeedbackDialogOpen(false);
      setSelectedBooking(null);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="font-semibold">
                  {booking.senior.first_name} {booking.senior.last_name}
                </span>
                <Badge variant="secondary">Age {booking.senior.age}</Badge>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{booking.center.name}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(booking.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatTime(booking.start_time)} - {formatTime(booking.end_time)}</span>
                </div>
              </div>
            </div>
            
            <Badge variant={
              booking.status === 'upcoming' ? 'default' :
              booking.status === 'completed' ? 'secondary' : 'destructive'
            }>
              {booking.status}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">{booking.senior.bio}</p>

          <div className="flex flex-wrap gap-1">
            {booking.senior.interests.map((interest, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>

          {booking.status === 'completed' && (
            <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
              {booking.rating && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Your Rating:</span>
                  <div className="flex space-x-1">
                    {renderStars(booking.rating)}
                  </div>
                </div>
              )}
              
              {booking.hours_completed && (
                <p className="text-sm">
                  <span className="font-medium">Hours Completed:</span> {booking.hours_completed}
                </p>
              )}
              
              {booking.feedback && (
                <p className="text-sm">
                  <span className="font-medium">Your Feedback:</span> {booking.feedback}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            {booking.status === 'upcoming' && (
              <>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Contact Center
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel
                </Button>
              </>
            )}
            
            {booking.status === 'completed' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAddFeedback(booking)}
              >
                {booking.feedback ? 'Edit Feedback' : 'Add Feedback'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Volunteer Bookings</CardTitle>
          <CardDescription>
            View and manage your upcoming and past volunteer sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past Sessions ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No Upcoming Sessions</p>
                  <p className="text-muted-foreground">
                    Book your first volunteer session to get started!
                  </p>
                </div>
              ) : (
                upcomingBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">No Past Sessions</p>
                  <p className="text-muted-foreground">
                    Your completed volunteer sessions will appear here
                  </p>
                </div>
              ) : (
                pastBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Session Feedback</DialogTitle>
            <DialogDescription>
              Share your experience from this volunteer session
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">
                  Session with {selectedBooking.senior.first_name} {selectedBooking.senior.last_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(selectedBooking.date)} • {formatTime(selectedBooking.start_time)} - {formatTime(selectedBooking.end_time)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Rating</label>
                <div className="flex space-x-1 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 cursor-pointer ${
                        i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                      }`}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Your Experience</label>
                <Textarea
                  placeholder="Tell us about your volunteer session..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitFeedback}>
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBookings;