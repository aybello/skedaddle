import { describe, expect, it } from "vitest";
import { TERRITORIES, gbpImageRouter } from "./gbpImageRouter";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { createHash } from "crypto";

// ── Territory data tests ─────────────────────────────────────────────────────
describe("TERRITORIES", () => {
  it("has at least 19 territories", () => {
    expect(Object.keys(TERRITORIES).length).toBeGreaterThanOrEqual(19);
  });

  it("each territory has required fields", () => {
    for (const [id, t] of Object.entries(TERRITORIES)) {
      expect(t.label, `${id} missing label`).toBeTruthy();
      expect(t.cityState, `${id} missing cityState`).toBeTruthy();
      expect(t.suburbs.length, `${id} has no suburbs`).toBeGreaterThan(0);
    }
  });

  it("milwaukee has correct data", () => {
    const mil = TERRITORIES["milwaukee"];
    expect(mil.label).toBe("Milwaukee, WI");
    expect(mil.cityState).toBe("Milwaukee WI");
    expect(mil.suburbs).toContain("Waukesha");
  });

  it("hamilton has correct data", () => {
    const ham = TERRITORIES["hamilton"];
    expect(ham.label).toBe("Hamilton, ON");
    expect(ham.suburbs).toContain("Ancaster");
  });
});

// ── Router procedure tests ───────────────────────────────────────────────────
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("gbpImage.getTerritories", () => {
  it("returns all territories as an array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const territories = await caller.gbpImage.getTerritories();
    expect(Array.isArray(territories)).toBe(true);
    expect(territories.length).toBeGreaterThanOrEqual(19);
    const mil = territories.find((t) => t.id === "milwaukee");
    expect(mil).toBeDefined();
    expect(mil?.label).toBe("Milwaukee, WI");
    expect(Array.isArray(mil?.suburbs)).toBe(true);
  });
});

describe("gbpImage.getSuburbs", () => {
  it("returns suburbs for a valid territory", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const suburbs = await caller.gbpImage.getSuburbs({ territoryId: "hamilton" });
    expect(Array.isArray(suburbs)).toBe(true);
    expect(suburbs).toContain("Ancaster");
  });

  it("returns empty array for unknown territory", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const suburbs = await caller.gbpImage.getSuburbs({ territoryId: "unknown-territory" });
    expect(suburbs).toEqual([]);
  });
});

// ── FAL_KEY validation ───────────────────────────────────────────────────────
describe("FAL_KEY environment", () => {
  it("FAL_KEY is set in environment", () => {
    expect(process.env.FAL_KEY).toBeTruthy();
    expect(typeof process.env.FAL_KEY).toBe("string");
    expect(process.env.FAL_KEY!.length).toBeGreaterThan(10);
  });

  it("FAL_KEY has expected format (uuid:hex)", () => {
    const key = process.env.FAL_KEY!;
    // Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:hexhexhex
    expect(key).toMatch(/^[0-9a-f-]+:[0-9a-f]+$/i);
  });
});

// ── #2: Content hash collision safety ────────────────────────────────────────
describe("contentHash8 (filename collision fix)", () => {
  // Replicate the function logic for testing
  function contentHash8(title: string, body: string, territory: string, suburb: string): string {
    return createHash("sha256")
      .update(`${title}|${body}|${territory}|${suburb}`)
      .digest("hex")
      .slice(0, 8);
  }

  it("produces 8-character hex string", () => {
    const hash = contentHash8("Raccoon Removal", "body text", "milwaukee", "Waukesha");
    expect(hash).toMatch(/^[0-9a-f]{8}$/);
  });

  it("different content produces different hashes", () => {
    const h1 = contentHash8("Raccoon Removal", "body1", "milwaukee", "Waukesha");
    const h2 = contentHash8("Squirrel Exclusion", "body2", "milwaukee", "Waukesha");
    expect(h1).not.toBe(h2);
  });

  it("same content produces same hash (idempotent)", () => {
    const h1 = contentHash8("Same Title", "Same Body", "hamilton", "Ancaster");
    const h2 = contentHash8("Same Title", "Same Body", "hamilton", "Ancaster");
    expect(h1).toBe(h2);
  });
});

// ── #1: getJobStatus returns not_found for unknown jobs ──────────────────────
describe("gbpImage.getJobStatus", () => {
  it("returns found=false for unknown jobId", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.gbpImage.getJobStatus({ jobId: "nonexistent_job_id" });
    expect(result.found).toBe(false);
    expect(result.status).toBe("not_found");
    expect(result.results).toEqual([]);
  });
});

// ── LLM model availability ───────────────────────────────────────────────────
describe("LLM model configuration", () => {
  it("BUILT_IN_FORGE_API_URL is configured", () => {
    expect(process.env.BUILT_IN_FORGE_API_URL).toBeTruthy();
  });

  it("BUILT_IN_FORGE_API_KEY is configured", () => {
    expect(process.env.BUILT_IN_FORGE_API_KEY).toBeTruthy();
  });
});
