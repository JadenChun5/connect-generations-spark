import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Star, FileText, Filter, Search } from "lucide-react";
import { toast } from "sonner";

interface Visit {
  id: string;
  student: {
    name: string;
    email: string;
    phone: string;
  };
  senior: {
    id: string;
    name: string;
  };
  date: string;
  start_time: string;
  end_time: string;
  status: 'completed' | 'cancelled' | 'no-show';
  hours_logged: number;
  student_rating?: number;
  senior_feedback?: string;
  staff_notes?: string;
  activities: string[];
}

const VisitHistory = () => {
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: 'visit-1',
      student: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com', 
        phone: '(555) 123-4567'
      },
      senior: {
        id: 'senior-1',
        name: 'Dorothy Johnson'
      },
      date: '2024-12-20',
      start_time: '14:00',
      end_time: '16:00',
      status: 'completed',
      hours_logged: 2,
      student_rating: 5,
      senior_feedback: 'Sarah was wonderful! We had great conversations about books and she helped me organize my library.',
      staff_notes: 'Excellent visit. Dorothy was very happy and engaged.',
      activities: ['Reading', 'Organizing', 'Conversation']
    },
    {
      id: 'visit-2',
      student: {
        name: 'Michael Chen',
        email: 'michael.c@email.com',
        phone: '(555) 987-6543'
      },
      senior: {
        id: 'senior-2', 
        name: 'Robert Miller'
      },
      date: '2024-12-18',
      start_time: '15:00',
      end_time: '17:00',
      status: 'completed',
      hours_logged: 2,
      student_rating: 4,
      senior_feedback: 'Michael taught me some new chess moves. Very patient and kind.',
      staff_notes: 'Robert really enjoyed the chess games. Good match!',
      activities: ['Chess', 'Strategy games']
    },
    {
      id: 'visit-3',
      student: {
        name: 'Emma Wilson',
        email: 'emma.w@email.com',
        phone: '(555) 555-5555'
      },
      senior: {
        id: 'senior-3',
        name: 'Margaret Davis'
      },
      date: '2024-12-15',
      start_time: '13:00',
      end_time: '15:00', 
      status: 'cancelled',
      hours_logged: 0,
      staff_notes: 'Student had to cancel due to illness. Rescheduled for next week.',
      activities: []
    }
  ]);

  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editNotesDialogOpen, setEditNotesDialogOpen] = useState(false);
  const [staffNotes, setStaffNotes] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  const filteredVisits = visits.filter(visit => {
    const matchesStatus = filterStatus === "all" || visit.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      visit.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.senior.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const openDetailsDialog = (visit: Visit) => {
    setSelectedVisit(visit);
    setDetailsDialogOpen(true);
  };

  const openEditNotesDialog = (visit: Visit) => {
    setSelectedVisit(visit);
    setStaffNotes(visit.staff_notes || "");
    setEditNotesDialogOpen(true);
  };

  const saveStaffNotes = () => {
    if (selectedVisit) {
      setVisits(prev => prev.map(visit =>
        visit.id === selectedVisit.id
          ? { ...visit, staff_notes: staffNotes }
          : visit
      ));
      toast.success("Staff notes updated successfully");
      setEditNotesDialogOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'cancelled': return 'secondary';
      case 'no-show': return 'destructive';
      default: return 'outline';
    }
  };

  const totalHours = visits.reduce((sum, visit) => sum + visit.hours_logged, 0);
  const completedVisits = visits.filter(v => v.status === 'completed').length;
  const averageRating = visits
    .filter(v => v.student_rating)
    .reduce((sum, v) => sum + (v.student_rating || 0), 0) / visits.filter(v => v.student_rating).length || 0;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalHours}</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold">{completedVisits}</p>
                <p className="text-sm text-muted-foreground">Completed Visits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visit History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Visit History</span>
          </CardTitle>
          <CardDescription>
            Track and manage all volunteer visits at your center
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student or senior name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredVisits.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl font-semibold mb-2">No Visits Found</p>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Visit records will appear here as volunteers complete sessions"
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVisits.map((visit) => (
                <Card key={visit.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="font-semibold">{visit.student.name}</span>
                        <span className="text-muted-foreground">visited</span>
                        <span className="font-medium">{visit.senior.name}</span>
                        <Badge variant={getStatusColor(visit.status)}>
                          {visit.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(visit.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(visit.start_time)} - {formatTime(visit.end_time)}</span>
                        </div>
                        {visit.hours_logged > 0 && (
                          <span className="font-medium">{visit.hours_logged} hours logged</span>
                        )}
                      </div>

                      {visit.student_rating && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Student Rating:</span>
                          <div className="flex space-x-1">
                            {renderStars(visit.student_rating)}
                          </div>
                        </div>
                      )}

                      {visit.activities.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {visit.activities.map((activity, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openDetailsDialog(visit)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditNotesDialog(visit)}
                      >
                        {visit.staff_notes ? 'Edit Notes' : 'Add Notes'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Visit Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Visit Details</DialogTitle>
          </DialogHeader>
          
          {selectedVisit && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Student Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedVisit.student.name}</p>
                    <p><strong>Email:</strong> {selectedVisit.student.email}</p>
                    <p><strong>Phone:</strong> {selectedVisit.student.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Visit Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Senior:</strong> {selectedVisit.senior.name}</p>
                    <p><strong>Date:</strong> {formatDate(selectedVisit.date)}</p>
                    <p><strong>Time:</strong> {formatTime(selectedVisit.start_time)} - {formatTime(selectedVisit.end_time)}</p>
                    <p><strong>Status:</strong> 
                      <Badge className="ml-2" variant={getStatusColor(selectedVisit.status)}>
                        {selectedVisit.status}
                      </Badge>
                    </p>
                    {selectedVisit.hours_logged > 0 && (
                      <p><strong>Hours:</strong> {selectedVisit.hours_logged}</p>
                    )}
                  </div>
                </div>
              </div>

              {selectedVisit.activities.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVisit.activities.map((activity, idx) => (
                      <Badge key={idx} variant="secondary">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedVisit.student_rating && (
                <div>
                  <h3 className="font-semibold mb-2">Student Rating</h3>
                  <div className="flex space-x-1">
                    {renderStars(selectedVisit.student_rating)}
                  </div>
                </div>
              )}

              {selectedVisit.senior_feedback && (
                <div>
                  <h3 className="font-semibold mb-2">Senior Feedback</h3>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg">
                    {selectedVisit.senior_feedback}
                  </p>
                </div>
              )}

              {selectedVisit.staff_notes && (
                <div>
                  <h3 className="font-semibold mb-2">Staff Notes</h3>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg">
                    {selectedVisit.staff_notes}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Notes Dialog */}
      <Dialog open={editNotesDialogOpen} onOpenChange={setEditNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Staff Notes</DialogTitle>
            <DialogDescription>
              Add or update notes about this visit
            </DialogDescription>
          </DialogHeader>
          
          <div>
            <Textarea
              placeholder="Add notes about the visit, observations, or follow-up items..."
              value={staffNotes}
              onChange={(e) => setStaffNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditNotesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveStaffNotes}>
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisitHistory;