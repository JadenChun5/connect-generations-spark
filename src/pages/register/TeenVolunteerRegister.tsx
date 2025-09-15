import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, GraduationCap, ArrowLeft } from "lucide-react";

const TeenVolunteerRegister = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    schoolId: "",
    gradeLevel: "",
    interests: [] as string[],
    bio: "",
    parentEmail: "",
    parentPhone: "",
    parentConsent: false
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.parentConsent) {
      toast({
        title: "Parent consent required",
        description: "Please confirm that you have parent/guardian consent to volunteer.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const redirectUrl = `${window.location.origin}/dashboard/teen-volunteer`;
    
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          role: 'teen_volunteer',
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          grade_level: formData.gradeLevel,
          interests: formData.interests,
          bio: formData.bio,
          parent_email: formData.parentEmail,
          parent_phone: formData.parentPhone
        }
      }
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registration successful!",
        description: "Please check your email to confirm your account. You'll need admin approval to start volunteering.",
      });
      navigate("/dashboard/teen-volunteer");
    }
  };

  const interestOptions = [
    "Arts & Crafts", "Music", "Technology", "Games", "Reading", "Exercise",
    "Cooking", "Gardening", "Photography", "History", "Languages", "Pets"
  ];

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          required
        />
      </div>

      <Button onClick={() => setStep(2)} className="w-full" variant="teen">
        Next: School & Profile
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="gradeLevel">Grade Level</Label>
        <Select value={formData.gradeLevel} onValueChange={(value) => handleInputChange("gradeLevel", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select grade level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9">9th Grade</SelectItem>
            <SelectItem value="10">10th Grade</SelectItem>
            <SelectItem value="11">11th Grade</SelectItem>
            <SelectItem value="12">12th Grade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Interests & Hobbies</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {interestOptions.map(interest => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={interest}
                checked={formData.interests.includes(interest)}
                onCheckedChange={() => handleInterestToggle(interest)}
              />
              <Label htmlFor={interest} className="text-sm">{interest}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Tell us about yourself</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          placeholder="Share your hobbies, what you hope to gain from volunteering..."
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
          Back
        </Button>
        <Button onClick={() => setStep(3)} variant="teen" className="flex-1">
          Next: Parent Info
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
        <Input
          id="parentEmail"
          type="email"
          value={formData.parentEmail}
          onChange={(e) => handleInputChange("parentEmail", e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
        <Input
          id="parentPhone"
          type="tel"
          value={formData.parentPhone}
          onChange={(e) => handleInputChange("parentPhone", e.target.value)}
          required
        />
      </div>

      <div className="flex items-start space-x-2 p-4 bg-muted rounded-lg">
        <Checkbox
          id="parentConsent"
          checked={formData.parentConsent}
          onCheckedChange={(checked) => handleInputChange("parentConsent", checked)}
          required
        />
        <Label htmlFor="parentConsent" className="text-sm leading-relaxed">
          I confirm that I have permission from my parent/guardian to volunteer with ElderConnect. 
          I understand that all volunteer activities will be supervised and that my parent/guardian 
          will be contacted for verification.
        </Label>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading || !formData.parentConsent}
          variant="teen"
          className="flex-1"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Complete Registration"
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-strong">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="bg-secondary-soft p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-secondary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-secondary">Join as Teen Volunteer</CardTitle>
          <CardDescription>
            Step {step} of 3: {step === 1 ? "Basic Information" : step === 2 ? "Profile & Interests" : "Parent Consent"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeenVolunteerRegister;