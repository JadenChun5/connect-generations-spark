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
  // Temporarily bypass all auth checks for development
  return <>{children}</>;
};

export default ProtectedRoute;