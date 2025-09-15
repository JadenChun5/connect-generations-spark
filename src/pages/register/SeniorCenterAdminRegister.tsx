import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Users2, ArrowLeft } from "lucide-react";

const SeniorCenterAdminRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    centerName: "",
    centerAddress: "",
    centerCity: "",
    centerState: "",
    centerZip: "",
    centerPhone: "",
    position: "",
    bio: ""
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
    
    const redirectUrl = `${window.location.origin}/dashboard/senior-center-admin`;
    
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          role: 'senior_center_admin',
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          center_name: formData.centerName,
          center_address: formData.centerAddress,
          center_city: formData.centerCity,
          center_state: formData.centerState,
          center_zip: formData.centerZip,
          center_phone: formData.centerPhone,
          position: formData.position,
          bio: formData.bio
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
        description: "Please check your email to confirm your account and set up your senior center.",
      });
      navigate("/dashboard/senior-center-admin");
    }
  };

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
            <div className="bg-accent-soft p-3 rounded-xl">
              <Users2 className="h-8 w-8 text-accent" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-accent">Register Senior Center</CardTitle>
          <CardDescription>
            Set up your senior center to connect with teen volunteers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <Label htmlFor="position">Your Position/Title</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="e.g., Activities Director, Administrator"
                required
              />
            </div>

            <hr className="my-6" />

            <div>
              <Label htmlFor="centerName">Senior Center Name</Label>
              <Input
                id="centerName"
                value={formData.centerName}
                onChange={(e) => handleInputChange("centerName", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="centerAddress">Center Address</Label>
              <Input
                id="centerAddress"
                value={formData.centerAddress}
                onChange={(e) => handleInputChange("centerAddress", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="centerCity">City</Label>
                <Input
                  id="centerCity"
                  value={formData.centerCity}
                  onChange={(e) => handleInputChange("centerCity", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="centerState">State</Label>
                <Input
                  id="centerState"
                  value={formData.centerState}
                  onChange={(e) => handleInputChange("centerState", e.target.value)}
                  placeholder="CA"
                  required
                />
              </div>
              <div>
                <Label htmlFor="centerZip">ZIP Code</Label>
                <Input
                  id="centerZip"
                  value={formData.centerZip}
                  onChange={(e) => handleInputChange("centerZip", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="centerPhone">Center Phone Number</Label>
              <Input
                id="centerPhone"
                type="tel"
                value={formData.centerPhone}
                onChange={(e) => handleInputChange("centerPhone", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="bio">About Your Center</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Brief description of your center, programs, and resident population..."
                rows={3}
                required
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

            <Button
              type="submit"
              disabled={loading}
              variant="senior"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeniorCenterAdminRegister;