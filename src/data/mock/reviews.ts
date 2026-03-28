export interface MockReview {
  id: string;
  merchantName: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
}

export const MOCK_REVIEWS: MockReview[] = [
  { id: "r1", merchantName: "Harar Beans", product: "Sidama Coffee", rating: 5, comment: "Excellent quality, fast delivery!", date: "Mar 25, 2026" },
  { id: "r2", merchantName: "Merkato Finest", product: "Berbere Spice Mix", rating: 4, comment: "Good spice blend, slightly delayed.", date: "Mar 20, 2026" },
  { id: "r3", merchantName: "Dorze Weavers", product: "Handwoven Shemma", rating: 5, comment: "Beautiful craftsmanship, worth every birr.", date: "Mar 15, 2026" },
];

export const ANALYTICS_MONTHLY_DATA = [12, 18, 14, 22, 19, 28, 24, 32, 28, 38, 35, 42];

export const ANALYTICS_TOP_PRODUCTS = [
  { name: "Sidama Specialty Coffee", sales: 128, revenue: 57600 },
  { name: "Berbere Spice Mix", sales: 94, revenue: 23500 },
  { name: "Fresh Injera Pack", sales: 87, revenue: 15660 },
  { name: "Wild Forest Honey", sales: 62, revenue: 23560 },
];

export const ANALYTICS_FEEDBACK_DIST = [
  { stars: 5, pct: 72, count: 245 },
  { stars: 4, pct: 18, count: 61 },
  { stars: 3, pct: 6, count: 20 },
  { stars: 2, pct: 3, count: 10 },
  { stars: 1, pct: 1, count: 6 },
];
