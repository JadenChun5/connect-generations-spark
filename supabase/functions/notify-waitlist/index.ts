// Emails admin@elderconnect.org about a new waitlist signup.
// Called only by the database trigger on public.waitlist_signups with the new row's id.
// It re-reads the row with the service role, so callers cannot inject content, and it
// ignores ids that don't exist or are older than 10 minutes (limits replay abuse).
import { createClient } from "npm:@supabase/supabase-js@2";

// Recipient is configurable: set the WAITLIST_EMAIL_TO secret to change it.
// Defaults to jaden@techonsite.com because the Resend test sender (onboarding@resend.dev)
// can only deliver to the Resend account owner. Switching to admin@elderconnect.org
// requires elderconnect.org to be verified in Resend and WAITLIST_EMAIL_FROM set on it.
const TO = Deno.env.get("WAITLIST_EMAIL_TO") ?? "jaden@techonsite.com";
const FROM = Deno.env.get("WAITLIST_EMAIL_FROM") ?? "ElderConnect <onboarding@resend.dev>";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return json({ error: "Invalid body" }, 400);
  }
  if (typeof id !== "string" || !UUID.test(id)) return json({ error: "Invalid id" }, 400);

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });
  const { data: row, error } = await admin
    .from("waitlist_signups")
    .select("email, role, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("Lookup failed:", error.message);
    return json({ error: "Lookup failed" }, 500);
  }
  if (!row || Date.now() - new Date(row.created_at).getTime() > 10 * 60 * 1000) {
    return json({ skipped: true });
  }

  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) {
    console.error("RESEND_API_KEY is not set; email not sent.");
    return json({ error: "Email provider not configured" }, 503);
  }

  const time = new Date(row.created_at).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "long",
    timeStyle: "short",
  });
  const text = `A new person joined the ElderConnect waitlist.\n\nRole: ${row.role}\nEmail: ${row.email}\nTime: ${time} (Pacific)\n`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], subject: "New ElderConnect waitlist signup", text }),
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(`Resend failed [${res.status}]: ${body}`);
    return json({ error: "Send failed", status: res.status, details: body }, 502);
  }
  console.log("Waitlist notification sent:", body);
  return json({ sent: true });
});
