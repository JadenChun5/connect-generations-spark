import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate('/auth');
  };

  const handleStaffClick = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to ElderConnect
          </h1>
          <p className="text-xl text-muted-foreground">
            Connecting high school students with senior centers for meaningful volunteer opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* High School Student Option */}
          <Card className="hover:shadow-elegant transition-shadow cursor-pointer" onClick={handleStudentClick}>
            <CardContent className="p-8 text-center">
              <div className="bg-primary-soft p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                High School Student
              </h2>
              <p className="text-muted-foreground mb-6">
                Find senior centers near you and volunteer to spend time with seniors in your community
              </p>
              <Button size="lg" className="w-full">
                Find Volunteer Opportunities
              </Button>
            </CardContent>
          </Card>

          {/* Senior Center Staff Option */}
          <Card className="hover:shadow-elegant transition-shadow cursor-pointer" onClick={handleStaffClick}>
            <CardContent className="p-8 text-center">
              <div className="bg-secondary-soft p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Senior Center Staff
              </h2>
              <p className="text-muted-foreground mb-6">
                Manage your senior center, create time slots, and coordinate with student volunteers
              </p>
              <Button size="lg" variant="secondary" className="w-full">
                Manage Your Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;