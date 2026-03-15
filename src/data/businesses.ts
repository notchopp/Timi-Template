export type Category =
  | "electrician"
  | "plumber"
  | "restaurant"
  | "barber-salon"
  | "auto-repair"
  | "landscaping"
  | "cleaning-service"
  | "retail"
  | "health-wellness"
  | "other";

export type TrustLevel = "verified" | "user-claimed" | "unverified";

export type AccessibilityTag = "wheelchair" | "quiet" | "low-sensory" | "parking" | "assistive-listening";

export type DietaryTag = "vegetarian" | "vegan" | "gluten-free" | "halal" | "kosher" | "nut-free";

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  description: string;
  aiDescription?: string;
  phone: string;
  trustLevel: TrustLevel;
  lastVerified: string;
  reviews: Review[];
  reviewSummary?: string;
  similarIds: string[];
  accessibility: AccessibilityTag[];
  dietary?: DietaryTag[];
  leadScore?: number;
  viewCount: number;
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "plumber", label: "Plumbers" },
  { id: "electrician", label: "Electricians" },
  { id: "restaurant", label: "Restaurants" },
  { id: "barber-salon", label: "Barbers & Salons" },
  { id: "auto-repair", label: "Auto Repair" },
  { id: "landscaping", label: "Landscaping" },
  { id: "cleaning-service", label: "Cleaning Services" },
  { id: "retail", label: "Retail" },
  { id: "health-wellness", label: "Medical & Wellness" },
  { id: "other", label: "Other" },
];

export const BUSINESSES: Business[] = [
  {
    id: "1",
    name: "Philadelphia Suburban Electrical Service",
    category: "electrician",
    categoryLabel: "Electrician",
    description: "Family-owned electrical contractor serving residential and commercial customers.",
    aiDescription: "Been wiring Upper Darby and the Main Line for 30+ years. Same crew, same reliability—from panel upgrades to emergency repairs. Folks along the 69th St corridor know them.",
    phone: "(610) 284-1232",
    trustLevel: "verified",
    lastVerified: "2026-03-10",
    leadScore: 87,
    viewCount: 342,
    similarIds: ["3"],
    accessibility: ["wheelchair", "parking"],
    reviews: [
      { id: "r1", author: "M. T.", rating: 5, text: "Came same day for an emergency. Professional and fair pricing.", date: "2026-02-01" },
      { id: "r2", author: "J. R.", rating: 5, text: "Replaced our panel. Clean job, passed inspection first time.", date: "2026-01-15" },
    ],
    reviewSummary: "Customers praise same-day service, fair pricing, and inspection-ready work. Consistently recommended for emergencies and panel upgrades.",
  },
  {
    id: "2",
    name: "Nichols Plumbing, Heating & Cooling",
    category: "plumber",
    categoryLabel: "Plumber",
    description: "Family-owned plumbing, heating, and air conditioning company since 1927.",
    aiDescription: "Four generations of Nichols have kept Upper Darby's pipes flowing. Same-day for emergencies, honest assessments. Ask any longtime resident who they call.",
    phone: "(610) 449-2700",
    trustLevel: "verified",
    lastVerified: "2026-03-12",
    leadScore: 92,
    viewCount: 518,
    similarIds: [],
    accessibility: ["wheelchair", "parking"],
    reviews: [
      { id: "r3", author: "S. K.", rating: 5, text: "Fixed our furnace in January. Honest, didn't upsell.", date: "2026-02-20" },
      { id: "r4", author: "D. L.", rating: 5, text: "100 years in business for a reason. Trust them completely.", date: "2025-12-01" },
    ],
    reviewSummary: "Known for honesty, no upselling, and reliable emergency service. Multi-generational trust in the community.",
  },
  {
    id: "3",
    name: "Master Electricians, Inc.",
    category: "electrician",
    categoryLabel: "Electrician",
    description: "Residential and commercial electrical contractor with over 27 years of experience.",
    aiDescription: "Delaware County's go-to for commercial work and complex residential. Same-day quotes, licensed and insured.",
    phone: "(267) 444-9796",
    trustLevel: "user-claimed",
    lastVerified: "2026-02-28",
    leadScore: 76,
    viewCount: 198,
    similarIds: ["1"],
    accessibility: ["parking"],
    reviews: [
      { id: "r5", author: "T. W.", rating: 4, text: "Good work on our office rewire. A bit slow to schedule.", date: "2026-01-10" },
    ],
    reviewSummary: "Strong commercial and residential work. Some mention scheduling wait times during busy seasons.",
  },
  {
    id: "4",
    name: "IHOP Upper Darby",
    category: "restaurant",
    categoryLabel: "Restaurant",
    description: "National chain diner serving breakfast, pancakes, lunch, and dinner all day.",
    aiDescription: "Your classic 24-hour diner fix on the Boulevard. Pancake stack, eggs any way, coffee refills. No surprises—that's the point.",
    phone: "(610) 352-4467",
    trustLevel: "verified",
    lastVerified: "2026-03-14",
    leadScore: 68,
    viewCount: 892,
    similarIds: ["5", "6"],
    accessibility: ["wheelchair", "parking", "quiet"],
    dietary: ["vegetarian", "gluten-free"],
    reviews: [
      { id: "r6", author: "K. P.", rating: 4, text: "Reliable breakfast spot. Kids love the pancakes.", date: "2026-02-15" },
    ],
    reviewSummary: "Reliable, family-friendly. Known for consistent breakfast and all-day availability.",
  },
  {
    id: "5",
    name: "Imperial House",
    category: "restaurant",
    categoryLabel: "Restaurant",
    description: "Family-owned authentic Chinese restaurant offering dine-in, pickup, and delivery.",
    aiDescription: "Real Chinese cooking—not the usual takeout menu. Family recipes, fresh ingredients. Worth the trip off 69th St.",
    phone: "(610) 789-9780",
    trustLevel: "verified",
    lastVerified: "2026-03-08",
    leadScore: 81,
    viewCount: 445,
    similarIds: ["4", "6", "7", "8"],
    accessibility: ["wheelchair"],
    dietary: ["vegetarian", "vegan", "gluten-free"],
    reviews: [
      { id: "r7", author: "L. C.", rating: 5, text: "Best General Tso's in the area. Real deal.", date: "2026-03-01" },
      { id: "r8", author: "A. M.", rating: 4, text: "Great for vegetarians. They accommodate well.", date: "2026-02-10" },
    ],
    reviewSummary: "Authentic flavors, strong vegetarian options. Consistently praised for sauces and freshness.",
  },
  {
    id: "6",
    name: "Toomi's Shawarma",
    category: "restaurant",
    categoryLabel: "Restaurant",
    description: "Middle Eastern restaurant specializing in shawarma, falafel wraps, and crispy chicken sandwiches.",
    aiDescription: "Your go-to for shawarma and falafel on the run. Fresh, generous portions. The garlic sauce is legendary.",
    phone: "(215) 798-6992",
    trustLevel: "user-claimed",
    lastVerified: "2026-03-05",
    leadScore: 89,
    viewCount: 623,
    similarIds: ["5", "7", "8"],
    accessibility: ["wheelchair"],
    dietary: ["vegetarian", "vegan", "halal"],
    reviews: [
      { id: "r9", author: "R. H.", rating: 5, text: "Falafel wrap is incredible. Fast and cheap.", date: "2026-03-10" },
      { id: "r10", author: "N. B.", rating: 5, text: "Best shawarma in Delco. No contest.", date: "2026-02-28" },
    ],
    reviewSummary: "Top-rated for shawarma and falafel. Fast, affordable, generous portions. Garlic sauce highly praised.",
  },
  {
    id: "7",
    name: "bb.q Chicken Upper Darby",
    category: "restaurant",
    categoryLabel: "Restaurant",
    description: "Korean fried chicken restaurant serving bone-in and boneless chicken with house sauces.",
    aiDescription: "Korean fried chicken done right—crispy, saucy, addictive. Good for groups. Dine-in, takeout, delivery.",
    phone: "(445) 888-3005",
    trustLevel: "verified",
    lastVerified: "2026-03-11",
    leadScore: 85,
    viewCount: 567,
    similarIds: ["5", "6", "8"],
    accessibility: ["wheelchair", "parking"],
    dietary: ["gluten-free"],
    reviews: [
      { id: "r11", author: "J. S.", rating: 5, text: "Golden Original and Honey Garlic are must-try.", date: "2026-03-05" },
    ],
    reviewSummary: "Korean fried chicken fans rave about sauce variety and crunch. Good for groups and takeout.",
  },
  {
    id: "8",
    name: "Carib Grill",
    category: "restaurant",
    categoryLabel: "Restaurant",
    description: "Jamaican Caribbean restaurant and bakery serving jerk chicken, oxtail, patties, and island baked goods.",
    aiDescription: "Taste of the islands right on the Boulevard. Jerk, oxtail, patties, coco bread. The bakery case alone is worth stopping for.",
    phone: "(484) 461-4381",
    trustLevel: "verified",
    lastVerified: "2026-03-09",
    leadScore: 88,
    viewCount: 412,
    similarIds: ["5", "6", "7"],
    accessibility: ["wheelchair"],
    dietary: ["vegetarian"],
    reviews: [
      { id: "r12", author: "C. D.", rating: 5, text: "Oxtail and jerk chicken—authentic and delicious.", date: "2026-02-25" },
      { id: "r13", author: "M. J.", rating: 5, text: "Patties are incredible. Grab extra for later.", date: "2026-02-12" },
    ],
    reviewSummary: "Authentic Caribbean flavors. Oxtail, jerk, and patties consistently praised. Bakery items highly recommended.",
  },
  {
    id: "9",
    name: "Jackson's Barber Shop",
    category: "barber-salon",
    categoryLabel: "Barber / Salon",
    description: "Well-reviewed barbershop providing haircuts and grooming services to the Upper Darby community.",
    aiDescription: "Classic barbershop vibes. Cuts, fades, beard work. Walk-ins welcome, or book ahead. A neighborhood staple.",
    phone: "(484) 453-8011",
    trustLevel: "user-claimed",
    lastVerified: "2026-03-01",
    leadScore: 79,
    viewCount: 287,
    similarIds: [],
    accessibility: ["wheelchair"],
    reviews: [
      { id: "r14", author: "D. W.", rating: 5, text: "Best fade in Upper Darby. Always consistent.", date: "2026-03-08" },
      { id: "r15", author: "K. M.", rating: 4, text: "Great cut, can get busy on weekends.", date: "2026-02-20" },
    ],
    reviewSummary: "Known for consistent cuts and fades. Can get busy—booking ahead recommended for weekends.",
  },
];

export const SMART_COLLECTIONS = [
  { id: "brunch", title: "Best Sunday Brunch", businessIds: ["4"], description: "Places that do brunch right" },
  { id: "same-day", title: "Same-Day Service", businessIds: ["1", "2"], description: "Plumbers & electricians who come when you need them" },
  { id: "takeout", title: "Takeout Favorites", businessIds: ["5", "6", "7", "8"], description: "Dine-in, pickup, delivery" },
  { id: "family", title: "Family-Friendly", businessIds: ["4", "5", "7"], description: "Spots the whole crew can enjoy" },
];
