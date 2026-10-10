import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const roles = ["Student volunteer", "Senior center staff", "Club leader or school adviser", "Parent or guardian"] as const;
const waitlistSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  role: z.enum(roles),
});

const WaitlistForm = ({ defaultRole = roles[0] }: { defaultRole?: typeof roles[number] }) => {
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = waitlistSchema.safeParse({ email: data.get("email"), role: data.get("role") });
    setError(result.success
      ? "Waitlist signup is not available yet. Your email has not been saved."
      : result.error.issues[0]?.message ?? "Please check your details.");
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
      <Button type="submit" variant="waitlist" className="w-full">Join the waitlist</Button>
      <p id="waitlist-status" role="status" className="text-base leading-relaxed">{error || "Waitlist signup is not available yet. You can contact admin@elderconnect.org."}</p>
    </form>
  );
};

export default WaitlistForm;