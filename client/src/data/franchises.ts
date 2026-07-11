// Skedaddle Franchise Portal — Location Data
// This file is the single source of truth for all franchise locations in the portal.
// Add new locations here as dashboards are generated.

export interface FranchiseLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  country: "US" | "CA";
  region: string;
  driveUrl: string;
  reportPdfUrl?: string;    // Full strategy report PDF (Google Drive)
  triggerPdfUrl?: string;  // Monthly trigger report PDF (Google Drive)
  triggerReportUrl?: string; // Monthly trigger report hosted HTML
  fullReportUrl?: string;   // Full interactive HTML report (hosted)
  status: "active" | "pending" | "coming_soon";
  lastUpdated: string;
  kpis: {
    totalRevenue: number;
    totalJobs: number;
    topSpecies: string;
    gbpRating: number | null;
    sessionsTrend: "up" | "down" | "flat";
    networkRank: number | null;
    networkTotal: number;
  };
  tags: string[];
}

export const FRANCHISE_LOCATIONS: FranchiseLocation[] = [
  {
    id: "milwaukee",
    name: "Skedaddle Milwaukee",
    city: "Milwaukee",
    state: "WI",
    country: "US",
    region: "Midwest",
    driveUrl: "https://drive.google.com/file/d/1wEL923rGDt4iIDZiR4Ik-OBc9Vd-EO35/view",
    reportPdfUrl: "https://drive.google.com/file/d/1EH56hmudujaWJRg8If2DtYG-zSdp0hSb/view",
    triggerPdfUrl: "https://drive.google.com/file/d/1cwLsO5CkRSqfwyIdEfr9kPHFZgUc-iRr/view",
    triggerReportUrl: "/manus-storage/milwaukee_trigger_202607_d0ba4849.html",
    fullReportUrl: "/manus-storage/milwaukee_full_report_3b78c0d1.html",
    status: "active",
    lastUpdated: "2026-07-10",
    kpis: {
      totalRevenue: 0,
      totalJobs: 0,
      topSpecies: "Squirrel",
      gbpRating: null,
      sessionsTrend: "up",
      networkRank: null,
      networkTotal: 67,
    },
    tags: ["dashboard-ready", "full-data"],
  },
  {
    id: "madison",
    name: "Skedaddle Madison",
    city: "Madison",
    state: "WI",
    country: "US",
    region: "Midwest",
    driveUrl: "https://drive.google.com/file/d/1vr_dMB5c5YRCbKVAVk2vB9EsHJxEVbSN/view",
    reportPdfUrl: "https://drive.google.com/file/d/1m4QQ-9hQfqtI2xqGG31gPngz2oJxTE0m/view",
    triggerPdfUrl: "",
    fullReportUrl: "/manus-storage/madison_full_report_52219247.html",
    status: "active",
    lastUpdated: "2026-07-10",
    kpis: {
      totalRevenue: 0,
      totalJobs: 0,
      topSpecies: "Squirrel",
      gbpRating: null,
      sessionsTrend: "flat",
      networkRank: null,
      networkTotal: 67,
    },
    tags: ["dashboard-ready", "full-data"],
  },
  {
    id: "ottawa",
    name: "Skedaddle Ottawa",
    city: "Ottawa",
    state: "ON",
    country: "CA",
    region: "Ontario",
    driveUrl: "",
    status: "coming_soon",
    lastUpdated: "",
    kpis: {
      totalRevenue: 0,
      totalJobs: 0,
      topSpecies: "—",
      gbpRating: null,
      sessionsTrend: "flat",
      networkRank: null,
      networkTotal: 67,
    },
    tags: ["awaiting-data"],
  },
  {
    id: "toronto",
    name: "Skedaddle Toronto",
    city: "Toronto",
    state: "ON",
    country: "CA",
    region: "Ontario",
    driveUrl: "",
    status: "coming_soon",
    lastUpdated: "",
    kpis: {
      totalRevenue: 0,
      totalJobs: 0,
      topSpecies: "—",
      gbpRating: null,
      sessionsTrend: "flat",
      networkRank: null,
      networkTotal: 67,
    },
    tags: ["awaiting-data"],
  },
  {
    id: "minneapolis",
    name: "Skedaddle Minneapolis",
    city: "Minneapolis",
    state: "MN",
    country: "US",
    region: "Midwest",
    driveUrl: "",
    status: "coming_soon",
    lastUpdated: "",
    kpis: {
      totalRevenue: 0,
      totalJobs: 0,
      topSpecies: "—",
      gbpRating: null,
      sessionsTrend: "flat",
      networkRank: null,
      networkTotal: 67,
    },
    tags: ["awaiting-data"],
  },
  {
    id: "north-atlanta",
    name: "Skedaddle North Atlanta",
    city: "Atlanta",
    state: "GA",
    country: "US",
    region: "Southeast",
    driveUrl: "",
    status: "coming_soon",
    lastUpdated: "",
    kpis: {
      totalRevenue: 0,
      totalJobs: 0,
      topSpecies: "—",
      gbpRating: null,
      sessionsTrend: "flat",
      networkRank: null,
      networkTotal: 67,
    },
    tags: ["awaiting-data", "pest-expansion"],
  },
];

export const REGIONS = Array.from(new Set(FRANCHISE_LOCATIONS.map((f) => f.region))).sort();

export function getLocationById(id: string): FranchiseLocation | undefined {
  return FRANCHISE_LOCATIONS.find((f) => f.id === id);
}
