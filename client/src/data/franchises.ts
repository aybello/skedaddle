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
  { id: "hamilton", name: "Skedaddle Hamilton", city: "Hamilton", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/hamilton_strategy_dashboard_07e70147.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 13377879, totalJobs: 5957, avgJobValue: 2246, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "up", networkRank: 1, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "durham", name: "Skedaddle Durham", city: "Whitby", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/durham_strategy_dashboard_cfe0a479.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 11458915, totalJobs: 4796, avgJobValue: 2389, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 2, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "ottawa", name: "Skedaddle Ottawa", city: "Ottawa", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/ottawa_strategy_dashboard_abce6bb3.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 8662113, totalJobs: 4288, avgJobValue: 2020, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 3, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "minneapolis", name: "Skedaddle Minneapolis", city: "Minneapolis", state: "MN", country: "US", region: "Midwest", driveUrl: "", fullReportUrl: "/manus-storage/minneapolis_strategy_dashboard_3915afe5.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 4246074, totalJobs: 1940, avgJobValue: 2189, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "up", networkRank: 4, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "montreal", name: "Skedaddle Montreal", city: "Montreal", state: "QC", country: "CA", region: "Quebec", driveUrl: "", fullReportUrl: "/manus-storage/montreal_strategy_dashboard_83caac00.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 3520871, totalJobs: 2102, avgJobValue: 1675, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "flat", networkRank: 5, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "milwaukee", name: "Skedaddle Milwaukee", city: "Milwaukee", state: "WI", country: "US", region: "Midwest", driveUrl: "https://drive.google.com/file/d/1wEL923rGDt4iIDZiR4Ik-OBc9Vd-EO35/view", reportPdfUrl: "https://drive.google.com/file/d/1EH56hmudujaWJRg8If2DtYG-zSdp0hSb/view", triggerPdfUrl: "https://drive.google.com/file/d/1cwLsO5CkRSqfwyIdEfr9kPHFZgUc-iRr/view", triggerReportUrl: "/manus-storage/milwaukee_trigger_202607_d0ba4849.html", fullReportUrl: "/manus-storage/milwaukee_full_report_eb675128.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 2673463, totalJobs: 1149, avgJobValue: 2327, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "up", networkRank: 6, networkTotal: 19 }, tags: ["dashboard-ready", "full-data", "trigger-report"] },
  { id: "london", name: "Skedaddle London", city: "London", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/london_strategy_dashboard_6c18fe13.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 2672185, totalJobs: 1135, avgJobValue: 2354, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 7, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "madison", name: "Skedaddle Madison", city: "Madison", state: "WI", country: "US", region: "Midwest", driveUrl: "https://drive.google.com/file/d/1vr_dMB5c5YRCbKVAVk2vB9EsHJxEVbSN/view", reportPdfUrl: "https://drive.google.com/file/d/1m4QQ-9hQfqtI2xqGG31gPngz2oJxTE0m/view", triggerReportUrl: "/manus-storage/madison_trigger_202607_7c93d33a.html", fullReportUrl: "/manus-storage/madison_full_report_7228ed33.html", status: "active", lastUpdated: "2026-07-13", kpis: { totalRevenue: 1905638, totalJobs: 686, avgJobValue: 2778, topSpecies: "Mice", gbpRating: null, sessionsTrend: "up", networkRank: 8, networkTotal: 19 }, tags: ["dashboard-ready", "full-data", "trigger-report"] },
  { id: "maryland-central", name: "Skedaddle Maryland Central", city: "Annapolis", state: "MD", country: "US", region: "Mid-Atlantic", driveUrl: "", fullReportUrl: "/manus-storage/maryland-central_strategy_dashboard_abab1cfc.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 1821572, totalJobs: 803, avgJobValue: 2268, topSpecies: "Mice", gbpRating: null, sessionsTrend: "flat", networkRank: 9, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "barrie-north", name: "Skedaddle Barrie North", city: "Barrie", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/barrie-north_strategy_dashboard_7a6dbc08.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 1400341, totalJobs: 641, avgJobValue: 2185, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "up", networkRank: 10, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "co-denver", name: "Skedaddle Denver", city: "Denver", state: "CO", country: "US", region: "Mountain West", driveUrl: "", fullReportUrl: "/manus-storage/co-denver_strategy_dashboard_6da50317.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 1296334, totalJobs: 721, avgJobValue: 1798, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "flat", networkRank: 11, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "coquitlam", name: "Skedaddle Coquitlam", city: "Coquitlam", state: "BC", country: "CA", region: "British Columbia", driveUrl: "", fullReportUrl: "/manus-storage/coquitlam_strategy_dashboard_0ed8a5d9.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 1089135, totalJobs: 405, avgJobValue: 2689, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 12, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "atlanta-north", name: "Skedaddle Atlanta North", city: "Atlanta", state: "GA", country: "US", region: "Southeast", driveUrl: "", fullReportUrl: "/manus-storage/atlanta-north_strategy_dashboard_bedd5137.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 913102, totalJobs: 524, avgJobValue: 1743, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "up", networkRank: 13, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "orangeville", name: "Skedaddle Orangeville", city: "Orangeville", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/orangeville_strategy_dashboard_be6f3f9c.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 779863, totalJobs: 458, avgJobValue: 1703, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "flat", networkRank: 14, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "oh-columbus", name: "Skedaddle Columbus", city: "Columbus", state: "OH", country: "US", region: "Midwest", driveUrl: "", fullReportUrl: "/manus-storage/oh-columbus_strategy_dashboard_74cf3c05.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 762917, totalJobs: 420, avgJobValue: 1816, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 15, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "pa-pittsburgh", name: "Skedaddle Pittsburgh", city: "Pittsburgh", state: "PA", country: "US", region: "Mid-Atlantic", driveUrl: "", fullReportUrl: "/manus-storage/pa-pittsburgh_strategy_dashboard_06f153b0.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 560568, totalJobs: 199, avgJobValue: 2817, topSpecies: "Squirrels", gbpRating: null, sessionsTrend: "flat", networkRank: 16, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "md-baltimore", name: "Skedaddle Baltimore", city: "Baltimore", state: "MD", country: "US", region: "Mid-Atlantic", driveUrl: "", fullReportUrl: "/manus-storage/md-baltimore_strategy_dashboard_ac0f5c1c.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 531204, totalJobs: 204, avgJobValue: 2604, topSpecies: "Mice", gbpRating: null, sessionsTrend: "up", networkRank: 17, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "okanagan", name: "Skedaddle Okanagan", city: "Kelowna", state: "BC", country: "CA", region: "British Columbia", driveUrl: "", fullReportUrl: "/manus-storage/okanagan_strategy_dashboard_9cda2f38.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 389255, totalJobs: 234, avgJobValue: 1663, topSpecies: "Bats", gbpRating: null, sessionsTrend: "flat", networkRank: 18, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
  { id: "l-windsor", name: "Skedaddle Windsor", city: "Windsor", state: "ON", country: "CA", region: "Ontario", driveUrl: "", fullReportUrl: "/manus-storage/l-windsor_strategy_dashboard_19af4b94.html", status: "active", lastUpdated: "2026-07-23", kpis: { totalRevenue: 144143, totalJobs: 78, avgJobValue: 1848, topSpecies: "Raccoons", gbpRating: null, sessionsTrend: "flat", networkRank: 19, networkTotal: 19 }, tags: ["dashboard-ready", "full-data"] },
];

export const REGIONS = Array.from(new Set(FRANCHISE_LOCATIONS.map((f) => f.region))).sort();

export function getLocationById(id: string): FranchiseLocation | undefined {
  return FRANCHISE_LOCATIONS.find((f) => f.id === id);
}
