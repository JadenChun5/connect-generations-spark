import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Heart, ArrowLeft } from "lucide-react";

const FamilyMemberRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    seniorFirstName: "",
    seniorLastName: "",
    relationship: "",
    seniorCenterName: "",
    verificationInfo: ""
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const redirectUrl = `${window.location.origin}/dashboard/family-member`;
    
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          role: 'family_member',
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          senior_first_name: formData.seniorFirstName,
          senior_last_name: formData.seniorLastName,
          relationship: formData.relationship,
          senior_center_name: formData.seniorCenterName,
          verification_info: formData.verificationInfo
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
        title: "Registration submitted!",
        description: "We'll verify your relationship with the senior and contact you within 24-48 hours.",
      });
      navigate("/auth");
    }
  };

  const relationshipOptions = [
    "Child", "Grandchild", "Spouse", "Sibling", "Niece/Nephew", 
    "Son/Daughter-in-law", "Other Family Member", "Legal Guardian"
  ];

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
            <div className="bg-primary-soft p-3 rounded-xl">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Register as Family Member</CardTitle>
          <CardDescription>
            Stay connected with your senior family member's activities and support their social engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Your First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Your Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Your Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            <hr className="my-6" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="seniorFirstName">Senior's First Name</Label>
                <Input
                  id="seniorFirstName"
                  value={formData.seniorFirstName}
                  onChange={(e) => handleInputChange("seniorFirstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="seniorLastName">Senior's Last Name</Label>
                <Input
                  id="seniorLastName"
                  value={formData.seniorLastName}
                  onChange={(e) => handleInputChange("seniorLastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="relationship">Your Relationship</Label>
              <Select value={formData.relationship} onValueChange={(value) => handleInputChange("relationship", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipOptions.map(relation => (
                    <SelectItem key={relation} value={relation.toLowerCase().replace(/[^a-z0-9]/g, '_')}>
                      {relation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="seniorCenterName">Senior Center Name</Label>
              <Input
                id="seniorCenterName"
                value={formData.seniorCenterName}
                onChange={(e) => handleInputChange("seniorCenterName", e.target.value)}
                placeholder="Where does your senior family member attend?"
                required
              />
            </div>

            <div>
              <Label htmlFor="verificationInfo">Additional Information</Label>
              <Input
                id="verificationInfo"
                value={formData.verificationInfo}
                onChange={(e) => handleInputChange("verificationInfo", e.target.value)}
                placeholder="Any additional info to help us verify the relationship"
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

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> We'll verify your relationship with the senior center 
                and contact you within 24-48 hours to complete the setup process.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="family"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Registration"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyMemberRegister;