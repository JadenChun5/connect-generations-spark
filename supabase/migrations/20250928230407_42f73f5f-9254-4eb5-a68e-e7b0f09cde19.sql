-- Remove unnecessary tables for simplified app
DROP TABLE IF EXISTS teen_admins CASCADE;
DROP TABLE IF EXISTS family_members CASCADE; 
DROP TABLE IF EXISTS schools CASCADE;

-- Simplify volunteer_requests table for the new booking system
-- Keep only essential columns for student-to-senior booking
ALTER TABLE volunteer_requests 
DROP COLUMN IF EXISTS time_slot_id,
ADD COLUMN IF NOT EXISTS student_name TEXT NOT NULL DEFAULT 'Anonymous Student',
ADD COLUMN IF NOT EXISTS student_email TEXT,
ADD COLUMN IF NOT EXISTS student_phone TEXT;

-- Create a simple time_slots table for seniors
CREATE TABLE IF NOT EXISTS senior_time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id UUID NOT NULL REFERENCES seniors(id) ON DELETE CASCADE,
  available_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new table
ALTER TABLE senior_time_slots ENABLE ROW LEVEL SECURITY;

-- Create policies for time slots - publicly readable for students to browse
CREATE POLICY "Everyone can view time slots" ON senior_time_slots
FOR SELECT USING (true);

CREATE POLICY "Senior center staff can manage time slots" ON senior_time_slots
FOR ALL USING (
  senior_id IN (
    SELECT s.id FROM seniors s
    JOIN senior_centers sc ON s.senior_center_id = sc.id
    JOIN profiles p ON sc.admin_id = p.id
    WHERE p.user_id = auth.uid()
  )
);

-- Update volunteer_requests policies for simplified flow
DROP POLICY IF EXISTS "Teens can create volunteer requests" ON volunteer_requests;
DROP POLICY IF EXISTS "Teens can view their own requests" ON volunteer_requests;

-- New simplified policies - anyone can create requests (no auth needed for demo)
CREATE POLICY "Anyone can create volunteer requests" ON volunteer_requests
FOR INSERT WITH CHECK (true);

CREATE POLICY "Everyone can view requests" ON volunteer_requests  
FOR SELECT USING (true);

-- Update seniors table to be publicly readable for student browsing
DROP POLICY IF EXISTS "Family members can view their linked senior" ON seniors;
CREATE POLICY "Everyone can view seniors" ON seniors
FOR SELECT USING (true);

-- Remove user_id references since we're removing auth
ALTER TABLE volunteer_requests DROP COLUMN IF EXISTS teen_volunteer_id;
ALTER TABLE volunteer_requests ADD COLUMN IF NOT EXISTS time_slot_id UUID REFERENCES senior_time_slots(id);