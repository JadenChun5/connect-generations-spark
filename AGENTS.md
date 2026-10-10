# Project rules
- Public homepage sections use semantic theme tokens and shared navigation components so visual changes do not change legal-page content or other app logic.
- Outdated public marketing routes redirect to the homepage while legal and contact routes remain available, preventing stale public claims.
- Waitlist submission must remain unavailable until actual database storage can be connected and verified; never simulate a successful submission.
- Public support, deletion, confirmation and Not Found pages use PublicPage with the shared navigation and Helmet metadata so page layouts and route-specific head tags remain consistent without changing legal text.
- The /thanks page stays standalone until verified waitlist storage is enabled so unavailable submissions never appear successful.