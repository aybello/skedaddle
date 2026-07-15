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

## Pending
- [ ] Remaining 15 territory strategy reports (Minneapolis, Coquitlam, Baltimore, etc.)
- [ ] Logo overlay once Skedaddle logo PNG is provided
