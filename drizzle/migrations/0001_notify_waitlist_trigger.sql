CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.notify_waitlist_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  BEGIN
    PERFORM net.http_post(
      url := 'https://obevrjcvmsdmlwclkaxs.supabase.co/functions/v1/notify-waitlist',
      body := jsonb_build_object('id', NEW.id),
      headers := '{"Content-Type": "application/json"}'::jsonb
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'notify-waitlist call failed: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.notify_waitlist_signup() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER waitlist_signups_notify
AFTER INSERT ON public.waitlist_signups
FOR EACH ROW EXECUTE FUNCTION public.notify_waitlist_signup();