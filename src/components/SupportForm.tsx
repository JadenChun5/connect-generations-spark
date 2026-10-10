import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { waitlistClient } from "@/lib/waitlistClient";

const topics = ["Problem in the app", "Question", "Feedback", "Something else"] as const;
const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address.").max(255, "Email must be 255 characters or fewer."),
  topic: z.enum(topics),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(2000, "Message must be 2000 characters or fewer."),
});
type Field = keyof z.infer<typeof schema>;

const FAILURE = "Something went wrong. Please try again or email admin@elderconnect.org.";
const SUCCESS = "Thanks, we got your message. We'll reply by email.";

const SupportForm = () => {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [count, setCount] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("");
    if (String(data.get("company") ?? "").trim()) { form.reset(); setCount(0); setErrors({}); setStatus(SUCCESS); return; }
    const result = schema.safeParse(Object.fromEntries(["name", "email", "topic", "message"].map(k => [k, data.get(k) ?? ""])));
    if (!result.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of result.error.issues) { const k = issue.path[0] as Field; next[k] ??= issue.message; }
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    const { error } = await waitlistClient.from("support_messages").insert(result.data);
    setSending(false);
    if (error) { setStatus(FAILURE); return; }
    form.reset();
    setCount(0);
    setStatus(SUCCESS);
  };

  const err = (k: Field) => errors[k] && <p id={`support-${k}-error`} className="mt-2 text-base text-destructive">{errors[k]}</p>;
  const aria = (k: Field) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `support-${k}-error` : undefined });

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
      <div>
        <label htmlFor="support-name" className="mb-2 block font-semibold">Name</label>
        <input id="support-name" name="name" type="text" autoComplete="name" maxLength={100} required className="waitlist-input" {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="support-email" className="mb-2 block font-semibold">Email</label>
        <input id="support-email" name="email" type="email" autoComplete="email" maxLength={255} required className="waitlist-input" {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="support-topic" className="mb-2 block font-semibold">Topic</label>
        <select id="support-topic" name="topic" className="waitlist-input" defaultValue={topics[0]}>
          {topics.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="support-message" className="mb-2 block font-semibold">Message</label>
        <textarea id="support-message" name="message" rows={6} maxLength={2000} required className="waitlist-input h-auto min-h-40 py-3"
          onChange={e => setCount(e.target.value.length)} {...aria("message")} />
        <p className="mt-1 text-base text-muted-foreground" aria-live="polite">{count} / 2000 characters</p>
        {err("message")}
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="support-company">Company</label>
        <input id="support-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" variant="waitlist" className="w-full sm:w-auto" disabled={sending}>{sending ? "Sending..." : "Send message"}</Button>
      {status && <p role="status" className="text-base leading-relaxed">{status}</p>}
    </form>
  );
};

export default SupportForm;
