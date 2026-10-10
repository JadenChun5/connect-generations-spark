import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Insert-only client for the public waitlist. Reads the project's env config directly
// and never stores a session, since visitors are anonymous.
export const waitlistClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
