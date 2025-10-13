import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Connect from "./pages/Connect";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StaffDashboard from "./pages/dashboard/StaffDashboard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard/student" 
              element={
                <ProtectedRoute requiredRole="teen_volunteer">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/staff" 
              element={
                <ProtectedRoute requiredRole="senior_center_admin">
                  <StaffDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirects for old routes */}
            <Route path="/dashboard/teen-volunteer" element={<Navigate to="/dashboard/student" replace />} />
            <Route path="/dashboard/teen-admin" element={<Navigate to="/dashboard/staff" replace />} />
            <Route path="/dashboard/family-member" element={<Navigate to="/dashboard/student" replace />} />
            <Route path="/dashboard/senior-center-admin" element={<Navigate to="/dashboard/staff" replace />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
