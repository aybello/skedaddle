// Skedaddle Franchise Portal — Overview / Home Page
// Shows all franchise locations as cards with status, KPIs, and links to reports

import PortalLayout from "@/components/PortalLayout";
import { useAuth } from "@/contexts/AuthContext";
import { FRANCHISE_LOCATIONS, type FranchiseLocation } from "@/data/franchises";
import { ArrowUpRight, Clock, ExternalLink, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "wouter";

function StatusBadge({ status }: { status: FranchiseLocation["status"] }) {
  const map = {
    active: { label: "Dashboard Ready", bg: "oklch(0.92 0.06 145)", color: "oklch(0.28 0.09 145)" },
    pending: { label: "In Progress", bg: "oklch(0.95 0.06 80)", color: "oklch(0.50 0.10 80)" },
    coming_soon: { label: "Awaiting Data", bg: "oklch(0.94 0.008 80)", color: "oklch(0.52 0.016 80)" },
  };
  const s = map[status];
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-sm"
      style={{ background: s.bg, color: s.color, fontFamily: "Inter, sans-serif" }}
    >
      {s.label}
    </span>
  );
}

function TrendIcon({ trend }: { trend: FranchiseLocation["kpis"]["sessionsTrend"] }) {
  if (trend === "up") return <TrendingUp size={14} style={{ color: "oklch(0.42 0.12 145)" }} />;
  if (trend === "down") return <TrendingDown size={14} style={{ color: "oklch(0.55 0.20 27)" }} />;
  return <span style={{ color: "oklch(0.65 0.010 80)", fontSize: "12px" }}>→</span>;
}

function LocationCard({ loc }: { loc: FranchiseLocation }) {
  const isReady = loc.status === "active";

  return (
    <div
      className="rounded-sm border transition-shadow hover:shadow-md"
      style={{
        background: "oklch(1 0 0)",
        borderColor: "oklch(0.88 0.012 80)",
        borderLeft: isReady ? "3px solid oklch(0.32 0.09 145)" : "3px solid oklch(0.88 0.012 80)",
      }}
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <h3
              className="text-base font-bold truncate"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}
            >
              {loc.name}
            </h3>
            <div
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}
            >
              {loc.city}, {loc.state} · {loc.country} · {loc.region}
            </div>
          </div>
          <StatusBadge status={loc.status} />
        </div>

        {/* KPI row */}
        {isReady ? (
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div>
              <div
                className="text-xs uppercase tracking-wider mb-0.5"
                style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}
              >
                Top Species
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: "oklch(0.18 0.015 65)", fontFamily: "Inter, sans-serif" }}
              >
                {loc.kpis.topSpecies}
              </div>
            </div>
            <div>
              <div
                className="text-xs uppercase tracking-wider mb-0.5"
                style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}
              >
                Sessions
              </div>
              <div className="flex items-center gap-1">
                <TrendIcon trend={loc.kpis.sessionsTrend} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.18 0.015 65)", fontFamily: "Inter, sans-serif" }}
                >
                  {loc.kpis.sessionsTrend === "up" ? "Growing" : loc.kpis.sessionsTrend === "down" ? "Declining" : "Stable"}
                </span>
              </div>
            </div>
            <div>
              <div
                className="text-xs uppercase tracking-wider mb-0.5"
                style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}
              >
                Updated
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: "oklch(0.18 0.015 65)", fontFamily: "Inter, sans-serif" }}
              >
                {loc.lastUpdated ? new Date(loc.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="mt-3 text-sm"
            style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}
          >
            <Clock size={13} className="inline mr-1.5 mb-0.5" />
            Dashboard will be generated once Salesforce data is received from this location.
          </div>
        )}
      </div>

      {/* Card footer */}
      <div
        className="px-5 py-3 flex items-center justify-between border-t"
        style={{ borderColor: "oklch(0.93 0.008 80)" }}
      >
        <Link
          href={`/location/${loc.id}`}
          className="text-xs font-semibold flex items-center gap-1 transition-colors"
          style={{ color: "oklch(0.32 0.09 145)", fontFamily: "Inter, sans-serif" }}
        >
          View Details <ArrowUpRight size={12} />
        </Link>

        {isReady && loc.driveUrl && (
          <a
            href={loc.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}
          >
            Full Report <ExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();

  const visibleLocations =
    user?.role === "admin"
      ? FRANCHISE_LOCATIONS
      : FRANCHISE_LOCATIONS.filter((f) => f.id === user?.locationId);

  const activeCount = visibleLocations.filter((f) => f.status === "active").length;
  const totalCount = visibleLocations.length;

  return (
    <PortalLayout>
      <div className="px-6 py-8 max-w-6xl">
        {/* Page header */}
        <div className="mb-8">
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.42 0.09 145)", fontFamily: "Inter, sans-serif" }}
          >
            {user?.role === "admin" ? "Network Overview" : "Your Dashboard"}
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}
          >
            {user?.role === "admin" ? "Franchise Locations" : `${user?.locationId?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Dashboard`}
          </h1>
          <div
            className="text-sm"
            style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}
          >
            {activeCount} of {totalCount} location{totalCount !== 1 ? "s" : ""} with active dashboards
            {user?.role === "admin" && " · Skedaddle Humane Wildlife Control network"}
          </div>
          <div className="mt-3" style={{ borderTop: "2px solid oklch(0.32 0.09 145)", width: "48px" }} />
        </div>

        {/* Location grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visibleLocations.map((loc) => (
            <LocationCard key={loc.id} loc={loc} />
          ))}
        </div>

        {/* Admin note */}
        {user?.role === "admin" && (
          <div
            className="mt-8 p-4 rounded-sm border text-sm"
            style={{
              background: "oklch(0.97 0.012 80)",
              borderColor: "oklch(0.88 0.012 80)",
              color: "oklch(0.52 0.016 80)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <strong style={{ color: "oklch(0.32 0.09 145)" }}>Admin note:</strong> Dashboards marked "Awaiting Data" will be generated once Salesforce exports are received from each franchise. Contact Dave Henderson (dph@davidhenderson.ca) to request data for additional locations.
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
