import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSelection from "@/components/UserTypeSelection";
import ValuePropositions from "@/components/ValuePropositions";
import DemoPreview from "@/components/DemoPreview";
import Footer from "@/components/Footer";

const Index = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  const getRoleDashboardPath = (role: string) => {
    switch (role) {
      case 'teen_volunteer':
        return '/dashboard/teen-volunteer';
      case 'teen_admin':
        return '/dashboard/teen-admin';
      case 'senior_center_admin':
        return '/dashboard/senior-center-admin';
      case 'family_member':
        return '/dashboard/family-member';
      default:
        return '/';
    }
  };

  useEffect(() => {
    // Redirect existing users with profiles to their dashboard
    if (!loading && user && profile) {
      navigate(getRoleDashboardPath(profile.role));
    }
  }, [user, profile, loading, navigate]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <UserTypeSelection />
        <ValuePropositions />
        <DemoPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;