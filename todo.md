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
- [x] Sharp brand overlay (teal bar, service label, city, Skedaddle name)
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
