import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, GraduationCap, Heart, Plus, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";

interface StudentProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  bio: string;
  interests: string[];
  volunteer_hours: number;
  preferred_activities: string[];
}

interface TeenVolunteerData {
  id?: string;
  profile_id: string;
  school_id?: string;
  grade_level?: number;
  parent_email?: string;
  parent_phone?: string;
  interests?: string[];
  total_hours?: number;
}

const StudentProfile = () => {
  const { user, profile: authProfile } = useAuth();
  const { markProfileComplete } = useProfileCompletion();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newInterest, setNewInterest] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
  
  const [profile, setProfile] = useState<StudentProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    bio: "",
    interests: [],
    volunteer_hours: 0,
    preferred_activities: []
  });

  const [editedProfile, setEditedProfile] = useState<StudentProfileData>(profile);
  const [teenVolunteerData, setTeenVolunteerData] = useState<TeenVolunteerData | null>(null);

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

      // Fetch teen volunteer data
      const { data: teenData } = await supabase
        .from('teen_volunteers')
        .select('*')
        .eq('profile_id', authProfile.id)
        .single();

      if (teenData) {
        setTeenVolunteerData(teenData);
        
        // Combine full profile with teen volunteer data
        const combinedProfile: StudentProfileData = {
          first_name: fullProfile?.first_name || "",
          last_name: fullProfile?.last_name || "",
          email: fullProfile?.email || "",
          phone: fullProfile?.phone || "",
          school: fullProfile?.school || "",
          grade: teenData.grade_level ? String(teenData.grade_level) : "",
          bio: fullProfile?.bio || "",
          interests: teenData.interests || [],
          volunteer_hours: Number(teenData.total_hours) || 0,
          preferred_activities: teenData.preferred_activities || []
        };

        setProfile(combinedProfile);
        setEditedProfile(combinedProfile);
        
        // Check if this is first time setup
        const isIncomplete = !combinedProfile.first_name || !combinedProfile.last_name || 
                            !combinedProfile.phone || !combinedProfile.bio || 
                            combinedProfile.interests.length === 0;
        setIsFirstTimeSetup(isIncomplete);
        if (isIncomplete) {
          setIsEditing(true);
        }
      } else {
        // No teen volunteer data exists, create initial profile from full profile data
        const initialProfile: StudentProfileData = {
          first_name: fullProfile?.first_name || "",
          last_name: fullProfile?.last_name || "",
          email: fullProfile?.email || "",
          phone: fullProfile?.phone || "",
          school: "",
          grade: "",
          bio: fullProfile?.bio || "",
          interests: [],
          volunteer_hours: 0,
          preferred_activities: []
        };

        setProfile(initialProfile);
        setEditedProfile(initialProfile);
        setIsFirstTimeSetup(true);
        setIsEditing(true);
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
          school: editedProfile.school,
        })
        .eq('id', authProfile.id);

      if (profileError) throw profileError;

      // Update or create teen volunteer data
      const gradeLevel = editedProfile.grade ? parseInt(editedProfile.grade.replace(/\D/g, '')) || null : null;
      
      const teenVolunteerUpdate = {
        profile_id: authProfile.id,
        grade_level: gradeLevel,
        interests: editedProfile.interests,
        preferred_activities: editedProfile.preferred_activities,
        total_hours: editedProfile.volunteer_hours
      };

      if (teenVolunteerData) {
        // Update existing teen volunteer record
        const { error: teenError } = await supabase
          .from('teen_volunteers')
          .update(teenVolunteerUpdate)
          .eq('id', teenVolunteerData.id);
        
        if (teenError) throw teenError;
      } else {
        // Create new teen volunteer record
        const { data: newTeenData, error: teenError } = await supabase
          .from('teen_volunteers')
          .insert(teenVolunteerUpdate)
          .select()
          .single();
        
        if (teenError) throw teenError;
        setTeenVolunteerData(newTeenData);
      }

      setProfile(editedProfile);
      setIsEditing(false);
      
      if (isFirstTimeSetup) {
        setIsFirstTimeSetup(false);
        console.log('🎯 Profile completed - updating state');
        // Force update the profile completion state immediately
        markProfileComplete();
        // Force a page refresh to ensure state is updated
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast.success("🎉 Profile completed successfully! Refreshing to enable all features...", { duration: 3000 });
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

  const addInterest = () => {
    if (newInterest.trim() && !editedProfile.interests.includes(newInterest.trim())) {
      setEditedProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setEditedProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addActivity = () => {
    if (newActivity.trim() && !editedProfile.preferred_activities.includes(newActivity.trim())) {
      setEditedProfile(prev => ({
        ...prev,
        preferred_activities: [...prev.preferred_activities, newActivity.trim()]
      }));
      setNewActivity("");
    }
  };

  const removeActivity = (activity: string) => {
    setEditedProfile(prev => ({
      ...prev,
      preferred_activities: prev.preferred_activities.filter(a => a !== activity)
    }));
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
            <strong>Welcome! Please complete your profile to get started with volunteering opportunities.</strong>
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
                Manage your personal information and volunteer preferences
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
              <h3 className="font-semibold text-lg">School Information</h3>
              
              <div>
                <label className="text-sm font-medium flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>School</span>
                </label>
                {isEditing ? (
                  <Input
                    value={editedProfile.school}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, school: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profile.school}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Grade Level</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.grade}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, grade: e.target.value }))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profile.grade}</p>
                )}
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="font-semibold">Volunteer Hours</span>
                </div>
                <p className="text-2xl font-bold text-primary">{profile.volunteer_hours}</p>
                <p className="text-sm text-muted-foreground">Total hours completed</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About Me</h3>
            {isEditing ? (
              <Textarea
                placeholder="Tell us about yourself, your goals, and what you hope to gain from volunteering..."
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-muted-foreground">{profile.bio}</p>
            )}
          </div>

          {/* Interests */}
          <div>
            <h3 className="font-semibold text-lg mb-4">My Interests</h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile.interests : profile.interests).map((interest, idx) => (
                  <Badge key={idx} variant="secondary" className="relative">
                    {interest}
                    {isEditing && (
                      <button
                        onClick={() => removeInterest(interest)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add new interest..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                  />
                  <Button size="sm" onClick={addInterest}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Preferred Activities */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Preferred Volunteer Activities</h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile.preferred_activities : profile.preferred_activities).map((activity, idx) => (
                  <Badge key={idx} variant="outline" className="relative">
                    {activity}
                    {isEditing && (
                      <button
                        onClick={() => removeActivity(activity)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add preferred activity..."
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addActivity()}
                  />
                  <Button size="sm" onClick={addActivity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;