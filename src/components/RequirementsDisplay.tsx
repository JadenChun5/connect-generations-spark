import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShirtIcon, AlertTriangle, Shield } from 'lucide-react';

interface Requirements {
  id?: string;  
  senior_center_id: string;
  general_expectations?: string;
  dress_code?: string;
  health_requirements?: string;
  safety_notes?: string;
}

interface RequirementsDisplayProps {
  centerName: string;
  requirements?: Requirements;
}

export function RequirementsDisplay({ centerName, requirements }: RequirementsDisplayProps) {
  // Demo requirements if none provided
  const defaultRequirements = {
    senior_center_id: 'demo',
    general_expectations: 'Please wear closed-toe shoes and check in at the front desk upon arrival. Background check required for volunteers under 18 with parent/guardian signature.',
    dress_code: 'Business casual or volunteer t-shirt (provided by center)',
    health_requirements: 'Current COVID-19 vaccination recommended. Please stay home if feeling unwell.',
    safety_notes: 'No strong perfumes or scents due to resident allergies. Emergency procedures will be explained during orientation.'
  };

  const displayRequirements = requirements || defaultRequirements;

  return (
    <Card className="border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
          <Shield className="h-5 w-5" />
          <span>Requirements for {centerName}</span>
        </CardTitle>
        <CardDescription className="text-amber-700 dark:text-amber-300">
          Please review and agree to all requirements before booking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Health Requirements */}
        {displayRequirements.health_requirements && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-red-800 dark:text-red-200">Health Requirements</h4>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {displayRequirements.health_requirements}
              </p>
            </div>
          </div>
        )}

        {/* Dress Code */}
        {displayRequirements.dress_code && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <ShirtIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-200">Dress Code</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                {displayRequirements.dress_code}
              </p>
            </div>
          </div>
        )}

        {/* General Expectations */}
        {displayRequirements.general_expectations && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-green-800 dark:text-green-200">General Requirements</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                {displayRequirements.general_expectations}
              </p>
            </div>
          </div>
        )}

        {/* Safety Notes */}
        {displayRequirements.safety_notes && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-amber-800 dark:text-amber-200">Important Safety Notes</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                {displayRequirements.safety_notes}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
              You must agree to all requirements before requesting volunteer time slots
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}