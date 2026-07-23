/**
 * Maps the 19 Skedaddle franchise territories to their sub-locations
 * in both GA4 (page-level city data) and GBP (business listings).
 *
 * Used to aggregate sub-location data under the correct parent territory
 * in the analytics dashboard.
 */

export interface TerritoryGroup {
  id: string;           // matches franchises.ts id
  name: string;         // display name
  ga4Territories: string[];  // GA4 sub-location names that roll up here
  gbpTerritories: string[];  // GBP listing names that roll up here
}

export const TERRITORY_GROUPS: TerritoryGroup[] = [
  {
    id: "hamilton",
    name: "Hamilton",
    ga4Territories: ["Hamilton", "Burlington", "Guelph", "Cambridge", "Kitchener/Waterloo", "Elora &Fergus", "Acton"],
    gbpTerritories: ["Hamilton", "Kitchener/Waterloo"],
  },
  {
    id: "durham",
    name: "Durham Region",
    ga4Territories: ["Durham Region", "Ajax", "Bowmanville", "Etobicoke", "North York", "Oshawa", "Pickering", "Whitby", "Scarborough", "Rexdale"],
    gbpTerritories: ["Durham"],
  },
  {
    id: "ottawa",
    name: "Ottawa",
    ga4Territories: ["Ottawa", "Belleville", "Peterborough"],
    gbpTerritories: ["Ottawa", "Belleville", "Peterborough"],
  },
  {
    id: "minneapolis",
    name: "Minneapolis",
    ga4Territories: ["Minneapolis", "Saint Paul", "Anoka County", "Hennepin County"],
    gbpTerritories: ["Minneapolis"],
  },
  {
    id: "montreal",
    name: "Montreal",
    ga4Territories: ["Montreal"],
    gbpTerritories: ["Montreal"],
  },
  {
    id: "milwaukee",
    name: "Milwaukee",
    ga4Territories: ["Milwaukee", "Lake Country/Waukesha"],
    gbpTerritories: ["Milwaukee"],
  },
  {
    id: "london",
    name: "London",
    ga4Territories: ["London", "Windsor"],
    gbpTerritories: ["London", "Windsor"],
  },
  {
    id: "madison",
    name: "Madison",
    ga4Territories: ["Madison"],
    gbpTerritories: ["Madison"],
  },
  {
    id: "maryland-central",
    name: "Maryland Central",
    ga4Territories: ["Anne Arundel", "Howard County", "Annapolis", "Annapolis Junction", "Bowie", "Columbia", "Clarksville", "Crofton", "Elkridge", "Ellicott", "Severna Park", "Calvert County", "Prince Georges"],
    gbpTerritories: ["Anne Arundel", "Howard County"],
  },
  {
    id: "barrie-north",
    name: "Barrie / York Region",
    ga4Territories: ["Barrie", "York Region", "Collingwood", "Newmarket", "Markham", "Richmond Hill", "Thornhill", "Vaughan", "Woodbridge", "Whitchurch-Stouffville"],
    gbpTerritories: ["York Region/Barrie"],
  },
  {
    id: "co-denver",
    name: "Denver",
    ga4Territories: ["Denver", "Arvada", "Englewood", "Lakewood", "Littleton", "Thornton", "Westminster", "Pasadena", "Foothills Region"],
    gbpTerritories: ["Denver"],
  },
  {
    id: "coquitlam",
    name: "Coquitlam / Metro Vancouver",
    ga4Territories: ["Coquitlam", "Metro Vancouver", "Newton"],
    gbpTerritories: ["Coquitlam"],
  },
  {
    id: "atlanta-north",
    name: "Atlanta North",
    ga4Territories: ["North Atlanta", "Brookhaven", "East Cobb", "Hiram", "Johns Creek", "Mableton", "Marietta", "Peachtree Corners", "Roswell", "Sandy Springs", "Smyrna", "Vinings"],
    gbpTerritories: ["Atlanta"],
  },
  {
    id: "orangeville",
    name: "Orangeville",
    ga4Territories: ["Orangeville", "Brampton", "Mississauga"],
    gbpTerritories: ["Orangeville"],
  },
  {
    id: "oh-columbus",
    name: "Columbus",
    ga4Territories: ["Columbus", "Dublin", "Gahanna", "Grove City", "Hilliard", "New Albany", "Pickerington", "Reynoldsburg", "Upper Arlington", "Westerville", "Whitehall", "Delaware", "Clintonville", "Franklinton"],
    gbpTerritories: ["Columbus"],
  },
  {
    id: "pa-pittsburgh",
    name: "Pittsburgh",
    ga4Territories: ["Pittsburgh"],
    gbpTerritories: ["Pittsburgh"],
  },
  {
    id: "md-baltimore",
    name: "Baltimore",
    ga4Territories: ["Baltimore", "Bethesda", "Montgomery County", "Rockville", "Silver Spring", "Wheaton", "Washington", "Arlington"],
    gbpTerritories: ["Baltimore"],
  },
  {
    id: "okanagan",
    name: "Okanagan",
    ga4Territories: ["Okanagan", "Victoria"],
    gbpTerritories: ["Okanagan", "Victoria"],
  },
  {
    id: "l-windsor",
    name: "Windsor",
    ga4Territories: ["Windsor"],
    gbpTerritories: ["Windsor"],
  },
];

// Additional GBP territories that don't map to the 19 main franchises
// (corporate or sub-brand listings). These get grouped under "Other / Corporate"
export const UNMAPPED_GBP: string[] = [
  "Boston", "Halifax", "Niagara", "Oakville", "Sudbury", "Toronto", "Truro",
];

// Additional GA4 territories that don't map cleanly
export const UNMAPPED_GA4: string[] = [
  "Network (All)", "Boston", "Halifax", "Fredericton", "Moncton", "Saint John",
  "Truro", "Niagara", "Oakville", "Sudbury", "Toronto", "Lowell", "Waltham",
  "Lawrence", "Newton", "Andover",
];

/**
 * Look up which parent territory a sub-location belongs to.
 * Returns the territory group or null if unmapped.
 */
export function findParentTerritory(subLocation: string, source: "ga4" | "gbp"): TerritoryGroup | null {
  for (const group of TERRITORY_GROUPS) {
    const list = source === "ga4" ? group.ga4Territories : group.gbpTerritories;
    if (list.includes(subLocation)) return group;
  }
  return null;
}

/**
 * Get all sub-location names for a given parent territory ID.
 */
export function getSubLocations(territoryId: string, source: "ga4" | "gbp"): string[] {
  const group = TERRITORY_GROUPS.find(g => g.id === territoryId);
  if (!group) return [];
  return source === "ga4" ? group.ga4Territories : group.gbpTerritories;
}
