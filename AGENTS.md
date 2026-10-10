# Project rules
- Public homepage sections use semantic theme tokens and shared navigation components so visual changes do not change legal-page content or other app logic.
- Outdated public marketing routes redirect to the homepage while legal and contact routes remain available, preventing stale public claims.
- Waitlist signups insert into the Lovable Cloud waitlist_signups table via an insert-only RLS policy (no client reads); success redirects to /thanks and duplicates show a friendly message, so the list is never exposed.
- Public legal, support, deletion, confirmation and Not Found pages use PublicPage with the shared navigation and Helmet metadata so page layouts and route-specific head tags remain consistent without changing legal text.
- Senior-center navigation targets the dedicated PublicPage route; WaitlistForm accepts a default role so the page can preselect staff with the same submission behavior.
- All public pages use the Hahmlet Google Font (400–700) as the sans family with system-ui, sans-serif fallback; body stays 18px so headings and buttons scale consistently with it.
- Safety uses PublicPage plus the shared PageEnd (waitlist button + contact line); Parents inlines its own end (mailto button + waitlist text link) so the two pages can differ.
- The header nav lists every public page (How it works, For students, For senior centers, For parents, Safety, FAQ) plus the Join the waitlist button; desktop shows one row, phone width uses a Menu/Close toggle with a full-width list, and the current page link gets aria-current.
- The waitlist form uses a session-less client built from env config because the generated client may point at a stale backend.

- PageMetadata owns per-route canonical and social tags; index.html supplies static social fallbacks because social crawlers do not execute client JavaScript.
- The static sitemap lists the approved indexable public routes without synthetic lastmod dates; confirmation and Not Found pages are noindex to avoid indexing utility pages.
- Preserve mobile-app legal/support route paths and isolate publish-readiness work from waitlist/database logic so app links and signup behavior remain stable.
- Type-check the active site from its entry point and Vite declarations; imported modules remain checked while disconnected legacy platform demos cannot block the public site's compilation.
