import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Clock, Users, Phone, Mail, Plus, X, Settings } from "lucide-react";
import { toast } from "sonner";

interface CenterInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  capacity: number;
  established_year: string;
  license_number: string;
}

interface OperatingHours {
  day: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

interface StaffMember {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  is_admin: boolean;
}

const CenterSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [centerInfo, setCenterInfo] = useState<CenterInfo>({
    name: "Sunrise Senior Center",
    address: "123 Oak Street",
    city: "Springfield",
    state: "CA",
    zip_code: "90210",
    phone: "(555) 123-4567",
    email: "info@sunrisesenior.org",
    website: "www.sunrisesenior.org", 
    description: "A welcoming community center dedicated to providing exceptional care and engaging activities for our senior residents.",
    capacity: 150,
    established_year: "1985",
    license_number: "SC-2024-001"
  });

  const [editedInfo, setEditedInfo] = useState<CenterInfo>(centerInfo);

  const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([
    { day: 'Monday', open_time: '08:00', close_time: '18:00', is_closed: false },
    { day: 'Tuesday', open_time: '08:00', close_time: '18:00', is_closed: false },
    { day: 'Wednesday', open_time: '08:00', close_time: '18:00', is_closed: false },
    { day: 'Thursday', open_time: '08:00', close_time: '18:00', is_closed: false },
    { day: 'Friday', open_time: '08:00', close_time: '18:00', is_closed: false },
    { day: 'Saturday', open_time: '09:00', close_time: '17:00', is_closed: false },
    { day: 'Sunday', open_time: '', close_time: '', is_closed: true }
  ]);

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: 'staff-1',
      name: 'Jennifer Smith',
      position: 'Director',
      email: 'jennifer.smith@sunrisesenior.org',
      phone: '(555) 123-4567',
      is_admin: true
    },
    {
      id: 'staff-2', 
      name: 'Michael Johnson',
      position: 'Activity Coordinator',
      email: 'michael.j@sunrisesenior.org',
      phone: '(555) 234-5678',
      is_admin: false
    },
    {
      id: 'staff-3',
      name: 'Sarah Davis',
      position: 'Volunteer Coordinator', 
      email: 'sarah.d@sunrisesenior.org',
      phone: '(555) 345-6789',
      is_admin: true
    }
  ]);

  const [amenities, setAmenities] = useState([
    'Library', 'Game Room', 'Garden', 'Dining Hall', 'Exercise Room', 
    'Art Studio', 'Computer Lab', 'Medical Office'
  ]);
  const [newAmenity, setNewAmenity] = useState("");

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSaveInfo = () => {
    setCenterInfo(editedInfo);
    setIsEditing(false);
    toast.success("Center information updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditedInfo(centerInfo);
    setIsEditing(false);
  };

  const updateOperatingHours = (index: number, field: keyof OperatingHours, value: string | boolean) => {
    setOperatingHours(prev => prev.map((hours, i) => 
      i === index ? { ...hours, [field]: value } : hours
    ));
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities(prev => [...prev, newAmenity.trim()]);
      setNewAmenity("");
      toast.success("Amenity added successfully!");
    }
  };

  const removeAmenity = (amenity: string) => {
    setAmenities(prev => prev.filter(a => a !== amenity));
    toast.success("Amenity removed successfully!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Center Settings</span>
          </CardTitle>
          <CardDescription>
            Manage your senior center information and configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Center Info</TabsTrigger>
              <TabsTrigger value="hours">Operating Hours</TabsTrigger>
              <TabsTrigger value="staff">Staff Members</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Building2 className="h-5 w-5" />
                        <span>Center Information</span>
                      </CardTitle>
                      <CardDescription>
                        Basic information about your senior center
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Information
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveInfo}>
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Center Name</label>
                        {isEditing ? (
                          <Input
                            value={editedInfo.name}
                            onChange={(e) => setEditedInfo(prev => ({ ...prev, name: e.target.value }))}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">{centerInfo.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium">Address</label>
                        {isEditing ? (
                          <Input
                            value={editedInfo.address}
                            onChange={(e) => setEditedInfo(prev => ({ ...prev, address: e.target.value }))}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">{centerInfo.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-sm font-medium">City</label>
                          {isEditing ? (
                            <Input
                              value={editedInfo.city}
                              onChange={(e) => setEditedInfo(prev => ({ ...prev, city: e.target.value }))}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground mt-1">{centerInfo.city}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">State</label>
                          {isEditing ? (
                            <Input
                              value={editedInfo.state}
                              onChange={(e) => setEditedInfo(prev => ({ ...prev, state: e.target.value }))}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground mt-1">{centerInfo.state}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">ZIP Code</label>
                          {isEditing ? (
                            <Input
                              value={editedInfo.zip_code}
                              onChange={(e) => setEditedInfo(prev => ({ ...prev, zip_code: e.target.value }))}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-sm text-muted-foreground mt-1">{centerInfo.zip_code}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Phone</span>
                        </label>
                        {isEditing ? (
                          <Input
                            value={editedInfo.phone}
                            onChange={(e) => setEditedInfo(prev => ({ ...prev, phone: e.target.value }))}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">{centerInfo.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </label>
                        {isEditing ? (
                          <Input
                            type="email"
                            value={editedInfo.email}
                            onChange={(e) => setEditedInfo(prev => ({ ...prev, email: e.target.value }))}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">{centerInfo.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium">Website</label>
                        {isEditing ? (
                          <Input
                            value={editedInfo.website}
                            onChange={(e) => setEditedInfo(prev => ({ ...prev, website: e.target.value }))}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">{centerInfo.website}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium">Capacity</label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editedInfo.capacity}
                            onChange={(e) => setEditedInfo(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">{centerInfo.capacity} residents</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    {isEditing ? (
                      <Textarea
                        value={editedInfo.description}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, description: e.target.value }))}
                        className="mt-1 min-h-[100px]"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{centerInfo.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Established Year</label>
                      {isEditing ? (
                        <Input
                          value={editedInfo.established_year}
                          onChange={(e) => setEditedInfo(prev => ({ ...prev, established_year: e.target.value }))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{centerInfo.established_year}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">License Number</label>
                      {isEditing ? (
                        <Input
                          value={editedInfo.license_number}
                          onChange={(e) => setEditedInfo(prev => ({ ...prev, license_number: e.target.value }))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{centerInfo.license_number}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hours">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Operating Hours</span>
                  </CardTitle>
                  <CardDescription>
                    Set your center's operating hours for each day of the week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {operatingHours.map((hours, index) => (
                      <div key={hours.day} className="flex items-center space-x-4">
                        <div className="w-20">
                          <span className="font-medium">{hours.day}</span>
                        </div>
                        
                        <div className="flex-1 flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={!hours.is_closed}
                              onChange={(e) => updateOperatingHours(index, 'is_closed', !e.target.checked)}
                            />
                            <span className="text-sm">Open</span>
                          </label>
                          
                          {!hours.is_closed && (
                            <>
                              <Input
                                type="time"
                                value={hours.open_time}
                                onChange={(e) => updateOperatingHours(index, 'open_time', e.target.value)}
                                className="w-32"
                              />
                              <span>to</span>
                              <Input
                                type="time"
                                value={hours.close_time}
                                onChange={(e) => updateOperatingHours(index, 'close_time', e.target.value)}
                                className="w-32"
                              />
                            </>
                          )}
                          
                          {hours.is_closed && (
                            <span className="text-muted-foreground">Closed</span>
                          )}
                        </div>
                        
                        {!hours.is_closed && (
                          <div className="text-sm text-muted-foreground">
                            {formatTime(hours.open_time)} - {formatTime(hours.close_time)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="staff">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Staff Members</span>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Staff Member
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Manage staff members and their access permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffMembers.map((staff) => (
                      <Card key={staff.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{staff.name}</span>
                              <Badge variant="secondary">{staff.position}</Badge>
                              {staff.is_admin && (
                                <Badge variant="default">Admin</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{staff.email}</span>
                              <span>{staff.phone}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities">
              <Card>
                <CardHeader>
                  <CardTitle>Center Amenities</CardTitle>
                  <CardDescription>
                    Manage the amenities and facilities available at your center
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add new amenity..."
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addAmenity()}
                      />
                      <Button onClick={addAmenity}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="relative">
                          {amenity}
                          <button
                            onClick={() => removeAmenity(amenity)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CenterSettings;