CREATE TABLE public.support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  topic text NOT NULL CHECK (topic IN ('Problem in the app','Question','Feedback','Something else')),
  message text NOT NULL CHECK (char_length(btrim(message)) BETWEEN 10 AND 2000)
);
GRANT INSERT ON public.support_messages TO anon, authenticated;
GRANT ALL ON public.support_messages TO service_role;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a support message" ON public.support_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.notify_support_message()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
  BEGIN
    PERFORM net.http_post(
      url := 'https://obevrjcvmsdmlwclkaxs.supabase.co/functions/v1/notify-support',
      body := jsonb_build_object('id', NEW.id),
      headers := '{"Content-Type": "application/json"}'::jsonb
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'notify-support call failed: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.notify_support_message() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER support_messages_notify AFTER INSERT ON public.support_messages
  FOR EACH ROW EXECUTE FUNCTION public.notify_support_message();