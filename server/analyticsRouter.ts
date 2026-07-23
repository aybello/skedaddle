/**
 * analyticsRouter.ts — tRPC procedures for the DashThis replacement analytics dashboard.
 * Provides GA4 session data and GBP metrics with territory filtering, date ranges, and YoY comparisons.
 */

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { ga4Sessions, gbpMetrics } from "../drizzle/schema";
import { eq, and, sql, inArray, between, desc } from "drizzle-orm";

// ─── Procedures ──────────────────────────────────────────────────────────────

export const analyticsRouter = router({
  /**
   * Get all available territories that have analytics data.
   * Returns separate lists for GA4 and GBP since they may differ.
   */
  getTerritories: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { ga4: [], gbp: [] };

    const ga4Territories = await db
      .selectDistinct({ territory: ga4Sessions.territory })
      .from(ga4Sessions)
      .orderBy(ga4Sessions.territory);

    const gbpTerritories = await db
      .selectDistinct({ territory: gbpMetrics.territory })
      .from(gbpMetrics)
      .orderBy(gbpMetrics.territory);

    return {
      ga4: ga4Territories.map(r => r.territory),
      gbp: gbpTerritories.map(r => r.territory),
    };
  }),

  /**
   * Get available date range for data.
   */
  getDateRange: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { ga4: { minYear: 2022, maxYear: 2026 }, gbp: { minYear: 2024, maxYear: 2026 } };

    const [ga4Range] = await db
      .select({
        minYear: sql<number>`MIN(year)`,
        maxYear: sql<number>`MAX(year)`,
      })
      .from(ga4Sessions);

    const [gbpRange] = await db
      .select({
        minYear: sql<number>`MIN(year)`,
        maxYear: sql<number>`MAX(year)`,
      })
      .from(gbpMetrics);

    return {
      ga4: { minYear: ga4Range.minYear, maxYear: ga4Range.maxYear },
      gbp: { minYear: gbpRange.minYear, maxYear: gbpRange.maxYear },
    };
  }),

  /**
   * Get GA4 session data for a territory with optional date filtering.
   * Returns monthly data grouped by page type.
   */
  getGA4Sessions: publicProcedure
    .input(z.object({
      territory: z.string(),
      year: z.number().optional(),
      startMonth: z.number().min(1).max(12).optional(),
      endMonth: z.number().min(1).max(12).optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const conditions = [eq(ga4Sessions.territory, input.territory)];
      if (input.year) {
        conditions.push(eq(ga4Sessions.year, input.year));
      }
      if (input.startMonth) {
        conditions.push(sql`${ga4Sessions.month} >= ${input.startMonth}`);
      }
      if (input.endMonth) {
        conditions.push(sql`${ga4Sessions.month} <= ${input.endMonth}`);
      }

      const results = await db
        .select()
        .from(ga4Sessions)
        .where(and(...conditions))
        .orderBy(ga4Sessions.year, ga4Sessions.month);

      return results;
    }),

  /**
   * Get GBP metrics for a territory with optional date filtering.
   */
  getGBPMetrics: publicProcedure
    .input(z.object({
      territory: z.string(),
      year: z.number().optional(),
      startMonth: z.number().min(1).max(12).optional(),
      endMonth: z.number().min(1).max(12).optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const conditions = [eq(gbpMetrics.territory, input.territory)];
      if (input.year) {
        conditions.push(eq(gbpMetrics.year, input.year));
      }
      if (input.startMonth) {
        conditions.push(sql`${gbpMetrics.month} >= ${input.startMonth}`);
      }
      if (input.endMonth) {
        conditions.push(sql`${gbpMetrics.month} <= ${input.endMonth}`);
      }

      const results = await db
        .select()
        .from(gbpMetrics)
        .where(and(...conditions))
        .orderBy(gbpMetrics.year, gbpMetrics.month);

      return results;
    }),

  /**
   * Get YoY comparison for a specific month — compares current year to previous year.
   * Returns KPI-style data: current value, previous value, delta percentage.
   */
  getYoYComparison: publicProcedure
    .input(z.object({
      territory: z.string(),
      year: z.number(),
      month: z.number().min(1).max(12),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const { territory, year, month } = input;
      const prevYear = year - 1;

      // GA4 sessions comparison
      const currentGA4 = await db
        .select({
          pageType: ga4Sessions.pageType,
          sessions: sql<number>`SUM(sessions)`,
        })
        .from(ga4Sessions)
        .where(and(
          eq(ga4Sessions.territory, territory),
          eq(ga4Sessions.year, year),
          eq(ga4Sessions.month, month),
        ))
        .groupBy(ga4Sessions.pageType);

      const prevGA4 = await db
        .select({
          pageType: ga4Sessions.pageType,
          sessions: sql<number>`SUM(sessions)`,
        })
        .from(ga4Sessions)
        .where(and(
          eq(ga4Sessions.territory, territory),
          eq(ga4Sessions.year, prevYear),
          eq(ga4Sessions.month, month),
        ))
        .groupBy(ga4Sessions.pageType);

      // GBP metrics comparison
      const currentGBP = await db
        .select({
          metricType: gbpMetrics.metricType,
          value: sql<number>`SUM(value)`,
        })
        .from(gbpMetrics)
        .where(and(
          eq(gbpMetrics.territory, territory),
          eq(gbpMetrics.year, year),
          eq(gbpMetrics.month, month),
        ))
        .groupBy(gbpMetrics.metricType);

      const prevGBP = await db
        .select({
          metricType: gbpMetrics.metricType,
          value: sql<number>`SUM(value)`,
        })
        .from(gbpMetrics)
        .where(and(
          eq(gbpMetrics.territory, territory),
          eq(gbpMetrics.year, prevYear),
          eq(gbpMetrics.month, month),
        ))
        .groupBy(gbpMetrics.metricType);

      return {
        ga4: {
          current: currentGA4,
          previous: prevGA4,
        },
        gbp: {
          current: currentGBP,
          previous: prevGBP,
        },
        year,
        prevYear,
        month,
      };
    }),

  /**
   * Get monthly trend data for charts — returns all months for a territory
   * within a year range, aggregated by page type (GA4) or metric type (GBP).
   */
  getMonthlyTrend: publicProcedure
    .input(z.object({
      territory: z.string(),
      startYear: z.number(),
      endYear: z.number(),
      dataSource: z.enum(["ga4", "gbp"]),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      if (input.dataSource === "ga4") {
        const results = await db
          .select({
            year: ga4Sessions.year,
            month: ga4Sessions.month,
            pageType: ga4Sessions.pageType,
            sessions: sql<number>`SUM(sessions)`,
          })
          .from(ga4Sessions)
          .where(and(
            eq(ga4Sessions.territory, input.territory),
            sql`${ga4Sessions.year} >= ${input.startYear}`,
            sql`${ga4Sessions.year} <= ${input.endYear}`,
          ))
          .groupBy(ga4Sessions.year, ga4Sessions.month, ga4Sessions.pageType)
          .orderBy(ga4Sessions.year, ga4Sessions.month);

        return results;
      } else {
        const results = await db
          .select({
            year: gbpMetrics.year,
            month: gbpMetrics.month,
            metricType: gbpMetrics.metricType,
            value: sql<number>`SUM(value)`,
          })
          .from(gbpMetrics)
          .where(and(
            eq(gbpMetrics.territory, input.territory),
            sql`${gbpMetrics.year} >= ${input.startYear}`,
            sql`${gbpMetrics.year} <= ${input.endYear}`,
          ))
          .groupBy(gbpMetrics.year, gbpMetrics.month, gbpMetrics.metricType)
          .orderBy(gbpMetrics.year, gbpMetrics.month);

        return results;
      }
    }),

  /**
   * Get summary KPIs for a territory — total sessions and GBP metrics for a given period.
   */
  getSummaryKPIs: publicProcedure
    .input(z.object({
      territory: z.string(),
      year: z.number(),
      month: z.number().min(1).max(12).optional(), // if omitted, returns full year
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const { territory, year, month } = input;

      const ga4Conditions = [
        eq(ga4Sessions.territory, territory),
        eq(ga4Sessions.year, year),
      ];
      if (month) ga4Conditions.push(eq(ga4Sessions.month, month));

      const gbpConditions = [
        eq(gbpMetrics.territory, territory),
        eq(gbpMetrics.year, year),
      ];
      if (month) gbpConditions.push(eq(gbpMetrics.month, month));

      const [ga4Summary] = await db
        .select({ total: sql<number>`SUM(sessions)` })
        .from(ga4Sessions)
        .where(and(...ga4Conditions, eq(ga4Sessions.pageType, "total")));

      const gbpSummary = await db
        .select({
          metricType: gbpMetrics.metricType,
          total: sql<number>`SUM(value)`,
        })
        .from(gbpMetrics)
        .where(and(...gbpConditions))
        .groupBy(gbpMetrics.metricType);

      return {
        totalSessions: ga4Summary?.total || 0,
        gbp: Object.fromEntries(gbpSummary.map(r => [r.metricType, r.total])),
      };
    }),
});
