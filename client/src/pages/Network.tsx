// Skedaddle Franchise Portal — Network Page
// Shows all franchise locations in a table view with region grouping

import PortalLayout from "@/components/PortalLayout";
import { FRANCHISE_LOCATIONS, REGIONS } from "@/data/franchises";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function Network() {
  return (
    <PortalLayout>
      <div className="px-6 py-8 max-w-5xl">
        {/* Page header */}
        <div className="mb-8">
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.42 0.09 145)", fontFamily: "Inter, sans-serif" }}
          >
            Franchise Network
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}
          >
            Network Overview
          </h1>
          <div
            className="text-sm"
            style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}
          >
            {FRANCHISE_LOCATIONS.length} locations tracked · {FRANCHISE_LOCATIONS.filter(f => f.status === "active").length} with active dashboards
          </div>
          <div className="mt-3" style={{ borderTop: "2px solid oklch(0.32 0.09 145)", width: "48px" }} />
        </div>

        {/* Regions */}
        {REGIONS.map((region) => {
          const locations = FRANCHISE_LOCATIONS.filter((f) => f.region === region);
          return (
            <div key={region} className="mb-8">
              <h2
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "oklch(0.42 0.09 145)", fontFamily: "Inter, sans-serif" }}
              >
                {region}
              </h2>
              <div
                className="rounded-sm border overflow-hidden"
                style={{ borderColor: "oklch(0.88 0.012 80)" }}
              >
                <table className="w-full" style={{ fontFamily: "Inter, sans-serif" }}>
                  <thead>
                    <tr style={{ background: "oklch(0.94 0.008 80)" }}>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.52 0.016 80)" }}>Location</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.52 0.016 80)" }}>City</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.52 0.016 80)" }}>Country</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.52 0.016 80)" }}>Status</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "oklch(0.52 0.016 80)" }}>Top Species</th>
                      <th className="px-4 py-2.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((loc, i) => (
                      <tr
                        key={loc.id}
                        style={{
                          background: i % 2 === 0 ? "oklch(1 0 0)" : "oklch(0.985 0.004 80)",
                          borderTop: "1px solid oklch(0.92 0.008 80)",
                        }}
                      >
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold" style={{ color: "oklch(0.18 0.015 65)" }}>
                            {loc.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm" style={{ color: "oklch(0.40 0.015 65)" }}>
                          {loc.city}
                        </td>
                        <td className="px-4 py-3 text-sm" style={{ color: "oklch(0.40 0.015 65)" }}>
                          {loc.country}
                        </td>
                        <td className="px-4 py-3">
                          {loc.status === "active" ? (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-sm" style={{ background: "oklch(0.92 0.06 145)", color: "oklch(0.28 0.09 145)" }}>
                              Active
                            </span>
                          ) : (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-sm" style={{ background: "oklch(0.94 0.008 80)", color: "oklch(0.52 0.016 80)" }}>
                              Awaiting Data
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm" style={{ color: "oklch(0.40 0.015 65)" }}>
                          {loc.kpis.topSpecies}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            href={`/location/${loc.id}`}
                            className="text-xs font-semibold flex items-center gap-1 justify-end transition-opacity hover:opacity-70"
                            style={{ color: "oklch(0.32 0.09 145)" }}
                          >
                            View <ArrowUpRight size={11} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </PortalLayout>
  );
}
