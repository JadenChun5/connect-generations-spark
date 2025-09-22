-- Remove approval system and simplify the workflow
-- Update profiles table to remove approval_status dependency
ALTER TABLE public.profiles ALTER COLUMN approval_status SET DEFAULT 'approved'::approval_status;

-- Update existing pending profiles to approved
UPDATE public.profiles SET approval_status = 'approved' WHERE approval_status = 'pending';

-- Add location fields to senior_centers table
ALTER TABLE public.senior_centers 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS full_address TEXT;

-- Create a simplified time_slots table for seniors
CREATE TABLE IF NOT EXISTS public.senior_time_slots (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    senior_id UUID NOT NULL,
    day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on senior_time_slots
ALTER TABLE public.senior_time_slots ENABLE ROW LEVEL SECURITY;

-- Create policies for senior_time_slots
CREATE POLICY "Everyone can view senior time slots" 
ON public.senior_time_slots 
FOR SELECT 
USING (true);

CREATE POLICY "Senior center admins can manage time slots for their seniors" 
ON public.senior_time_slots 
FOR ALL 
USING (senior_id IN (
    SELECT s.id
    FROM seniors s
    JOIN senior_centers sc ON s.senior_center_id = sc.id
    JOIN profiles p ON sc.admin_id = p.id
    WHERE p.user_id = auth.uid()
));

-- Create notifications table for messaging
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_id UUID NOT NULL, -- profile_id of recipient
    sender_id UUID NOT NULL, -- profile_id of sender
    type TEXT NOT NULL, -- 'volunteer_interest', 'slot_booking', etc.
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB, -- additional data like senior_id, slot_id, etc.
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (recipient_id IN (
    SELECT id FROM profiles WHERE user_id = auth.uid()
));

CREATE POLICY "Users can send notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (sender_id IN (
    SELECT id FROM profiles WHERE user_id = auth.uid()
));

CREATE POLICY "Users can mark their notifications as read" 
ON public.notifications 
FOR UPDATE 
USING (recipient_id IN (
    SELECT id FROM profiles WHERE user_id = auth.uid()
));

-- Create volunteer_requests table to replace complex matches
CREATE TABLE IF NOT EXISTS public.volunteer_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    teen_volunteer_id UUID NOT NULL,
    senior_id UUID NOT NULL,
    senior_center_id UUID NOT NULL,
    time_slot_id UUID,
    requested_date DATE NOT NULL,
    requested_start_time TIME NOT NULL,
    requested_end_time TIME NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'declined'
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on volunteer_requests
ALTER TABLE public.volunteer_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for volunteer_requests
CREATE POLICY "Teens can view their own requests" 
ON public.volunteer_requests 
FOR SELECT 
USING (teen_volunteer_id IN (
    SELECT tv.id
    FROM teen_volunteers tv
    JOIN profiles p ON tv.profile_id = p.id
    WHERE p.user_id = auth.uid()
));

CREATE POLICY "Teens can create volunteer requests" 
ON public.volunteer_requests 
FOR INSERT 
WITH CHECK (teen_volunteer_id IN (
    SELECT tv.id
    FROM teen_volunteers tv
    JOIN profiles p ON tv.profile_id = p.id
    WHERE p.user_id = auth.uid()
));

CREATE POLICY "Senior center admins can manage requests for their center" 
ON public.volunteer_requests 
FOR ALL 
USING (senior_center_id IN (
    SELECT sc.id
    FROM senior_centers sc
    JOIN profiles p ON sc.admin_id = p.id
    WHERE p.user_id = auth.uid()
));

-- Add trigger for updated_at on senior_time_slots
CREATE TRIGGER update_senior_time_slots_updated_at
    BEFORE UPDATE ON public.senior_time_slots
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for updated_at on volunteer_requests  
CREATE TRIGGER update_volunteer_requests_updated_at
    BEFORE UPDATE ON public.volunteer_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert demo data
-- Demo senior centers
INSERT INTO public.senior_centers (id, name, address, city, state, zip_code, contact_phone, contact_email, full_address) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Sunset Gardens Senior Center', '123 Oak Street', 'Springfield', 'IL', '62701', '555-0101', 'contact@sunsetgardens.com', '123 Oak Street, Springfield, IL 62701'),
('550e8400-e29b-41d4-a716-446655440002', 'Golden Years Community', '456 Maple Ave', 'Riverside', 'CA', '92501', '555-0102', 'info@goldenyears.org', '456 Maple Ave, Riverside, CA 92501'),
('550e8400-e29b-41d4-a716-446655440003', 'Harmony House', '789 Pine Road', 'Lakewood', 'WA', '98498', '555-0103', 'hello@harmonyhouse.net', '789 Pine Road, Lakewood, WA 98498'),
('550e8400-e29b-41d4-a716-446655440004', 'Peaceful Pines Center', '321 Elm Street', 'Hillview', 'TX', '75001', '555-0104', 'admin@peacefulpines.com', '321 Elm Street, Hillview, TX 75001')
ON CONFLICT (id) DO NOTHING;

-- Demo seniors (2-3 per center)
INSERT INTO public.seniors (id, first_name, last_name, age, bio, senior_center_id) VALUES
-- Sunset Gardens
('660e8400-e29b-41d4-a716-446655440001', 'Harold', 'Thompson', 78, 'Enjoys card games and friendly conversation', '550e8400-e29b-41d4-a716-446655440001'),
('660e8400-e29b-41d4-a716-446655440002', 'Dorothy', 'Kim', 82, 'Loves storytelling and sharing life experiences', '550e8400-e29b-41d4-a716-446655440001'),
-- Golden Years
('660e8400-e29b-41d4-a716-446655440003', 'Frank', 'Wilson', 75, 'Interested in technology help and learning new things', '550e8400-e29b-41d4-a716-446655440002'),
('660e8400-e29b-41d4-a716-446655440004', 'Rose', 'Martinez', 80, 'Enjoys crafts, music, and creative activities', '550e8400-e29b-41d4-a716-446655440002'),
-- Harmony House  
('660e8400-e29b-41d4-a716-446655440005', 'Robert', 'Chen', 77, 'Likes chess, reading, and intellectual discussions', '550e8400-e29b-41d4-a716-446655440003'),
('660e8400-e29b-41d4-a716-446655440006', 'Betty', 'Johnson', 84, 'Enjoys conversations and meeting new people', '550e8400-e29b-41d4-a716-446655440003'),
-- Peaceful Pines
('660e8400-e29b-41d4-a716-446655440007', 'George', 'Davis', 79, 'Loves gardening and nature walks', '550e8400-e29b-41d4-a716-446655440004')
ON CONFLICT (id) DO NOTHING;

-- Demo time slots for each senior (Morning: 9-11, Afternoon: 2-4, Evening: 6-8)
INSERT INTO public.senior_time_slots (senior_id, day_of_week, start_time, end_time) VALUES
-- Harold Thompson (Mon, Wed, Fri afternoons and evenings)
('660e8400-e29b-41d4-a716-446655440001', 1, '14:00', '16:00'), -- Monday afternoon
('660e8400-e29b-41d4-a716-446655440001', 1, '18:00', '20:00'), -- Monday evening
('660e8400-e29b-41d4-a716-446655440001', 3, '14:00', '16:00'), -- Wednesday afternoon
('660e8400-e29b-41d4-a716-446655440001', 5, '18:00', '20:00'), -- Friday evening

-- Dorothy Kim (Tue, Thu mornings and afternoons)
('660e8400-e29b-41d4-a716-446655440002', 2, '09:00', '11:00'), -- Tuesday morning
('660e8400-e29b-41d4-a716-446655440002', 2, '14:00', '16:00'), -- Tuesday afternoon
('660e8400-e29b-41d4-a716-446655440002', 4, '09:00', '11:00'), -- Thursday morning

-- Frank Wilson (Mon, Wed, Fri mornings)
('660e8400-e29b-41d4-a716-446655440003', 1, '09:00', '11:00'), -- Monday morning
('660e8400-e29b-41d4-a716-446655440003', 3, '09:00', '11:00'), -- Wednesday morning
('660e8400-e29b-41d4-a716-446655440003', 5, '14:00', '16:00'), -- Friday afternoon

-- Rose Martinez (Tue, Thu, Sat afternoons)
('660e8400-e29b-41d4-a716-446655440004', 2, '14:00', '16:00'), -- Tuesday afternoon
('660e8400-e29b-41d4-a716-446655440004', 4, '14:00', '16:00'), -- Thursday afternoon
('660e8400-e29b-41d4-a716-446655440004', 6, '14:00', '16:00'), -- Saturday afternoon

-- Robert Chen (Mon, Wed evenings)
('660e8400-e29b-41d4-a716-446655440005', 1, '18:00', '20:00'), -- Monday evening
('660e8400-e29b-41d4-a716-446655440005', 3, '18:00', '20:00'), -- Wednesday evening

-- Betty Johnson (Daily mornings except weekends)
('660e8400-e29b-41d4-a716-446655440006', 1, '09:00', '11:00'), -- Monday morning
('660e8400-e29b-41d4-a716-446655440006', 2, '09:00', '11:00'), -- Tuesday morning
('660e8400-e29b-41d4-a716-446655440006', 3, '09:00', '11:00'), -- Wednesday morning
('660e8400-e29b-41d4-a716-446655440006', 4, '09:00', '11:00'), -- Thursday morning
('660e8400-e29b-41d4-a716-446655440006', 5, '09:00', '11:00'), -- Friday morning

-- George Davis (Weekend availability)
('660e8400-e29b-41d4-a716-446655440007', 6, '09:00', '11:00'), -- Saturday morning
('660e8400-e29b-41d4-a716-446655440007', 6, '14:00', '16:00'), -- Saturday afternoon
('660e8400-e29b-41d4-a716-446655440007', 0, '14:00', '16:00')  -- Sunday afternoon
ON CONFLICT DO NOTHING;