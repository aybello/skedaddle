// Territory-specific 90-day action plans
// Each plan is tailored to the territory's actual top suburbs, species, and performance data

export interface ActionItem {
  id: string;
  week: string;
  category: "SEO" | "GBP" | "Content" | "Conversion" | "Data";
  task: string;
  impact: "High" | "Medium" | "Low";
}

export const ACTION_PLANS: Record<string, ActionItem[]> = {
  hamilton: [
    // Week 1–2
    { id: "w1-gbp-audit", week: "Week 1–2", category: "GBP", task: "Complete the GBP Audit Checklist for Hamilton — score each section and identify top 3 gaps vs. network leaders", impact: "High" },
    { id: "w1-gbp-photos", week: "Week 1–2", category: "GBP", task: "Upload 5 new photos to GBP: raccoon exclusion work in Dundas, sealed entry point in Oakville, service vehicle in Burlington", impact: "High" },
    { id: "w1-gbp-post", week: "Week 1–2", category: "GBP", task: "Publish 2 GBP posts — one on raccoon baby season prep (top species: 2,288 jobs), one on squirrel exclusion in Oakville", impact: "Medium" },
    { id: "w1-review-req", week: "Week 1–2", category: "GBP", task: "Send review requests to last 15 completed jobs in Hamilton and Oakville — use the short GBP review link", impact: "High" },
    // Week 3–4
    { id: "w3-suburb-brief", week: "Week 3–4", category: "Content", task: "Run the Suburb Brief Generator for Oakville ($1.3M revenue) and Burlington ($1.0M) — send briefs to writer", impact: "High" },
    { id: "w3-gbp-qa", week: "Week 3–4", category: "GBP", task: "Add 5 Q&A pairs to GBP covering raccoon removal pricing, Hamilton service area boundaries, and bat exclusion timelines", impact: "Medium" },
    { id: "w3-gsc-check", week: "Week 3–4", category: "SEO", task: "Review GSC for Hamilton location pages with impressions but low clicks — update meta titles for Guelph and St. Catharines pages", impact: "Medium" },
    { id: "w3-trigger", week: "Week 3–4", category: "Data", task: "Run the Monthly Trigger Report — identify if raccoon/squirrel seasonality is shifting in Hamilton vs. last year", impact: "Medium" },
    // Month 2
    { id: "m2-suburb-pub", week: "Month 2", category: "Content", task: "Publish suburb species pages for Guelph (raccoon removal) and St. Catharines (squirrel exclusion) — submit to GSC for indexing", impact: "High" },
    { id: "m2-gbp-posts", week: "Month 2", category: "GBP", task: "Maintain 4+ GBP posts — focus on bat exclusion (493 jobs) and skunk removal (316 jobs) as secondary species", impact: "Medium" },
    { id: "m2-internal-link", week: "Month 2", category: "SEO", task: "Add internal links from Hamilton homepage to new Oakville and Burlington suburb pages — cross-link species pages", impact: "Medium" },
    { id: "m2-reviews", week: "Month 2", category: "GBP", task: "Respond to all outstanding reviews — personalize each with species + suburb (e.g. 'raccoon removal in Dundas')", impact: "High" },
    // Month 3
    { id: "m3-suburb-3-4", week: "Month 3", category: "Content", task: "Publish pages for Stoney Creek and Grimsby — both have jobs but no dedicated suburb page yet", impact: "High" },
    { id: "m3-gbp-services", week: "Month 3", category: "GBP", task: "Update GBP Services section — ensure raccoons, squirrels, mice, bats, and skunks all listed with Hamilton-specific descriptions", impact: "Medium" },
    { id: "m3-gsc-review", week: "Month 3", category: "SEO", task: "Review GSC position changes for Oakville and Burlington pages published in Month 2 — document ranking wins", impact: "Low" },
    { id: "m3-next-quarter", week: "Month 3", category: "Data", task: "Run next Trigger Report — plan Q2 content priorities based on species trends across Hamilton's 5,261 total jobs", impact: "Medium" },
  ],

  durham: [
    // Week 1–2
    { id: "w1-gbp-audit", week: "Week 1–2", category: "GBP", task: "Complete the GBP Audit Checklist for Durham Region — score each section and identify top 3 gaps", impact: "High" },
    { id: "w1-gbp-photos", week: "Week 1–2", category: "GBP", task: "Upload 5 new photos to GBP: raccoon exclusion in Oshawa, squirrel work in Whitby, sealed entry in Ajax", impact: "High" },
    { id: "w1-gbp-post", week: "Week 1–2", category: "GBP", task: "Publish 2 GBP posts — one on raccoon removal in Oshawa (top suburb: $1.1M), one on squirrel exclusion in Whitby ($1.1M)", impact: "Medium" },
    { id: "w1-review-req", week: "Week 1–2", category: "GBP", task: "Send review requests to last 15 completed jobs in Oshawa and Whitby — use the short GBP review link", impact: "High" },
    // Week 3–4
    { id: "w3-suburb-brief", week: "Week 3–4", category: "Content", task: "Run the Suburb Brief Generator for Ajax ($719K, 320 jobs) and Mississauga ($737K) — send briefs to writer", impact: "High" },
    { id: "w3-gbp-qa", week: "Week 3–4", category: "GBP", task: "Add 5 Q&A pairs to GBP covering raccoon pricing in Durham, mice exclusion timelines, and bat season in Whitby", impact: "Medium" },
    { id: "w3-gsc-check", week: "Week 3–4", category: "SEO", task: "Review GSC for Durham pages — update meta titles for Pickering and Bowmanville pages to improve CTR", impact: "Medium" },
    { id: "w3-trigger", week: "Week 3–4", category: "Data", task: "Run the Monthly Trigger Report — track mice job growth (787 jobs, 3rd highest species) and identify new suburb opportunities", impact: "Medium" },
    // Month 2
    { id: "m2-suburb-pub", week: "Month 2", category: "Content", task: "Publish suburb species pages for Pickering (raccoon removal) and Bowmanville (squirrel exclusion) — submit to GSC", impact: "High" },
    { id: "m2-gbp-posts", week: "Month 2", category: "GBP", task: "Maintain 4+ GBP posts — focus on mice exclusion (787 jobs) and bat removal (396 jobs) as growing species", impact: "Medium" },
    { id: "m2-internal-link", week: "Month 2", category: "SEO", task: "Add internal links from Durham homepage to Ajax and Mississauga suburb pages — cross-link with species pages", impact: "Medium" },
    { id: "m2-reviews", week: "Month 2", category: "GBP", task: "Respond to all outstanding reviews — personalize with species + suburb (e.g. 'squirrel removal in Whitby')", impact: "High" },
    // Month 3
    { id: "m3-suburb-3-4", week: "Month 3", category: "Content", task: "Publish pages for Courtice and Clarington — suburbs with jobs but no dedicated page yet", impact: "High" },
    { id: "m3-gbp-services", week: "Month 3", category: "GBP", task: "Update GBP Services — ensure raccoons, squirrels, mice, bats, and birds all listed with Durham-specific descriptions", impact: "Medium" },
    { id: "m3-gsc-review", week: "Month 3", category: "SEO", task: "Review GSC position changes for Ajax and Mississauga pages — document ranking wins and identify next targets", impact: "Low" },
    { id: "m3-next-quarter", week: "Month 3", category: "Data", task: "Run next Trigger Report — plan Q2 priorities based on species trends across Durham's 4,393 total jobs", impact: "Medium" },
  ],

  milwaukee: [
    // Week 1–2
    { id: "w1-gbp-audit", week: "Week 1–2", category: "GBP", task: "Complete the GBP Audit Checklist for Milwaukee — score each section and benchmark against network top performers", impact: "High" },
    { id: "w1-gbp-photos", week: "Week 1–2", category: "GBP", task: "Upload 5 new photos to GBP: squirrel exclusion in Brookfield, raccoon work in Waukesha, service vehicle in Wauwatosa", impact: "High" },
    { id: "w1-gbp-post", week: "Week 1–2", category: "GBP", task: "Publish 2 GBP posts — one on squirrel exclusion (top species: 368 jobs), one on raccoon removal in Milwaukee proper (392 jobs in city)", impact: "Medium" },
    { id: "w1-review-req", week: "Week 1–2", category: "GBP", task: "Send review requests to last 15 completed jobs in Milwaukee and Waukesha — use the short GBP review link", impact: "High" },
    // Week 3–4
    { id: "w3-suburb-brief", week: "Week 3–4", category: "Content", task: "Run the Suburb Brief Generator for Waukesha ($192K, 78 jobs) and Brookfield ($164K, 61 jobs) — send briefs to writer", impact: "High" },
    { id: "w3-gbp-qa", week: "Week 3–4", category: "GBP", task: "Add 5 Q&A pairs to GBP covering squirrel removal pricing, Milwaukee service area, and mice exclusion timelines", impact: "Medium" },
    { id: "w3-gsc-check", week: "Week 3–4", category: "SEO", task: "Review GSC for Milwaukee pages with high impressions but low clicks — update meta titles for Wauwatosa and New Berlin pages", impact: "Medium" },
    { id: "w3-trigger", week: "Week 3–4", category: "Data", task: "Run the Monthly Trigger Report — track mice job growth (201 jobs, 3rd species) and identify emerging suburb opportunities", impact: "Medium" },
    // Month 2
    { id: "m2-suburb-pub", week: "Month 2", category: "Content", task: "Publish suburb species pages for Wauwatosa (squirrel removal) and New Berlin (raccoon exclusion) — submit to GSC", impact: "High" },
    { id: "m2-gbp-posts", week: "Month 2", category: "GBP", task: "Maintain 4+ GBP posts — focus on mice exclusion (201 jobs) and bat removal as secondary species", impact: "Medium" },
    { id: "m2-internal-link", week: "Month 2", category: "SEO", task: "Add internal links from Milwaukee homepage to Waukesha and Brookfield suburb pages — cross-link species pages", impact: "Medium" },
    { id: "m2-reviews", week: "Month 2", category: "GBP", task: "Respond to all outstanding reviews — personalize with species + suburb (e.g. 'squirrel removal in Brookfield')", impact: "High" },
    // Month 3
    { id: "m3-suburb-3-4", week: "Month 3", category: "Content", task: "Publish pages for Menomonee Falls and Mequon — suburbs with jobs but no dedicated page yet", impact: "High" },
    { id: "m3-gbp-services", week: "Month 3", category: "GBP", task: "Update GBP Services — ensure squirrels, raccoons, mice, bats, and birds all listed with Milwaukee-specific descriptions", impact: "Medium" },
    { id: "m3-gsc-review", week: "Month 3", category: "SEO", task: "Review GSC position changes for Waukesha and Brookfield pages — document ranking wins and plan next targets", impact: "Low" },
    { id: "m3-next-quarter", week: "Month 3", category: "Data", task: "Run next Trigger Report — plan Q2 content priorities based on species trends across Milwaukee's 1,100+ total jobs", impact: "Medium" },
  ],

  madison: [
    // Week 1–2
    { id: "w1-gbp-audit", week: "Week 1–2", category: "GBP", task: "Complete the GBP Audit Checklist for Madison — score each section and identify top 3 gaps vs. Milwaukee benchmark", impact: "High" },
    { id: "w1-gbp-photos", week: "Week 1–2", category: "GBP", task: "Upload 5 new photos to GBP: mice exclusion in Madison, bat work in Middleton, squirrel removal in Sun Prairie", impact: "High" },
    { id: "w1-gbp-post", week: "Week 1–2", category: "GBP", task: "Publish 2 GBP posts — one on mice exclusion (top species: 222 jobs), one on bat removal in Middleton ($182K suburb)", impact: "Medium" },
    { id: "w1-review-req", week: "Week 1–2", category: "GBP", task: "Send review requests to last 10 completed jobs in Madison and Middleton — use the short GBP review link", impact: "High" },
    // Week 3–4
    { id: "w3-suburb-brief", week: "Week 3–4", category: "Content", task: "Run the Suburb Brief Generator for Middleton ($182K, 51 jobs) and Fitchburg ($114K, 47 jobs) — send briefs to writer", impact: "High" },
    { id: "w3-gbp-qa", week: "Week 3–4", category: "GBP", task: "Add 5 Q&A pairs to GBP covering mice removal pricing, bat exclusion timelines, and Madison service area boundaries", impact: "Medium" },
    { id: "w3-gsc-check", week: "Week 3–4", category: "SEO", task: "Review GSC for Madison pages — update meta titles for DeForest and Sun Prairie pages to improve click-through rate", impact: "Medium" },
    { id: "w3-trigger", week: "Week 3–4", category: "Data", task: "Run the Monthly Trigger Report — track bat job seasonality (113 jobs, 3rd species) and identify new suburb opportunities", impact: "Medium" },
    // Month 2
    { id: "m2-suburb-pub", week: "Month 2", category: "Content", task: "Publish suburb species pages for Sun Prairie (mice removal) and DeForest (squirrel exclusion) — submit to GSC", impact: "High" },
    { id: "m2-gbp-posts", week: "Month 2", category: "GBP", task: "Maintain 4+ GBP posts — focus on bats (113 jobs) and raccoons (108 jobs) as secondary species", impact: "Medium" },
    { id: "m2-internal-link", week: "Month 2", category: "SEO", task: "Add internal links from Madison homepage to Middleton and Fitchburg suburb pages — cross-link species pages", impact: "Medium" },
    { id: "m2-reviews", week: "Month 2", category: "GBP", task: "Respond to all outstanding reviews — personalize with species + suburb (e.g. 'mice removal in Middleton')", impact: "High" },
    // Month 3
    { id: "m3-suburb-3-4", week: "Month 3", category: "Content", task: "Publish pages for Verona and Waunakee — suburbs with jobs but no dedicated page yet", impact: "High" },
    { id: "m3-gbp-services", week: "Month 3", category: "GBP", task: "Update GBP Services — ensure mice, squirrels, bats, raccoons, and birds all listed with Madison-specific descriptions", impact: "Medium" },
    { id: "m3-gsc-review", week: "Month 3", category: "SEO", task: "Review GSC position changes for Middleton and Fitchburg pages — document ranking wins and plan next targets", impact: "Low" },
    { id: "m3-next-quarter", week: "Month 3", category: "Data", task: "Run next Trigger Report — plan Q2 content priorities based on species trends across Madison's 632 total jobs", impact: "Medium" },
  ],
};
