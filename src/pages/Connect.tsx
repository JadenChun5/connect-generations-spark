import PageMetadata from "@/components/PageMetadata";
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, Heart, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Connect = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "admin@elderconnect.org",
      description: "Get in touch for general inquiries",
      action: "mailto:admin@elderconnect.org"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      details: "Available 24/7",
      description: "Instant support for urgent matters",
      action: "#"
    }
  ];

  const supportTypes = [
    {
      icon: Users,
      title: "Partner With Us",
      description: "Senior centers, schools, and community organizations"
    },
    {
      icon: Heart,
      title: "Volunteer Support",
      description: "Questions about volunteering or getting started"
    },
    {
      icon: MessageSquare,
      title: "Technical Support",
      description: "Platform issues or technical assistance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <PageMetadata title="Contact | ElderConnect" description="Contact ElderConnect about volunteering, senior-center partnerships or support." url="https://elderconnect.org/connect" />
      <Header />
      <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary-soft/50 px-6 py-3 rounded-full mb-8">
            <MessageSquare className="h-5 w-5 text-secondary" />
            <span className="text-secondary font-medium">Get In Touch</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            We'd Love to
            <span className="bg-gradient-warm bg-clip-text text-transparent"> Connect</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Whether you're interested in partnering with us, need support, or just want to say hello, 
            we're here to help build stronger communities together.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-all duration-300 cursor-pointer" 
                    onClick={() => contact.action !== "#" && window.open(contact.action, "_blank")}>
                <CardHeader>
                  <div className="bg-gradient-hero p-3 rounded-lg w-fit mx-auto shadow-soft">
                    <contact.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{contact.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold text-foreground mb-2">{contact.details}</div>
                  <CardDescription className="text-sm">{contact.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 lg:px-8 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                      <SelectItem value="volunteer">Volunteer Support</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us how we can help you..." 
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button type="submit" size="lg" variant="hero" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Support Types */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                How Can We Help?
              </h3>
              
              <div className="space-y-6">
                {supportTypes.map((type, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-hero p-2 rounded-lg shadow-soft flex-shrink-0">
                          <type.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{type.title}</h4>
                          <p className="text-muted-foreground text-sm">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-8 bg-gradient-warm/10 border-secondary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-secondary" />
                    <h4 className="font-semibold text-foreground">Response Time</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please call us directly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mb-8">
            Looking for quick answers? Check out our most commonly asked questions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="text-left hover:shadow-medium transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">How do I get started as a volunteer?</h4>
                <p className="text-muted-foreground text-sm">Learn about our simple registration process and safety requirements.</p>
              </CardContent>
            </Card>
            
            <Card className="text-left hover:shadow-medium transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">Is the platform safe for seniors?</h4>
                <p className="text-muted-foreground text-sm">Discover our comprehensive safety measures and supervision protocols.</p>
              </CardContent>
            </Card>
            
            <Card className="text-left hover:shadow-medium transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">How can my organization partner with ElderConnect?</h4>
                <p className="text-muted-foreground text-sm">Explore partnership opportunities for senior centers and schools.</p>
              </CardContent>
            </Card>
            
            <Card className="text-left hover:shadow-medium transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-2">What training do volunteers receive?</h4>
                <p className="text-muted-foreground text-sm">Learn about our comprehensive volunteer training and ongoing support.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default Connect;