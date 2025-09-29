import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Building2, Heart, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
});

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'role-select'>('role-select');
  const [selectedRole, setSelectedRole] = useState<'teen_volunteer' | 'senior_center_admin' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'teen_volunteer' | 'senior_center_admin') => {
    setSelectedRole(role);
    setMode('signup');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form data
      const validatedData = loginSchema.parse({
        email: formData.email,
        password: formData.password,
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        toast.success("Successfully logged in!");
        
        // Fetch user profile to determine dashboard redirect
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (profile?.role === 'teen_volunteer') {
          navigate('/dashboard/student');
        } else if (profile?.role === 'senior_center_admin') {
          navigate('/dashboard/staff');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    setLoading(true);
    setError('');

    try {
      // Validate form data
      const validatedData = signupSchema.parse({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            role: selectedRole,
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
          }
        }
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        // Success message and direct navigation to dashboard
        toast.success("Account created successfully! Complete your profile to get started.");
        
        // Navigate directly to role-specific dashboard
        if (selectedRole === 'teen_volunteer') {
          navigate('/dashboard/student');
        } else if (selectedRole === 'senior_center_admin') {
          navigate('/dashboard/staff');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  if (mode === 'role-select') {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-smooth">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gradient-hero p-2 rounded-lg shadow-soft">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">ElderConnect</h1>
            </div>
            <p className="text-muted-foreground">Choose your role to get started</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card 
              className="cursor-pointer hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
              onClick={() => handleRoleSelect('teen_volunteer')}
            >
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-secondary to-secondary-soft p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-soft">
                  <GraduationCap className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl">High School Student</CardTitle>
                <CardDescription className="text-sm">
                  Volunteer and earn community service hours by spending time with seniors
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Find volunteer opportunities</li>
                  <li>• Track community service hours</li>
                  <li>• Build meaningful connections</li>
                  <li>• Develop life skills</li>
                </ul>
                <Button className="w-full" variant="secondary">
                  Continue as Student
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
              onClick={() => handleRoleSelect('senior_center_admin')}
            >
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-soft">
                  <Building2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Senior Center Staff</CardTitle>
                <CardDescription className="text-sm">
                  Manage volunteer programs and coordinate activities for your senior center
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Manage volunteer schedules</li>
                  <li>• Coordinate senior activities</li>
                  <li>• Track volunteer hours</li>
                  <li>• Oversee safety requirements</li>
                </ul>
                <Button className="w-full" variant="default">
                  Continue as Staff
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t">
            <p className="text-muted-foreground mb-3">
              Already have an account?
            </p>
            <Button 
              variant="outline" 
              onClick={() => setMode('login')}
              className="min-w-[120px]"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-medium">
        <CardHeader className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 text-muted-foreground hover:text-foreground transition-smooth">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <CardTitle className="text-2xl">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {mode === 'login' 
              ? 'Sign in to your ElderConnect account' 
              : `Sign up as ${selectedRole === 'teen_volunteer' ? 'High School Student' : 'Senior Center Staff'}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange('email')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleInputChange('password')}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            {mode === 'login' ? (
              <div>
                <p className="text-muted-foreground text-sm mb-3">
                  Don't have an account?
                </p>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setMode('role-select')}
                  className="min-w-[120px]"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground text-sm mb-3">
                  Already have an account?
                </p>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setMode('login')}
                  className="min-w-[120px]"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;