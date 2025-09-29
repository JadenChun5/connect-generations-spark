import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Building, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";

interface StaffProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  bio: string;
}

const StaffProfile = () => {
  const { user, profile: authProfile } = useAuth();
  const { markProfileComplete } = useProfileCompletion();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
  
  const [profile, setProfile] = useState<StaffProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: ""
  });

  const [editedProfile, setEditedProfile] = useState<StaffProfileData>(profile);

  useEffect(() => {
    if (authProfile) {
      fetchProfileData();
    }
  }, [authProfile]);

  const fetchProfileData = async () => {
    if (!authProfile) return;

    try {
      setLoading(true);
      
      // Fetch full profile data from profiles table
      const { data: fullProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authProfile.id)
        .single();

      if (fullProfile) {
        const profileData: StaffProfileData = {
          first_name: fullProfile.first_name || "",
          last_name: fullProfile.last_name || "",
          email: fullProfile.email || "",
          phone: fullProfile.phone || "",
          bio: fullProfile.bio || ""
        };

        setProfile(profileData);
        setEditedProfile(profileData);
        
        // Check if this is first time setup
        const isIncomplete = !profileData.first_name || !profileData.last_name || 
                            !profileData.phone || !profileData.bio;
        setIsFirstTimeSetup(isIncomplete);
        if (isIncomplete) {
          setIsEditing(true);
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!authProfile) return;

    try {
      // Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: editedProfile.first_name,
          last_name: editedProfile.last_name,
          phone: editedProfile.phone,
          bio: editedProfile.bio,
        })
        .eq('id', authProfile.id);

      if (profileError) throw profileError;

      setProfile(editedProfile);
      setIsEditing(false);
      
      if (isFirstTimeSetup) {
        setIsFirstTimeSetup(false);
        markProfileComplete();
        // Force a re-render of the dashboard
        window.dispatchEvent(new CustomEvent('profileCompleted'));
        toast.success("🎉 Profile completed successfully! You now have full access to all dashboard features!", { duration: 5000 });
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isFirstTimeSetup && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Welcome! Please complete your profile to get started with managing your senior center operations.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>My Profile</span>
              </CardTitle>
              <CardDescription>
                Manage your personal information and senior center administration details
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                {!isFirstTimeSetup && (
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                )}
                <Button onClick={handleSave}>
                  {isFirstTimeSetup ? "Complete Profile" : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.first_name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, first_name: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{profile.first_name}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.last_name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, last_name: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{profile.last_name}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone</span>
                </label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Professional Information</h3>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">Role</span>
                </div>
                <p className="text-lg font-medium text-primary">Senior Center Administrator</p>
                <p className="text-sm text-muted-foreground">Managing volunteer programs and senior care</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About Me</h3>
            {isEditing ? (
              <Textarea
                placeholder="Tell us about your experience in senior care, your management style, and what you hope to achieve with volunteer programs..."
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-muted-foreground">{profile.bio}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffProfile;