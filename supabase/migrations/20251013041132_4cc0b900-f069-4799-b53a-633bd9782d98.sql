-- Add missing columns to persist student profile fields
ALTER TABLE public.teen_volunteers
  ADD COLUMN IF NOT EXISTS preferred_activities text[];

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS school text;