import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

interface Senior {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  bio: string;
  interests: string[];
  photo_url?: string;
}

interface TimeSlot {
  id: string;
  senior_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface CalendarBookingProps {
  seniors: Senior[];
  timeSlots: TimeSlot[];
  onBookSlot: (timeSlot: TimeSlot, senior: Senior) => void;
}

const CalendarBooking = ({ seniors, timeSlots, onBookSlot }: CalendarBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSenior, setSelectedSenior] = useState<Senior | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getAvailableSlotsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return timeSlots.filter(slot => 
      slot.date === dateString && slot.is_available
    );
  };

  const getSeniorById = (seniorId: string) => {
    return seniors.find(s => s.id === seniorId);
  };

  const handleSlotClick = (slot: TimeSlot) => {
    const senior = getSeniorById(slot.senior_id);
    if (senior) {
      setSelectedSlot(slot);
      setSelectedSenior(senior);
      setBookingDialogOpen(true);
    }
  };

  const confirmBooking = () => {
    if (selectedSlot && selectedSenior) {
      onBookSlot(selectedSlot, selectedSenior);
      setBookingDialogOpen(false);
      setSelectedSlot(null);
      setSelectedSenior(null);
    }
  };

  const availableSlotsForSelectedDate = selectedDate ? getAvailableSlotsForDate(selectedDate) : [];

  // Get dates with available slots for calendar highlighting
  const datesWithSlots = timeSlots
    .filter(slot => slot.is_available)
    .map(slot => new Date(slot.date));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Calendar View</span>
          </CardTitle>
          <CardDescription>
            Select a date to view available volunteer opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border p-3"
                modifiers={{
                  available: datesWithSlots
                }}
                modifiersStyles={{
                  available: { 
                    backgroundColor: 'hsl(var(--accent))', 
                    color: 'hsl(var(--accent-foreground))' 
                  }
                }}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Highlighted dates have available volunteer slots
              </p>
            </div>

            {/* Available slots for selected date */}
            <div>
              <h3 className="font-semibold mb-4">
                Available Slots for {selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric'
                })}
              </h3>
              
              {availableSlotsForSelectedDate.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No available slots for this date</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {availableSlotsForSelectedDate.map((slot) => {
                    const senior = getSeniorById(slot.senior_id);
                    return (
                      <Card 
                        key={slot.id} 
                        className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleSlotClick(slot)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span className="font-medium">
                                {senior?.first_name} {senior?.last_name}
                              </span>
                              {senior?.age && (
                                <Badge variant="secondary" className="text-xs">
                                  Age {senior.age}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>
                                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                              </span>
                            </div>
                            {senior?.interests && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {senior.interests.slice(0, 2).map((interest, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button size="sm">
                            Book
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Confirmation Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Volunteer Booking</DialogTitle>
            <DialogDescription>
              Please confirm your volunteer session details
            </DialogDescription>
          </DialogHeader>
          
          {selectedSenior && selectedSlot && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">
                    {selectedSenior.first_name} {selectedSenior.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedSenior.bio}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedSlot.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(selectedSlot.start_time)} - {formatTime(selectedSlot.end_time)}
                  </p>
                </div>
              </div>

              {selectedSenior.interests && (
                <div>
                  <p className="text-sm font-medium mb-2">Interests to discuss:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSenior.interests.map((interest, idx) => (
                      <Badge key={idx} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarBooking;