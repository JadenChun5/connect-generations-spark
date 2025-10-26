import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Clock, Award, BookOpen, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Experience ElderConnect
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore how our platform connects teen volunteers with senior centers to create meaningful intergenerational experiences.
            </p>
          </div>
        </section>

        {/* Dashboard Demos */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="student">Student Dashboard</TabsTrigger>
              <TabsTrigger value="staff">Staff Dashboard</TabsTrigger>
            </TabsList>

            {/* Student Dashboard Demo */}
            <TabsContent value="student" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Teen Volunteer Dashboard</h2>
                <p className="text-muted-foreground">
                  Everything a student needs to find, book, and track volunteer opportunities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="bg-gradient-teen p-3 rounded-lg w-fit mb-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Browse & Book Visits</h3>
                  <p className="text-muted-foreground mb-4">
                    View available time slots at nearby senior centers and book visits instantly.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Find centers near you</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>See real-time availability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>One-click booking</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="bg-gradient-teen p-3 rounded-lg w-fit mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Track Your Hours</h3>
                  <p className="text-muted-foreground mb-4">
                    Automatic logging of volunteer hours with verification for college applications.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">47.5</div>
                    <div className="text-sm text-muted-foreground">Total Hours</div>
                    <div className="mt-3 text-sm">
                      <div className="flex justify-between mb-1">
                        <span>This month:</span>
                        <span className="font-semibold">12 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Visits completed:</span>
                        <span className="font-semibold">18</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="bg-gradient-teen p-3 rounded-lg w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Your Profile</h3>
                  <p className="text-muted-foreground mb-4">
                    Showcase your volunteer journey, achievements, and download certificates.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-muted rounded">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="text-sm">10-Hour Milestone</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted rounded">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="text-sm">5 Centers Visited</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted rounded">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm">Regular Volunteer</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Staff Dashboard Demo */}
            <TabsContent value="staff" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Senior Center Dashboard</h2>
                <p className="text-muted-foreground">
                  Powerful tools to manage volunteers, schedules, and track your center's impact.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="bg-gradient-senior p-3 rounded-lg w-fit mb-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Manage Availability</h3>
                  <p className="text-muted-foreground mb-4">
                    Set your center's schedule and manage time slots for volunteer visits.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Flexible scheduling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Recurring time slots</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Capacity management</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="bg-gradient-senior p-3 rounded-lg w-fit mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Volunteer Management</h3>
                  <p className="text-muted-foreground mb-4">
                    View, approve, and manage volunteer bookings and track visit history.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">24</div>
                    <div className="text-sm text-muted-foreground mb-3">Active Volunteers</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Pending requests:</span>
                        <span className="font-semibold text-primary">3</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>This week's visits:</span>
                        <span className="font-semibold">12</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="bg-gradient-senior p-3 rounded-lg w-fit mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Impact Tracking</h3>
                  <p className="text-muted-foreground mb-4">
                    Monitor your center's impact and celebrate volunteer contributions.
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">342</div>
                      <div className="text-xs text-muted-foreground">Total Hours This Year</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">156</div>
                      <div className="text-xs text-muted-foreground">Visits Completed</div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Key Features Summary */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <Card className="p-8 bg-gradient-subtle">
            <h2 className="text-3xl font-bold text-center mb-8">Why Schools & Centers Love ElderConnect</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10x</div>
                <div className="text-sm text-muted-foreground">Faster booking than phone calls</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Automatic hour verification</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Students can book anytime</div>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join the growing community of schools and senior centers using ElderConnect to create meaningful intergenerational connections.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/connect">
              <Button variant="hero" size="lg">
                Contact Us
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg">
                See All Features
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;
