import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import TeenVolunteerRegister from "./pages/register/TeenVolunteerRegister";
import TeenAdminRegister from "./pages/register/TeenAdminRegister";
import SeniorCenterAdminRegister from "./pages/register/SeniorCenterAdminRegister";
import FamilyMemberRegister from "./pages/register/FamilyMemberRegister";
import TeenVolunteerDashboard from "./pages/dashboard/TeenVolunteerDashboard";
import TeenAdminDashboard from "./pages/dashboard/TeenAdminDashboard";
import SeniorCenterAdminDashboard from "./pages/dashboard/SeniorCenterAdminDashboard";
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
            <Route path="/auth" element={<Auth />} />
            <Route path="/register/teen-volunteer" element={<TeenVolunteerRegister />} />
            <Route path="/register/teen-admin" element={<TeenAdminRegister />} />
            <Route path="/register/senior-center-admin" element={<SeniorCenterAdminRegister />} />
            <Route path="/register/family-member" element={<FamilyMemberRegister />} />
            <Route path="/dashboard/teen-volunteer" element={<TeenVolunteerDashboard />} />
            <Route path="/dashboard/teen-admin" element={<TeenAdminDashboard />} />
            <Route path="/dashboard/senior-center-admin" element={<SeniorCenterAdminDashboard />} />
            <Route path="/dashboard/family-member" element={<FamilyMemberDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
