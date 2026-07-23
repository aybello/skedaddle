/**
 * Analytics.tsx — DashThis Replacement
 * Full analytics dashboard with GA4 sessions + GBP metrics,
 * territory switching, month/year filters, and YoY comparisons.
 */

import PortalLayout from "@/components/PortalLayout";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Area, AreaChart,
} from "recharts";
import {
  TrendingUp, TrendingDown, Phone, MousePointer, MapPin, Activity,
  Calendar, ChevronDown, ArrowUpRight, ArrowDownRight, Minus,
} from "lucide-react";

// ─── Colour Palette (Skedaddle brand) ────────────────────────────────────────
const FOREST = "#1a3a2a";
const SAGE = "#4a7c59";
const GOLD = "#c9a84c";
const CREAM = "#f5f0e8";
const MIST = "#e8ede9";
const SKEDADDLE_GREEN = "#7AC143";
const CHART_COLORS = ["#4a7c59", "#c9a84c", "#b85c38", "#6b8f71", "#d4a843", "#8b4513"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ─── Territory mapping (GBP names → display names) ───────────────────────────
const TERRITORY_DISPLAY: Record<string, string> = {
  "Durham": "Durham Region",
  "York Region/Barrie": "York Region / Barrie",
  "Kitchener/Waterloo": "Kitchener-Waterloo",
  "Atlanta ": "Atlanta",
  "Atlanta": "Atlanta",
};

function displayName(t: string) {
  return TERRITORY_DISPLAY[t] || t;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDelta(current: number, previous: number): { text: string; direction: "up" | "down" | "flat"; color: string } {
  if (!previous || previous === 0) return { text: "N/A", direction: "flat", color: "#888" };
  const pct = ((current - previous) / previous) * 100;
  if (Math.abs(pct) < 0.5) return { text: "0%", direction: "flat", color: "#888" };
  return {
    text: `${pct > 0 ? "+" : ""}${pct.toFixed(1)}%`,
    direction: pct > 0 ? "up" : "down",
    color: pct > 0 ? "#16a34a" : "#dc2626",
  };
}

function DeltaIcon({ direction }: { direction: "up" | "down" | "flat" }) {
  if (direction === "up") return <ArrowUpRight size={14} />;
  if (direction === "down") return <ArrowDownRight size={14} />;
  return <Minus size={14} />;
}

// ─── KPI Card ────────────────────────────────────────────────────────────────
function KpiCard({ icon: Icon, label, value, delta, color = SAGE }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  delta?: { text: string; direction: "up" | "down" | "flat"; color: string };
  color?: string;
}) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${MIST}`, borderRadius: 10, padding: "20px 24px", borderLeft: `3px solid ${color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ background: color + "18", borderRadius: 6, padding: 6 }}>
          <Icon size={15} color={color} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#666", fontFamily: "Inter, sans-serif" }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: FOREST, fontFamily: "'Playfair Display', serif" }}>{value}</div>
      {delta && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 12, fontWeight: 600, color: delta.color }}>
          <DeltaIcon direction={delta.direction} />
          <span>{delta.text} vs last year</span>
        </div>
      )}
    </div>
  );
}

// ─── Chart Tooltip ───────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${MIST}`, borderRadius: 6, padding: "10px 14px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ fontSize: 11, color: p.color, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: "inline-block" }} />
          <span>{p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong></span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Analytics() {
  const [selectedGBPTerritory, setSelectedGBPTerritory] = useState("Hamilton");
  const [selectedGA4Territory, setSelectedGA4Territory] = useState("Hamilton");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [comparisonMonth, setComparisonMonth] = useState(6); // June

  // Fetch territories
  const { data: territories } = trpc.analytics.getTerritories.useQuery();

  // Fetch GA4 trend data
  const { data: ga4Trend, isLoading: ga4Loading } = trpc.analytics.getMonthlyTrend.useQuery({
    territory: selectedGA4Territory,
    startYear: selectedYear - 1,
    endYear: selectedYear,
    dataSource: "ga4",
  });

  // Fetch GBP trend data
  const { data: gbpTrend, isLoading: gbpLoading } = trpc.analytics.getMonthlyTrend.useQuery({
    territory: selectedGBPTerritory,
    startYear: selectedYear - 1,
    endYear: selectedYear,
    dataSource: "gbp",
  });

  // Fetch YoY comparison
  const { data: yoyData } = trpc.analytics.getYoYComparison.useQuery({
    territory: selectedGBPTerritory,
    year: selectedYear,
    month: comparisonMonth,
  });

  // Fetch summary KPIs
  const { data: summaryKPIs } = trpc.analytics.getSummaryKPIs.useQuery({
    territory: selectedGBPTerritory,
    year: selectedYear,
    month: comparisonMonth,
  });

  // ─── Transform GA4 data for chart ───────────────────────────────────────────
  const ga4ChartData = useMemo(() => {
    if (!ga4Trend || !Array.isArray(ga4Trend)) return [];

    // Group by year-month, pivot page types into columns
    const grouped: Record<string, any> = {};
    for (const row of ga4Trend as any[]) {
      const key = `${row.year}-${String(row.month).padStart(2, "0")}`;
      if (!grouped[key]) {
        grouped[key] = { name: `${MONTHS[row.month - 1]} '${String(row.year).slice(2)}`, year: row.year, month: row.month };
      }
      const pt = row.pageType === "total" ? "Total" :
        row.pageType === "species_pages" ? "Species" :
        row.pageType === "blog_pages" ? "Blog" :
        row.pageType === "service_pages" ? "Service" :
        row.pageType === "location_page" ? "Location" : row.pageType;
      grouped[key][pt] = (grouped[key][pt] || 0) + Number(row.sessions);
    }

    return Object.values(grouped).sort((a: any, b: any) =>
      a.year !== b.year ? a.year - b.year : a.month - b.month
    );
  }, [ga4Trend]);

  // ─── Transform GBP data for chart ──────────────────────────────────────────
  const gbpChartData = useMemo(() => {
    if (!gbpTrend || !Array.isArray(gbpTrend)) return [];

    const grouped: Record<string, any> = {};
    for (const row of gbpTrend as any[]) {
      const key = `${row.year}-${String(row.month).padStart(2, "0")}`;
      if (!grouped[key]) {
        grouped[key] = { name: `${MONTHS[row.month - 1]} '${String(row.year).slice(2)}`, year: row.year, month: row.month };
      }
      const mt = row.metricType === "calls" ? "Calls" :
        row.metricType === "website_clicks" ? "Website Clicks" :
        row.metricType === "directions" ? "Directions" :
        row.metricType === "bookings" ? "Bookings" :
        row.metricType === "total" ? "Total" : row.metricType;
      if (mt !== "Total") {
        grouped[key][mt] = (grouped[key][mt] || 0) + Number(row.value);
      }
    }

    return Object.values(grouped).sort((a: any, b: any) =>
      a.year !== b.year ? a.year - b.year : a.month - b.month
    );
  }, [gbpTrend]);

  // ─── YoY KPI calculations ──────────────────────────────────────────────────
  const yoyKPIs = useMemo(() => {
    if (!yoyData) return null;

    const getCurrent = (arr: any[], key: string) => {
      const found = arr.find((r: any) => r.metricType === key || r.pageType === key);
      return found ? Number(found.value || found.sessions || 0) : 0;
    };
    const getPrev = (arr: any[], key: string) => {
      const found = arr.find((r: any) => r.metricType === key || r.pageType === key);
      return found ? Number(found.value || found.sessions || 0) : 0;
    };

    const currentCalls = getCurrent(yoyData.gbp.current, "calls");
    const prevCalls = getPrev(yoyData.gbp.previous, "calls");
    const currentClicks = getCurrent(yoyData.gbp.current, "website_clicks");
    const prevClicks = getPrev(yoyData.gbp.previous, "website_clicks");
    const currentDirections = getCurrent(yoyData.gbp.current, "directions");
    const prevDirections = getPrev(yoyData.gbp.previous, "directions");

    const currentSessions = getCurrent(yoyData.ga4.current, "total");
    const prevSessions = getPrev(yoyData.ga4.previous, "total");

    return {
      calls: { current: currentCalls, previous: prevCalls, delta: formatDelta(currentCalls, prevCalls) },
      clicks: { current: currentClicks, previous: prevClicks, delta: formatDelta(currentClicks, prevClicks) },
      directions: { current: currentDirections, previous: prevDirections, delta: formatDelta(currentDirections, prevDirections) },
      sessions: { current: currentSessions, previous: prevSessions, delta: formatDelta(currentSessions, prevSessions) },
    };
  }, [yoyData]);

  // ─── Available years ────────────────────────────────────────────────────────
  const years = [2022, 2023, 2024, 2025, 2026];

  // Filter GA4 territories to only show "parent" territories (not sub-cities)
  const ga4TerritoryList = useMemo(() => {
    if (!territories?.ga4) return [];
    // Show all but filter out month names and other artifacts
    const skipWords = new Set(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Month", "LOCATION 2022"]);
    return territories.ga4.filter(t => !skipWords.has(t));
  }, [territories]);

  const gbpTerritoryList = territories?.gbp || [];

  return (
    <PortalLayout>
      <div style={{ padding: "32px 28px", maxWidth: 1200, fontFamily: "Inter, sans-serif" }}>
        {/* Page Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: SKEDADDLE_GREEN, marginBottom: 4 }}>
            Performance Analytics
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: FOREST, fontFamily: "'Playfair Display', serif", margin: 0 }}>
            Analytics Dashboard
          </h1>
          <p style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
            GA4 sessions and Google Business Profile metrics — replaces DashThis reporting.
          </p>
          <div style={{ marginTop: 10, borderTop: `2px solid ${SKEDADDLE_GREEN}`, width: 48 }} />
        </div>

        {/* ─── Filters Bar ─────────────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28, padding: "16px 20px", background: "#fff", borderRadius: 10, border: `1px solid ${MIST}` }}>
          {/* GBP Territory */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#888" }}>GBP Territory</label>
            <select
              value={selectedGBPTerritory}
              onChange={(e) => setSelectedGBPTerritory(e.target.value)}
              style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${MIST}`, fontSize: 13, fontWeight: 500, color: FOREST, background: CREAM, cursor: "pointer", minWidth: 160 }}
            >
              {gbpTerritoryList.map(t => (
                <option key={t} value={t}>{displayName(t)}</option>
              ))}
            </select>
          </div>

          {/* GA4 Territory */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#888" }}>GA4 Territory</label>
            <select
              value={selectedGA4Territory}
              onChange={(e) => setSelectedGA4Territory(e.target.value)}
              style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${MIST}`, fontSize: 13, fontWeight: 500, color: FOREST, background: CREAM, cursor: "pointer", minWidth: 160 }}
            >
              {ga4TerritoryList.map(t => (
                <option key={t} value={t}>{displayName(t)}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#888" }}>Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${MIST}`, fontSize: 13, fontWeight: 500, color: FOREST, background: CREAM, cursor: "pointer" }}
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Comparison Month */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#888" }}>Compare Month</label>
            <select
              value={comparisonMonth}
              onChange={(e) => setComparisonMonth(Number(e.target.value))}
              style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${MIST}`, fontSize: 13, fontWeight: 500, color: FOREST, background: CREAM, cursor: "pointer" }}
            >
              {FULL_MONTHS.map((m, i) => (
                <option key={i + 1} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ─── YoY KPI Cards ───────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: FOREST, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar size={15} color={SAGE} />
            {FULL_MONTHS[comparisonMonth - 1]} {selectedYear} vs {FULL_MONTHS[comparisonMonth - 1]} {selectedYear - 1}
            <span style={{ fontSize: 11, fontWeight: 400, color: "#888", marginLeft: 4 }}>({displayName(selectedGBPTerritory)})</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            <KpiCard
              icon={Activity}
              label="Total Sessions"
              value={yoyKPIs?.sessions.current.toLocaleString() || "—"}
              delta={yoyKPIs?.sessions.delta}
              color={SAGE}
            />
            <KpiCard
              icon={Phone}
              label="GBP Calls"
              value={yoyKPIs?.calls.current.toLocaleString() || "—"}
              delta={yoyKPIs?.calls.delta}
              color={GOLD}
            />
            <KpiCard
              icon={MousePointer}
              label="Website Clicks"
              value={yoyKPIs?.clicks.current.toLocaleString() || "—"}
              delta={yoyKPIs?.clicks.delta}
              color="#b85c38"
            />
            <KpiCard
              icon={MapPin}
              label="Directions"
              value={yoyKPIs?.directions.current.toLocaleString() || "—"}
              delta={yoyKPIs?.directions.delta}
              color="#6b8f71"
            />
          </div>
        </div>

        {/* ─── GA4 Sessions Chart ──────────────────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${MIST}`, padding: "24px 20px", marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: FOREST, marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>
            Website Sessions
          </h2>
          <p style={{ fontSize: 12, color: "#888", marginBottom: 20 }}>
            GA4 sessions by page type — {displayName(selectedGA4Territory)} ({selectedYear - 1}–{selectedYear})
          </p>
          {ga4Loading ? (
            <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>Loading...</div>
          ) : ga4ChartData.length === 0 ? (
            <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>No data available for this territory</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={ga4ChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#888" }} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="Total" stroke={SAGE} fill={SAGE + "30"} strokeWidth={2} name="Total Sessions" />
                <Area type="monotone" dataKey="Species" stroke={GOLD} fill={GOLD + "20"} strokeWidth={1.5} name="Species Pages" />
                <Area type="monotone" dataKey="Blog" stroke="#b85c38" fill="#b85c3820" strokeWidth={1.5} name="Blog Pages" />
                <Area type="monotone" dataKey="Location" stroke="#6b8f71" fill="#6b8f7120" strokeWidth={1.5} name="Location Pages" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* ─── GBP Metrics Chart ───────────────────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${MIST}`, padding: "24px 20px", marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: FOREST, marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>
            Google Business Profile
          </h2>
          <p style={{ fontSize: 12, color: "#888", marginBottom: 20 }}>
            Monthly GBP interactions — {displayName(selectedGBPTerritory)} ({selectedYear - 1}–{selectedYear})
          </p>
          {gbpLoading ? (
            <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>Loading...</div>
          ) : gbpChartData.length === 0 ? (
            <div style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>No data available for this territory</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={gbpChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#888" }} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Calls" fill={SAGE} radius={[3, 3, 0, 0]} name="Calls" />
                <Bar dataKey="Website Clicks" fill={GOLD} radius={[3, 3, 0, 0]} name="Website Clicks" />
                <Bar dataKey="Directions" fill="#6b8f71" radius={[3, 3, 0, 0]} name="Directions" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* ─── YoY Comparison Table ────────────────────────────────────────────── */}
        {yoyData && (
          <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${MIST}`, padding: "24px 20px", marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: FOREST, marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>
              Year-over-Year Detail
            </h2>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>
              {FULL_MONTHS[comparisonMonth - 1]} {selectedYear} vs {FULL_MONTHS[comparisonMonth - 1]} {selectedYear - 1} — {displayName(selectedGBPTerritory)}
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${MIST}` }}>
                  <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, color: "#666", fontSize: 11, textTransform: "uppercase" }}>Metric</th>
                  <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#666", fontSize: 11, textTransform: "uppercase" }}>{MONTHS[comparisonMonth - 1]} {selectedYear - 1}</th>
                  <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#666", fontSize: 11, textTransform: "uppercase" }}>{MONTHS[comparisonMonth - 1]} {selectedYear}</th>
                  <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, color: "#666", fontSize: 11, textTransform: "uppercase" }}>Change</th>
                </tr>
              </thead>
              <tbody>
                {yoyKPIs && Object.entries(yoyKPIs).map(([key, data]) => (
                  <tr key={key} style={{ borderBottom: `1px solid ${MIST}` }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500, color: FOREST, textTransform: "capitalize" }}>{key === "clicks" ? "Website Clicks" : key}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "#666" }}>{data.previous.toLocaleString()}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 600, color: FOREST }}>{data.current.toLocaleString()}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 600, color: data.delta.color, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                      <DeltaIcon direction={data.delta.direction} />
                      {data.delta.text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ─── Data Source Note ─────────────────────────────────────────────────── */}
        <div style={{ padding: "14px 18px", background: CREAM, borderRadius: 8, border: `1px solid ${MIST}`, fontSize: 12, color: "#666" }}>
          <strong style={{ color: SAGE }}>Data Sources:</strong> GA4 sessions from Google Analytics (2022–2026). GBP metrics from Google Business Profile (Oct 2024–Jun 2026).
          GSC data (search queries, clicks, impressions) will be added when API access is available.
        </div>
      </div>
    </PortalLayout>
  );
}
