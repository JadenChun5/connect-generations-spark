import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSelection from "@/components/UserTypeSelection";
import ValuePropositions from "@/components/ValuePropositions";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to section if coming from another page
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <UserTypeSelection />
        <ValuePropositions />
      </main>
      <Footer />
    </div>
  );
};

export default Index;