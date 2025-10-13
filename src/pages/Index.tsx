import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSelection from "@/components/UserTypeSelection";
import ValuePropositions from "@/components/ValuePropositions";
import Footer from "@/components/Footer";

const Index = () => {
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