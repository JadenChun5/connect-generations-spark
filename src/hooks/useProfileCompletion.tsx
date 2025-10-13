import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useProfileCompletion = () => {
  const { user, profile: authProfile } = useAuth();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authProfile) {
      checkProfileCompletion();
    } else {
      setLoading(false);
    }

    // Listen for profile completion events
    const handleProfileCompleted = () => {
      setIsProfileComplete(true);
    };

    window.addEventListener('profileCompleted', handleProfileCompleted);
    return () => {
      window.removeEventListener('profileCompleted', handleProfileCompleted);
    };
  }, [authProfile]);

  const checkProfileCompletion = async () => {
    if (!authProfile) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Fetch full profile data
      const { data: fullProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authProfile.id)
        .single();

      if (!fullProfile) {
        setIsProfileComplete(false);
        setLoading(false);
        return;
      }

      // Check completion based on user role
      if (authProfile.role === 'teen_volunteer') {
        // For teen volunteers, also check teen_volunteers table
        const { data: teenData } = await supabase
          .from('teen_volunteers')
          .select('*')
          .eq('profile_id', authProfile.id)
          .maybeSingle();

        console.log('Profile completion check:', {
          fullProfile: {
            first_name: fullProfile.first_name,
            last_name: fullProfile.last_name,
            phone: fullProfile.phone,
            bio: fullProfile.bio,
            school: fullProfile.school
          },
          teenData: teenData
        });

        const isComplete = !!(
          fullProfile.first_name &&
          fullProfile.last_name &&
          fullProfile.phone &&
          fullProfile.bio &&
          teenData?.interests &&
          teenData.interests.length > 0
        );

        setIsProfileComplete(isComplete);
      } else if (authProfile.role === 'senior_center_admin') {
        // For senior center admins, check basic profile completeness
        const isComplete = !!(
          fullProfile.first_name &&
          fullProfile.last_name &&
          fullProfile.phone &&
          fullProfile.bio
        );

        setIsProfileComplete(isComplete);
      } else {
        // For other roles, basic profile check
        const isComplete = !!(
          fullProfile.first_name &&
          fullProfile.last_name &&
          fullProfile.phone
        );

        setIsProfileComplete(isComplete);
      }
    } catch (error) {
      console.error('Error checking profile completion:', error);
      setIsProfileComplete(false);
    } finally {
      setLoading(false);
    }
  };

  const markProfileComplete = () => {
    setIsProfileComplete(true);
  };

  return {
    isProfileComplete,
    loading,
    markProfileComplete,
    recheckCompletion: checkProfileCompletion
  };
};