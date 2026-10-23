# Public website redesign
- [x] Final cleanup: listed transitive live imports, removed Connect and unreachable legacy pages/components/UI/assets/static exports; preserved live routes, generated integrations and waitlist logic.
- [x] Applied exact student-led legal wording and email-based reporting/record review; replaced default favicon with requested simple placeholder mark and Apple fallback.
- [x] Verified all live pages at 1280px/390px, redirects, keyboard menu, no overflow and successful homepage/center waitlist; both test rows removed (zero remaining), automatic build clean; not published. Existing preview-only React warnings remain; hosted photos return image/webp (local server does not serve the asset gateway).
- [x] Publish-readiness: requested policy/parents edits and public-copy audit; unsupported existing claims reported without rewriting legal text.
- [x] Search/share metadata, robots, sitemap, and confirmation noindex; default Lovable favicon retained as requested and reported.
- [x] Verify public pages at 1280px/390px and test waitlist with test-row cleanup; not published. Development warnings remain; no runtime exceptions.
- [x] Replace hero and senior-center placeholders with supplied photos and linked credits; desktop and phone checks passed.
- [x] Remove the student photo placeholder; keep the students section text-only as requested.
- [x] Replace homepage and shared header/footer with the supplied copy and placeholders.
- [x] Apply shared font, palette, accessible controls and page metadata; redirect outdated public pages.
- [x] Verify desktop/mobile layouts, anchors and unchanged legal content.
- [x] Store and test waitlist submissions.

# Public support pages
- [x] Add Support, account deletion and standalone Thanks pages; restyle Not Found and add footer links.
- [x] Set per-page titles and descriptions and verify desktop/mobile pages, links and unchanged legal/waitlist files.
- [x] Redirect the waitlist form to /thanks.

# Senior centers page
- [x] Add the dedicated public page with existing benefits, photo, metadata and staff-preselected waitlist; no sitemap exists to update.
- [x] Update senior-center links and homepage teaser while retaining exactly two homepage photos.
- [x] Verify desktop/phone layouts and unchanged unavailable waitlist submission; build clean and no runtime errors.

# Waitlist, content and new pages
- [x] waitlist_signups table with insert-only RLS; form inserts, duplicate message, /thanks redirect, honeypot.
- [x] Privacy waitlist sentence; Thanks copy.
- [x] Remove Where we are; founder text.
- [x] Students photo (Jsme MILA, Pexels) in two-column #students.
- [x] /safety and /parents pages; header/footer links.
- [x] Replaced the placeholder favicon with the user's real logo (favicons, Apple icon, header and footer).
- [x] Waitlist signup email alerts — built and verified sending to jaden@techonsite.com (WAITLIST_EMAIL_TO secret overrides the recipient).
- [ ] Switch alerts to admin@elderconnect.org — needs elderconnect.org verified in Resend, WAITLIST_EMAIL_FROM set on it, and WAITLIST_EMAIL_TO set to admin@elderconnect.org.

# Terms edits and support form
- [x] Terms: Privacy Policy link in section 1; removed inline attorney-review sentences in sections 12 and 13.
- [x] /support message form -> support_messages table (insert-only RLS) -> notify-support function emails SUPPORT_EMAIL_TO (default jaden@techonsite.com) with Reply-To.
- [x] Privacy: Support messages paragraph and Summary mention.

# Wordmark logo and publish
- [x] Replace the header/footer logo icon and "ElderConnect" text with the supplied wordmark SVG (home link, 48px header / 40px footer, alt "ElderConnect, Bridging Generations"); favicons untouched; old src/assets/logo.png deleted once unreferenced.
- [x] Verified every route at 1280px/390px (logo loads, no overflow, no new console errors) and published; live site confirmed serving the wordmark at both widths.
