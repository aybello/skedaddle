// Auto-generated dashboard data — do not edit manually
// Source of truth: species_milwaukee.json + species_madison.json (filtered: $200-$10k, excl pest/commercial)
// Suburb data: city_milwaukee.json + city_madison.json (Jul 2025 - Jun 2026)
// GSC/GBP: preserved from previous generation
export interface SpeciesData {
  species: string;
  total_revenue: number;
  total_jobs: number;
}
export interface SuburbData {
  suburb: string;
  revenue: number;
  jobs: number;
}
export interface GscMonthly {
  month: string;
  clicks: number;
  impressions: number;
  avg_position: number;
}
export interface GbpMonthly {
  month: string;
  searches: number;
  calls: number;
  website_clicks: number;
}
export interface LocationDashboard {
  id: string;
  name: string;
  total_revenue: number;
  total_jobs: number;
  species: SpeciesData[];
  suburbs: SuburbData[];
  gsc: {
    monthly: GscMonthly[];
    total_clicks: number;
    total_impressions: number;
    recent_clicks: number;
  };
  gbp: {
    monthly: GbpMonthly[];
    total_searches: number;
    total_calls: number;
    total_clicks: number;
  };
}
export const DASHBOARD_DATA: Record<string, LocationDashboard> = {
  "milwaukee": {
    "id": "milwaukee",
    "name": "Milwaukee",
    "total_revenue": 967849.1499999999,
    "total_jobs": 420,
    "species": [
      {"species": "Squirrels", "total_revenue": 303691.41, "total_jobs": 149},
      {"species": "Mice", "total_revenue": 262277.55, "total_jobs": 79},
      {"species": "Bats", "total_revenue": 181324.45, "total_jobs": 61},
      {"species": "Raccoons", "total_revenue": 139377.39, "total_jobs": 68},
      {"species": "Birds", "total_revenue": 37072.75, "total_jobs": 39},
      {"species": "Red Squirrels", "total_revenue": 16905.0, "total_jobs": 7},
      {"species": "Rats", "total_revenue": 5630.85, "total_jobs": 2},
      {"species": "Opossums", "total_revenue": 5605.0, "total_jobs": 6},
      {"species": "Skunks", "total_revenue": 4830.0, "total_jobs": 1},
      {"species": "Flying Squirrels", "total_revenue": 4090.75, "total_jobs": 3},
      {"species": "Prevention only", "total_revenue": 3970.0, "total_jobs": 2},
      {"species": "Chipmunks", "total_revenue": 3074.0, "total_jobs": 3}
    ],
    "suburbs": [
      {"suburb": "Milwaukee", "revenue": 320099.96, "jobs": 161},
      {"suburb": "Waukesha", "revenue": 53882.95, "jobs": 28},
      {"suburb": "Brookfield", "revenue": 50259.4, "jobs": 23},
      {"suburb": "New Berlin", "revenue": 47770.9, "jobs": 23},
      {"suburb": "Hartland", "revenue": 42675.5, "jobs": 15},
      {"suburb": "Wauwatosa", "revenue": 37351.5, "jobs": 19},
      {"suburb": "Greenfield", "revenue": 29610.5, "jobs": 10},
      {"suburb": "Pewaukee", "revenue": 27876.5, "jobs": 11},
      {"suburb": "West Allis", "revenue": 27398.35, "jobs": 18},
      {"suburb": "Franklin", "revenue": 22436.39, "jobs": 9},
      {"suburb": "Delafield", "revenue": 21464.75, "jobs": 5},
      {"suburb": "Oconomowoc", "revenue": 20763.75, "jobs": 11},
      {"suburb": "Muskego", "revenue": 18540.05, "jobs": 8},
      {"suburb": "Glendale", "revenue": 18464.5, "jobs": 11},
      {"suburb": "Mequon", "revenue": 16895.25, "jobs": 9},
      {"suburb": "Shorewood", "revenue": 15708.5, "jobs": 5},
      {"suburb": "Fox Point", "revenue": 15317.15, "jobs": 8},
      {"suburb": "Cudahy", "revenue": 13757.25, "jobs": 8},
      {"suburb": "South Milwaukee", "revenue": 12984.0, "jobs": 10},
      {"suburb": "Dousman", "revenue": 12012.0, "jobs": 3}
    ],
    "gsc": {
      "monthly": [
        {
          "month": "2026-01",
          "clicks": 2642,
          "impressions": 605231,
          "avg_position": 7.7
        },
        {
          "month": "2026-02",
          "clicks": 2308,
          "impressions": 486122,
          "avg_position": 7.0
        },
        {
          "month": "2026-03",
          "clicks": 2347,
          "impressions": 523235,
          "avg_position": 7.4
        },
        {
          "month": "2026-04",
          "clicks": 2340,
          "impressions": 464871,
          "avg_position": 8.4
        },
        {
          "month": "2026-05",
          "clicks": 3228,
          "impressions": 505567,
          "avg_position": 9.1
        },
        {
          "month": "2026-06",
          "clicks": 2620,
          "impressions": 444108,
          "avg_position": 8.4
        },
        {
          "month": "2026-07",
          "clicks": 354,
          "impressions": 60384,
          "avg_position": 7.9
        }
      ],
      "total_clicks": 15839,
      "total_impressions": 3089518,
      "recent_clicks": 6202
    },
    "gbp": {
      "monthly": [
        {
          "month": "Oct 2024",
          "searches": 237,
          "calls": 108,
          "website_clicks": 0
        },
        {
          "month": "Nov 2024",
          "searches": 182,
          "calls": 90,
          "website_clicks": 2
        },
        {
          "month": "Dec 2024",
          "searches": 156,
          "calls": 66,
          "website_clicks": 4
        },
        {
          "month": "Jan 2025",
          "searches": 138,
          "calls": 67,
          "website_clicks": 3
        },
        {
          "month": "Feb 2025",
          "searches": 142,
          "calls": 61,
          "website_clicks": 14
        },
        {
          "month": "Mar 2025",
          "searches": 152,
          "calls": 60,
          "website_clicks": 23
        },
        {
          "month": "Apr 2025",
          "searches": 288,
          "calls": 121,
          "website_clicks": 26
        },
        {
          "month": "May 2025",
          "searches": 380,
          "calls": 166,
          "website_clicks": 30
        },
        {
          "month": "Jun 2025",
          "searches": 379,
          "calls": 184,
          "website_clicks": 45
        },
        {
          "month": "Jul 2025",
          "searches": 279,
          "calls": 127,
          "website_clicks": 39
        },
        {
          "month": "Aug 2025",
          "searches": 253,
          "calls": 105,
          "website_clicks": 22
        },
        {
          "month": "Sep 2025",
          "searches": 177,
          "calls": 76,
          "website_clicks": 22
        },
        {
          "month": "Oct 2025",
          "searches": 157,
          "calls": 90,
          "website_clicks": 14
        },
        {
          "month": "Nov 2025",
          "searches": 133,
          "calls": 64,
          "website_clicks": 8
        },
        {
          "month": "Dec 2025",
          "searches": 126,
          "calls": 48,
          "website_clicks": 24
        },
        {
          "month": "Jan 2026",
          "searches": 116,
          "calls": 41,
          "website_clicks": 21
        },
        {
          "month": "Feb 2026",
          "searches": 139,
          "calls": 59,
          "website_clicks": 23
        },
        {
          "month": "Mar 2026",
          "searches": 160,
          "calls": 62,
          "website_clicks": 24
        },
        {
          "month": "Apr 2026",
          "searches": 326,
          "calls": 142,
          "website_clicks": 30
        },
        {
          "month": "May 2026",
          "searches": 497,
          "calls": 202,
          "website_clicks": 37
        },
        {
          "month": "Jun 2026",
          "searches": 372,
          "calls": 166,
          "website_clicks": 38
        }
      ],
      "total_searches": 4789,
      "total_calls": 2105,
      "total_clicks": 449
    }
  },
  "madison": {
    "id": "madison",
    "name": "Madison",
    "total_revenue": 828349.6499999999,
    "total_jobs": 283,
    "species": [
      {"species": "Mice", "total_revenue": 442527.8, "total_jobs": 106},
      {"species": "Bats", "total_revenue": 194077.05, "total_jobs": 62},
      {"species": "Raccoons", "total_revenue": 105467.6, "total_jobs": 47},
      {"species": "Birds", "total_revenue": 43040.0, "total_jobs": 49},
      {"species": "Chipmunks", "total_revenue": 15019.5, "total_jobs": 5},
      {"species": "Rats", "total_revenue": 7523.5, "total_jobs": 2},
      {"species": "Flying Squirrels", "total_revenue": 6322.25, "total_jobs": 3},
      {"species": "Clean Up", "total_revenue": 4565.0, "total_jobs": 2},
      {"species": "Prevention only", "total_revenue": 4386.0, "total_jobs": 4},
      {"species": "Skunks", "total_revenue": 2050.0, "total_jobs": 1},
      {"species": "Opossums", "total_revenue": 1850.0, "total_jobs": 1},
      {"species": "Red Squirrels", "total_revenue": 1520.95, "total_jobs": 1}
    ],
    "suburbs": [
      {"suburb": "Madison", "revenue": 538355.6, "jobs": 187},
      {"suburb": "Middleton", "revenue": 86108.05, "jobs": 29},
      {"suburb": "Verona", "revenue": 58137.05, "jobs": 24},
      {"suburb": "Fitchburg", "revenue": 45340.0, "jobs": 19},
      {"suburb": "Waunakee", "revenue": 35568.25, "jobs": 12},
      {"suburb": "Oregon", "revenue": 31281.0, "jobs": 13},
      {"suburb": "Mount Horeb", "revenue": 27613.75, "jobs": 5},
      {"suburb": "Sun Prairie", "revenue": 24137.0, "jobs": 10},
      {"suburb": "Mazomanie", "revenue": 19989.25, "jobs": 4},
      {"suburb": "Monona", "revenue": 18817.0, "jobs": 7},
      {"suburb": "Stoughton", "revenue": 17054.0, "jobs": 7},
      {"suburb": "McFarland", "revenue": 16761.0, "jobs": 6},
      {"suburb": "Columbus", "revenue": 10985.0, "jobs": 3},
      {"suburb": "Belleville", "revenue": 9791.0, "jobs": 3},
      {"suburb": "DeForest", "revenue": 8366.0, "jobs": 9},
      {"suburb": "New Glarus", "revenue": 5444.75, "jobs": 2},
      {"suburb": "Cottage Grove", "revenue": 5401.7, "jobs": 1},
      {"suburb": "Cross Plains", "revenue": 4670.95, "jobs": 2},
      {"suburb": "Fall River", "revenue": 3831.55, "jobs": 1},
      {"suburb": "Evansville", "revenue": 3564.0, "jobs": 2}
    ],
    "gsc": {
      "monthly": [
        {
          "month": "2026-01",
          "clicks": 1960,
          "impressions": 845103,
          "avg_position": 4.0
        },
        {
          "month": "2026-02",
          "clicks": 1589,
          "impressions": 780518,
          "avg_position": 3.4
        },
        {
          "month": "2026-03",
          "clicks": 1696,
          "impressions": 788920,
          "avg_position": 3.9
        },
        {
          "month": "2026-04",
          "clicks": 1678,
          "impressions": 560439,
          "avg_position": 6.6
        },
        {
          "month": "2026-05",
          "clicks": 1977,
          "impressions": 354602,
          "avg_position": 9.7
        },
        {
          "month": "2026-06",
          "clicks": 1510,
          "impressions": 312661,
          "avg_position": 9.3
        },
        {
          "month": "2026-07",
          "clicks": 179,
          "impressions": 44074,
          "avg_position": 10.5
        }
      ],
      "total_clicks": 10589,
      "total_impressions": 3686317,
      "recent_clicks": 3666
    },
    "gbp": {
      "monthly": [
        {
          "month": "Oct 2024",
          "searches": 92,
          "calls": 35,
          "website_clicks": 129
        },
        {
          "month": "Nov 2024",
          "searches": 57,
          "calls": 15,
          "website_clicks": 92
        },
        {
          "month": "Dec 2024",
          "searches": 69,
          "calls": 27,
          "website_clicks": 90
        },
        {
          "month": "Jan 2025",
          "searches": 73,
          "calls": 30,
          "website_clicks": 71
        },
        {
          "month": "Feb 2025",
          "searches": 59,
          "calls": 12,
          "website_clicks": 81
        },
        {
          "month": "Mar 2025",
          "searches": 69,
          "calls": 19,
          "website_clicks": 92
        },
        {
          "month": "Apr 2025",
          "searches": 110,
          "calls": 24,
          "website_clicks": 167
        },
        {
          "month": "May 2025",
          "searches": 162,
          "calls": 49,
          "website_clicks": 214
        },
        {
          "month": "Jun 2025",
          "searches": 157,
          "calls": 54,
          "website_clicks": 195
        },
        {
          "month": "Jul 2025",
          "searches": 178,
          "calls": 51,
          "website_clicks": 152
        },
        {
          "month": "Aug 2025",
          "searches": 129,
          "calls": 41,
          "website_clicks": 148
        },
        {
          "month": "Sep 2025",
          "searches": 110,
          "calls": 43,
          "website_clicks": 101
        },
        {
          "month": "Oct 2025",
          "searches": 71,
          "calls": 32,
          "website_clicks": 67
        },
        {
          "month": "Nov 2025",
          "searches": 53,
          "calls": 31,
          "website_clicks": 69
        },
        {
          "month": "Dec 2025",
          "searches": 51,
          "calls": 15,
          "website_clicks": 78
        },
        {
          "month": "Jan 2026",
          "searches": 63,
          "calls": 27,
          "website_clicks": 75
        },
        {
          "month": "Feb 2026",
          "searches": 46,
          "calls": 21,
          "website_clicks": 80
        },
        {
          "month": "Mar 2026",
          "searches": 96,
          "calls": 38,
          "website_clicks": 98
        },
        {
          "month": "Apr 2026",
          "searches": 110,
          "calls": 46,
          "website_clicks": 184
        },
        {
          "month": "May 2026",
          "searches": 172,
          "calls": 59,
          "website_clicks": 295
        },
        {
          "month": "Jun 2026",
          "searches": 105,
          "calls": 42,
          "website_clicks": 206
        }
      ],
      "total_searches": 2032,
      "total_calls": 711,
      "total_clicks": 2684
    }
  },
  "hamilton": {
      "id": "hamilton",
      "name": "Hamilton",
      "total_revenue": 11306587.610000001,
      "total_jobs": 5921,
      "species": [
          {
              "species": "Raccoons",
              "total_revenue": 4369105.29,
              "total_jobs": 2288
          },
          {
              "species": "Squirrels",
              "total_revenue": 2986573.72,
              "total_jobs": 1564
          },
          {
              "species": "Mice",
              "total_revenue": 1145744.4,
              "total_jobs": 600
          },
          {
              "species": "Bats",
              "total_revenue": 941419.98,
              "total_jobs": 493
          },
          {
              "species": "Skunks",
              "total_revenue": 603425.38,
              "total_jobs": 316
          },
          {
              "species": "Birds",
              "total_revenue": 446840.31,
              "total_jobs": 234
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 362819.06,
              "total_jobs": 190
          },
          {
              "species": "Rats",
              "total_revenue": 215781.86,
              "total_jobs": 113
          },
          {
              "species": "Prevention only",
              "total_revenue": 126031.88,
              "total_jobs": 66
          },
          {
              "species": "Chipmunks",
              "total_revenue": 47739.35,
              "total_jobs": 25
          },
          {
              "species": "Groundhogs",
              "total_revenue": 30553.18,
              "total_jobs": 16
          },
          {
              "species": "Clean Up",
              "total_revenue": 30553.18,
              "total_jobs": 16
          }
      ],
      "suburbs": [
          {
              "suburb": "Hamilton",
              "revenue": 1823091.660000001,
              "jobs": 879
          },
          {
              "suburb": "Oakville",
              "revenue": 1316652.3600000003,
              "jobs": 635
          },
          {
              "suburb": "Burlington",
              "revenue": 1031337.6699999997,
              "jobs": 480
          },
          {
              "suburb": "Guelph",
              "revenue": 948757.0200000004,
              "jobs": 409
          },
          {
              "suburb": "St. Catharines",
              "revenue": 904936.7200000001,
              "jobs": 385
          },
          {
              "suburb": "Kitchener",
              "revenue": 647653.1499999999,
              "jobs": 289
          },
          {
              "suburb": "Ancaster",
              "revenue": 584123.77,
              "jobs": 267
          },
          {
              "suburb": "Waterloo",
              "revenue": 520426.3,
              "jobs": 225
          },
          {
              "suburb": "Cambridge",
              "revenue": 506185.98999999993,
              "jobs": 224
          },
          {
              "suburb": "Niagara Falls",
              "revenue": 442621.18000000005,
              "jobs": 192
          },
          {
              "suburb": "Niagara-on-the-Lake",
              "revenue": 407213.3800000002,
              "jobs": 145
          },
          {
              "suburb": "Dundas",
              "revenue": 310385.46,
              "jobs": 136
          },
          {
              "suburb": "Stoney Creek",
              "revenue": 309592.49000000005,
              "jobs": 147
          },
          {
              "suburb": "Welland",
              "revenue": 309321.5899999998,
              "jobs": 141
          },
          {
              "suburb": "Brantford",
              "revenue": 254842.38000000003,
              "jobs": 100
          },
          {
              "suburb": "Brampton",
              "revenue": 243188.3,
              "jobs": 111
          },
          {
              "suburb": "Fort Erie",
              "revenue": 238334.40999999997,
              "jobs": 100
          },
          {
              "suburb": "Grimsby",
              "revenue": 193937.69999999998,
              "jobs": 95
          },
          {
              "suburb": "Ridgeway",
              "revenue": 167950.63999999996,
              "jobs": 61
          },
          {
              "suburb": "Thorold",
              "revenue": 146035.43999999994,
              "jobs": 68
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 81,
                  "calls": 149,
                  "website_clicks": 130
              },
              {
                  "month": "Nov 2024",
                  "searches": 76,
                  "calls": 142,
                  "website_clicks": 115
              },
              {
                  "month": "Dec 2024",
                  "searches": 58,
                  "calls": 115,
                  "website_clicks": 100
              },
              {
                  "month": "Jan 2025",
                  "searches": 147,
                  "calls": 113,
                  "website_clicks": 94
              },
              {
                  "month": "Feb 2025",
                  "searches": 49,
                  "calls": 80,
                  "website_clicks": 80
              },
              {
                  "month": "Mar 2025",
                  "searches": 42,
                  "calls": 61,
                  "website_clicks": 76
              },
              {
                  "month": "Apr 2025",
                  "searches": 77,
                  "calls": 95,
                  "website_clicks": 106
              },
              {
                  "month": "May 2025",
                  "searches": 108,
                  "calls": 164,
                  "website_clicks": 123
              },
              {
                  "month": "Jun 2025",
                  "searches": 69,
                  "calls": 134,
                  "website_clicks": 122
              },
              {
                  "month": "Jul 2025",
                  "searches": 88,
                  "calls": 99,
                  "website_clicks": 95
              },
              {
                  "month": "Aug 2025",
                  "searches": 86,
                  "calls": 140,
                  "website_clicks": 103
              },
              {
                  "month": "Sep 2025",
                  "searches": 102,
                  "calls": 124,
                  "website_clicks": 91
              },
              {
                  "month": "Oct 2025",
                  "searches": 100,
                  "calls": 111,
                  "website_clicks": 73
              },
              {
                  "month": "Nov 2025",
                  "searches": 64,
                  "calls": 86,
                  "website_clicks": 70
              },
              {
                  "month": "Dec 2025",
                  "searches": 116,
                  "calls": 71,
                  "website_clicks": 52
              },
              {
                  "month": "Jan 2026",
                  "searches": 84,
                  "calls": 70,
                  "website_clicks": 71
              },
              {
                  "month": "Feb 2026",
                  "searches": 59,
                  "calls": 71,
                  "website_clicks": 56
              },
              {
                  "month": "Mar 2026",
                  "searches": 98,
                  "calls": 98,
                  "website_clicks": 96
              },
              {
                  "month": "Apr 2026",
                  "searches": 78,
                  "calls": 121,
                  "website_clicks": 96
              },
              {
                  "month": "May 2026",
                  "searches": 98,
                  "calls": 151,
                  "website_clicks": 116
              },
              {
                  "month": "Jun 2026",
                  "searches": 92,
                  "calls": 126,
                  "website_clicks": 99
              }
          ],
          "total_searches": 1772,
          "total_calls": 2321,
          "total_clicks": 1964
      }
  },
  "durham": {
      "id": "durham",
      "name": "Durham",
      "total_revenue": 8881914.28,
      "total_jobs": 4766,
      "species": [
          {
              "species": "Raccoons",
              "total_revenue": 2948214.1,
              "total_jobs": 1582
          },
          {
              "species": "Squirrels",
              "total_revenue": 2594130.23,
              "total_jobs": 1392
          },
          {
              "species": "Mice",
              "total_revenue": 1466652.65,
              "total_jobs": 787
          },
          {
              "species": "Bats",
              "total_revenue": 737985.32,
              "total_jobs": 396
          },
          {
              "species": "Birds",
              "total_revenue": 439809.44,
              "total_jobs": 236
          },
          {
              "species": "Skunks",
              "total_revenue": 218041.12,
              "total_jobs": 117
          },
          {
              "species": "Rats",
              "total_revenue": 180769.13,
              "total_jobs": 97
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 171451.14,
              "total_jobs": 92
          },
          {
              "species": "Prevention only",
              "total_revenue": 54044.38,
              "total_jobs": 29
          },
          {
              "species": "Chipmunks",
              "total_revenue": 33544.79,
              "total_jobs": 18
          },
          {
              "species": "Groundhogs",
              "total_revenue": 22363.19,
              "total_jobs": 12
          },
          {
              "species": "Foxes",
              "total_revenue": 14908.79,
              "total_jobs": 8
          }
      ],
      "suburbs": [
          {
              "suburb": "Oshawa",
              "revenue": 1076154.62,
              "jobs": 452
          },
          {
              "suburb": "Whitby",
              "revenue": 1055982.17,
              "jobs": 468
          },
          {
              "suburb": "Mississauga",
              "revenue": 736774.5799999998,
              "jobs": 354
          },
          {
              "suburb": "Ajax",
              "revenue": 719362.19,
              "jobs": 320
          },
          {
              "suburb": "Toronto",
              "revenue": 621370.4199999999,
              "jobs": 358
          },
          {
              "suburb": "Peterborough",
              "revenue": 588303.1000000001,
              "jobs": 232
          },
          {
              "suburb": "Pickering",
              "revenue": 568278.7799999999,
              "jobs": 240
          },
          {
              "suburb": "North York",
              "revenue": 446308.57999999996,
              "jobs": 171
          },
          {
              "suburb": "Scarborough",
              "revenue": 423567.7899999999,
              "jobs": 169
          },
          {
              "suburb": "Baltimore",
              "revenue": 396850.45,
              "jobs": 210
          },
          {
              "suburb": "Bowmanville",
              "revenue": 306779.94,
              "jobs": 139
          },
          {
              "suburb": "Etobicoke",
              "revenue": 302954.60000000003,
              "jobs": 134
          },
          {
              "suburb": "Cobourg",
              "revenue": 300747.39,
              "jobs": 101
          },
          {
              "suburb": "Courtice",
              "revenue": 246737.11,
              "jobs": 98
          },
          {
              "suburb": "Port Hope",
              "revenue": 228494.30000000002,
              "jobs": 93
          },
          {
              "suburb": "Brooklin",
              "revenue": 195544.4,
              "jobs": 81
          },
          {
              "suburb": "Uxbridge",
              "revenue": 180742.32,
              "jobs": 55
          },
          {
              "suburb": "Richmond Hill",
              "revenue": 171362.49,
              "jobs": 81
          },
          {
              "suburb": "Whitchurch-Stouffville",
              "revenue": 161790.3,
              "jobs": 70
          },
          {
              "suburb": "East York",
              "revenue": 153808.75,
              "jobs": 65
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 72,
                  "website_clicks": 57
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 76,
                  "website_clicks": 58
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 32,
                  "website_clicks": 28
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 44,
                  "website_clicks": 34
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 28,
                  "website_clicks": 35
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 44,
                  "website_clicks": 32
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 51,
                  "website_clicks": 66
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 90,
                  "website_clicks": 76
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 88,
                  "website_clicks": 52
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 65,
                  "website_clicks": 71
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 89,
                  "website_clicks": 49
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 53,
                  "website_clicks": 45
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 47,
                  "website_clicks": 49
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 45,
                  "website_clicks": 34
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 34,
                  "website_clicks": 26
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 30,
                  "website_clicks": 41
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 32,
                  "website_clicks": 30
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 59,
                  "website_clicks": 55
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 76,
                  "website_clicks": 56
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 95,
                  "website_clicks": 87
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 78,
                  "website_clicks": 67
              }
          ],
          "total_searches": 0,
          "total_calls": 1228,
          "total_clicks": 1048
      }
  },
  "ottawa": {
      "id": "ottawa",
      "name": "Ottawa",
      "total_revenue": 8108489.64,
      "total_jobs": 4266,
      "species": [
          {
              "species": "Raccoons",
              "total_revenue": 2328387.2,
              "total_jobs": 1225
          },
          {
              "species": "Mice",
              "total_revenue": 2265663.3,
              "total_jobs": 1192
          },
          {
              "species": "Squirrels",
              "total_revenue": 1794283.69,
              "total_jobs": 944
          },
          {
              "species": "Bats",
              "total_revenue": 575919.45,
              "total_jobs": 303
          },
          {
              "species": "Birds",
              "total_revenue": 454273.1,
              "total_jobs": 239
          },
          {
              "species": "Rats",
              "total_revenue": 235689.81,
              "total_jobs": 124
          },
          {
              "species": "Skunks",
              "total_revenue": 165363.01,
              "total_jobs": 87
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 115944.18,
              "total_jobs": 61
          },
          {
              "species": "Prevention only",
              "total_revenue": 77929.69,
              "total_jobs": 41
          },
          {
              "species": "Chipmunks",
              "total_revenue": 34213.04,
              "total_jobs": 18
          },
          {
              "species": "Groundhogs",
              "total_revenue": 32312.31,
              "total_jobs": 17
          },
          {
              "species": "Pigeons",
              "total_revenue": 28510.86,
              "total_jobs": 15
          }
      ],
      "suburbs": [
          {
              "suburb": "Ottawa",
              "revenue": 2388589.5899999994,
              "jobs": 1310
          },
          {
              "suburb": "Kanata",
              "revenue": 1153638.82,
              "jobs": 542
          },
          {
              "suburb": "Orleans",
              "revenue": 833510.6399999999,
              "jobs": 422
          },
          {
              "suburb": "Nepean",
              "revenue": 801801.4400000002,
              "jobs": 401
          },
          {
              "suburb": "Stittsville",
              "revenue": 745673.0299999999,
              "jobs": 326
          },
          {
              "suburb": "Barrhaven",
              "revenue": 555192.1399999999,
              "jobs": 267
          },
          {
              "suburb": "Gloucester",
              "revenue": 488350.4699999999,
              "jobs": 261
          },
          {
              "suburb": "Carleton Place",
              "revenue": 211248.03000000003,
              "jobs": 94
          },
          {
              "suburb": "Manotick",
              "revenue": 209229.78,
              "jobs": 83
          },
          {
              "suburb": "Greely",
              "revenue": 148138.25,
              "jobs": 58
          },
          {
              "suburb": "Carp",
              "revenue": 121526.2,
              "jobs": 61
          },
          {
              "suburb": "Dunrobin",
              "revenue": 63872.1,
              "jobs": 25
          },
          {
              "suburb": "Kemptville",
              "revenue": 58763.5,
              "jobs": 23
          },
          {
              "suburb": "Almonte",
              "revenue": 52349.15,
              "jobs": 25
          },
          {
              "suburb": "North Gower",
              "revenue": 52073.600000000006,
              "jobs": 20
          },
          {
              "suburb": "Orl\u00e9ans",
              "revenue": 51910.55,
              "jobs": 26
          },
          {
              "suburb": "Gatineau",
              "revenue": 46547.5,
              "jobs": 26
          },
          {
              "suburb": "Clarence-Rockland",
              "revenue": 44773.35,
              "jobs": 18
          },
          {
              "suburb": "Vanier",
              "revenue": 43303.75,
              "jobs": 32
          },
          {
              "suburb": "Embrun",
              "revenue": 37997.75,
              "jobs": 16
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 196,
                  "website_clicks": 297
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 236,
                  "website_clicks": 298
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 157,
                  "website_clicks": 192
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 149,
                  "website_clicks": 236
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 121,
                  "website_clicks": 164
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 125,
                  "website_clicks": 177
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 260,
                  "website_clicks": 371
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 349,
                  "website_clicks": 450
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 277,
                  "website_clicks": 321
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 300,
                  "website_clicks": 365
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 287,
                  "website_clicks": 381
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 248,
                  "website_clicks": 256
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 236,
                  "website_clicks": 231
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 173,
                  "website_clicks": 178
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 126,
                  "website_clicks": 152
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 114,
                  "website_clicks": 138
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 95,
                  "website_clicks": 131
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 157,
                  "website_clicks": 188
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 258,
                  "website_clicks": 295
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 353,
                  "website_clicks": 386
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 229,
                  "website_clicks": 260
              }
          ],
          "total_searches": 0,
          "total_calls": 4446,
          "total_clicks": 5467
      }
  },
  "minneapolis": {
      "id": "minneapolis",
      "name": "Minneapolis",
      "total_revenue": 3248145.48,
      "total_jobs": 1923,
      "species": [
          {
              "species": "Squirrels",
              "total_revenue": 1200952.38,
              "total_jobs": 711
          },
          {
              "species": "Mice",
              "total_revenue": 729692.59,
              "total_jobs": 432
          },
          {
              "species": "Bats",
              "total_revenue": 484772.62,
              "total_jobs": 287
          },
          {
              "species": "Raccoons",
              "total_revenue": 320929.61,
              "total_jobs": 190
          },
          {
              "species": "Rats",
              "total_revenue": 217894.31,
              "total_jobs": 129
          },
          {
              "species": "Birds",
              "total_revenue": 124993.64,
              "total_jobs": 74
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 101346.19,
              "total_jobs": 60
          },
          {
              "species": "Prevention only",
              "total_revenue": 25336.55,
              "total_jobs": 15
          },
          {
              "species": "Flying Squirrels",
              "total_revenue": 13512.83,
              "total_jobs": 8
          },
          {
              "species": "Opossums",
              "total_revenue": 11823.72,
              "total_jobs": 7
          },
          {
              "species": "Pigeons",
              "total_revenue": 8445.52,
              "total_jobs": 5
          },
          {
              "species": "Chipmunks",
              "total_revenue": 8445.52,
              "total_jobs": 5
          }
      ],
      "suburbs": [
          {
              "suburb": "Minneapolis",
              "revenue": 1220104.92,
              "jobs": 526
          },
          {
              "suburb": "Victoria",
              "revenue": 541940.26,
              "jobs": 360
          },
          {
              "suburb": "Saint Paul",
              "revenue": 487795.58,
              "jobs": 221
          },
          {
              "suburb": "Eden Prairie",
              "revenue": 106072.20000000001,
              "jobs": 40
          },
          {
              "suburb": "Plymouth",
              "revenue": 95868.23,
              "jobs": 43
          },
          {
              "suburb": "Hudson",
              "revenue": 86208.5,
              "jobs": 41
          },
          {
              "suburb": "Greenfield",
              "revenue": 85758.5,
              "jobs": 35
          },
          {
              "suburb": "Shorewood",
              "revenue": 74038.7,
              "jobs": 32
          },
          {
              "suburb": "Eagan",
              "revenue": 72057.99,
              "jobs": 28
          },
          {
              "suburb": "Woodbury",
              "revenue": 64056.75,
              "jobs": 24
          },
          {
              "suburb": "Maple Grove",
              "revenue": 57921.25,
              "jobs": 25
          },
          {
              "suburb": "Minnetonka",
              "revenue": 54695.8,
              "jobs": 24
          },
          {
              "suburb": "Bloomington",
              "revenue": 45855.6,
              "jobs": 19
          },
          {
              "suburb": "Blaine",
              "revenue": 41970.0,
              "jobs": 21
          },
          {
              "suburb": "Hopkins",
              "revenue": 41250.0,
              "jobs": 15
          },
          {
              "suburb": "Oakdale",
              "revenue": 38955.75,
              "jobs": 12
          },
          {
              "suburb": "Ham Lake",
              "revenue": 33702.5,
              "jobs": 15
          },
          {
              "suburb": "Apple Valley",
              "revenue": 33622.5,
              "jobs": 17
          },
          {
              "suburb": "Inver Grove Heights",
              "revenue": 33276.7,
              "jobs": 15
          },
          {
              "suburb": "Shoreview",
              "revenue": 32993.75,
              "jobs": 12
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 77
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 79
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 60
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 75
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 53
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 54
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 108
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 105
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 5,
                  "website_clicks": 134
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 3,
                  "website_clicks": 115
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 144
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 100
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 19,
                  "website_clicks": 70
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 9,
                  "website_clicks": 80
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 5,
                  "website_clicks": 58
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 7,
                  "website_clicks": 66
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 9,
                  "website_clicks": 81
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 103
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 88
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 20,
                  "website_clicks": 109
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 30,
                  "website_clicks": 71
              }
          ],
          "total_searches": 0,
          "total_calls": 173,
          "total_clicks": 1830
      }
  },
  "montreal": {
      "id": "montreal",
      "name": "Montreal",
      "total_revenue": 2635677.11,
      "total_jobs": 2095,
      "species": [
          {
              "species": "Squirrels",
              "total_revenue": 923430.55,
              "total_jobs": 734
          },
          {
              "species": "Raccoons",
              "total_revenue": 616459.09,
              "total_jobs": 490
          },
          {
              "species": "Mice",
              "total_revenue": 596329.81,
              "total_jobs": 474
          },
          {
              "species": "Bats",
              "total_revenue": 187453.89,
              "total_jobs": 149
          },
          {
              "species": "Birds",
              "total_revenue": 157259.97,
              "total_jobs": 125
          },
          {
              "species": "Skunks",
              "total_revenue": 61645.91,
              "total_jobs": 49
          },
          {
              "species": "Groundhogs",
              "total_revenue": 60387.83,
              "total_jobs": 48
          },
          {
              "species": "Rats",
              "total_revenue": 10064.64,
              "total_jobs": 8
          },
          {
              "species": "Pigeons",
              "total_revenue": 6290.4,
              "total_jobs": 5
          },
          {
              "species": "Prevention only",
              "total_revenue": 6290.4,
              "total_jobs": 5
          },
          {
              "species": "Chipmunks",
              "total_revenue": 5032.32,
              "total_jobs": 4
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 5032.32,
              "total_jobs": 4
          }
      ],
      "suburbs": [
          {
              "suburb": "Montr\u00e9al",
              "revenue": 484423.4799999999,
              "jobs": 364
          },
          {
              "suburb": "Beaconsfield",
              "revenue": 260436.81999999998,
              "jobs": 124
          },
          {
              "suburb": "Dollard-des-Ormeaux",
              "revenue": 247967.17,
              "jobs": 142
          },
          {
              "suburb": "Pointe-Claire",
              "revenue": 189716.72,
              "jobs": 108
          },
          {
              "suburb": "Pierrefonds",
              "revenue": 187146.10999999993,
              "jobs": 118
          },
          {
              "suburb": "Kirkland",
              "revenue": 166469.82,
              "jobs": 90
          },
          {
              "suburb": "Saint-Lazare",
              "revenue": 133113.1,
              "jobs": 68
          },
          {
              "suburb": "Vaudreuil-Dorion",
              "revenue": 116323.55,
              "jobs": 63
          },
          {
              "suburb": "Cornwall",
              "revenue": 115278.4,
              "jobs": 44
          },
          {
              "suburb": "Laval",
              "revenue": 112034.20999999998,
              "jobs": 68
          },
          {
              "suburb": "C\u00f4te Saint-Luc",
              "revenue": 104812.44999999998,
              "jobs": 69
          },
          {
              "suburb": "Brossard",
              "revenue": 85388.95999999999,
              "jobs": 52
          },
          {
              "suburb": "Westmount",
              "revenue": 72094.39000000001,
              "jobs": 61
          },
          {
              "suburb": "Pincourt",
              "revenue": 61647.9,
              "jobs": 34
          },
          {
              "suburb": "Sainte-Anne-de-Bellevue",
              "revenue": 56473.93,
              "jobs": 29
          },
          {
              "suburb": "Montreal",
              "revenue": 52006.44,
              "jobs": 38
          },
          {
              "suburb": "Verdun",
              "revenue": 50545.07,
              "jobs": 38
          },
          {
              "suburb": "Hampstead",
              "revenue": 49208.060000000005,
              "jobs": 34
          },
          {
              "suburb": "Longueuil",
              "revenue": 46245.50000000001,
              "jobs": 32
          },
          {
              "suburb": "Notre-Dame-de-l'\u00cele-Perrot",
              "revenue": 44345.03,
              "jobs": 24
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 119,
                  "website_clicks": 162
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 127,
                  "website_clicks": 155
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 107,
                  "website_clicks": 116
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 54,
                  "website_clicks": 84
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 58,
                  "website_clicks": 92
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 81,
                  "website_clicks": 120
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 158,
                  "website_clicks": 198
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 247,
                  "website_clicks": 258
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 196,
                  "website_clicks": 226
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 135,
                  "website_clicks": 185
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 132,
                  "website_clicks": 188
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 75,
                  "website_clicks": 128
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 63,
                  "website_clicks": 73
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 85,
                  "website_clicks": 98
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 75,
                  "website_clicks": 81
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 62,
                  "website_clicks": 71
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 51,
                  "website_clicks": 77
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 60,
                  "website_clicks": 131
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 150,
                  "website_clicks": 206
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 171,
                  "website_clicks": 221
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 146,
                  "website_clicks": 156
              }
          ],
          "total_searches": 0,
          "total_calls": 2352,
          "total_clicks": 3026
      }
  },
  "london": {
      "id": "london",
      "name": "London",
      "total_revenue": 2635754.499999999,
      "total_jobs": 1132,
      "species": [
          {
              "species": "Raccoons",
              "total_revenue": 903421.15,
              "total_jobs": 388
          },
          {
              "species": "Mice",
              "total_revenue": 621684.14,
              "total_jobs": 267
          },
          {
              "species": "Squirrels",
              "total_revenue": 519234.32,
              "total_jobs": 223
          },
          {
              "species": "Bats",
              "total_revenue": 183944.0,
              "total_jobs": 79
          },
          {
              "species": "Skunks",
              "total_revenue": 179287.19,
              "total_jobs": 77
          },
          {
              "species": "Birds",
              "total_revenue": 104778.23,
              "total_jobs": 45
          },
          {
              "species": "Rats",
              "total_revenue": 60538.53,
              "total_jobs": 26
          },
          {
              "species": "Groundhogs",
              "total_revenue": 34926.08,
              "total_jobs": 15
          },
          {
              "species": "Prevention only",
              "total_revenue": 11642.03,
              "total_jobs": 5
          },
          {
              "species": "Chipmunks",
              "total_revenue": 11642.03,
              "total_jobs": 5
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 2328.41,
              "total_jobs": 1
          },
          {
              "species": "Flying Squirrels",
              "total_revenue": 2328.41,
              "total_jobs": 1
          }
      ],
      "suburbs": [
          {
              "suburb": "London",
              "revenue": 2180006.9499999993,
              "jobs": 941
          },
          {
              "suburb": "Komoka",
              "revenue": 78115.25,
              "jobs": 28
          },
          {
              "suburb": "St. Thomas",
              "revenue": 77894.95,
              "jobs": 37
          },
          {
              "suburb": "Strathroy",
              "revenue": 74304.5,
              "jobs": 29
          },
          {
              "suburb": "Mount Brydges",
              "revenue": 28600.5,
              "jobs": 11
          },
          {
              "suburb": "Ilderton",
              "revenue": 28513.350000000002,
              "jobs": 9
          },
          {
              "suburb": "Delaware",
              "revenue": 24024.75,
              "jobs": 12
          },
          {
              "suburb": "Arva",
              "revenue": 21190.45,
              "jobs": 5
          },
          {
              "suburb": "Dorchester",
              "revenue": 18258.25,
              "jobs": 6
          },
          {
              "suburb": "Ingersoll",
              "revenue": 16268.95,
              "jobs": 7
          },
          {
              "suburb": "Thorndale",
              "revenue": 12826.4,
              "jobs": 4
          },
          {
              "suburb": "Thamesford",
              "revenue": 10779.6,
              "jobs": 4
          },
          {
              "suburb": "Aylmer",
              "revenue": 9982.05,
              "jobs": 4
          },
          {
              "suburb": "Eden",
              "revenue": 9893.35,
              "jobs": 3
          },
          {
              "suburb": "Melbourne",
              "revenue": 9184.0,
              "jobs": 3
          },
          {
              "suburb": "Ailsa Craig",
              "revenue": 8354.5,
              "jobs": 3
          },
          {
              "suburb": "Springfield",
              "revenue": 7979.950000000001,
              "jobs": 2
          },
          {
              "suburb": "Lucan",
              "revenue": 7476.6,
              "jobs": 3
          },
          {
              "suburb": "Granton",
              "revenue": 6721.4,
              "jobs": 1
          },
          {
              "suburb": "Glencoe",
              "revenue": 5378.75,
              "jobs": 3
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 51,
                  "website_clicks": 66
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 59,
                  "website_clicks": 63
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 35,
                  "website_clicks": 35
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 40,
                  "website_clicks": 56
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 31,
                  "website_clicks": 48
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 48,
                  "website_clicks": 51
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 88,
                  "website_clicks": 120
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 107,
                  "website_clicks": 94
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 78,
                  "website_clicks": 75
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 75,
                  "website_clicks": 84
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 71,
                  "website_clicks": 77
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 48,
                  "website_clicks": 59
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 42,
                  "website_clicks": 27
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 36,
                  "website_clicks": 38
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 39,
                  "website_clicks": 31
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 25,
                  "website_clicks": 36
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 24,
                  "website_clicks": 46
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 48,
                  "website_clicks": 55
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 58,
                  "website_clicks": 63
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 82,
                  "website_clicks": 100
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 61,
                  "website_clicks": 61
              }
          ],
          "total_searches": 0,
          "total_calls": 1146,
          "total_clicks": 1285
      }
  },
  "maryland-central": {
      "id": "maryland-central",
      "name": "Maryland Central",
      "total_revenue": 1252082.65,
      "total_jobs": 801,
      "species": [
          {
              "species": "Mice",
              "total_revenue": 456439.62,
              "total_jobs": 292
          },
          {
              "species": "Squirrels",
              "total_revenue": 331387.67,
              "total_jobs": 212
          },
          {
              "species": "Raccoons",
              "total_revenue": 193830.52,
              "total_jobs": 124
          },
          {
              "species": "Bats",
              "total_revenue": 159441.24,
              "total_jobs": 102
          },
          {
              "species": "Birds",
              "total_revenue": 70341.72,
              "total_jobs": 45
          },
          {
              "species": "Groundhogs",
              "total_revenue": 10942.05,
              "total_jobs": 7
          },
          {
              "species": "Rats",
              "total_revenue": 9378.9,
              "total_jobs": 6
          },
          {
              "species": "Foxes",
              "total_revenue": 6252.6,
              "total_jobs": 4
          },
          {
              "species": "Snakes",
              "total_revenue": 4689.45,
              "total_jobs": 3
          },
          {
              "species": "Prevention only",
              "total_revenue": 3126.3,
              "total_jobs": 2
          },
          {
              "species": "Chipmunks",
              "total_revenue": 3126.3,
              "total_jobs": 2
          },
          {
              "species": "Skunks",
              "total_revenue": 3126.3,
              "total_jobs": 2
          }
      ],
      "suburbs": [
          {
              "suburb": "Annapolis",
              "revenue": 124022.0,
              "jobs": 57
          },
          {
              "suburb": "Silver Spring",
              "revenue": 121037.0,
              "jobs": 49
          },
          {
              "suburb": "Columbia",
              "revenue": 120633.5,
              "jobs": 53
          },
          {
              "suburb": "Bowie",
              "revenue": 114317.0,
              "jobs": 50
          },
          {
              "suburb": "Upper Marlboro",
              "revenue": 88888.0,
              "jobs": 39
          },
          {
              "suburb": "Crofton",
              "revenue": 83127.0,
              "jobs": 35
          },
          {
              "suburb": "Rockville",
              "revenue": 79500.0,
              "jobs": 38
          },
          {
              "suburb": "Ellicott City",
              "revenue": 62558.0,
              "jobs": 25
          },
          {
              "suburb": "Severna Park",
              "revenue": 51045.0,
              "jobs": 25
          },
          {
              "suburb": "Pasadena",
              "revenue": 48845.0,
              "jobs": 27
          },
          {
              "suburb": "Gaithersburg",
              "revenue": 46311.0,
              "jobs": 21
          },
          {
              "suburb": "Owings",
              "revenue": 42381.5,
              "jobs": 14
          },
          {
              "suburb": "Laurel",
              "revenue": 41240.0,
              "jobs": 18
          },
          {
              "suburb": "Bethesda",
              "revenue": 39943.0,
              "jobs": 17
          },
          {
              "suburb": "Ashton",
              "revenue": 35919.65,
              "jobs": 14
          },
          {
              "suburb": "Glen Burnie",
              "revenue": 33120.0,
              "jobs": 15
          },
          {
              "suburb": "Millersville",
              "revenue": 31083.0,
              "jobs": 15
          },
          {
              "suburb": "Arnold",
              "revenue": 29964.0,
              "jobs": 14
          },
          {
              "suburb": "Odenton",
              "revenue": 29189.0,
              "jobs": 15
          },
          {
              "suburb": "Clinton",
              "revenue": 28959.0,
              "jobs": 14
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 11
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 4,
                  "website_clicks": 4
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 10,
                  "website_clicks": 7
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 2,
                  "website_clicks": 13
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 13,
                  "website_clicks": 14
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 20,
                  "website_clicks": 11
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 16,
                  "website_clicks": 11
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 16,
                  "website_clicks": 13
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 14,
                  "website_clicks": 11
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 10
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 14
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 13,
                  "website_clicks": 5
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 8,
                  "website_clicks": 10
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 6
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 19
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 7,
                  "website_clicks": 7
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 3,
                  "website_clicks": 9
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 18,
                  "website_clicks": 14
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 13,
                  "website_clicks": 19
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 25,
                  "website_clicks": 28
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 20,
                  "website_clicks": 33
              }
          ],
          "total_searches": 0,
          "total_calls": 253,
          "total_clicks": 269
      }
  },
  "barrie-north": {
      "id": "barrie-north",
      "name": "Barrie North",
      "total_revenue": 1345793.26,
      "total_jobs": 641,
      "species": [
          {
              "species": "Squirrels",
              "total_revenue": 436700.47,
              "total_jobs": 208
          },
          {
              "species": "Raccoons",
              "total_revenue": 415705.25,
              "total_jobs": 198
          },
          {
              "species": "Mice",
              "total_revenue": 193155.97,
              "total_jobs": 92
          },
          {
              "species": "Bats",
              "total_revenue": 130170.33,
              "total_jobs": 62
          },
          {
              "species": "Skunks",
              "total_revenue": 46189.47,
              "total_jobs": 22
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 44089.95,
              "total_jobs": 21
          },
          {
              "species": "Birds",
              "total_revenue": 41990.43,
              "total_jobs": 20
          },
          {
              "species": "Rats",
              "total_revenue": 20995.21,
              "total_jobs": 10
          },
          {
              "species": "Chipmunks",
              "total_revenue": 6298.56,
              "total_jobs": 3
          },
          {
              "species": "Groundhogs",
              "total_revenue": 4199.04,
              "total_jobs": 2
          },
          {
              "species": "Unknown Species",
              "total_revenue": 4199.04,
              "total_jobs": 2
          },
          {
              "species": "Prevention only",
              "total_revenue": 2099.52,
              "total_jobs": 1
          }
      ],
      "suburbs": [
          {
              "suburb": "Newmarket",
              "revenue": 368379.03,
              "jobs": 197
          },
          {
              "suburb": "Barrie",
              "revenue": 353977.42,
              "jobs": 167
          },
          {
              "suburb": "Markham",
              "revenue": 316144.29000000004,
              "jobs": 140
          },
          {
              "suburb": "Innisfil",
              "revenue": 81221.2,
              "jobs": 40
          },
          {
              "suburb": "Minesing",
              "revenue": 30178.100000000002,
              "jobs": 7
          },
          {
              "suburb": "Schomberg",
              "revenue": 25940.27,
              "jobs": 7
          },
          {
              "suburb": "Bradford West Gwillimbury",
              "revenue": 22104.25,
              "jobs": 14
          },
          {
              "suburb": "Belle Ewart",
              "revenue": 18370.25,
              "jobs": 2
          },
          {
              "suburb": "Midhurst",
              "revenue": 16528.75,
              "jobs": 5
          },
          {
              "suburb": "Oro-Medonte",
              "revenue": 15026.0,
              "jobs": 3
          },
          {
              "suburb": "Alliston",
              "revenue": 14362.0,
              "jobs": 4
          },
          {
              "suburb": "Orillia",
              "revenue": 11926.75,
              "jobs": 3
          },
          {
              "suburb": "Loretto",
              "revenue": 11501.25,
              "jobs": 2
          },
          {
              "suburb": "Mulmur",
              "revenue": 10790.0,
              "jobs": 3
          },
          {
              "suburb": "Oro Station",
              "revenue": 10560.0,
              "jobs": 2
          },
          {
              "suburb": "Springwater",
              "revenue": 10416.7,
              "jobs": 3
          },
          {
              "suburb": "New Tecumseth",
              "revenue": 8240.75,
              "jobs": 4
          },
          {
              "suburb": "Palgrave",
              "revenue": 7910.0,
              "jobs": 3
          },
          {
              "suburb": "Craighurst",
              "revenue": 6116.5,
              "jobs": 1
          },
          {
              "suburb": "Roeberta Park",
              "revenue": 6099.75,
              "jobs": 2
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 13,
                  "website_clicks": 25
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 16
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 16
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 13,
                  "website_clicks": 13
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 8,
                  "website_clicks": 9
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 18,
                  "website_clicks": 17
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 25,
                  "website_clicks": 27
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 26,
                  "website_clicks": 37
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 23,
                  "website_clicks": 39
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 19,
                  "website_clicks": 29
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 30,
                  "website_clicks": 24
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 19,
                  "website_clicks": 19
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 22,
                  "website_clicks": 14
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 10,
                  "website_clicks": 15
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 5,
                  "website_clicks": 4
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 15
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 5
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 16,
                  "website_clicks": 24
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 19,
                  "website_clicks": 23
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 53,
                  "website_clicks": 36
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 33,
                  "website_clicks": 28
              }
          ],
          "total_searches": 0,
          "total_calls": 386,
          "total_clicks": 435
      }
  },
  "co-denver": {
      "id": "co-denver",
      "name": "Denver",
      "total_revenue": 1179450.2,
      "total_jobs": 720,
      "species": [
          {
              "species": "Squirrels",
              "total_revenue": 345644.43,
              "total_jobs": 211
          },
          {
              "species": "Mice",
              "total_revenue": 257185.67,
              "total_jobs": 157
          },
          {
              "species": "Raccoons",
              "total_revenue": 239166.29,
              "total_jobs": 146
          },
          {
              "species": "Birds",
              "total_revenue": 121221.27,
              "total_jobs": 74
          },
          {
              "species": "Bats",
              "total_revenue": 99925.64,
              "total_jobs": 61
          },
          {
              "species": "Pigeons",
              "total_revenue": 36038.76,
              "total_jobs": 22
          },
          {
              "species": "Skunks",
              "total_revenue": 32762.51,
              "total_jobs": 20
          },
          {
              "species": "Rats",
              "total_revenue": 18019.38,
              "total_jobs": 11
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 14743.13,
              "total_jobs": 9
          },
          {
              "species": "Rabbits",
              "total_revenue": 8190.63,
              "total_jobs": 5
          },
          {
              "species": "Foxes",
              "total_revenue": 3276.25,
              "total_jobs": 2
          },
          {
              "species": "Prevention only",
              "total_revenue": 3276.25,
              "total_jobs": 2
          }
      ],
      "suburbs": [
          {
              "suburb": "Aurora",
              "revenue": 385867.80000000005,
              "jobs": 178
          },
          {
              "suburb": "Denver",
              "revenue": 200741.3,
              "jobs": 127
          },
          {
              "suburb": "Littleton",
              "revenue": 85546.0,
              "jobs": 51
          },
          {
              "suburb": "Boulder",
              "revenue": 59556.9,
              "jobs": 36
          },
          {
              "suburb": "Edgewater",
              "revenue": 55191.0,
              "jobs": 25
          },
          {
              "suburb": "Brighton",
              "revenue": 49370.15,
              "jobs": 21
          },
          {
              "suburb": "Longmont",
              "revenue": 47755.5,
              "jobs": 23
          },
          {
              "suburb": "Golden",
              "revenue": 40543.0,
              "jobs": 20
          },
          {
              "suburb": "Westminster",
              "revenue": 37960.5,
              "jobs": 24
          },
          {
              "suburb": "Arvada",
              "revenue": 32635.5,
              "jobs": 24
          },
          {
              "suburb": "Centennial",
              "revenue": 25466.0,
              "jobs": 14
          },
          {
              "suburb": "Evergreen",
              "revenue": 24408.0,
              "jobs": 16
          },
          {
              "suburb": "Parker",
              "revenue": 22820.0,
              "jobs": 15
          },
          {
              "suburb": "Lakewood",
              "revenue": 21439.0,
              "jobs": 13
          },
          {
              "suburb": "Englewood",
              "revenue": 20408.2,
              "jobs": 14
          },
          {
              "suburb": "Broomfield",
              "revenue": 16136.0,
              "jobs": 11
          },
          {
              "suburb": "Thornton",
              "revenue": 15903.0,
              "jobs": 13
          },
          {
              "suburb": "Castle Rock",
              "revenue": 12982.0,
              "jobs": 10
          },
          {
              "suburb": "Morrison",
              "revenue": 12884.35,
              "jobs": 10
          },
          {
              "suburb": "Frederick",
              "revenue": 11836.0,
              "jobs": 5
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 1
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 3
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 4
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 2,
                  "website_clicks": 15
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 2,
                  "website_clicks": 14
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 23
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 35
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 22,
                  "website_clicks": 62
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 61
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 18,
                  "website_clicks": 52
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 22,
                  "website_clicks": 49
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 18,
                  "website_clicks": 37
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 28,
                  "website_clicks": 41
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 50
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 33,
                  "website_clicks": 40
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 17,
                  "website_clicks": 37
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 62
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 39,
                  "website_clicks": 70
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 33,
                  "website_clicks": 78
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 72,
                  "website_clicks": 78
              }
          ],
          "total_searches": 0,
          "total_calls": 414,
          "total_clicks": 812
      }
  },
  "coquitlam": {
      "id": "coquitlam",
      "name": "Coquitlam",
      "total_revenue": 976311.97,
      "total_jobs": 405,
      "species": [
          {
              "species": "Raccoons",
              "total_revenue": 238654.04,
              "total_jobs": 99
          },
          {
              "species": "Mice",
              "total_revenue": 214547.57,
              "total_jobs": 89
          },
          {
              "species": "Squirrels",
              "total_revenue": 185619.81,
              "total_jobs": 77
          },
          {
              "species": "Rats",
              "total_revenue": 151870.75,
              "total_jobs": 63
          },
          {
              "species": "Birds",
              "total_revenue": 86783.29,
              "total_jobs": 36
          },
          {
              "species": "Bats",
              "total_revenue": 69908.76,
              "total_jobs": 29
          },
          {
              "species": "Skunks",
              "total_revenue": 14463.88,
              "total_jobs": 6
          },
          {
              "species": "Unknown Species",
              "total_revenue": 4821.29,
              "total_jobs": 2
          },
          {
              "species": "Groundhogs",
              "total_revenue": 2410.65,
              "total_jobs": 1
          },
          {
              "species": "Prevention only",
              "total_revenue": 2410.65,
              "total_jobs": 1
          },
          {
              "species": "Foxes",
              "total_revenue": 2410.65,
              "total_jobs": 1
          },
          {
              "species": "Clean Up",
              "total_revenue": 2410.65,
              "total_jobs": 1
          }
      ],
      "suburbs": [
          {
              "suburb": "Surrey",
              "revenue": 168904.87,
              "jobs": 38
          },
          {
              "suburb": "Richmond",
              "revenue": 129474.52,
              "jobs": 62
          },
          {
              "suburb": "Coquitlam",
              "revenue": 111806.7,
              "jobs": 30
          },
          {
              "suburb": "Maple Ridge",
              "revenue": 84231.75,
              "jobs": 25
          },
          {
              "suburb": "Vancouver",
              "revenue": 68501.09999999999,
              "jobs": 10
          },
          {
              "suburb": "Burnaby",
              "revenue": 61427.15000000001,
              "jobs": 23
          },
          {
              "suburb": "New Westminster",
              "revenue": 44868.95,
              "jobs": 15
          },
          {
              "suburb": "Duncan",
              "revenue": 39135.4,
              "jobs": 22
          },
          {
              "suburb": "North Saanich",
              "revenue": 33251.86,
              "jobs": 24
          },
          {
              "suburb": "Langley Township",
              "revenue": 32863.049999999996,
              "jobs": 6
          },
          {
              "suburb": "North Vancouver",
              "revenue": 28235.649999999998,
              "jobs": 10
          },
          {
              "suburb": "Saanichton",
              "revenue": 27545.25,
              "jobs": 16
          },
          {
              "suburb": "Port Moody",
              "revenue": 26840.95,
              "jobs": 7
          },
          {
              "suburb": "Port Coquitlam",
              "revenue": 26080.210000000003,
              "jobs": 12
          },
          {
              "suburb": "Pitt Meadows",
              "revenue": 17572.05,
              "jobs": 7
          },
          {
              "suburb": "Sooke",
              "revenue": 16792.21,
              "jobs": 11
          },
          {
              "suburb": "Brentwood Bay",
              "revenue": 15526.85,
              "jobs": 8
          },
          {
              "suburb": "Colwood",
              "revenue": 14762.5,
              "jobs": 9
          },
          {
              "suburb": "Langford",
              "revenue": 14639.05,
              "jobs": 9
          },
          {
              "suburb": "Anmore",
              "revenue": 13851.9,
              "jobs": 2
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 12
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 17
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 9
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 16
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 2,
                  "website_clicks": 19
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 2,
                  "website_clicks": 22
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 18
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 25
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 22,
                  "website_clicks": 27
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 24
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 18,
                  "website_clicks": 11
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 22,
                  "website_clicks": 11
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 18,
                  "website_clicks": 11
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 28,
                  "website_clicks": 13
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 13
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 33,
                  "website_clicks": 22
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 17,
                  "website_clicks": 14
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 13
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 39,
                  "website_clicks": 34
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 33,
                  "website_clicks": 27
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 72,
                  "website_clicks": 25
              }
          ],
          "total_searches": 0,
          "total_calls": 414,
          "total_clicks": 383
      }
  },
  "atlanta-north": {
      "id": "atlanta-north",
      "name": "Atlanta North",
      "total_revenue": 838821.16,
      "total_jobs": 521,
      "species": [
          {
              "species": "Squirrels",
              "total_revenue": 357424.76,
              "total_jobs": 222
          },
          {
              "species": "Raccoons",
              "total_revenue": 114311.52,
              "total_jobs": 71
          },
          {
              "species": "Mice",
              "total_revenue": 107871.44,
              "total_jobs": 67
          },
          {
              "species": "Rats",
              "total_revenue": 107871.44,
              "total_jobs": 67
          },
          {
              "species": "Bats",
              "total_revenue": 78891.05,
              "total_jobs": 49
          },
          {
              "species": "Birds",
              "total_revenue": 38640.51,
              "total_jobs": 24
          },
          {
              "species": "Flying Squirrels",
              "total_revenue": 12880.17,
              "total_jobs": 8
          },
          {
              "species": "Skunks",
              "total_revenue": 9660.13,
              "total_jobs": 6
          },
          {
              "species": "Prevention only",
              "total_revenue": 3220.04,
              "total_jobs": 2
          },
          {
              "species": "Opossums",
              "total_revenue": 3220.04,
              "total_jobs": 2
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 3220.04,
              "total_jobs": 2
          },
          {
              "species": "Snakes",
              "total_revenue": 1610.02,
              "total_jobs": 1
          }
      ],
      "suburbs": [
          {
              "suburb": "Milton",
              "revenue": 196948.91,
              "jobs": 96
          },
          {
              "suburb": "Atlanta",
              "revenue": 142010.25,
              "jobs": 91
          },
          {
              "suburb": "Marietta",
              "revenue": 70954.0,
              "jobs": 49
          },
          {
              "suburb": "Alpharetta",
              "revenue": 62633.5,
              "jobs": 36
          },
          {
              "suburb": "Woodstock",
              "revenue": 53258.6,
              "jobs": 25
          },
          {
              "suburb": "Roswell",
              "revenue": 52583.0,
              "jobs": 33
          },
          {
              "suburb": "Smyrna",
              "revenue": 45622.0,
              "jobs": 31
          },
          {
              "suburb": "Decatur",
              "revenue": 40900.0,
              "jobs": 22
          },
          {
              "suburb": "Mableton",
              "revenue": 28157.0,
              "jobs": 16
          },
          {
              "suburb": "Hampton",
              "revenue": 26380.4,
              "jobs": 7
          },
          {
              "suburb": "College Park",
              "revenue": 23320.0,
              "jobs": 6
          },
          {
              "suburb": "Suwanee",
              "revenue": 18381.5,
              "jobs": 10
          },
          {
              "suburb": "Douglasville",
              "revenue": 12441.0,
              "jobs": 5
          },
          {
              "suburb": "Duluth",
              "revenue": 11211.0,
              "jobs": 8
          },
          {
              "suburb": "Lawrenceville",
              "revenue": 10325.0,
              "jobs": 7
          },
          {
              "suburb": "Hiram",
              "revenue": 10274.0,
              "jobs": 8
          },
          {
              "suburb": "Sandy Springs",
              "revenue": 9044.0,
              "jobs": 6
          },
          {
              "suburb": "Dunwoody",
              "revenue": 8472.0,
              "jobs": 5
          },
          {
              "suburb": "Norcross",
              "revenue": 8315.0,
              "jobs": 8
          },
          {
              "suburb": "Austell",
              "revenue": 7590.0,
              "jobs": 6
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 19
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 17,
                  "website_clicks": 20
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 9,
                  "website_clicks": 12
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 27
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 26
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 18
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 22,
                  "website_clicks": 19
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 36,
                  "website_clicks": 32
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 49,
                  "website_clicks": 28
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 29,
                  "website_clicks": 30
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 24,
                  "website_clicks": 27
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 16,
                  "website_clicks": 28
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 10,
                  "website_clicks": 29
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 15
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 26
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 7,
                  "website_clicks": 29
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 9,
                  "website_clicks": 26
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 18,
                  "website_clicks": 51
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 37
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 46,
                  "website_clicks": 30
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 46,
                  "website_clicks": 19
              }
          ],
          "total_searches": 0,
          "total_calls": 423,
          "total_clicks": 548
      }
  },
  "orangeville": {
      "id": "orangeville",
      "name": "Orangeville",
      "total_revenue": 699640.17,
      "total_jobs": 458,
      "species": [
          {
              "species": "Squirrels",
              "total_revenue": 212336.21,
              "total_jobs": 139
          },
          {
              "species": "Raccoons",
              "total_revenue": 178729.04,
              "total_jobs": 117
          },
          {
              "species": "Bats",
              "total_revenue": 129845.88,
              "total_jobs": 85
          },
          {
              "species": "Mice",
              "total_revenue": 59576.35,
              "total_jobs": 39
          },
          {
              "species": "Red Squirrels",
              "total_revenue": 45827.96,
              "total_jobs": 30
          },
          {
              "species": "Birds",
              "total_revenue": 42772.76,
              "total_jobs": 28
          },
          {
              "species": "Skunks",
              "total_revenue": 18331.18,
              "total_jobs": 12
          },
          {
              "species": "Chipmunks",
              "total_revenue": 4582.8,
              "total_jobs": 3
          },
          {
              "species": "Rats",
              "total_revenue": 3055.2,
              "total_jobs": 2
          },
          {
              "species": "Prevention only",
              "total_revenue": 1527.6,
              "total_jobs": 1
          },
          {
              "species": "Snakes",
              "total_revenue": 1527.6,
              "total_jobs": 1
          },
          {
              "species": "Groundhogs",
              "total_revenue": 1527.6,
              "total_jobs": 1
          }
      ],
      "suburbs": [
          {
              "suburb": "Collingwood",
              "revenue": 111299.69,
              "jobs": 68
          },
          {
              "suburb": "Orangeville",
              "revenue": 104596.17,
              "jobs": 75
          },
          {
              "suburb": "The Blue Mountains",
              "revenue": 58175.25,
              "jobs": 23
          },
          {
              "suburb": "Thornbury",
              "revenue": 44820.0,
              "jobs": 24
          },
          {
              "suburb": "Fergus",
              "revenue": 43224.71,
              "jobs": 30
          },
          {
              "suburb": "Caledon",
              "revenue": 42313.14,
              "jobs": 29
          },
          {
              "suburb": "Caledon East",
              "revenue": 41950.25,
              "jobs": 16
          },
          {
              "suburb": "Mono",
              "revenue": 40490.75,
              "jobs": 25
          },
          {
              "suburb": "Clarksburg",
              "revenue": 33840.5,
              "jobs": 18
          },
          {
              "suburb": "Caledon Village",
              "revenue": 25891.5,
              "jobs": 9
          },
          {
              "suburb": "East Garafraxa",
              "revenue": 23998.0,
              "jobs": 13
          },
          {
              "suburb": "Shelburne",
              "revenue": 23887.5,
              "jobs": 17
          },
          {
              "suburb": "Blue Mountains",
              "revenue": 20525.0,
              "jobs": 12
          },
          {
              "suburb": "Grand Valley",
              "revenue": 17665.0,
              "jobs": 12
          },
          {
              "suburb": "Meaford",
              "revenue": 12795.5,
              "jobs": 7
          },
          {
              "suburb": "Creemore",
              "revenue": 12061.84,
              "jobs": 6
          },
          {
              "suburb": "Belwood",
              "revenue": 11682.5,
              "jobs": 7
          },
          {
              "suburb": "Amaranth",
              "revenue": 11042.720000000001,
              "jobs": 6
          },
          {
              "suburb": "Hillsburgh",
              "revenue": 10547.5,
              "jobs": 4
          },
          {
              "suburb": "Alton",
              "revenue": 8832.65,
              "jobs": 8
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 2,
                  "website_clicks": 17
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 5,
                  "website_clicks": 9
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 8
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 11
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 5,
                  "website_clicks": 7
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 5,
                  "website_clicks": 8
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 18,
                  "website_clicks": 16
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 18
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 34,
                  "website_clicks": 34
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 23
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 29,
                  "website_clicks": 21
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 24,
                  "website_clicks": 28
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 58,
                  "website_clicks": 19
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 10
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 16,
                  "website_clicks": 10
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 2,
                  "website_clicks": 8
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 10,
                  "website_clicks": 6
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 16,
                  "website_clicks": 25
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 14,
                  "website_clicks": 12
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 26,
                  "website_clicks": 35
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 24
              }
          ],
          "total_searches": 0,
          "total_calls": 362,
          "total_clicks": 349
      }
  },
  "oh-columbus": {
      "id": "oh-columbus",
      "name": "Columbus",
      "total_revenue": 731626.3200000001,
      "total_jobs": 420,
      "species": [
          {
              "species": "Raccoons",
              "total_revenue": 240391.51,
              "total_jobs": 138
          },
          {
              "species": "Squirrels",
              "total_revenue": 196842.32,
              "total_jobs": 113
          },
          {
              "species": "Mice",
              "total_revenue": 101034.11,
              "total_jobs": 58
          },
          {
              "species": "Birds",
              "total_revenue": 81872.47,
              "total_jobs": 47
          },
          {
              "species": "Bats",
              "total_revenue": 69678.7,
              "total_jobs": 40
          },
          {
              "species": "Skunks",
              "total_revenue": 15677.71,
              "total_jobs": 9
          },
          {
              "species": "Rats",
              "total_revenue": 10451.8,
              "total_jobs": 6
          },
          {
              "species": "Groundhogs",
              "total_revenue": 8709.84,
              "total_jobs": 5
          },
          {
              "species": "Flying Squirrels",
              "total_revenue": 3483.93,
              "total_jobs": 2
          },
          {
              "species": "Clean Up",
              "total_revenue": 3483.93,
              "total_jobs": 2
          }
      ],
      "suburbs": [
          {
              "suburb": "Columbus",
              "revenue": 316941.68000000005,
              "jobs": 183
          },
          {
              "suburb": "Westerville",
              "revenue": 75730.75,
              "jobs": 36
          },
          {
              "suburb": "Dublin",
              "revenue": 57708.89,
              "jobs": 31
          },
          {
              "suburb": "Powell",
              "revenue": 32965.0,
              "jobs": 20
          },
          {
              "suburb": "Hilliard",
              "revenue": 29410.0,
              "jobs": 17
          },
          {
              "suburb": "Grove City",
              "revenue": 28876.0,
              "jobs": 13
          },
          {
              "suburb": "Pickerington",
              "revenue": 26953.0,
              "jobs": 15
          },
          {
              "suburb": "Lewis Center",
              "revenue": 22748.0,
              "jobs": 11
          },
          {
              "suburb": "Reynoldsburg",
              "revenue": 22524.0,
              "jobs": 14
          },
          {
              "suburb": "New Albany",
              "revenue": 21355.0,
              "jobs": 11
          },
          {
              "suburb": "Galloway",
              "revenue": 15515.0,
              "jobs": 11
          },
          {
              "suburb": "Canal Winchester",
              "revenue": 13759.0,
              "jobs": 10
          },
          {
              "suburb": "Worthington",
              "revenue": 12702.0,
              "jobs": 7
          },
          {
              "suburb": "Galena",
              "revenue": 12304.0,
              "jobs": 4
          },
          {
              "suburb": "Orient",
              "revenue": 8894.0,
              "jobs": 3
          },
          {
              "suburb": "Pataskala",
              "revenue": 8581.0,
              "jobs": 4
          },
          {
              "suburb": "Williamsport",
              "revenue": 7097.0,
              "jobs": 1
          },
          {
              "suburb": "Blacklick",
              "revenue": 6236.0,
              "jobs": 3
          },
          {
              "suburb": "Marysville",
              "revenue": 6025.0,
              "jobs": 3
          },
          {
              "suburb": "West Jefferson",
              "revenue": 5301.0,
              "jobs": 2
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 2
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 4,
                  "website_clicks": 4
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 3
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 7,
                  "website_clicks": 14
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 4,
                  "website_clicks": 23
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 8,
                  "website_clicks": 26
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 19,
                  "website_clicks": 30
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 45
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 19,
                  "website_clicks": 39
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 22
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 10,
                  "website_clicks": 22
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 10,
                  "website_clicks": 14
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 3,
                  "website_clicks": 8
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 24
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 9,
                  "website_clicks": 21
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 23
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 8,
                  "website_clicks": 24
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 20,
                  "website_clicks": 30
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 26,
                  "website_clicks": 37
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 23,
                  "website_clicks": 38
              }
          ],
          "total_searches": 0,
          "total_calls": 217,
          "total_clicks": 449
      }
  },
  "pa-pittsburgh": {
      "id": "pa-pittsburgh",
      "name": "Pittsburgh",
      "total_revenue": 535794.95,
      "total_jobs": 199,
      "species": [
          {
              "species": "Squirrels",
              "total_revenue": 150776.47,
              "total_jobs": 56
          },
          {
              "species": "Bats",
              "total_revenue": 115774.79,
              "total_jobs": 43
          },
          {
              "species": "Mice",
              "total_revenue": 99620.17,
              "total_jobs": 37
          },
          {
              "species": "Raccoons",
              "total_revenue": 91542.86,
              "total_jobs": 34
          },
          {
              "species": "Birds",
              "total_revenue": 61926.05,
              "total_jobs": 23
          },
          {
              "species": "Prevention only",
              "total_revenue": 5384.87,
              "total_jobs": 2
          },
          {
              "species": "Groundhogs",
              "total_revenue": 5384.87,
              "total_jobs": 2
          },
          {
              "species": "Chipmunks",
              "total_revenue": 5384.87,
              "total_jobs": 2
          }
      ],
      "suburbs": [
          {
              "suburb": "Pittsburgh",
              "revenue": 217676.0,
              "jobs": 85
          },
          {
              "suburb": "Verona",
              "revenue": 159483.2,
              "jobs": 49
          },
          {
              "suburb": "Sewickley",
              "revenue": 29517.0,
              "jobs": 4
          },
          {
              "suburb": "Coraopolis",
              "revenue": 23738.0,
              "jobs": 8
          },
          {
              "suburb": "McDonald",
              "revenue": 12802.0,
              "jobs": 4
          },
          {
              "suburb": "Bridgeville",
              "revenue": 10330.0,
              "jobs": 4
          },
          {
              "suburb": "Bethel Park",
              "revenue": 9404.0,
              "jobs": 3
          },
          {
              "suburb": "Venetia",
              "revenue": 8911.0,
              "jobs": 3
          },
          {
              "suburb": "McKees Rocks",
              "revenue": 8645.0,
              "jobs": 5
          },
          {
              "suburb": "Crafton",
              "revenue": 8190.0,
              "jobs": 1
          },
          {
              "suburb": "South Park",
              "revenue": 7182.0,
              "jobs": 4
          },
          {
              "suburb": "Cecil-Bishop",
              "revenue": 5954.0,
              "jobs": 2
          },
          {
              "suburb": "Cheswick",
              "revenue": 5307.0,
              "jobs": 2
          },
          {
              "suburb": "Wexford",
              "revenue": 4955.0,
              "jobs": 2
          },
          {
              "suburb": "Turtle Creek",
              "revenue": 4840.0,
              "jobs": 1
          },
          {
              "suburb": "South Park Township",
              "revenue": 4235.75,
              "jobs": 2
          },
          {
              "suburb": "Murrysville",
              "revenue": 3981.0,
              "jobs": 1
          },
          {
              "suburb": "Ambridge",
              "revenue": 3820.0,
              "jobs": 1
          },
          {
              "suburb": "Washington",
              "revenue": 3475.0,
              "jobs": 2
          },
          {
              "suburb": "Tarentum",
              "revenue": 3349.0,
              "jobs": 2
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 5,
                  "website_clicks": 23
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 3,
                  "website_clicks": 43
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 39
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 63
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 19,
                  "website_clicks": 30
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 9,
                  "website_clicks": 12
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 5,
                  "website_clicks": 27
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 7,
                  "website_clicks": 8
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 9,
                  "website_clicks": 10
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 37
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 12,
                  "website_clicks": 40
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 20,
                  "website_clicks": 66
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 30,
                  "website_clicks": 64
              }
          ],
          "total_searches": 0,
          "total_calls": 173,
          "total_clicks": 462
      }
  },
  "md-baltimore": {
      "id": "md-baltimore",
      "name": "Baltimore",
      "total_revenue": 492767.17,
      "total_jobs": 204,
      "species": [
          {
              "species": "Mice",
              "total_revenue": 171502.3,
              "total_jobs": 71
          },
          {
              "species": "Squirrels",
              "total_revenue": 115945.22,
              "total_jobs": 48
          },
          {
              "species": "Bats",
              "total_revenue": 72465.76,
              "total_jobs": 30
          },
          {
              "species": "Birds",
              "total_revenue": 60388.13,
              "total_jobs": 25
          },
          {
              "species": "Raccoons",
              "total_revenue": 50726.03,
              "total_jobs": 21
          },
          {
              "species": "Groundhogs",
              "total_revenue": 4831.05,
              "total_jobs": 2
          },
          {
              "species": "Rats",
              "total_revenue": 4831.05,
              "total_jobs": 2
          },
          {
              "species": "Prevention only",
              "total_revenue": 2415.53,
              "total_jobs": 1
          },
          {
              "species": "Snakes",
              "total_revenue": 2415.53,
              "total_jobs": 1
          },
          {
              "species": "Clean Up",
              "total_revenue": 2415.53,
              "total_jobs": 1
          },
          {
              "species": "Foxes",
              "total_revenue": 2415.53,
              "total_jobs": 1
          },
          {
              "species": "Skunks",
              "total_revenue": 2415.53,
              "total_jobs": 1
          }
      ],
      "suburbs": [
          {
              "suburb": "Timonium",
              "revenue": 171977.91999999998,
              "jobs": 33
          },
          {
              "suburb": "Owings Mills",
              "revenue": 43344.0,
              "jobs": 22
          },
          {
              "suburb": "Towson",
              "revenue": 34060.0,
              "jobs": 15
          },
          {
              "suburb": "Bel Air",
              "revenue": 32659.0,
              "jobs": 13
          },
          {
              "suburb": "Parkville",
              "revenue": 31684.95,
              "jobs": 16
          },
          {
              "suburb": "Rosedale",
              "revenue": 22177.0,
              "jobs": 11
          },
          {
              "suburb": "Cockeysville",
              "revenue": 18528.0,
              "jobs": 9
          },
          {
              "suburb": "Dundalk",
              "revenue": 16864.0,
              "jobs": 9
          },
          {
              "suburb": "Nottingham",
              "revenue": 14278.0,
              "jobs": 6
          },
          {
              "suburb": "Reisterstown",
              "revenue": 13903.0,
              "jobs": 8
          },
          {
              "suburb": "Jarrettsville",
              "revenue": 13251.0,
              "jobs": 6
          },
          {
              "suburb": "Pikesville",
              "revenue": 13079.0,
              "jobs": 5
          },
          {
              "suburb": "Woodlawn",
              "revenue": 12488.3,
              "jobs": 6
          },
          {
              "suburb": "Lutherville",
              "revenue": 10642.0,
              "jobs": 4
          },
          {
              "suburb": "Middle River",
              "revenue": 9059.0,
              "jobs": 5
          },
          {
              "suburb": "Edgewood",
              "revenue": 8012.0,
              "jobs": 3
          },
          {
              "suburb": "Randallstown",
              "revenue": 7778.0,
              "jobs": 5
          },
          {
              "suburb": "Windsor Mill",
              "revenue": 7495.0,
              "jobs": 4
          },
          {
              "suburb": "Perry Hall",
              "revenue": 5950.0,
              "jobs": 3
          },
          {
              "suburb": "Abingdon",
              "revenue": 5537.0,
              "jobs": 2
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 5,
                  "website_clicks": 11
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 4,
                  "website_clicks": 6
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 10,
                  "website_clicks": 9
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 10,
                  "website_clicks": 11
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 2,
                  "website_clicks": 7
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 8,
                  "website_clicks": 17
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 14,
                  "website_clicks": 36
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 29
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 14,
                  "website_clicks": 32
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 15,
                  "website_clicks": 25
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 29,
                  "website_clicks": 36
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 25
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 21,
                  "website_clicks": 21
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 10,
                  "website_clicks": 22
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 16,
                  "website_clicks": 32
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 14,
                  "website_clicks": 38
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 16,
                  "website_clicks": 29
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 22,
                  "website_clicks": 41
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 25,
                  "website_clicks": 49
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 55,
                  "website_clicks": 79
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 40,
                  "website_clicks": 72
              }
          ],
          "total_searches": 0,
          "total_calls": 372,
          "total_clicks": 627
      }
  },
  "okanagan": {
      "id": "okanagan",
      "name": "Okanagan",
      "total_revenue": 389254.95,
      "total_jobs": 234,
      "species": [
          {
              "species": "Bats",
              "total_revenue": 86501.1,
              "total_jobs": 52
          },
          {
              "species": "Raccoons",
              "total_revenue": 73193.24,
              "total_jobs": 44
          },
          {
              "species": "Squirrels",
              "total_revenue": 68202.79,
              "total_jobs": 41
          },
          {
              "species": "Mice",
              "total_revenue": 53231.45,
              "total_jobs": 32
          },
          {
              "species": "Rats",
              "total_revenue": 53231.45,
              "total_jobs": 32
          },
          {
              "species": "Birds",
              "total_revenue": 44914.03,
              "total_jobs": 27
          },
          {
              "species": "Clean Up",
              "total_revenue": 3326.97,
              "total_jobs": 2
          },
          {
              "species": "Pigeons",
              "total_revenue": 1663.48,
              "total_jobs": 1
          },
          {
              "species": "Insulation",
              "total_revenue": 1663.48,
              "total_jobs": 1
          },
          {
              "species": "Groundhogs",
              "total_revenue": 1663.48,
              "total_jobs": 1
          },
          {
              "species": "Skunks",
              "total_revenue": 1663.48,
              "total_jobs": 1
          }
      ],
      "suburbs": [
          {
              "suburb": "Kelowna",
              "revenue": 192424.45,
              "jobs": 118
          },
          {
              "suburb": "West Kelowna",
              "revenue": 50883.75,
              "jobs": 29
          },
          {
              "suburb": "Vernon",
              "revenue": 35326.0,
              "jobs": 20
          },
          {
              "suburb": "Lake Country",
              "revenue": 30489.0,
              "jobs": 14
          },
          {
              "suburb": "Kaleden",
              "revenue": 20911.75,
              "jobs": 21
          },
          {
              "suburb": "Summerland",
              "revenue": 13476.0,
              "jobs": 7
          },
          {
              "suburb": "Penticton",
              "revenue": 10785.0,
              "jobs": 8
          },
          {
              "suburb": "Coldstream",
              "revenue": 9299.0,
              "jobs": 4
          },
          {
              "suburb": "Sicamous",
              "revenue": 6340.0,
              "jobs": 1
          },
          {
              "suburb": "Keremeos",
              "revenue": 4635.0,
              "jobs": 2
          },
          {
              "suburb": "Westbank",
              "revenue": 3650.0,
              "jobs": 3
          },
          {
              "suburb": "Lumby",
              "revenue": 3625.0,
              "jobs": 2
          },
          {
              "suburb": "Okanagan Falls",
              "revenue": 2500.0,
              "jobs": 2
          },
          {
              "suburb": "Kootenay Boundary",
              "revenue": 2080.0,
              "jobs": 1
          },
          {
              "suburb": "Merritt",
              "revenue": 1960.0,
              "jobs": 1
          },
          {
              "suburb": "Armstrong",
              "revenue": 870.0,
              "jobs": 1
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 71,
                  "calls": 18,
                  "website_clicks": 28
              },
              {
                  "month": "Nov 2024",
                  "searches": 40,
                  "calls": 24,
                  "website_clicks": 23
              },
              {
                  "month": "Dec 2024",
                  "searches": 44,
                  "calls": 17,
                  "website_clicks": 20
              },
              {
                  "month": "Jan 2025",
                  "searches": 21,
                  "calls": 13,
                  "website_clicks": 22
              },
              {
                  "month": "Feb 2025",
                  "searches": 17,
                  "calls": 14,
                  "website_clicks": 16
              },
              {
                  "month": "Mar 2025",
                  "searches": 39,
                  "calls": 25,
                  "website_clicks": 19
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 35,
                  "website_clicks": 46
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 49,
                  "website_clicks": 48
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 49,
                  "website_clicks": 46
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 24,
                  "website_clicks": 43
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 28,
                  "website_clicks": 46
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 27,
                  "website_clicks": 31
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 28,
                  "website_clicks": 24
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 30,
                  "website_clicks": 26
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 11,
                  "website_clicks": 20
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 29,
                  "website_clicks": 20
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 20,
                  "website_clicks": 16
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 16,
                  "website_clicks": 29
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 43,
                  "website_clicks": 32
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 38,
                  "website_clicks": 48
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 46,
                  "website_clicks": 40
              }
          ],
          "total_searches": 232,
          "total_calls": 584,
          "total_clicks": 643
      }
  },
  "l-windsor": {
      "id": "l-windsor",
      "name": "Windsor",
      "total_revenue": 144143.45,
      "total_jobs": 78,
      "species": [
          {
              "species": "Raccoons",
              "total_revenue": 51743.8,
              "total_jobs": 28
          },
          {
              "species": "Squirrels",
              "total_revenue": 36959.86,
              "total_jobs": 20
          },
          {
              "species": "Bats",
              "total_revenue": 16631.94,
              "total_jobs": 9
          },
          {
              "species": "Mice",
              "total_revenue": 14783.94,
              "total_jobs": 8
          },
          {
              "species": "Birds",
              "total_revenue": 12935.95,
              "total_jobs": 7
          },
          {
              "species": "Skunks",
              "total_revenue": 7391.97,
              "total_jobs": 4
          },
          {
              "species": "Rats",
              "total_revenue": 1847.99,
              "total_jobs": 1
          },
          {
              "species": "Pigeons",
              "total_revenue": 1847.99,
              "total_jobs": 1
          }
      ],
      "suburbs": [
          {
              "suburb": "Windsor",
              "revenue": 61859.4,
              "jobs": 31
          },
          {
              "suburb": "Lasalle",
              "revenue": 32527.95,
              "jobs": 23
          },
          {
              "suburb": "Kingsville",
              "revenue": 13427.0,
              "jobs": 6
          },
          {
              "suburb": "Essex",
              "revenue": 12234.9,
              "jobs": 5
          },
          {
              "suburb": "LaSalle",
              "revenue": 8285.9,
              "jobs": 5
          },
          {
              "suburb": "Tecumseh",
              "revenue": 4636.0,
              "jobs": 2
          },
          {
              "suburb": "Belle River",
              "revenue": 3517.5,
              "jobs": 2
          },
          {
              "suburb": "Lake Shore",
              "revenue": 3155.3,
              "jobs": 1
          },
          {
              "suburb": "Leamington",
              "revenue": 2654.5,
              "jobs": 1
          },
          {
              "suburb": "Saint Joachim",
              "revenue": 1650.0,
              "jobs": 1
          },
          {
              "suburb": "Amherstburg",
              "revenue": 195.0,
              "jobs": 1
          }
      ],
      "gsc": {
          "monthly": [],
          "total_clicks": 0,
          "total_impressions": 0,
          "recent_clicks": 0
      },
      "gbp": {
          "monthly": [
              {
                  "month": "Oct 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Nov 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Dec 2024",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Jan 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Feb 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Mar 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Apr 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "May 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Jun 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Jul 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Aug 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Sep 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Oct 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Nov 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Dec 2025",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Jan 2026",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Feb 2026",
                  "searches": 0,
                  "calls": 0,
                  "website_clicks": 0
              },
              {
                  "month": "Mar 2026",
                  "searches": 0,
                  "calls": 1,
                  "website_clicks": 1
              },
              {
                  "month": "Apr 2026",
                  "searches": 0,
                  "calls": 6,
                  "website_clicks": 15
              },
              {
                  "month": "May 2026",
                  "searches": 0,
                  "calls": 8,
                  "website_clicks": 23
              },
              {
                  "month": "Jun 2026",
                  "searches": 0,
                  "calls": 4,
                  "website_clicks": 13
              }
          ],
          "total_searches": 0,
          "total_calls": 19,
          "total_clicks": 52
      }
  },
};