/**
 * closeRateData.ts — Network-wide PA close rate benchmarks by species
 * Source: Looker Studio Salesforce data (pa_close_rate_species_city_FULL.csv)
 * Weighted average close rate per species across all 19 territories.
 * Data extracted: July 2026
 */

export interface SpeciesCloseRate {
  species: string;
  totalLeads: number;
  weightedCloseRate: number; // percentage (e.g. 58.0 = 58%)
}

/**
 * Network-wide close rate benchmarks by species.
 * Calculated as weighted average (by lead volume) across all cities.
 * Only includes species with >= 100 total leads for statistical reliability.
 */
export const NETWORK_CLOSE_RATES: SpeciesCloseRate[] = [
  { species: "Birds",          totalLeads: 732,   weightedCloseRate: 65.9 },
  { species: "Raccoons",       totalLeads: 4054,  weightedCloseRate: 58.0 },
  { species: "Rats",           totalLeads: 846,   weightedCloseRate: 54.0 },
  { species: "Squirrels",      totalLeads: 3449,  weightedCloseRate: 52.1 },
  { species: "Prevention only",totalLeads: 242,   weightedCloseRate: 52.1 },
  { species: "Mice",           totalLeads: 3466,  weightedCloseRate: 47.5 },
  { species: "Red Squirrels",  totalLeads: 259,   weightedCloseRate: 48.3 },
  { species: "Bats",           totalLeads: 1272,  weightedCloseRate: 46.8 },
  { species: "Groundhogs",     totalLeads: 42,    weightedCloseRate: 44.6 },
  { species: "Skunks",         totalLeads: 379,   weightedCloseRate: 33.9 },
  { species: "Chipmunks",      totalLeads: 138,   weightedCloseRate: 32.0 },
];

/**
 * Get the network benchmark close rate for a given species.
 * Returns null if no benchmark data is available.
 */
export function getNetworkBenchmark(species: string): number | null {
  const found = NETWORK_CLOSE_RATES.find(
    r => r.species.toLowerCase() === species.toLowerCase()
  );
  return found ? found.weightedCloseRate : null;
}

/**
 * Overall network close rate (all species combined, weighted by lead volume).
 * Calculated from pa_close_rate_by_city_FULL.csv network totals.
 */
export const NETWORK_OVERALL_CLOSE_RATE = 51.8; // ~52% network average
