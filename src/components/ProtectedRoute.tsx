import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'teen_volunteer' | 'teen_admin' | 'senior_center_admin' | 'family_member';
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  redirectTo = "/auth" 
}: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If no user, redirect to auth
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If user exists but no profile yet, redirect to role selection
  if (!profile) {
    return <Navigate to="/#user-type-selection" replace />;
  }

  // If specific role required and user doesn't have it, redirect
  if (requiredRole && profile.role !== requiredRole) {
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
    return <Navigate to={getRoleDashboardPath(profile.role)} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;