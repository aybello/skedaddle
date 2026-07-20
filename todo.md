# Skedaddle Franchise Portal — TODO

## Core Portal
- [x] Portal home page with franchise location cards
- [x] Sidebar navigation (PortalLayout)
- [x] Login / auth flow
- [x] Location detail pages
- [x] Dashboard pages with charts (Milwaukee, Madison, Hamilton, Durham)
- [x] Network map page
- [x] Tools page
- [x] Resources page (admin only)
- [x] Print report pages
- [x] Trigger report pages

## Data
- [x] dashboardData.ts with Milwaukee, Madison, Hamilton, Durham data
- [x] franchises.ts with all 19 territory definitions

## GBP Image Generator
- [x] Backend router (gbpImageRouter.ts) with fal.ai Flux Pro integration
- [x] LLM prompt builder from post title/body
- [x] Sharp brand overlay (Skedaddle green bar, service label, city, Skedaddle name)
- [x] storagePut integration for image hosting
- [x] getTerritories procedure
- [x] getSuburbs procedure
- [x] generateSingle procedure
- [x] generateBulk procedure (up to 50 images)
- [x] GbpImageGenerator.tsx frontend page
- [x] Single Post input method
- [x] Bulk Manual input method (add/remove rows)
- [x] CSV Upload input method with template download
- [x] Progress bar during generation
- [x] Image gallery with individual download
- [x] Download All as ZIP
- [x] GBP Images nav item in PortalLayout sidebar
- [x] Route /gbp-images wired in App.tsx
- [x] Vitest tests for router and FAL_KEY

## Lightbox Enhancements
- [x] Lightbox: add prev/next arrow navigation through all generated images
- [x] Lightbox: display the exact AI prompt used to generate the image
- [x] Lightbox: add Regenerate button to re-generate a single image from inside the lightbox

## Pending
- [ ] Remaining 15 territory strategy reports (Minneapolis, Coquitlam, Baltimore, etc.)
- [ ] Logo overlay once Skedaddle logo PNG is provided

## Branding Update: Official Skedaddle Uniform (July 20)
- [x] Replace all 'teal polo shirt' technician descriptions with official Skedaddle uniform (bright lime-green polo, raccoon-in-circle logo on chest, black cap with logo, black work pants, black gloves)
- [x] Update brand overlay bar from teal to Skedaddle green (#7AC143)
- [x] Remove all fal.ai references (already done in model switch)

## Production Readiness (Review Brief — July 2026)
- [x] #1 Bulk generation job/poll pattern (fal queue API + p-limit concurrency + idempotency)
- [x] #2 Filename collision fix (content hash suffix)
- [x] #3 Vision-QA retry loop (vision model checks small-animal presence, retries once if missing)
- [x] #4 Structured-intermediate prompt builder (LLM extracts fields → deterministic template assembles prompt)
- [x] #5 Model upgrade (Claude 3.5 Haiku → best available Haiku on built-in API)
- [x] #6 Interim prompt rewrite (no negatives, balanced composition, depth-of-field, small-animal foreground)
- [x] #7 Logo overlay prep + minor code fixes (stray space, GBP sizing, flux-pro version check)

## Image Quality Fixes (July 2026)
- [x] Fix brand overlay text rendering — switched from SVG text to sharp Pango text() method (font-independent, works on any server)
- [x] Fix animal species accuracy — 2-retry QA loop with increasingly specific prompts + species descriptions in initial prompt
- [x] Fix technician-animal interaction — technician should NEVER be shown touching/handling animals directly (use exclusion devices, one-way doors, observation from distance)
- [x] Fix image dimensions — enforce 1200x900 via sharp resize after download + explicit size in API call

## Prompt Realism Overhaul (July 16)
- [x] Rewrite prompt strategy to produce realistic single-subject photos (not staged composites)
- [x] Create 10-post test CSV for bulk generation testing

## Model Switch: Flux Pro → GPT Image 2 (July 16)
- [x] Replace fal.ai Flux Pro calls with GPT Image 2 via built-in forge API
- [x] Update QA retry loop to use GPT Image 2 for retries
- [x] Remove fal.ai client import dependency from gbpImageRouter
- [x] Update tests to reflect new model (remove FAL_KEY checks)
- [x] Verify end-to-end generation works with new model

## ═══════════════════════════════════════════════════════
## PRIORITIES FROM DAVE'S RECORDINGS (July 2026)
## ═══════════════════════════════════════════════════════

## PRIORITY 1 — Territory Reports (IMMEDIATE — Dave booking calls NOW)
- [ ] Finish remaining 15 territory strategy reports
- [ ] Email Kira for raw Salesforce CSV exports (not through Looker Studio)
- [ ] Fix page validation — use GSC/GA to confirm pages exist before saying "no page found"
- [ ] Add network close ratio by species as benchmark comparison in reports
- [ ] Clarify USD vs CAD in revenue rankings (top 15 markets)
- [ ] Get Ottawa GA4 data connected
- [ ] Apply Skedaddle branding (logo + colors) to reports and dashboard
- [ ] Stop framing total sessions as the KPI — focus on species-specific and suburb/hub page sessions
- [ ] Acknowledge Hamilton covers multiple sub-markets (Kitchener, Guelph, Cambridge, Niagara, Oakville)

## PRIORITY 2 — Content Generation from Analysis
- [ ] Take analysis output → generate suburb page content (SEO-optimized)
- [ ] Build content into a checklist/approval workflow
- [ ] Content assigned to dev for WordPress page build
- [ ] Integrate AEO/GDO optimization research into content generation instructions
- [ ] Content plan specifies which GBP posts link back to which suburb/species pages

## PRIORITY 3 — Replicate DashThis Analytics in Dashboard
- [ ] Google Analytics page performance (sessions, engagement, key events)
- [ ] Google Search Console data (clicks, impressions, avg position, top queries)
- [ ] Google Business Profile data (website clicks, phone calls by month)
- [ ] Month/year filter + year-over-year comparison (last June vs this June)
- [ ] Territory switching (view any location from one interface)
- [ ] Google Ads overview (spend, top cities, Local Service Ads) — future
- [ ] Meta/Facebook Ads performance — future

## PRIORITY 4 — Full GBP Post Automation Pipeline
- [ ] Content calendar per franchise location
- [ ] Auto-generate GBP post topics from content plan
- [ ] Auto-write GBP post text from topic + blog content
- [ ] Auto-generate image prompt from post text (already built)
- [ ] Auto-generate image from prompt (already built)
- [ ] Approval queue — Rachel/Sarah/Tristan review + check off
- [ ] Auto-post to GBP via API after approval
- [ ] One post at a time (not batches) to avoid context issues
- [ ] Notification system for approval queue
- [ ] GBP API OAuth integration per franchise location
- [ ] Schedule: ~20 posts/day across all territories

## PRIORITY 5 — Future Expansion
- [ ] Expand auto-posting to Instagram
- [ ] Expand auto-posting to LinkedIn
- [ ] Auto-respond to Google reviews (monitor → suggest response → client approves via text → posts)
- [ ] Salesforce direct API connection (replace Looker Studio exports)
- [ ] AI video generation for GBP/social (Seedance2 or similar)
- [ ] Sell platform to other franchises ($50K–$100K implementation)

## DATA ACCESS BLOCKERS
- [ ] Get Salesforce raw CSV from Kira (email her directly — Dave approved)
- [ ] Long-term: get Salesforce API license from Barry/Ryan
- [ ] East Coast (Halifax/Fredericton/Moncton/St. John) — separate from main dashboard, no Salesforce data

## GBP COMPLIANCE RULES (from Dave)
- AI images OK for GBP POSTS (telling the story)
- NEVER upload AI images to GBP photos/images section (consumer-facing gallery)
- This distinction must be documented in the tool and communicated to team

## NOTES
- Dave booking Marcus call next week (Thursday 2:30 ET / 1:30 CT)
- Pennsylvania and Ohio territories next after Marcus
- Milwaukee going from $3K → $6K/month billing
- Dave willing to spend $3K tokens per client in first month
- DashThis costs $500/month — dashboard will replace it
- Dave wants platform sellable to other franchises in 7-10 months
