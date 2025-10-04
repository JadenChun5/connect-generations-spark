import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { UserPlus, Edit } from "lucide-react";
import { AddSeniorDialog } from "@/components/AddSeniorDialog";

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

interface SeniorsManagementProps {
  seniors: Senior[];
  onSeniorAdded: (newSenior?: any) => void;
  onEditSenior: (senior: Senior) => void;
  seniorCenterId: string;
  isProfileComplete: boolean;
}

export const SeniorsManagement = ({ 
  seniors, 
  onSeniorAdded, 
  onEditSenior, 
  seniorCenterId,
  isProfileComplete 
}: SeniorsManagementProps) => {
  const [addSeniorDialogOpen, setAddSeniorDialogOpen] = useState(false);
  const [profileWarningOpen, setProfileWarningOpen] = useState(false);

  const handleAddSeniorClick = () => {
    if (!isProfileComplete) {
      setProfileWarningOpen(true);
      return;
    }
    setAddSeniorDialogOpen(true);
  };

  const handleEditSeniorClick = (senior: Senior) => {
    if (!isProfileComplete) {
      setProfileWarningOpen(true);
      return;
    }
    onEditSenior(senior);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Senior Residents ({seniors.length})</span>
            </div>
            <Button 
              variant="secondary" 
              onClick={handleAddSeniorClick}
            >
              Add New Senior
            </Button>
          </CardTitle>
          <CardDescription>
            Manage senior resident profiles and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          {seniors.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl font-semibold mb-2">No Seniors Added Yet</p>
              <p className="text-muted-foreground mb-6">
                Start by adding senior resident profiles to enable volunteer matching
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleAddSeniorClick}
              >
                Add First Senior Profile
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seniors.map((senior) => (
                <Card key={senior.id} className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {senior.first_name} {senior.last_name}
                      </h3>
                      {senior.age && (
                        <p className="text-sm text-muted-foreground">Age: {senior.age}</p>
                      )}
                    </div>
                    
                    {senior.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {senior.bio}
                      </p>
                    )}
                    
                    {senior.interests && senior.interests.length > 0 && (
                      <div>
                        <p className="text-xs font-medium mb-1">Interests:</p>
                        <div className="flex flex-wrap gap-1">
                          {senior.interests.slice(0, 3).map((interest: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {senior.interests.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{senior.interests.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditSeniorClick(senior)}
                      className="mt-2"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Profile
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddSeniorDialog
        open={addSeniorDialogOpen}
        onOpenChange={setAddSeniorDialogOpen}
        onSeniorAdded={onSeniorAdded}
        seniorCenterId={seniorCenterId}
      />

      {/* Profile Completion Warning Dialog */}
      <Dialog open={profileWarningOpen} onOpenChange={setProfileWarningOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogDescription>
              You need to complete your profile before you can add or edit senior residents.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setProfileWarningOpen(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
