-- Create enum types
CREATE TYPE user_role AS ENUM ('teen_volunteer', 'senior_center_admin', 'teen_admin', 'family_member');
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE visit_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  bio TEXT,
  school TEXT,
  role user_role NOT NULL DEFAULT 'teen_volunteer',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  tutorial_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create senior_centers table
CREATE TABLE public.senior_centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create teen_volunteers table
CREATE TABLE public.teen_volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  grade_level INTEGER,
  interests TEXT[],
  preferred_activities TEXT[],
  total_hours INTEGER DEFAULT 0,
  availability JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create seniors table
CREATE TABLE public.seniors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_center_id UUID NOT NULL REFERENCES public.senior_centers(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER,
  bio TEXT,
  mobility_notes TEXT,
  interests TEXT[],
  preferred_activities TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create senior_center_requirements table
CREATE TABLE public.senior_center_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_center_id UUID NOT NULL REFERENCES public.senior_centers(id) ON DELETE CASCADE,
  requirement_text TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create matches table
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teen_volunteer_id UUID NOT NULL REFERENCES public.teen_volunteers(id) ON DELETE CASCADE,
  senior_id UUID NOT NULL REFERENCES public.seniors(id) ON DELETE CASCADE,
  senior_center_id UUID NOT NULL REFERENCES public.senior_centers(id) ON DELETE CASCADE,
  status approval_status DEFAULT 'pending',
  match_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create visits table
CREATE TABLE public.visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  teen_volunteer_id UUID NOT NULL REFERENCES public.teen_volunteers(id) ON DELETE CASCADE,
  senior_id UUID NOT NULL REFERENCES public.seniors(id) ON DELETE CASCADE,
  senior_center_id UUID NOT NULL REFERENCES public.senior_centers(id) ON DELETE CASCADE,
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER,
  status visit_status DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create activity_logs table
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT,
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID REFERENCES public.visits(id) ON DELETE CASCADE,
  from_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.senior_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teen_volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seniors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.senior_center_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for senior_centers
CREATE POLICY "Anyone can view senior centers" ON public.senior_centers FOR SELECT USING (true);
CREATE POLICY "Admins can insert senior centers" ON public.senior_centers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'senior_center_admin')
);
CREATE POLICY "Admins can update own senior centers" ON public.senior_centers FOR UPDATE USING (admin_id = auth.uid());
CREATE POLICY "Admins can delete own senior centers" ON public.senior_centers FOR DELETE USING (admin_id = auth.uid());

-- RLS Policies for teen_volunteers
CREATE POLICY "Anyone can view teen volunteers" ON public.teen_volunteers FOR SELECT USING (true);
CREATE POLICY "Teens can insert own profile" ON public.teen_volunteers FOR INSERT WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Teens can update own profile" ON public.teen_volunteers FOR UPDATE USING (profile_id = auth.uid());

-- RLS Policies for seniors
CREATE POLICY "Anyone can view seniors" ON public.seniors FOR SELECT USING (true);
CREATE POLICY "Center admins can insert seniors" ON public.seniors FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.senior_centers WHERE id = senior_center_id AND admin_id = auth.uid())
);
CREATE POLICY "Center admins can update seniors" ON public.seniors FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.senior_centers WHERE id = senior_center_id AND admin_id = auth.uid())
);
CREATE POLICY "Center admins can delete seniors" ON public.seniors FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.senior_centers WHERE id = senior_center_id AND admin_id = auth.uid())
);

-- RLS Policies for senior_center_requirements
CREATE POLICY "Anyone can view requirements" ON public.senior_center_requirements FOR SELECT USING (true);
CREATE POLICY "Center admins can manage requirements" ON public.senior_center_requirements FOR ALL USING (
  EXISTS (SELECT 1 FROM public.senior_centers WHERE id = senior_center_id AND admin_id = auth.uid())
);

-- RLS Policies for matches
CREATE POLICY "Users can view relevant matches" ON public.matches FOR SELECT USING (
  teen_volunteer_id IN (SELECT id FROM public.teen_volunteers WHERE profile_id = auth.uid())
  OR senior_center_id IN (SELECT id FROM public.senior_centers WHERE admin_id = auth.uid())
);
CREATE POLICY "Center admins can create matches" ON public.matches FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.senior_centers WHERE id = senior_center_id AND admin_id = auth.uid())
);
CREATE POLICY "Center admins can update matches" ON public.matches FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.senior_centers WHERE id = senior_center_id AND admin_id = auth.uid())
);

-- RLS Policies for visits
CREATE POLICY "Users can view relevant visits" ON public.visits FOR SELECT USING (
  teen_volunteer_id IN (SELECT id FROM public.teen_volunteers WHERE profile_id = auth.uid())
  OR senior_center_id IN (SELECT id FROM public.senior_centers WHERE admin_id = auth.uid())
);
CREATE POLICY "Center admins and teens can create visits" ON public.visits FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.senior_centers WHERE id = senior_center_id AND admin_id = auth.uid())
  OR teen_volunteer_id IN (SELECT id FROM public.teen_volunteers WHERE profile_id = auth.uid())
);
CREATE POLICY "Users can update relevant visits" ON public.visits FOR UPDATE USING (
  teen_volunteer_id IN (SELECT id FROM public.teen_volunteers WHERE profile_id = auth.uid())
  OR senior_center_id IN (SELECT id FROM public.senior_centers WHERE admin_id = auth.uid())
);

-- RLS Policies for activity_logs
CREATE POLICY "Users can view own logs" ON public.activity_logs FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own logs" ON public.activity_logs FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for feedback
CREATE POLICY "Users can view relevant feedback" ON public.feedback FOR SELECT USING (
  from_user_id = auth.uid()
  OR visit_id IN (
    SELECT id FROM public.visits WHERE 
    teen_volunteer_id IN (SELECT id FROM public.teen_volunteers WHERE profile_id = auth.uid())
    OR senior_center_id IN (SELECT id FROM public.senior_centers WHERE admin_id = auth.uid())
  )
);
CREATE POLICY "Users can insert feedback" ON public.feedback FOR INSERT WITH CHECK (from_user_id = auth.uid());

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_senior_centers_updated_at BEFORE UPDATE ON public.senior_centers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teen_volunteers_updated_at BEFORE UPDATE ON public.teen_volunteers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seniors_updated_at BEFORE UPDATE ON public.seniors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON public.matches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_visits_updated_at BEFORE UPDATE ON public.visits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;
ALTER PUBLICATION supabase_realtime ADD TABLE public.visits;