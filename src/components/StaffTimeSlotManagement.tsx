import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Clock, User, Plus, Edit, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

interface Senior {
  id: string;
  first_name: string;
  last_name: string;
}

interface TimeSlot {
  id: string;
  senior_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  max_volunteers: number;
  current_bookings: number;
}

interface StaffTimeSlotManagementProps {
  seniors: Senior[];
}

const StaffTimeSlotManagement = ({ seniors }: StaffTimeSlotManagementProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 'slot-1',
      senior_id: 'senior-1',
      date: '2025-01-15',
      start_time: '14:00',
      end_time: '16:00',
      is_available: true,
      max_volunteers: 2,
      current_bookings: 1
    },
    {
      id: 'slot-2',
      senior_id: 'senior-2',
      date: '2025-01-15',
      start_time: '10:00',
      end_time: '12:00',
      is_available: true,
      max_volunteers: 1,
      current_bookings: 0
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [newSlot, setNewSlot] = useState({
    senior_id: '',
    start_time: '',
    end_time: '',
    max_volunteers: 1
  });

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getSeniorName = (seniorId: string) => {
    const senior = seniors.find(s => s.id === seniorId);
    return senior ? `${senior.first_name} ${senior.last_name}` : 'Unknown Senior';
  };

  const getSlotsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return timeSlots.filter(slot => slot.date === dateString);
  };

  const openAddDialog = () => {
    setEditingSlot(null);
    setNewSlot({
      senior_id: '',
      start_time: '',
      end_time: '',
      max_volunteers: 1
    });
    setDialogOpen(true);
  };

  const openEditDialog = (slot: TimeSlot) => {
    setEditingSlot(slot);
    setNewSlot({
      senior_id: slot.senior_id,
      start_time: slot.start_time,
      end_time: slot.end_time,
      max_volunteers: slot.max_volunteers
    });
    setDialogOpen(true);
  };

  const handleSaveSlot = () => {
    if (!selectedDate || !newSlot.senior_id || !newSlot.start_time || !newSlot.end_time) {
      toast.error("Please fill in all fields");
      return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];

    if (editingSlot) {
      // Update existing slot
      setTimeSlots(prev => prev.map(slot =>
        slot.id === editingSlot.id
          ? {
              ...slot,
              senior_id: newSlot.senior_id,
              start_time: newSlot.start_time,
              end_time: newSlot.end_time,
              max_volunteers: newSlot.max_volunteers
            }
          : slot
      ));
      toast.success("Time slot updated successfully");
    } else {
      // Add new slot
      const newTimeSlot: TimeSlot = {
        id: `slot-${Date.now()}`,
        senior_id: newSlot.senior_id,
        date: dateString,
        start_time: newSlot.start_time,
        end_time: newSlot.end_time,
        is_available: true,
        max_volunteers: newSlot.max_volunteers,
        current_bookings: 0
      };
      setTimeSlots(prev => [...prev, newTimeSlot]);
      toast.success("Time slot created successfully");
    }

    setDialogOpen(false);
  };

  const handleDeleteSlot = (slotId: string) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== slotId));
    toast.success("Time slot deleted successfully");
  };

  const toggleSlotAvailability = (slotId: string) => {
    setTimeSlots(prev => prev.map(slot =>
      slot.id === slotId
        ? { ...slot, is_available: !slot.is_available }
        : slot
    ));
  };

  const slotsForSelectedDate = selectedDate ? getSlotsForDate(selectedDate) : [];

  // Get dates with existing slots for calendar highlighting
  const datesWithSlots = timeSlots.map(slot => new Date(slot.date));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Time Slot Management</span>
          </CardTitle>
          <CardDescription>
            Manage volunteer time slots for your senior residents
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
                  hasSlots: datesWithSlots
                }}
                modifiersStyles={{
                  hasSlots: {
                    backgroundColor: 'hsl(var(--accent))',
                    color: 'hsl(var(--accent-foreground))'
                  }
                }}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Highlighted dates have existing time slots
              </p>
            </div>

            {/* Time slots for selected date */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  Slots for {selectedDate?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <Button size="sm" onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Slot
                </Button>
              </div>

              {slotsForSelectedDate.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No time slots for this date</p>
                  <Button className="mt-2" onClick={openAddDialog}>
                    Create First Slot
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {slotsForSelectedDate.map((slot) => (
                    <Card key={slot.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{getSeniorName(slot.senior_id)}</span>
                            <Badge variant={slot.is_available ? 'default' : 'secondary'}>
                              {slot.is_available ? 'Available' : 'Unavailable'}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            Bookings: {slot.current_bookings}/{slot.max_volunteers}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleSlotAvailability(slot.id)}
                          >
                            {slot.is_available ? 'Disable' : 'Enable'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(slot)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteSlot(slot.id)}
                            disabled={slot.current_bookings > 0}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSlot ? 'Edit Time Slot' : 'Add New Time Slot'}
            </DialogTitle>
            <DialogDescription>
              {editingSlot ? 'Update the time slot details' : 'Create a new volunteer time slot'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Senior Resident</label>
              <Select
                value={newSlot.senior_id}
                onValueChange={(value) => setNewSlot(prev => ({ ...prev, senior_id: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a senior resident" />
                </SelectTrigger>
                <SelectContent>
                  {seniors.map(senior => (
                    <SelectItem key={senior.id} value={senior.id}>
                      {senior.first_name} {senior.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Time</label>
                <Input
                  type="time"
                  value={newSlot.start_time}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, start_time: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">End Time</label>
                <Input
                  type="time"
                  value={newSlot.end_time}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, end_time: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Max Volunteers</label>
              <Input
                type="number"
                min="1"
                max="5"
                value={newSlot.max_volunteers}
                onChange={(e) => setNewSlot(prev => ({ ...prev, max_volunteers: parseInt(e.target.value) || 1 }))}
                className="mt-1"
              />
            </div>

            {selectedDate && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  <strong>Date:</strong> {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSlot}>
              {editingSlot ? 'Update Slot' : 'Create Slot'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffTimeSlotManagement;