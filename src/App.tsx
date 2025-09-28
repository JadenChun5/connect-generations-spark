import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Connect from "./pages/Connect";
import NotFound from "./pages/NotFound";
import TeenVolunteerRegister from "./pages/register/TeenVolunteerRegister";
import TeenAdminRegister from "./pages/register/TeenAdminRegister";
import SeniorCenterAdminRegister from "./pages/register/SeniorCenterAdminRegister";
import FamilyMemberRegister from "./pages/register/FamilyMemberRegister";
import TeenVolunteerDashboard from "./pages/dashboard/TeenVolunteerDashboard";
import TeenAdminDashboard from "./pages/dashboard/TeenAdminDashboard";
import SeniorCenterAdminDashboard from "./pages/dashboard/SeniorCenterAdminDashboard";
import Demo from "./pages/Demo";
import FamilyMemberDashboard from "./pages/dashboard/FamilyMemberDashboard";

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
            <Route path="/demo" element={<Demo />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect" element={<Connect />} />
            <Route 
              path="/dashboard/teen-volunteer" 
              element={
                <ProtectedRoute requiredRole="teen_volunteer">
                  <TeenVolunteerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/teen-admin" 
              element={
                <ProtectedRoute requiredRole="teen_admin">
                  <TeenAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/senior-center-admin" 
              element={
                <ProtectedRoute requiredRole="senior_center_admin">
                  <SeniorCenterAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/family-member" 
              element={
                <ProtectedRoute requiredRole="family_member">
                  <FamilyMemberDashboard />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
