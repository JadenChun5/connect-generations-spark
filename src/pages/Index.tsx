import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSelection from "@/components/UserTypeSelection";
import ValuePropositions from "@/components/ValuePropositions";
import DemoPreview from "@/components/DemoPreview";
import Footer from "@/components/Footer";

const Index = () => {
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