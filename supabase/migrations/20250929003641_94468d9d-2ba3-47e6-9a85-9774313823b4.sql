-- Create requirements table for senior centers
CREATE TABLE public.senior_center_requirements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  senior_center_id UUID NOT NULL,
  general_expectations TEXT,
  dress_code TEXT,
  health_requirements TEXT,
  safety_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(senior_center_id)
);

-- Enable RLS
ALTER TABLE public.senior_center_requirements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view requirements" 
ON public.senior_center_requirements 
FOR SELECT 
USING (true);

CREATE POLICY "Senior center admins can manage their requirements" 
ON public.senior_center_requirements 
FOR ALL
USING (senior_center_id IN (
  SELECT sc.id 
  FROM senior_centers sc 
  JOIN profiles p ON sc.admin_id = p.id 
  WHERE p.user_id = auth.uid()
));

-- Create trigger for updated_at
CREATE TRIGGER update_senior_center_requirements_updated_at
BEFORE UPDATE ON public.senior_center_requirements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();