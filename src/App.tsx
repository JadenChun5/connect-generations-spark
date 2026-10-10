import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
import DeleteAccount from "./pages/DeleteAccount";
import Thanks from "./pages/Thanks";
import SeniorCenters from "./pages/SeniorCenters";
import Safety from "./pages/Safety";
import Parents from "./pages/Parents";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/features" element={<Navigate to="/" replace />} />
          <Route path="/demo" element={<Navigate to="/" replace />} />
          <Route path="/connect" element={<Navigate to="/" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/support" element={<Support />} />
          <Route path="/senior-centers" element={<SeniorCenters />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/why" element={<Navigate to="/" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
