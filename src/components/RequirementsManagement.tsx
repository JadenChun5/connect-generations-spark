import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Shield, ShirtIcon, Heart, AlertTriangle } from 'lucide-react';

interface Requirements {
  id?: string;
  senior_center_id: string;
  general_expectations?: string;
  dress_code?: string;
  health_requirements?: string;
  safety_notes?: string;
}

interface RequirementsManagementProps {
  seniorCenterId: string;
}

export function RequirementsManagement({ seniorCenterId }: RequirementsManagementProps) {
  const [requirements, setRequirements] = useState<Requirements>({
    senior_center_id: seniorCenterId,
    general_expectations: '',
    dress_code: '',
    health_requirements: '',
    safety_notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadRequirements();
  }, [seniorCenterId]);

  const loadRequirements = async () => {
    try {
      // For demo purposes, load demo requirements or empty form
      const demoRequirements = {
        id: 'demo-req-1',
        senior_center_id: seniorCenterId,
        general_expectations: 'Please wear closed-toe shoes and check in at the front desk upon arrival. Background check required for volunteers under 18 with parent/guardian signature.',
        dress_code: 'Business casual or volunteer t-shirt (provided by center)',
        health_requirements: 'Current COVID-19 vaccination recommended. Please stay home if feeling unwell.',
        safety_notes: 'No strong perfumes or scents due to resident allergies. Emergency procedures will be explained during orientation.'
      };

      setRequirements(demoRequirements);
    } catch (error) {
      console.error('Error loading requirements:', error);
      toast.error('Failed to load requirements');
    } finally {
      setLoading(false);
    }
  };

  const saveRequirements = async () => {
    setSaving(true);
    try {
      // For demo purposes, just show success
      toast.success('Requirements updated successfully!');
    } catch (error) {
      console.error('Error saving requirements:', error);
      toast.error('Failed to save requirements');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof Requirements, value: string) => {
    setRequirements(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Requirements & Expectations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading requirements...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Requirements & Expectations</span>
        </CardTitle>
        <CardDescription>
          Set health, safety, and dress code requirements for teen volunteers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* General Expectations */}
        <div className="space-y-2">
          <Label htmlFor="general_expectations" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>General Expectations</span>
          </Label>
          <Textarea
            id="general_expectations"
            placeholder="Enter general requirements like check-in procedures, background checks, parent signatures, etc."
            value={requirements.general_expectations || ''}
            onChange={(e) => handleInputChange('general_expectations', e.target.value)}
            rows={4}
            className="min-h-20"
          />
          <p className="text-xs text-muted-foreground">
            Examples: "Wear closed-toe shoes", "No strong perfumes", "Must check in at front desk", "Background check required for volunteers under 18"
          </p>
        </div>

        {/* Dress Code */}
        <div className="space-y-2">
          <Label htmlFor="dress_code" className="flex items-center space-x-2">
            <ShirtIcon className="h-4 w-4" />
            <span>Dress Code</span>
          </Label>
          <Input
            id="dress_code"
            placeholder="e.g., Business casual, No shorts, Volunteer t-shirt provided"
            value={requirements.dress_code || ''}
            onChange={(e) => handleInputChange('dress_code', e.target.value)}
          />
        </div>

        {/* Health Requirements */}
        <div className="space-y-2">
          <Label htmlFor="health_requirements" className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>Health Requirements</span>
          </Label>
          <Textarea
            id="health_requirements"
            placeholder="Enter health and vaccination requirements, mask policies, etc."
            value={requirements.health_requirements || ''}
            onChange={(e) => handleInputChange('health_requirements', e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Examples: "Current COVID-19 vaccination recommended", "Masks required in common areas"
          </p>
        </div>

        {/* Safety Notes */}
        <div className="space-y-2">
          <Label htmlFor="safety_notes" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Important Safety Notes</span>
          </Label>
          <Textarea
            id="safety_notes"
            placeholder="Enter critical safety information that volunteers must know"
            value={requirements.safety_notes || ''}
            onChange={(e) => handleInputChange('safety_notes', e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Examples: "No strong scents due to allergies", "Emergency procedures explained during orientation"
          </p>
        </div>

        <Button 
          onClick={saveRequirements}
          disabled={saving}
          className="w-full"
        >
          {saving ? 'Saving...' : 'Save Requirements'}
        </Button>
      </CardContent>
    </Card>
  );
}