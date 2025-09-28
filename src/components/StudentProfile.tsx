import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, GraduationCap, Heart, Plus, X } from "lucide-react";
import { toast } from "sonner";

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

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [newActivity, setNewActivity] = useState("");
  
  const [profile, setProfile] = useState<StudentProfileData>({
    first_name: "Alex",
    last_name: "Student", 
    email: "alex.student@email.com",
    phone: "(555) 123-4567",
    school: "Springfield High School",
    grade: "11th Grade",
    bio: "I'm passionate about helping seniors and learning from their life experiences. I enjoy reading, playing chess, and gardening.",
    interests: ["Reading", "Chess", "Gardening", "History", "Music"],
    volunteer_hours: 24,
    preferred_activities: ["Reading together", "Playing games", "Listening to stories", "Light gardening", "Technology help"]
  });

  const [editedProfile, setEditedProfile] = useState<StudentProfileData>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
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

  return (
    <div className="space-y-6">
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
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
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