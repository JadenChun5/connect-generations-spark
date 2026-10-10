import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { waitlistClient } from "@/lib/waitlistClient";

const roles = ["Student volunteer", "Senior center staff", "Club leader or school adviser", "Parent or guardian"] as const;
const waitlistSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  role: z.enum(roles),
});

const FAILURE = "Something went wrong. Please try again or email admin@elderconnect.org.";

const WaitlistForm = ({ defaultRole = roles[0] }: { defaultRole?: typeof roles[number] }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get("company") ?? "").trim()) { navigate("/thanks"); return; }
    const result = waitlistSchema.safeParse({ email: data.get("email"), role: data.get("role") });
    if (!result.success) { setMessage(result.error.issues[0]?.message ?? "Please check your details."); return; }
    setSubmitting(true);
    setMessage("");
    const { error } = await waitlistClient.from("waitlist_signups").insert({ email: result.data.email, role: result.data.role });
    setSubmitting(false);
    if (!error) { navigate("/thanks"); return; }
    setMessage(error.code === "23505" ? "You're already on the list." : FAILURE);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
      <div>
        <label htmlFor="waitlist-role" className="mb-2 block font-semibold">I am a</label>
        <select id="waitlist-role" name="role" className="waitlist-input" defaultValue={defaultRole}>
          {roles.map(role => <option key={role}>{role}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="waitlist-email" className="mb-2 block font-semibold">Email</label>
        <input id="waitlist-email" name="email" type="email" autoComplete="email" maxLength={255} required className="waitlist-input" aria-describedby="waitlist-status" />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="waitlist-company">Company</label>
        <input id="waitlist-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" variant="waitlist" className="w-full" disabled={submitting}>{submitting ? "Joining..." : "Join the waitlist"}</Button>
      {message && <p id="waitlist-status" role="status" className="text-base leading-relaxed">{message}</p>}
    </form>
  );
};

export default WaitlistForm;
