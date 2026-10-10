CREATE TABLE public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_email_length CHECK (char_length(email) BETWEEN 3 AND 255),
  CONSTRAINT waitlist_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT waitlist_role_allowed CHECK (role IN ('Student volunteer','Senior center staff','Club leader or school adviser','Parent or guardian'))
);
CREATE UNIQUE INDEX waitlist_signups_email_lower_key ON public.waitlist_signups (lower(email));
GRANT INSERT ON public.waitlist_signups TO anon, authenticated;
GRANT ALL ON public.waitlist_signups TO service_role;
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join the waitlist" ON public.waitlist_signups
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND role IN ('Student volunteer','Senior center staff','Club leader or school adviser','Parent or guardian')
  );