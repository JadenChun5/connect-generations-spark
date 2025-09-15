-- Additional RLS Policies for teen_admins
CREATE POLICY "Users can view their own teen admin data" ON public.teen_admins
  FOR SELECT USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own teen admin data" ON public.teen_admins
  FOR INSERT WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own teen admin data" ON public.teen_admins
  FOR UPDATE USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- RLS Policies for seniors
CREATE POLICY "Senior center admins can view seniors at their center" ON public.seniors
  FOR SELECT USING (
    senior_center_id IN (
      SELECT sc.id FROM public.senior_centers sc 
      JOIN public.profiles p ON sc.admin_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Senior center admins can manage seniors at their center" ON public.seniors
  FOR ALL USING (
    senior_center_id IN (
      SELECT sc.id FROM public.senior_centers sc 
      JOIN public.profiles p ON sc.admin_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Family members can view their linked senior" ON public.seniors
  FOR SELECT USING (
    id IN (
      SELECT fm.senior_id FROM public.family_members fm 
      JOIN public.profiles p ON fm.profile_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

-- RLS Policies for family_members
CREATE POLICY "Users can view their own family member data" ON public.family_members
  FOR SELECT USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own family member data" ON public.family_members
  FOR INSERT WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own family member data" ON public.family_members
  FOR UPDATE USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- RLS Policies for activity_logs
CREATE POLICY "Participants can view activity logs for their matches" ON public.activity_logs
  FOR SELECT USING (
    match_id IN (
      SELECT m.id FROM public.matches m 
      JOIN public.teen_volunteers tv ON m.teen_volunteer_id = tv.id 
      JOIN public.profiles p ON tv.profile_id = p.id 
      WHERE p.user_id = auth.uid()
    ) OR
    match_id IN (
      SELECT m.id FROM public.matches m 
      JOIN public.volunteer_slots vs ON m.slot_id = vs.id 
      JOIN public.senior_centers sc ON vs.senior_center_id = sc.id 
      JOIN public.profiles p ON sc.admin_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Senior center admins can manage activity logs" ON public.activity_logs
  FOR ALL USING (
    match_id IN (
      SELECT m.id FROM public.matches m 
      JOIN public.volunteer_slots vs ON m.slot_id = vs.id 
      JOIN public.senior_centers sc ON vs.senior_center_id = sc.id 
      JOIN public.profiles p ON sc.admin_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );

-- RLS Policies for feedback
CREATE POLICY "Users can view feedback they created" ON public.feedback
  FOR SELECT USING (created_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can create feedback" ON public.feedback
  FOR INSERT WITH CHECK (created_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Participants can view feedback for their matches" ON public.feedback
  FOR SELECT USING (
    match_id IN (
      SELECT m.id FROM public.matches m 
      JOIN public.teen_volunteers tv ON m.teen_volunteer_id = tv.id 
      JOIN public.profiles p ON tv.profile_id = p.id 
      WHERE p.user_id = auth.uid()
    ) OR
    match_id IN (
      SELECT m.id FROM public.matches m 
      JOIN public.volunteer_slots vs ON m.slot_id = vs.id 
      JOIN public.senior_centers sc ON vs.senior_center_id = sc.id 
      JOIN public.profiles p ON sc.admin_id = p.id 
      WHERE p.user_id = auth.uid()
    )
  );