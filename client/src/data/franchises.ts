// Skedaddle Franchise Portal — Location Data
// Last updated: July 13, 2026 — all 19 territories added with Looker Studio data.
export interface FranchiseLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  country: "US" | "CA";
  region: string;
  driveUrl: string;
  reportPdfUrl?: string;
  triggerPdfUrl?: string;
  triggerReportUrl?: string;
  fullReportUrl?: string;
  status: "active" | "pending" | "coming_soon";
  lastUpdated: string;
  kpis: {
    totalRevenue: number;
    totalJobs: number;
    avgJobValue?: number;
    topSpecies: string;
    gbpRating: number | null;
    sessionsTrend: "up" | "down" | "flat";
    networkRank: number | null;
    networkTotal: number;
  };
  tags: string[];
}

export const FRANCHISE_LOCATIONS: FranchiseLocation[] = [
  { id: "hamilton", name: "Skedaddle Hamilton", city: "Hamilton", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/hamilton_strategy_dashboard_6c28030d.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 13377879, totalJobs: 5957, avgJobValue: 2246, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "up", networkRank: 1, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "durham", name: "Skedaddle Durham", city: "Whitby", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/durham_strategy_dashboard_5e19c190.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 11458915, totalJobs: 4796, avgJobValue: 2389, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 2, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "ottawa", name: "Skedaddle Ottawa", city: "Ottawa", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/Ottawa_Strategy_Dashboard_95a1c161.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 8662113, totalJobs: 4288, avgJobValue: 2020, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 3, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "minneapolis", name: "Skedaddle Minneapolis", city: "Minneapolis", state: "MN", country: "US", region: "Midwest", driveUrl: "", fullReportUrl: "/manus-storage/Minneapolis_Strategy_Dashboard_653cd035.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 4246074, totalJobs: 1940, avgJobValue: 2189, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "up", networkRank: 4, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "montreal", name: "Skedaddle Montreal", city: "Montreal", state: "QC", country: "CA", region: "Quebec", driveUrl: "", fullReportUrl: "/manus-storage/Montreal_Strategy_Dashboard_63fa47f7.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 3520871, totalJobs: 2102, avgJobValue: 1675, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "flat", networkRank: 5, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "milwaukee", name: "Skedaddle Milwaukee", city: "Milwaukee", state: "WI", country: "US", region: "Midwest", driveUrl: "https://drive.google.com/file/d/1wEL923rGDt4iIDZiR4Ik-OBc9Vd-EO35/view", reportPdfUrl: "https://drive.google.com/file/d/1EH56hmudujaWJRg8If2DtYG-zSdp0hSb/view", triggerPdfUrl: "https://drive.google.com/file/d/1cwLsO5CkRSqfwyIdEfr9kPHFZgUc-iRr/view", triggerReportUrl: "/manus-storage/milwaukee_trigger_202607_d0ba4849.html", fullReportUrl: "/manus-storage/milwaukee_full_report_eb675128.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 2673463, totalJobs: 1149, avgJobValue: 2327, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "up", networkRank: 6, networkTotal: 19 }, tags: ["dashboard-ready", "full-data", "trigger-report"] },
  { id: "london", name: "Skedaddle London", city: "London", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/London_Strategy_Dashboard_7031c17d.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 2672185, totalJobs: 1135, avgJobValue: 2354, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 7, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "madison", name: "Skedaddle Madison", city: "Madison", state: "WI", country: "US", region: "Midwest", driveUrl: "https://drive.google.com/file/d/1vr_dMB5c5YRCbKVAVk2vB9EsHJxEVbSN/view", reportPdfUrl: "https://drive.google.com/file/d/1m4QQ-9hQfqtI2xqGG31gPngz2oJxTE0m/view", triggerReportUrl: "/manus-storage/madison_trigger_202607_7c93d33a.html", fullReportUrl: "/manus-storage/madison_full_report_7228ed33.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 1905638, totalJobs: 686, avgJobValue: 2778, topSpecies: "Mice", gbpRating: null, sessionsTrend: "up", networkRank: 8, networkTotal: 19 }, tags: ["dashboard-ready", "full-data", "trigger-report"] },
  { id: "maryland-central", name: "Skedaddle Maryland Central", city: "Annapolis", state: "MD", country: "US", region: "Mid-Atlantic", driveUrl: "", fullReportUrl: "/manus-storage/Maryland_Central-Western_Shore_Strategy_Dashboard_0286029a.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 1821572, totalJobs: 803, avgJobValue: 2268, topSpecies: "Mice", gbpRating: null, sessionsTrend: "flat", networkRank: 9, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "barrie-north", name: "Skedaddle Barrie North", city: "Barrie", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/D_-_Barrie_North_Strategy_Dashboard_e584ae51.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 1400341, totalJobs: 641, avgJobValue: 2185, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "up", networkRank: 10, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "co-denver", name: "Skedaddle Denver", city: "Denver", state: "CO", country: "US", region: "Mountain West", driveUrl: "", fullReportUrl: "/manus-storage/CO_-_Denver_Strategy_Dashboard_7c7db75d.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 1296334, totalJobs: 721, avgJobValue: 1798, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "flat", networkRank: 11, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "coquitlam", name: "Skedaddle Coquitlam", city: "Coquitlam", state: "BC", country: "CA", region: "British Columbia", driveUrl: "", fullReportUrl: "/manus-storage/Coquitlam_Strategy_Dashboard_8adac338.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 1089135, totalJobs: 405, avgJobValue: 2689, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 12, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "atlanta-north", name: "Skedaddle Atlanta North", city: "Atlanta", state: "GA", country: "US", region: "Southeast", driveUrl: "", fullReportUrl: "/manus-storage/Atlanta_North_Strategy_Dashboard_cbd3a837.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 913102, totalJobs: 524, avgJobValue: 1743, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "up", networkRank: 13, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "orangeville", name: "Skedaddle Orangeville", city: "Orangeville", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/Orangeville_Strategy_Dashboard_ce003b4f.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 779863, totalJobs: 458, avgJobValue: 1703, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "flat", networkRank: 14, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "oh-columbus", name: "Skedaddle Columbus", city: "Columbus", state: "OH", country: "US", region: "Midwest", driveUrl: "", fullReportUrl: "/manus-storage/OH_-_Columbus_Strategy_Dashboard_869ebe84.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 762917, totalJobs: 420, avgJobValue: 1816, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 15, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "pa-pittsburgh", name: "Skedaddle Pittsburgh", city: "Pittsburgh", state: "PA", country: "US", region: "Mid-Atlantic", driveUrl: "", fullReportUrl: "/manus-storage/PA_-_Pittsburgh_Strategy_Dashboard_34a48626.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 560568, totalJobs: 199, avgJobValue: 2817, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "flat", networkRank: 16, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "md-baltimore", name: "Skedaddle Baltimore", city: "Baltimore", state: "MD", country: "US", region: "Mid-Atlantic", driveUrl: "", fullReportUrl: "/manus-storage/MD_-_Baltimore_Strategy_Dashboard_26f6ea53.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 531204, totalJobs: 204, avgJobValue: 2604, topSpecies: "Mice", gbpRating: null, sessionsTrend: "up", networkRank: 17, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "okanagan", name: "Skedaddle Okanagan", city: "Kelowna", state: "BC", country: "CA", region: "British Columbia", driveUrl: "", fullReportUrl: "/manus-storage/Okanagan_Strategy_Dashboard_db89536a.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 389255, totalJobs: 234, avgJobValue: 1663, topSpecies: "Bats", gbpRating: null, sessionsTrend: "flat", networkRank: 18, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
  { id: "l-windsor", name: "Skedaddle Windsor", city: "Windsor", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/L_-_Windsor_Strategy_Dashboard_113b2b1e.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 144143, totalJobs: 78, avgJobValue: 1848, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 19, networkTotal: 19 }, tags: ["dashboard-ready", "looker-data"] },
];

export const REGIONS = Array.from(new Set(FRANCHISE_LOCATIONS.map((f) => f.region))).sort();

export function getLocationById(id: string): FranchiseLocation | undefined {
  return FRANCHISE_LOCATIONS.find((f) => f.id === id);
}
