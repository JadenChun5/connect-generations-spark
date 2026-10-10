# Project rules
- Public homepage sections use semantic theme tokens and shared navigation components so visual changes do not change legal-page content or other app logic.
- Outdated public marketing routes redirect to the homepage while legal and contact routes remain available, preventing stale public claims.
- Waitlist signups insert into the Lovable Cloud waitlist_signups table via an insert-only RLS policy (no client reads); success redirects to /thanks and duplicates show a friendly message, so the list is never exposed.
- Public support, deletion, confirmation and Not Found pages use PublicPage with the shared navigation and Helmet metadata so page layouts and route-specific head tags remain consistent without changing legal text.
- Senior-center navigation targets the dedicated PublicPage route; WaitlistForm accepts a default role so the page can preselect staff with the same submission behavior.
- All public pages use the Hahmlet Google Font (400–700) as the sans family with system-ui, sans-serif fallback; body stays 18px so headings and buttons scale consistently with it.
- Safety and Parents pages use PublicPage plus the shared PageEnd (waitlist button + contact line) so new info pages end consistently.
- The waitlist form uses a session-less client built from env config because the generated client may point at a stale backend.
