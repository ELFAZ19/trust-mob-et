import type { MarketplaceCard } from "../../core/types/domain";
import type { IconName } from "../../components/Icon";

export const MOCK_LISTINGS: MarketplaceCard[] = [
  { id: "p1", title: "Sidama Specialty Coffee", description: "Premium single-origin Yirgacheffe beans from verified farm.", price: 450, category: "Coffee", merchantId: "m1", merchantName: "Harar Beans", rating: 4.9, reviewCount: 203, distanceKm: 1.2, etaMinutes: 28, trustScore: 96, inStock: true },
  { id: "p2", title: "Abyssinia Pro Runners", description: "Ethiopian-made performance athletic shoes.", price: 3200, category: "Fashion", merchantId: "m2", merchantName: "Ethio Sport", rating: 4.7, reviewCount: 89, distanceKm: 3.5, etaMinutes: 45, trustScore: 88, inStock: true },
  { id: "p3", title: "Amharic Literature Set", description: "Classic Amharic novels and poetry collection.", price: 850, category: "Handicrafts", merchantId: "m3", merchantName: "Arat Kilo Books", rating: 5.0, reviewCount: 42, distanceKm: 0.8, etaMinutes: 15, trustScore: 78, inStock: true },
  { id: "p4", title: "Fresh Injera Pack", description: "Daily baked fresh injera from verified kitchen.", price: 180, category: "Food", merchantId: "m4", merchantName: "Selam Foods", rating: 4.8, reviewCount: 124, distanceKm: 1.3, etaMinutes: 25, trustScore: 92, inStock: true },
  { id: "p5", title: "Berbere Spice Mix", description: "Authentic homemade berbere blend from Merkato.", price: 250, category: "Spices", merchantId: "m5", merchantName: "Merkato Finest", rating: 4.6, reviewCount: 87, distanceKm: 2.1, etaMinutes: 35, trustScore: 85, inStock: true },
  { id: "p6", title: "Honey (Wild Forest)", description: "Pure wild honey from Bale mountains.", price: 380, category: "Food", merchantId: "m6", merchantName: "Nature's Gift", rating: 4.8, reviewCount: 92, distanceKm: 4.2, etaMinutes: 50, trustScore: 91, inStock: true },
  { id: "p7", title: "Handwoven Shemma", description: "Traditional Ethiopian cotton garment from Dorze.", price: 1200, category: "Clothing", merchantId: "m7", merchantName: "Dorze Weavers", rating: 4.7, reviewCount: 56, distanceKm: 5.0, etaMinutes: 60, trustScore: 88, inStock: true },
  { id: "p8", title: "Samsung Galaxy A55", description: "Latest Samsung mid-range, dual SIM, 128GB.", price: 18500, category: "Electronics", merchantId: "m8", merchantName: "NextGen Electronics", rating: 4.9, reviewCount: 178, distanceKm: 0.5, etaMinutes: 20, trustScore: 94, inStock: true },
];

export const FEATURED_PRODUCTS: MarketplaceCard[] = [
  MOCK_LISTINGS[0],
  MOCK_LISTINGS[3],
  MOCK_LISTINGS[6],
];

export const PRODUCT_CATEGORIES = ["All Items", "Food", "Coffee", "Spices", "Clothing", "Electronics", "Handicrafts", "Fashion"];

export const HOME_CATEGORIES: { icon: IconName; label: string; color: string }[] = [
  { icon: "food", label: "Food", color: "rgba(1,110,0,0.08)" },
  { icon: "electronics", label: "Electronics", color: "rgba(246,135,0,0.08)" },
  { icon: "home", label: "Home", color: "rgba(226,223,222,0.6)" },
  { icon: "tools", label: "Services", color: "rgba(119,255,97,0.15)" },
];

export const SERVICES = [
  { title: "Home Electrical Repair", sub: "Verified Professionals · Starts ETB 450" },
  { title: "Express Laundry", sub: "Next Day Delivery · ETB 25 / kg" },
];
