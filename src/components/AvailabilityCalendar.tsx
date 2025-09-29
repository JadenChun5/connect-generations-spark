import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AvailabilitySlot {
  id?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface AvailabilityCalendarProps {
  teenVolunteerId: string;
  onAvailabilityChange?: (availability: AvailabilitySlot[]) => void;
}

const DAYS = [
  { name: 'Sunday', short: 'Sun', value: 0 },
  { name: 'Monday', short: 'Mon', value: 1 },
  { name: 'Tuesday', short: 'Tue', value: 2 },
  { name: 'Wednesday', short: 'Wed', value: 3 },
  { name: 'Thursday', short: 'Thu', value: 4 },
  { name: 'Friday', short: 'Fri', value: 5 },
  { name: 'Saturday', short: 'Sat', value: 6 }
];

const TIME_SLOTS = [];
for (let hour = 9; hour <= 20; hour++) {
  TIME_SLOTS.push(`${hour.toString().padStart(2, '0')}:00`);
}

const TEMPLATES = {
  'After School': [
    { dayOfWeek: 1, startTime: '15:00', endTime: '18:00' }, // Monday
    { dayOfWeek: 2, startTime: '15:00', endTime: '18:00' }, // Tuesday
    { dayOfWeek: 3, startTime: '15:00', endTime: '18:00' }, // Wednesday
    { dayOfWeek: 4, startTime: '15:00', endTime: '18:00' }, // Thursday
    { dayOfWeek: 5, startTime: '15:00', endTime: '18:00' }, // Friday
  ],
  'Weekends': [
    { dayOfWeek: 0, startTime: '09:00', endTime: '18:00' }, // Sunday
    { dayOfWeek: 6, startTime: '09:00', endTime: '18:00' }, // Saturday
  ],
  'Mornings': [
    { dayOfWeek: 0, startTime: '09:00', endTime: '12:00' }, // Sunday
    { dayOfWeek: 1, startTime: '09:00', endTime: '12:00' }, // Monday
    { dayOfWeek: 2, startTime: '09:00', endTime: '12:00' }, // Tuesday
    { dayOfWeek: 3, startTime: '09:00', endTime: '12:00' }, // Wednesday
    { dayOfWeek: 4, startTime: '09:00', endTime: '12:00' }, // Thursday
    { dayOfWeek: 5, startTime: '09:00', endTime: '12:00' }, // Friday
    { dayOfWeek: 6, startTime: '09:00', endTime: '12:00' }, // Saturday
  ]
};

export function AvailabilityCalendar({ teenVolunteerId, onAvailabilityChange }: AvailabilityCalendarProps) {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAvailability();
  }, [teenVolunteerId]);

  const loadAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from('teen_availability')
        .select('*')
        .eq('teen_volunteer_id', teenVolunteerId);

      if (error) throw error;

      const slots = data.map(item => ({
        id: item.id,
        dayOfWeek: item.day_of_week,
        startTime: item.start_time,
        endTime: item.end_time
      }));

      setAvailability(slots);
      onAvailabilityChange?.(slots);
    } catch (error) {
      console.error('Error loading availability:', error);
      toast.error('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const saveAvailability = async () => {
    setSaving(true);
    try {
      // Delete existing availability
      await supabase
        .from('teen_availability')
        .delete()
        .eq('teen_volunteer_id', teenVolunteerId);

      // Insert new availability
      if (availability.length > 0) {
        const { error } = await supabase
          .from('teen_availability')
          .insert(
            availability.map(slot => ({
              teen_volunteer_id: teenVolunteerId,
              day_of_week: slot.dayOfWeek,
              start_time: slot.startTime,
              end_time: slot.endTime
            }))
          );

        if (error) throw error;
      }

      toast.success('Availability saved! Now showing matching senior centers.');
      onAvailabilityChange?.(availability);
    } catch (error) {
      console.error('Error saving availability:', error);
      toast.error('Failed to save availability');
    } finally {
      setSaving(false);
    }
  };

  const applyTemplate = (templateName: keyof typeof TEMPLATES) => {
    const template = TEMPLATES[templateName];
    setAvailability(template.map(slot => ({ ...slot })));
  };

  const toggleTimeSlot = (dayOfWeek: number, startTime: string) => {
    const endTime = `${(parseInt(startTime.split(':')[0]) + 1).toString().padStart(2, '0')}:00`;
    
    const existingIndex = availability.findIndex(
      slot => slot.dayOfWeek === dayOfWeek && slot.startTime === startTime
    );

    if (existingIndex >= 0) {
      // Remove the slot
      setAvailability(prev => prev.filter((_, index) => index !== existingIndex));
    } else {
      // Add the slot
      setAvailability(prev => [...prev, { dayOfWeek, startTime, endTime }]);
    }
  };

  const isSlotSelected = (dayOfWeek: number, startTime: string) => {
    return availability.some(
      slot => slot.dayOfWeek === dayOfWeek && slot.startTime === startTime
    );
  };

  const clearAll = () => {
    setAvailability([]);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Set My Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading availability...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set My Availability</CardTitle>
        <CardDescription>
          Click time blocks to mark when you're available. This helps us show you opportunities that match your schedule.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Templates */}
        <div className="space-y-3">
          <h4 className="font-medium">Quick Templates</h4>
          <div className="flex flex-wrap gap-2">
            {Object.keys(TEMPLATES).map(templateName => (
              <Button
                key={templateName}
                variant="outline"
                size="sm"
                onClick={() => applyTemplate(templateName as keyof typeof TEMPLATES)}
              >
                {templateName}
              </Button>
            ))}
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-3">
          <h4 className="font-medium">Weekly Schedule (9 AM - 8 PM)</h4>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-1 min-w-fit">
              {/* Header row */}
              <div className="p-2"></div>
              {DAYS.map(day => (
                <div key={day.value} className="p-2 text-center font-medium text-sm">
                  {day.short}
                </div>
              ))}

              {/* Time slots */}
              {TIME_SLOTS.slice(0, -1).map(timeSlot => {
                const hour = parseInt(timeSlot.split(':')[0]);
                const displayTime = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
                
                return (
                  <React.Fragment key={timeSlot}>
                    <div className="p-2 text-right text-sm font-medium min-w-20">
                      {displayTime}
                    </div>
                    {DAYS.map(day => (
                      <button
                        key={`${day.value}-${timeSlot}`}
                        onClick={() => toggleTimeSlot(day.value, timeSlot)}
                        className={`
                          p-2 h-10 rounded border-2 transition-colors text-xs font-medium
                          ${isSlotSelected(day.value, timeSlot)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background hover:bg-muted border-border'
                          }
                        `}
                      >
                        {isSlotSelected(day.value, timeSlot) ? '✓' : ''}
                      </button>
                    ))}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Slots Summary */}
        {availability.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Selected Availability ({availability.length} slots)</h4>
            <div className="text-sm text-muted-foreground">
              {DAYS.map(day => {
                const daySlots = availability.filter(slot => slot.dayOfWeek === day.value);
                if (daySlots.length === 0) return null;
                
                return (
                  <div key={day.value}>
                    <strong>{day.name}:</strong> {daySlots.map(slot => {
                      const startHour = parseInt(slot.startTime.split(':')[0]);
                      const endHour = parseInt(slot.endTime.split(':')[0]);
                      const startDisplay = startHour > 12 ? `${startHour - 12}:00 PM` : `${startHour}:00 AM`;
                      const endDisplay = endHour > 12 ? `${endHour - 12}:00 PM` : `${endHour}:00 AM`;
                      return `${startDisplay}-${endDisplay}`;
                    }).join(', ')}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Button 
          onClick={saveAvailability} 
          disabled={saving}
          className="w-full"
        >
          {saving ? 'Saving...' : 'Save Availability'}
        </Button>
      </CardContent>
    </Card>
  );
}