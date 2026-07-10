# Skedaddle Franchise Strategy Dashboards — Design Brief

## Three Approaches

**Approach A — Intelligence Terminal** (probability: 0.04)
Dark-mode data terminal aesthetic. Monospace accents, green-on-dark callouts, grid-heavy layout. Feels like a Bloomberg terminal for franchise owners.

**Approach B — Field Operations Manual** (probability: 0.07)
Clean, authoritative, print-inspired. Off-white backgrounds, deep navy and forest green, serif headings. Like a well-produced strategy document brought to life.

**Approach C — Agency Command Centre** (probability: 0.06)
Sophisticated light-mode dashboard. Slate/charcoal with a single amber accent. Asymmetric sidebar layout. Feels like a premium SaaS analytics product.

---

## Selected Approach: B — Field Operations Manual

This is an internal tool used by UWS and shared with franchise owners. It needs to feel authoritative, trustworthy, and data-dense — not flashy. The "printed strategy document" aesthetic reinforces that every number in here is sourced and verified.

### Design Movement
Editorial data journalism — the visual language of a high-quality annual report or strategy brief.

### Core Principles
1. **Data first** — every design decision serves legibility of numbers and tables
2. **Earned authority** — typography and spacing signal credibility, not decoration
3. **Quiet depth** — subtle texture and shadow, never gradients or glows
4. **Location identity** — each franchise report has a subtle colour accent tied to its market

### Color Philosophy
- Background: warm off-white `oklch(0.975 0.008 80)` — not pure white, feels like quality paper
- Foreground: deep charcoal `oklch(0.18 0.01 65)`
- Primary accent: deep forest green `oklch(0.38 0.12 155)` — Skedaddle's brand colour territory
- Secondary: warm slate `oklch(0.55 0.015 250)`
- Milwaukee accent: deep teal `oklch(0.42 0.10 195)`
- Madison accent: warm amber `oklch(0.62 0.12 75)`

### Layout Paradigm
Persistent left sidebar (220px) for navigation between locations and sections. Main content area is a single wide column with generous padding. No hero banners — the report starts immediately with the executive summary scorecard.

### Signature Elements
1. Thin left border rule on section headers (3px forest green)
2. Monospaced numbers in all data cells (font-variant-numeric: tabular-nums)
3. Subtle paper texture on the background (CSS noise filter)

### Interaction Philosophy
Calm and purposeful. Sidebar highlights the active section as you scroll. No animations on data — numbers should feel stable and trustworthy.

### Animation
- Sidebar active indicator: 150ms ease-out slide
- Page transitions: 200ms fade only
- No entrance animations on data tables or charts — they should feel like they were always there

### Typography System
- Display/headings: Playfair Display (serif) — authority and editorial weight
- Body/data: Inter (sans-serif) — clean, legible at small sizes
- Numbers: tabular-nums, monospace fallback for data cells

### Brand Essence
**UWS Skedaddle Intelligence** — franchise performance reporting for operators who want the full picture. Precise, sourced, actionable.

### Brand Voice
Direct and evidence-based. Headlines state the finding, not the topic.
- "Milwaukee's GBP broke its own record in May" (not "GBP Performance")
- "Waukesha is your highest-value suburb with no page" (not "Suburb Opportunity")

### Wordmark & Logo
UWS monogram in a tight square — "UWS" in Playfair Display italic, stacked, on a deep green square.

### Signature Brand Color
Deep forest green `oklch(0.38 0.12 155)` — ownable, serious, nature-adjacent (fits wildlife control).

## Style Decisions
- Use tabular-nums on all metric values
- Section numbers displayed as two-digit zero-padded (01, 02...) in muted green
- Charts use the Recharts library already in the scaffold — no Chart.js needed
- Each location page is a React route: /milwaukee, /madison
- The home page is a location index — not a marketing page
