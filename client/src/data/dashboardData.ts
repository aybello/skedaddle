// Auto-generated dashboard data — do not edit manually
// Regenerate: python3 /tmp/parse_dashboard_v3.py

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
    "total_revenue": 990509.15,
    "total_jobs": 308,
    "species": [
      {
        "species": "Squirrels",
        "total_revenue": 304036.41,
        "total_jobs": 0
      },
      {
        "species": "Mice",
        "total_revenue": 262277.55,
        "total_jobs": 87
      },
      {
        "species": "Bats",
        "total_revenue": 183084.45,
        "total_jobs": 75
      },
      {
        "species": "Raccoons",
        "total_revenue": 163317.39,
        "total_jobs": 75
      },
      {
        "species": "Birds",
        "total_revenue": 37072.75,
        "total_jobs": 42
      },
      {
        "species": "Red Squirrels",
        "total_revenue": 16905.0,
        "total_jobs": 7
      },
      {
        "species": "Opossums",
        "total_revenue": 5800.0,
        "total_jobs": 7
      },
      {
        "species": "Rats",
        "total_revenue": 5630.85,
        "total_jobs": 2
      },
      {
        "species": "Skunks",
        "total_revenue": 5220.0,
        "total_jobs": 3
      },
      {
        "species": "Flying Squirrels",
        "total_revenue": 4090.75,
        "total_jobs": 7
      },
      {
        "species": "Chipmunks",
        "total_revenue": 3074.0,
        "total_jobs": 3
      }
    ],
    "suburbs": [
      {
        "suburb": "Milwaukee",
        "revenue": 320099.96,
        "jobs": 77
      },
      {
        "suburb": "Brookfield",
        "revenue": 50259.4,
        "jobs": 15
      },
      {
        "suburb": "Waukesha",
        "revenue": 49832.95,
        "jobs": 20
      },
      {
        "suburb": "New Berlin",
        "revenue": 47770.9,
        "jobs": 15
      },
      {
        "suburb": "Hartland",
        "revenue": 42675.5,
        "jobs": 11
      },
      {
        "suburb": "Wauwatosa",
        "revenue": 37351.5,
        "jobs": 12
      },
      {
        "suburb": "Greenfield",
        "revenue": 29610.5,
        "jobs": 10
      },
      {
        "suburb": "Pewaukee",
        "revenue": 27876.5,
        "jobs": 10
      },
      {
        "suburb": "West Allis",
        "revenue": 27398.35,
        "jobs": 12
      },
      {
        "suburb": "Franklin",
        "revenue": 22436.39,
        "jobs": 8
      },
      {
        "suburb": "Delafield",
        "revenue": 21464.75,
        "jobs": 3
      },
      {
        "suburb": "Oconomowoc",
        "revenue": 20763.75,
        "jobs": 7
      },
      {
        "suburb": "Muskego",
        "revenue": 18540.05,
        "jobs": 3
      },
      {
        "suburb": "Glendale",
        "revenue": 18464.5,
        "jobs": 7
      },
      {
        "suburb": "Mequon",
        "revenue": 16895.25,
        "jobs": 6
      },
      {
        "suburb": "Shorewood",
        "revenue": 15708.5,
        "jobs": 5
      },
      {
        "suburb": "Fox Point",
        "revenue": 15317.15,
        "jobs": 5
      },
      {
        "suburb": "Cudahy",
        "revenue": 13757.25,
        "jobs": 5
      },
      {
        "suburb": "South Milwaukee",
        "revenue": 12984.0,
        "jobs": 10
      },
      {
        "suburb": "Dousman",
        "revenue": 12012.0,
        "jobs": 2
      }
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
    "total_revenue": 859473.65,
    "total_jobs": 295,
    "species": [
      {
        "species": "Mice",
        "total_revenue": 477647.8,
        "total_jobs": 118
      },
      {
        "species": "Bats",
        "total_revenue": 194272.05,
        "total_jobs": 64
      },
      {
        "species": "Raccoons",
        "total_revenue": 105662.6,
        "total_jobs": 49
      },
      {
        "species": "Birds",
        "total_revenue": 43040.0,
        "total_jobs": 50
      },
      {
        "species": "Chipmunks",
        "total_revenue": 15019.5,
        "total_jobs": 5
      },
      {
        "species": "Rats",
        "total_revenue": 7523.5,
        "total_jobs": 2
      },
      {
        "species": "Flying Squirrels",
        "total_revenue": 6322.25,
        "total_jobs": 3
      },
      {
        "species": "Clean Up",
        "total_revenue": 4565.0,
        "total_jobs": 2
      },
      {
        "species": "Skunks",
        "total_revenue": 2050.0,
        "total_jobs": 0
      },
      {
        "species": "Opossums",
        "total_revenue": 1850.0,
        "total_jobs": 1
      },
      {
        "species": "Red Squirrels",
        "total_revenue": 1520.95,
        "total_jobs": 1
      }
    ],
    "suburbs": [
      {
        "suburb": "Madison",
        "revenue": 470308.85,
        "jobs": 158
      },
      {
        "suburb": "Middleton",
        "revenue": 79775.05,
        "jobs": 26
      },
      {
        "suburb": "Verona",
        "revenue": 50296.3,
        "jobs": 21
      },
      {
        "suburb": "Fitchburg",
        "revenue": 39885.0,
        "jobs": 16
      },
      {
        "suburb": "Waunakee",
        "revenue": 27953.25,
        "jobs": 9
      },
      {
        "suburb": "Oregon",
        "revenue": 25196.0,
        "jobs": 11
      },
      {
        "suburb": "Mount Horeb",
        "revenue": 23073.75,
        "jobs": 4
      },
      {
        "suburb": "Mazomanie",
        "revenue": 19989.25,
        "jobs": 4
      },
      {
        "suburb": "Monona",
        "revenue": 18817.0,
        "jobs": 7
      },
      {
        "suburb": "Sun Prairie",
        "revenue": 18037.0,
        "jobs": 6
      },
      {
        "suburb": "Stoughton",
        "revenue": 16759.0,
        "jobs": 6
      },
      {
        "suburb": "McFarland",
        "revenue": 12151.0,
        "jobs": 4
      },
      {
        "suburb": "Columbus",
        "revenue": 10985.0,
        "jobs": 3
      },
      {
        "suburb": "Belleville",
        "revenue": 9791.0,
        "jobs": 3
      },
      {
        "suburb": "New Glarus",
        "revenue": 5444.75,
        "jobs": 2
      },
      {
        "suburb": "Cottage Grove",
        "revenue": 5401.7,
        "jobs": 1
      },
      {
        "suburb": "DeForest",
        "revenue": 5061.0,
        "jobs": 8
      },
      {
        "suburb": "Cross Plains",
        "revenue": 4670.95,
        "jobs": 2
      },
      {
        "suburb": "Fall River",
        "revenue": 3831.55,
        "jobs": 1
      },
      {
        "suburb": "Dane",
        "revenue": 3255.0,
        "jobs": 1
      }
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
  }
};
