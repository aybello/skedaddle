// Skedaddle Franchise Portal — Location Detail Page
// Shows the full strategy dashboard (embedded from Drive)

import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getLocationById } from "@/data/franchises";
import { BarChart2, ExternalLink, FileText, MapPin, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { useLocation, useParams } from "wouter";



export default function LocationDetail() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const loc = getLocationById(params.id);

  // Redirect if user doesn't have access
  useEffect(() => {
    if (user?.role === "franchise" && user.locationId !== params.id) {
      navigate("/");
    }
  }, [user, params.id, navigate]);



  if (!loc) {
    return (
      <PortalLayout>
        <div className="px-6 py-8">
          <p style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}>
            Location not found.
          </p>
        </div>
      </PortalLayout>
    );
  }



  return (
    <PortalLayout>
      <div className="px-6 py-8 max-w-5xl">
        {/* Page header */}
        <div className="mb-8">
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.42 0.09 145)", fontFamily: "Inter, sans-serif" }}
          >
            {loc.region} · {loc.country}
          </div>
          <h1
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}
          >
            {loc.name}
          </h1>
          <div
            className="text-sm"
            style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}
          >
            {loc.city}, {loc.state}
            {loc.lastUpdated && ` · Dashboard updated ${new Date(loc.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
          </div>
          <div className="mt-3" style={{ borderTop: "2px solid oklch(0.32 0.09 145)", width: "48px" }} />
        </div>

        {/* Strategy Dashboard section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}
            >
              Strategy Dashboard
            </h2>
          </div>

          {loc.status === "active" ? (
            <div
              className="rounded-sm border overflow-hidden"
              style={{ borderColor: "oklch(0.82 0.06 145)", background: "oklch(0.97 0.012 80)" }}
            >
              {/* Dashboard card — links to in-portal dashboard page */}
              <div
                className="px-6 py-5 flex items-center justify-between"
                style={{ background: "oklch(0.22 0.06 145)", borderBottom: "1px solid oklch(0.30 0.08 145)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.32 0.09 145)" }}
                  >
                    <BarChart2 size={16} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "white", fontFamily: "Inter, sans-serif" }}>
                      {loc.name} — Full Strategy Dashboard
                    </div>
                    <div className="text-xs" style={{ color: "oklch(0.75 0.06 145)", fontFamily: "Inter, sans-serif" }}>
                      Revenue · Species · Suburbs · GSC · GBP · Updated July 2026
                    </div>
                  </div>
                </div>
                <Link
                  href={`/dashboard/${loc.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ background: "oklch(0.55 0.14 145)", color: "white", fontFamily: "Inter, sans-serif", textDecoration: "none" }}
                >
                  Open Dashboard
                </Link>
              </div>

              {/* Dashboard summary */}
              <div className="grid grid-cols-2 gap-0" style={{ borderBottom: "1px solid oklch(0.88 0.012 80)" }}>
                <div className="p-5" style={{ borderRight: "1px solid oklch(0.88 0.012 80)" }}>
                  <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}>What's Inside</div>
                  <div className="space-y-2">
                    {[
                      { icon: <TrendingUp size={13} />, label: "Revenue & jobs by species — ranked" },
                      { icon: <MapPin size={13} />, label: "Top 20 suburbs by revenue and job count" },
                      { icon: <BarChart2 size={13} />, label: "Google Search Console — clicks, impressions, position" },
                      { icon: <FileText size={13} />, label: "GBP performance — searches, calls, website clicks" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0" style={{ color: "oklch(0.42 0.09 145)" }}>{item.icon}</span>
                        <span className="text-xs" style={{ color: "oklch(0.35 0.015 65)", fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}>Quick Stats</div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs" style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}>Top Species</div>
                      <div className="text-sm font-semibold" style={{ color: "oklch(0.18 0.015 65)", fontFamily: "Inter, sans-serif" }}>{loc.kpis.topSpecies}</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}>Sessions Trend</div>
                      <div className="text-sm font-semibold" style={{ color: loc.kpis.sessionsTrend === "up" ? "oklch(0.42 0.09 145)" : loc.kpis.sessionsTrend === "down" ? "oklch(0.45 0.18 27)" : "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}>
                        {loc.kpis.sessionsTrend === "up" ? "↑ Growing" : loc.kpis.sessionsTrend === "down" ? "↓ Declining" : "→ Stable"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}>Dashboard Type</div>
                      <div className="text-sm font-semibold" style={{ color: "oklch(0.18 0.015 65)", fontFamily: "Inter, sans-serif" }}>Live — built into portal</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 flex items-center justify-between flex-wrap gap-3" style={{ background: "oklch(0.97 0.012 80)" }}>
                <span className="text-xs" style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}>
                  Full interactive charts — no external login required
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  {loc.fullReportUrl && (
                    <a
                      href={loc.fullReportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1 font-semibold transition-opacity hover:opacity-70"
                      style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif", textDecoration: "none" }}
                    >
                      <FileText size={12} /> Full Report
                    </a>
                  )}
                  {(loc.triggerReportUrl || loc.triggerPdfUrl) && (
                    <a
                      href={loc.triggerReportUrl || loc.triggerPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1 font-semibold transition-opacity hover:opacity-70"
                      style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif", textDecoration: "none" }}
                    >
                      <ExternalLink size={12} /> Monthly Trigger Report
                    </a>
                  )}
                  <Link
                    href={`/dashboard/${loc.id}`}
                    className="text-xs flex items-center gap-1 font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "oklch(0.32 0.09 145)", fontFamily: "Inter, sans-serif", textDecoration: "none" }}
                  >
                    View Full Dashboard →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-sm border p-10 text-center"
              style={{ borderColor: "oklch(0.88 0.012 80)", background: "oklch(0.97 0.012 80)" }}
            >
              <div
                className="text-sm mb-2"
                style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}
              >
                Dashboard not yet available for this location.
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}
              >
                A full strategy dashboard will be generated once Salesforce data is received.
                Contact <a href="mailto:abello@unwiredwebsolutions.com" style={{ color: "oklch(0.32 0.09 145)" }}>abello@unwiredwebsolutions.com</a> to request data collection.
              </div>
            </div>
          )}
        </section>


      </div>
    </PortalLayout>
  );
}
