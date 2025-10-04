import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useTutorial = (tutorialKey: string) => {
  const { user } = useAuth();
  const [showTutorial, setShowTutorial] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkTutorialStatus();
  }, [user, tutorialKey]);

  const checkTutorialStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Check localStorage first for immediate response
      const localKey = `tutorial_${tutorialKey}_${user.id}`;
      const localStatus = localStorage.getItem(localKey);
      
      if (localStatus === 'completed') {
        setShowTutorial(false);
        setLoading(false);
        return;
      }

      // Check database
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        // For now, we'll use localStorage since we don't have a tutorials table
        // In a production app, you'd want to store this in the database
        setShowTutorial(localStatus !== 'completed');
      }
    } catch (error) {
      console.error('Error checking tutorial status:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeTutorial = async () => {
    if (!user) return;

    try {
      // Save to localStorage
      const localKey = `tutorial_${tutorialKey}_${user.id}`;
      localStorage.setItem(localKey, 'completed');
      
      // In production, you'd also save to database here
      setShowTutorial(false);
    } catch (error) {
      console.error('Error completing tutorial:', error);
    }
  };

  const skipTutorial = async () => {
    await completeTutorial();
  };

  return {
    showTutorial,
    loading,
    completeTutorial,
    skipTutorial,
    setShowTutorial,
  };
};
