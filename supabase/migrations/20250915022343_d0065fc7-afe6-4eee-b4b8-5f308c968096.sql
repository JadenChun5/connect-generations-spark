-- Create role enum
CREATE TYPE public.user_role AS ENUM ('teen_volunteer', 'teen_admin', 'senior_center_admin', 'family_member');

-- Create approval status enum
CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Create visit status enum
CREATE TYPE public.visit_status AS ENUM ('scheduled', 'checked_in', 'completed', 'cancelled');

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role user_role NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  photo_url TEXT,
  bio TEXT,
  approval_status approval_status DEFAULT 'pending',
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schools table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Senior centers table
CREATE TABLE public.senior_centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teen volunteers table (extends profiles)
CREATE TABLE public.teen_volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
  interests TEXT[],
  parent_consent BOOLEAN DEFAULT FALSE,
  parent_email TEXT,
  parent_phone TEXT,
  grade_level INTEGER,
  total_hours DECIMAL(5,2) DEFAULT 0,
  approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Teen admins table (extends profiles)
CREATE TABLE public.teen_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Seniors table
CREATE TABLE public.seniors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_center_id UUID NOT NULL REFERENCES public.senior_centers(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER,
  interests TEXT[],
  preferred_activities TEXT[],
  photo_url TEXT,
  bio TEXT,
  mobility_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family members table (extends profiles)
CREATE TABLE public.family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  senior_id UUID NOT NULL REFERENCES public.seniors(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Volunteer slots table
CREATE TABLE public.volunteer_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_center_id UUID NOT NULL REFERENCES public.senior_centers(id) ON DELETE CASCADE,
  senior_id UUID REFERENCES public.seniors(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_volunteers INTEGER DEFAULT 1,
  required_skills TEXT[],
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table (volunteer-senior pairings)
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teen_volunteer_id UUID NOT NULL REFERENCES public.teen_volunteers(id) ON DELETE CASCADE,
  senior_id UUID NOT NULL REFERENCES public.seniors(id) ON DELETE CASCADE,
  slot_id UUID NOT NULL REFERENCES public.volunteer_slots(id) ON DELETE CASCADE,
  status visit_status DEFAULT 'scheduled',
  approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  approved_at TIMESTAMP WITH TIME ZONE,
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  hours_logged DECIMAL(4,2),
  points_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity logs table
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  description TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedback table
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.senior_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teen_volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teen_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seniors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_user_role() IN ('teen_admin', 'senior_center_admin'));

-- RLS Policies for schools
CREATE POLICY "Everyone can view schools" ON public.schools
  FOR SELECT USING (true);

-- RLS Policies for senior centers
CREATE POLICY "Everyone can view senior centers" ON public.senior_centers
  FOR SELECT USING (true);

CREATE POLICY "Senior center admins can manage their center" ON public.senior_centers
  FOR ALL USING (admin_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- RLS Policies for teen volunteers
CREATE POLICY "Users can view their own teen volunteer data" ON public.teen_volunteers
  FOR SELECT USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Teen admins can view volunteers from their school" ON public.teen_volunteers
  FOR SELECT USING (
    school_id IN (
      SELECT ta.school_id FROM public.teen_admins ta 
      JOIN public.profiles p ON ta.profile_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own teen volunteer data" ON public.teen_volunteers
  FOR INSERT WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own teen volunteer data" ON public.teen_volunteers
  FOR UPDATE USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- RLS Policies for volunteer slots
CREATE POLICY "Everyone can view volunteer slots" ON public.volunteer_slots
  FOR SELECT USING (true);

CREATE POLICY "Senior center admins can manage slots for their center" ON public.volunteer_slots
  FOR ALL USING (
    senior_center_id IN (
      SELECT sc.id FROM public.senior_centers sc 
      JOIN public.profiles p ON sc.admin_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

-- RLS Policies for matches
CREATE POLICY "Volunteers can view their own matches" ON public.matches
  FOR SELECT USING (
    teen_volunteer_id IN (
      SELECT tv.id FROM public.teen_volunteers tv 
      JOIN public.profiles p ON tv.profile_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Senior center admins can view matches at their center" ON public.matches
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.volunteer_slots vs 
      JOIN public.senior_centers sc ON vs.senior_center_id = sc.id 
      JOIN public.profiles p ON sc.admin_id = p.id 
      WHERE vs.id = slot_id AND p.user_id = auth.uid()
    )
  );

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, role, first_name, last_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'teen_volunteer')::user_role,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();