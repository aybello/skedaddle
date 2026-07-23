/**
 * PrintReport.tsx — Printable / PDF-ready full strategy report
 * Accessed via /report/:id — opens in a clean layout optimised for print
 * User can Ctrl+P / Cmd+P or use browser "Save as PDF" to export
 */

import { useParams, Link } from "wouter";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import { DASHBOARD_DATA } from "@/data/dashboardData";
import { useEffect } from "react";

// ─── colour palette ───────────────────────────────────────────────────────────
const FOREST  = "#1a3a2a";
const GOLD    = "#c9a84c";
const CREAM   = "#f5f0e8";
const SAGE    = "#4a7c59";
const RUST    = "#b85c38";
const MIST    = "#e8ede9";
const CHART_COLORS = [SAGE, GOLD, RUST, "#6b8f71", "#d4a843", "#8b4513", "#5a7a6a", "#c8a45a", "#9b6b4a", "#7a9e7e", "#e8b86d"];

const fmt$ = (n: number, currency?: "CAD" | "USD") => {
  const suffix = currency ? ` ${currency}` : "";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M${suffix}`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K${suffix}`;
  return `$${n.toFixed(0)}${suffix}`;
};

const fmtN = (n: number) =>
  n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` : `${n}`;

const shortMonth = (m: string) => {
  const [y, mo] = m.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(mo) - 1]} '${y.slice(2)}`;
};

function ChartTooltip({ active, payload, label, formatter }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: FOREST, border: `1px solid ${GOLD}40`, borderRadius: 6, padding: "8px 12px", fontSize: 11 }}>
      <div style={{ color: GOLD, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: CREAM }}>
          {p.name}: {formatter ? formatter(p.value) : p.value}
        </div>
      ))}
    </div>
  );
}

export default function PrintReport() {
  const params = useParams<{ id: string }>();
  const id = params.id?.toLowerCase() || "";
  const data = DASHBOARD_DATA[id];

  // Set page title for PDF filename
  useEffect(() => {
    if (data) {
      document.title = `Skedaddle ${data.name} — Strategy Report July 2026`;
    }
    return () => { document.title = "Skedaddle Franchise Strategy Dashboards"; };
  }, [data]);

  if (!data) {
    return (
      <div style={{ padding: 48, textAlign: "center", fontFamily: "Inter, sans-serif" }}>
        <p>Report not available for this location.</p>
        <Link href="/" style={{ color: SAGE }}>← Back to portal</Link>
      </div>
    );
  }

  const pieData = data.species.slice(0, 6).map(s => ({ name: s.species, value: s.total_revenue }));
  const gbpChart = data.gbp.monthly.slice(-12);
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        @page { margin: 15mm 12mm; size: A4; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ background: "white", maxWidth: 900, margin: "0 auto", fontFamily: "Inter, sans-serif", color: FOREST }}>

        {/* ── Print/Back bar (hidden in print) ── */}
        <div
          className="no-print"
          style={{
            background: FOREST, padding: "12px 32px", display: "flex",
            alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10
          }}
        >
          <Link href={`/location/${id}`} style={{ color: GOLD, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            ← Back to Location
          </Link>
          <button
            onClick={() => window.print()}
            style={{
              background: GOLD, color: FOREST, border: "none", borderRadius: 4,
              padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer"
            }}
          >
            Save as PDF / Print
          </button>
        </div>

        {/* ── Report body ── */}
        <div style={{ padding: "40px 48px" }}>

          {/* Cover header */}
          <div style={{ borderBottom: `3px solid ${FOREST}`, paddingBottom: 24, marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: GOLD, marginBottom: 6 }}>
                  Skedaddle Franchise Strategy Report
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px", fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Skedaddle {data.name}
                </h1>
                <div style={{ fontSize: 13, color: "#666" }}>
                  Trailing 12-Month Performance · Generated {today}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em" }}>Data Sources</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 4, lineHeight: 1.8 }}>
                  Salesforce CRM<br />Google Search Console<br />Google Business Profile
                </div>
              </div>
            </div>
          </div>

          {/* ── KPI Summary ── */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: FOREST, marginBottom: 16, borderLeft: `3px solid ${GOLD}`, paddingLeft: 10 }}>
              Performance Summary
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { label: `Total Revenue (${data.currency})`, value: fmt$(data.total_revenue, data.currency), sub: "Trailing 12 months" },
                { label: "Total Jobs", value: `${data.total_jobs}`, sub: "Completed service calls" },
                { label: "Top Species", value: data.species[0]?.species || "—", sub: data.species[0] ? fmt$(data.species[0].total_revenue, data.currency) + " revenue" : "" },
                { label: "Top Suburb", value: data.suburbs[0]?.suburb || "—", sub: data.suburbs[0] ? fmt$(data.suburbs[0].revenue, data.currency) + " revenue" : "" },
                { label: "GSC Organic Clicks", value: fmtN(data.gsc.total_clicks), sub: "Total search clicks" },
                { label: "GBP Phone Calls", value: fmtN(data.gbp.total_calls), sub: `from ${fmtN(data.gbp.total_searches)} searches` },
              ].map((k, i) => (
                <div key={i} style={{ background: CREAM, borderRadius: 6, padding: "14px 16px", border: `1px solid ${MIST}` }}>
                  <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: 4 }}>{k.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: FOREST, fontFamily: "'Playfair Display', Georgia, serif" }}>{k.value}</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{k.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Revenue by Species ── */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: FOREST, marginBottom: 16, borderLeft: `3px solid ${GOLD}`, paddingLeft: 10 }}>
              Revenue by Species
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.species} margin={{ top: 0, right: 0, left: 0, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0dbd0" />
                  <XAxis dataKey="species" tick={{ fontSize: 10, fill: "#555" }} angle={-40} textAnchor="end" interval={0} />
                  <YAxis tickFormatter={v => fmt$(v, data.currency)} tick={{ fontSize: 10, fill: "#555" }} width={65} />
                  <Tooltip content={<ChartTooltip formatter={(v: number) => fmt$(v, data.currency)} />} />
                  <Bar dataKey="total_revenue" name="Revenue" radius={[3, 3, 0, 0]}>
                    {data.species.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${MIST}` }}>
                      <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 10, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>Species</th>
                      <th style={{ textAlign: "right", padding: "6px 8px", fontSize: 10, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>Revenue</th>
                      <th style={{ textAlign: "right", padding: "6px 8px", fontSize: 10, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>Jobs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.species.map((s, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${MIST}`, background: i % 2 === 0 ? "transparent" : "#faf8f4" }}>
                        <td style={{ padding: "7px 8px", display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 8, height: 8, borderRadius: 2, background: CHART_COLORS[i % CHART_COLORS.length], display: "inline-block", flexShrink: 0 }} />
                          {s.species}
                        </td>
                        <td style={{ padding: "7px 8px", textAlign: "right", fontWeight: 600 }}>{fmt$(s.total_revenue, data.currency)}</td>
                        <td style={{ padding: "7px 8px", textAlign: "right", color: "#666" }}>{s.total_jobs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Top Suburbs ── */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: FOREST, marginBottom: 16, borderLeft: `3px solid ${GOLD}`, paddingLeft: 10 }}>
              Revenue by Suburb ({data.currency}) — Top 20
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: FOREST, color: CREAM }}>
                  <th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, fontSize: 10, textTransform: "uppercase" }}>Suburb</th>
                  <th style={{ textAlign: "right", padding: "8px 10px", fontWeight: 600, fontSize: 10, textTransform: "uppercase" }}>Revenue</th>
                  <th style={{ textAlign: "right", padding: "8px 10px", fontWeight: 600, fontSize: 10, textTransform: "uppercase" }}>Jobs</th>
                  <th style={{ textAlign: "right", padding: "8px 10px", fontWeight: 600, fontSize: 10, textTransform: "uppercase" }}>Avg / Job</th>
                  <th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, fontSize: 10, textTransform: "uppercase" }}>Share</th>
                </tr>
              </thead>
              <tbody>
                {data.suburbs.map((s, i) => {
                  const pct = (s.revenue / data.suburbs[0].revenue) * 100;
                  const avgJob = s.jobs > 0 ? s.revenue / s.jobs : 0;
                  return (
                    <tr key={i} style={{ borderBottom: `1px solid ${MIST}`, background: i % 2 === 0 ? "transparent" : "#faf8f4" }}>
                      <td style={{ padding: "7px 10px", fontWeight: i < 3 ? 600 : 400 }}>
                        {i < 3 && <span style={{ color: GOLD, marginRight: 4 }}>★</span>}
                        {s.suburb}
                      </td>
                      <td style={{ padding: "7px 10px", textAlign: "right", fontWeight: 600 }}>{fmt$(s.revenue, data.currency)}</td>
                      <td style={{ padding: "7px 10px", textAlign: "right", color: "#666" }}>{s.jobs}</td>
                      <td style={{ padding: "7px 10px", textAlign: "right", color: "#666" }}>{avgJob > 0 ? fmt$(avgJob, data.currency) : "—"}</td>
                      <td style={{ padding: "7px 10px" }}>
                        <div style={{ background: MIST, borderRadius: 2, height: 6, width: "100%" }}>
                          <div style={{ background: CHART_COLORS[i % 3], borderRadius: 2, height: 6, width: `${pct}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Page break before digital section ── */}
          <div className="page-break" />

          {/* ── GSC ── */}
          <div style={{ marginBottom: 36, paddingTop: 8 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: FOREST, marginBottom: 16, borderLeft: `3px solid ${GOLD}`, paddingLeft: 10 }}>
              Google Search Console — Organic Traffic
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>Monthly Clicks</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={data.gsc.monthly.map(m => ({ ...m, month: shortMonth(m.month) }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0dbd0" />
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#555" }} />
                    <YAxis tick={{ fontSize: 9, fill: "#555" }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Line type="monotone" dataKey="clicks" name="Clicks" stroke={SAGE} strokeWidth={2} dot={{ fill: SAGE, r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>Average Position (lower = better)</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={data.gsc.monthly.map(m => ({ ...m, month: shortMonth(m.month) }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0dbd0" />
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#555" }} />
                    <YAxis reversed tick={{ fontSize: 9, fill: "#555" }} domain={['auto', 'auto']} />
                    <Tooltip content={<ChartTooltip />} />
                    <Line type="monotone" dataKey="avg_position" name="Avg Position" stroke={RUST} strokeWidth={2} dot={{ fill: RUST, r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { label: "Total Clicks", value: fmtN(data.gsc.total_clicks) },
                { label: "Total Impressions", value: fmtN(data.gsc.total_impressions) },
                { label: "Recent 3-Month Clicks", value: fmtN(data.gsc.recent_clicks) },
              ].map((k, i) => (
                <div key={i} style={{ background: CREAM, borderRadius: 6, padding: "12px 14px", border: `1px solid ${MIST}` }}>
                  <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: FOREST, fontFamily: "'Playfair Display', Georgia, serif", marginTop: 4 }}>{k.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── GBP ── */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: FOREST, marginBottom: 16, borderLeft: `3px solid ${GOLD}`, paddingLeft: 10 }}>
              Google Business Profile Performance
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={gbpChart} margin={{ top: 0, right: 0, left: 0, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0dbd0" />
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#555" }} angle={-40} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 9, fill: "#555" }} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="searches" name="Searches" fill={SAGE} radius={[2, 2, 0, 0]} />
                <Bar dataKey="calls" name="Calls" fill={GOLD} radius={[2, 2, 0, 0]} />
                <Bar dataKey="website_clicks" name="Website Clicks" fill={RUST} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16 }}>
              {[
                { label: "Total GBP Searches", value: fmtN(data.gbp.total_searches) },
                { label: "Total Phone Calls", value: fmtN(data.gbp.total_calls) },
                { label: "Website Clicks", value: fmtN(data.gbp.total_clicks) },
              ].map((k, i) => (
                <div key={i} style={{ background: CREAM, borderRadius: 6, padding: "12px 14px", border: `1px solid ${MIST}` }}>
                  <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: FOREST, fontFamily: "'Playfair Display', Georgia, serif", marginTop: 4 }}>{k.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer ── */}
          <div style={{ borderTop: `2px solid ${FOREST}`, paddingTop: 16, marginTop: 40, display: "flex", justifyContent: "space-between", fontSize: 10, color: "#999" }}>
            <span>Skedaddle Franchise Portal · skedaddle.manus.space</span>
            <span>Skedaddle {data.name} · Strategy Report · {today}</span>
          </div>

        </div>
      </div>
    </>
  );
}
