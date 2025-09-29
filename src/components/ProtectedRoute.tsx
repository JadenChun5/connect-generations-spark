import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'teen_volunteer' | 'senior_center_admin' | 'teen_admin' | 'family_member';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && user && profile && requiredRole && profile.role !== requiredRole) {
      // Redirect to appropriate dashboard based on user's actual role
      if (profile.role === 'teen_volunteer') {
        navigate('/dashboard/student');
      } else if (profile.role === 'senior_center_admin') {
        navigate('/dashboard/staff');
      } else {
        navigate('/');
      }
    }
  }, [user, profile, loading, requiredRole, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRole && profile && profile.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;