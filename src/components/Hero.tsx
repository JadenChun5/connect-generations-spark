import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Award, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Message */}
          <div className="text-center lg:text-left text-white">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Heart className="h-6 w-6 text-secondary" />
              <span className="text-secondary-soft font-medium tracking-wide">ELDERCONNECT</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Bridging
              <span className="text-secondary block">Generations</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-primary-soft mb-8 leading-relaxed">
              Connect high school teens with seniors for meaningful volunteer opportunities. 
              Build community, earn college hours, and create lasting friendships across generations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl" 
                className="font-semibold"
                onClick={() => navigate('/signup')}
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => navigate('/demo')}
              >
                Try Demo
              </Button>
            </div>
            
            {/* Stats Row */}
            <div className="flex justify-center lg:justify-start gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">500+</div>
                <div className="text-sm text-primary-soft">Teen Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-primary-soft">Senior Centers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">15K+</div>
                <div className="text-sm text-primary-soft">Volunteer Hours</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Quick Value Cards */}
          <div className="grid gap-6">
            <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-strong border-0">
              <div className="flex items-start gap-4">
                <div className="bg-secondary-soft p-3 rounded-lg">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">For High School Students</h3>
                  <p className="text-muted-foreground text-sm">
                    Earn meaningful volunteer hours for college applications while building real relationships with seniors in your community.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-strong border-0">
              <div className="flex items-start gap-4">
                <div className="bg-accent-soft p-3 rounded-lg">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">For Senior Centers</h3>
                  <p className="text-muted-foreground text-sm">
                    Bring energy and engagement to your community with reliable, enthusiastic young volunteers who truly care.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-strong border-0">
              <div className="flex items-start gap-4">
                <div className="bg-lavender-soft p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-lavender" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Easy Scheduling</h3>
                  <p className="text-muted-foreground text-sm">
                    Smart matching system connects volunteers with perfect opportunities based on interests, availability, and location.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;