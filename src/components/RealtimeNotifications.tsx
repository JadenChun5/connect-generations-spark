import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface VolunteerNotification {
  id: string;
  type: 'volunteer_request';
  data: {
    volunteerName: string;
    volunteerEmail: string;
    volunteerPhone: string;
    seniorName: string;
    date: string;
    startTime: string;
    endTime: string;
    activityType?: string;
  };
  timestamp: string;
  read: boolean;
}

interface RealtimeNotificationsProps {
  onRequestAction?: (requestId: string, action: 'approve' | 'deny') => void;
}

export function RealtimeNotifications({ onRequestAction }: RealtimeNotificationsProps) {
  const [notifications, setNotifications] = useState<VolunteerNotification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Set up real-time subscription for volunteer requests
    const channel = supabase
      .channel('volunteer-notifications')
      .on('broadcast', { event: 'volunteer_request' }, (payload) => {
        console.log('Received volunteer request notification:', payload);
        
        const notification: VolunteerNotification = {
          id: `notification_${Date.now()}`,
          type: 'volunteer_request',
          data: payload.payload,
          timestamp: new Date().toISOString(),
          read: false
        };

        setNotifications(prev => [notification, ...prev]);
        
        // Show toast notification
        toast("🔔 New Volunteer Request", {
          description: `${payload.payload.volunteerName} wants to volunteer with ${payload.payload.seniorName}`,
          duration: 5000,
        });
      })
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
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

  const handleAction = async (notificationId: string, action: 'approve' | 'deny') => {
    // Mark notification as read
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );

    // Call parent handler if provided
    if (onRequestAction) {
      onRequestAction(notificationId, action);
    }

    // Show success message
    toast.success(`Volunteer request ${action === 'approve' ? 'approved' : 'declined'}!`);

    // If approved, send confirmation email with real center data
    if (action === 'approve') {
      const notification = notifications.find(n => n.id === notificationId);
      if (notification) {
        try {
          console.log('📧 Fetching center data for approval confirmation email...');
          
          // Fetch the user's profile to get their center
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            throw new Error('User not authenticated');
          }

          // Get staff profile and their center
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('user_id', user.id)
            .single();

          if (profileError) throw profileError;

          const { data: centerData, error: centerError } = await supabase
            .from('senior_centers')
            .select(`
              id,
              name,
              address,
              city,
              state,
              zip_code,
              contact_phone,
              contact_email
            `)
            .eq('admin_id', profile.id)
            .single();

          if (centerError) {
            console.error('Error fetching center data:', centerError);
            throw new Error('Could not load center information');
          }

          // Fetch requirements for this center
          const { data: requirementsData, error: requirementsError } = await supabase
            .from('senior_center_requirements')
            .select('*')
            .eq('senior_center_id', centerData.id)
            .maybeSingle();

          if (requirementsError) {
            console.error('Error fetching requirements:', requirementsError);
          }

          const fullAddress = `${centerData.address}, ${centerData.city}, ${centerData.state} ${centerData.zip_code}`;

          console.log('📧 Sending approval confirmation email with real data:', {
            center: centerData.name,
            address: fullAddress,
            hasRequirements: !!requirementsData
          });

          const { error: emailError } = await supabase.functions.invoke('send-approval-confirmation', {
            body: {
              teenName: notification.data.volunteerName,
              teenEmail: notification.data.volunteerEmail,
              seniorName: notification.data.seniorName,
              seniorCenterName: centerData.name,
              seniorCenterAddress: fullAddress,
              seniorCenterPhone: centerData.phone || '(Contact center for phone)',
              date: notification.data.date,
              startTime: notification.data.startTime,
              endTime: notification.data.endTime,
              requirements: requirementsData || {
                health_requirements: '',
                dress_code: '',
                general_expectations: '',
                safety_notes: ''
              },
              activityType: notification.data.activityType
            }
          });

          if (emailError) {
            console.error('❌ Email API error:', emailError);
            toast.error('Failed to send confirmation email. Check console for details.');
          } else {
            console.log('✅ Confirmation email sent successfully!');
            toast.success('Confirmation email sent to volunteer!');
          }
        } catch (error) {
          console.error('❌ Error in approval email flow:', error);
          toast.error(`Failed to send confirmation email: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (notifications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Real-time Notifications</span>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Connecting..."}
            </Badge>
          </CardTitle>
          <CardDescription>
            New volunteer requests will appear here instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl font-semibold mb-2">No New Notifications</p>
            <p className="text-muted-foreground">
              Volunteer requests will appear here in real-time
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Live Notifications</span>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Connecting..."}
            </Badge>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} new</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          Real-time volunteer request notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`p-4 ${!notification.read ? 'border-l-4 border-l-primary bg-primary/5' : 'border-l-4 border-l-muted'}`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-primary">🔔 New Volunteer Request</h4>
                    <p className="text-sm text-muted-foreground">
                      {notification.data.volunteerName} has requested to volunteer
                    </p>
                  </div>
                  {!notification.read && (
                    <Badge variant="destructive" className="text-xs">New</Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Senior: <strong>{notification.data.seniorName}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatDate(notification.data.date)} at {formatTime(notification.data.startTime)} - {formatTime(notification.data.endTime)}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>Contact: {notification.data.volunteerEmail} • {notification.data.volunteerPhone}</p>
                  {notification.data.activityType && (
                    <p>Activity: {notification.data.activityType}</p>
                  )}
                </div>
                
                {!notification.read && (
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAction(notification.id, 'deny')}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleAction(notification.id, 'approve')}
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
      </CardContent>
    </Card>
  );
}