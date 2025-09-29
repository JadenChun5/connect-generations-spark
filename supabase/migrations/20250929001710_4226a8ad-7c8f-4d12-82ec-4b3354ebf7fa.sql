-- Create availability table for teen volunteers
CREATE TABLE public.teen_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teen_volunteer_id UUID NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 1=Monday, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(teen_volunteer_id, day_of_week, start_time, end_time)
);

-- Enable RLS
ALTER TABLE public.teen_availability ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Teens can manage their own availability" 
ON public.teen_availability 
FOR ALL
USING (teen_volunteer_id IN (
  SELECT tv.id 
  FROM teen_volunteers tv 
  JOIN profiles p ON tv.profile_id = p.id 
  WHERE p.user_id = auth.uid()
));

-- Create trigger for updated_at
CREATE TRIGGER update_teen_availability_updated_at
BEFORE UPDATE ON public.teen_availability
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();