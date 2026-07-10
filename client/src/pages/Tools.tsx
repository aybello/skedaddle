// Skedaddle Franchise Portal — Tools Page
// Lists all 5 operational tools with descriptions and download links

import PortalLayout from "@/components/PortalLayout";
import { BarChart3, Calendar, ClipboardList, FileText, Leaf } from "lucide-react";

interface Tool {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "available" | "coming_soon";
  filename?: string;
  usage?: string;
}

const TOOLS: Tool[] = [
  {
    id: 1,
    name: "Suburb Page Brief Generator",
    description: "Generates a ready-to-write content brief for any suburb + species combination. Input a location, species, and suburb name; output a structured brief with keyword targets, H1/H2 suggestions, word count, and internal linking recommendations.",
    icon: <FileText size={20} />,
    status: "available",
    filename: "suburb_brief_generator.py",
    usage: "python3 suburb_brief_generator.py --location milwaukee --species squirrel --suburb waukesha --data /path/to/data.json",
  },
  {
    id: 2,
    name: "GBP Content Calendar Generator",
    description: "Generates a 12-month Google Business Profile content calendar with 16 posts per month across 4 content streams: seasonal/species, suburb spotlight, educational, and social proof. Outputs a structured Markdown calendar ready for scheduling.",
    icon: <Calendar size={20} />,
    status: "available",
    filename: "gbp_calendar_generator.py",
    usage: "python3 gbp_calendar_generator.py --location milwaukee --data /path/to/data.json --out ./output/",
  },
  {
    id: 3,
    name: "Monthly Trigger Report Generator",
    description: "Generates a one-page HTML trigger report for the start of each month. Shows trending species, new suburb opportunities, seasonal context, and 3 specific data-driven actions for the franchise owner. Designed to be a 5-minute read that drives weekly decisions.",
    icon: <BarChart3 size={20} />,
    status: "available",
    filename: "trigger_report_generator.py",
    usage: "python3 trigger_report_generator.py --location milwaukee --data /path/to/data.json --month 'July 2026' --out ./output/",
  },
  {
    id: 4,
    name: "Pest Expansion Page Template",
    description: "A full 8-section service page template for franchise locations expanding into pest control (termites, ants, cockroaches, wasps). Includes SEO notes, word count targets, schema markup template, internal linking checklist, and North Atlanta-specific market notes.",
    icon: <Leaf size={20} />,
    status: "available",
    filename: "pest_expansion_template.md",
    usage: "Open in any Markdown editor. Replace all [PLACEHOLDER] values with location-specific content.",
  },
  {
    id: 5,
    name: "GBP Audit Checklist",
    description: "A 9-section Google Business Profile audit covering profile completeness, services, photos, posts, reviews, Q&A, attributes, technical accuracy, and insights. Includes a scoring system, priority action prompts, and a quarterly audit schedule.",
    icon: <ClipboardList size={20} />,
    status: "available",
    filename: "gbp_audit_checklist.md",
    usage: "Complete quarterly. Score each section and identify the top 3 priority actions. Share with UWS for implementation support.",
  },
];

const STATUS_COLORS = {
  available:    { bg: "oklch(0.92 0.06 145)", text: "oklch(0.28 0.09 145)", label: "Available" },
  coming_soon:  { bg: "oklch(0.94 0.008 80)", text: "oklch(0.52 0.016 80)", label: "Coming Soon" },
};

export default function Tools() {
  return (
    <PortalLayout>
      <div className="px-6 py-8 max-w-4xl">
        {/* Page header */}
        <div className="mb-8">
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "oklch(0.42 0.09 145)", fontFamily: "Inter, sans-serif" }}
          >
            Operational Intelligence
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}
          >
            Tools & Templates
          </h1>
          <div
            className="text-sm"
            style={{ color: "oklch(0.52 0.016 80)", fontFamily: "Inter, sans-serif" }}
          >
            5 operational tools built by Unwired Web Solutions for Skedaddle franchise owners.
            All tools are Python scripts or Markdown templates — no external dependencies required.
          </div>
          <div className="mt-3" style={{ borderTop: "2px solid oklch(0.32 0.09 145)", width: "48px" }} />
        </div>

        {/* Tool cards */}
        <div className="space-y-5">
          {TOOLS.map((tool) => {
            const sc = STATUS_COLORS[tool.status];
            return (
              <div
                key={tool.id}
                className="rounded-sm border"
                style={{
                  background: "oklch(1 0 0)",
                  borderColor: "oklch(0.88 0.012 80)",
                  borderLeft: "3px solid oklch(0.32 0.09 145)",
                }}
              >
                <div className="px-5 py-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center"
                      style={{ background: "oklch(0.92 0.06 145)", color: "oklch(0.28 0.09 145)" }}
                    >
                      {tool.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span
                          className="text-xs font-semibold"
                          style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}
                        >
                          Tool {tool.id}
                        </span>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-sm"
                          style={{ background: sc.bg, color: sc.text, fontFamily: "Inter, sans-serif" }}
                        >
                          {sc.label}
                        </span>
                      </div>
                      <h3
                        className="text-base font-bold mb-2"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "oklch(0.18 0.015 65)" }}
                      >
                        {tool.name}
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{ color: "oklch(0.40 0.015 65)", fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
                      >
                        {tool.description}
                      </p>

                      {/* Usage */}
                      {tool.usage && (
                        <div>
                          <div
                            className="text-xs font-semibold uppercase tracking-wider mb-1"
                            style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}
                          >
                            Usage
                          </div>
                          <code
                            className="block text-xs px-3 py-2 rounded-sm"
                            style={{
                              background: "oklch(0.94 0.008 80)",
                              color: "oklch(0.30 0.015 65)",
                              fontFamily: "monospace",
                              wordBreak: "break-all",
                            }}
                          >
                            {tool.usage}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                {tool.filename && (
                  <div
                    className="px-5 py-3 border-t flex items-center justify-between"
                    style={{ borderColor: "oklch(0.93 0.008 80)" }}
                  >
                    <code
                      className="text-xs"
                      style={{ color: "oklch(0.52 0.016 80)", fontFamily: "monospace" }}
                    >
                      {tool.filename}
                    </code>
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.010 80)", fontFamily: "Inter, sans-serif" }}
                    >
                      Available in SkedaddleOperationalTools_v1.zip
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Download note */}
        <div
          className="mt-8 p-4 rounded-sm border text-sm"
          style={{
            background: "oklch(0.97 0.012 80)",
            borderColor: "oklch(0.88 0.012 80)",
            color: "oklch(0.52 0.016 80)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <strong style={{ color: "oklch(0.32 0.09 145)" }}>Download all tools:</strong> The complete tool package is available in the UWS Work Google Drive folder as <code style={{ fontFamily: "monospace" }}>SkedaddleOperationalTools_v1.zip</code>. Contact <a href="mailto:abello@unwiredwebsolutions.com" style={{ color: "oklch(0.32 0.09 145)" }}>abello@unwiredwebsolutions.com</a> for access.
        </div>
      </div>
    </PortalLayout>
  );
}
